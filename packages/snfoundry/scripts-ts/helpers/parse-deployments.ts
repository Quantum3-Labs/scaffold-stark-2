import fs from "fs";
import path from "path";
import prettier from "prettier";
import { Abi, CompiledSierra, validateAndParseAddress } from "starknet";
import yargs, { string } from "yargs";

const TARGET_DIR = path.join(__dirname, "../../../nextjs/contracts");
const deploymentsDir = path.join(__dirname, "../../scripts");
const deployments_Contract = path.join(__dirname, "../../target/dev");

const filesFromDeploymentsDir = fs.readdirSync(deploymentsDir);
const filesFromDeploymentsContract = fs.readdirSync(deployments_Contract);
const combinedFiles = [
  ...filesFromDeploymentsDir,
  ...filesFromDeploymentsContract,
];

const generatedContractComment = `/**
 * This file is autogenerated by Scaffold-Stark.
 * You should not edit it manually or your changes might be overwritten.
 */`;

interface CommandLineOptions {
  _: string[];
  $0: string;
  network?: string;
}
const argv = yargs(process.argv.slice(2))
  .options({
    network: { type: "string" },
  })
  .parseSync() as CommandLineOptions;

const chainId = argv.network || "devnet";

const getContractDataFromDeployments = (): Record<
  string,
  Record<string, { address: string; abi: Abi; classHash: string }>
> => {
  const allContractsData: Record<
    string,
    Record<string, { address: string; abi: Abi; classHash: string }>
  > = {};

  //interfaces
  interface Output {
    type: string;
    contract_address?: string;
    class_hash?: string;
    transaction_hash: string;
  }

  interface Transaction {
    name: string;
    output: Output;
    status: string;
    timestamp: number;
    misc: any;
  }

  interface Transactions {
    [transactionHash: string]: Transaction;
  }

  interface TransactionsContainer {
    transactions: Transactions;
  }

  interface Artifacts {
    sierra: string;
    casm: string;
  }

  interface Contract {
    id: string;
    package_name: string;
    contract_name: string;
    module_path: string;
    artifacts: Artifacts;
  }

  interface RootObject {
    version: number;
    transactions: TransactionsContainer;
    contracts: Contract[];
  }

  let combinedJsonArray = [];

  combinedFiles.forEach((file) => {
    const dir = file.startsWith("scripts_")
      ? deploymentsDir
      : deployments_Contract;
    const filePath = path.join(dir, file);
    if (
      path.extname(file) === ".json" &&
      (file.endsWith("_state.json") ||
        file.endsWith("scripts.starknet_artifacts.json"))
    ) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const jsonData: RootObject = JSON.parse(fileContent);

        let contractData: {
          contract_name: string;
          contract_address: string;
          class_hash: string;
        } = {
          contract_name: "",
          contract_address: "",
          class_hash: "",
        };
        if (jsonData.transactions && jsonData.transactions.transactions) {
          for (const tx of Object.values(jsonData.transactions.transactions)) {
            if (
              tx.name === "deploy" &&
              tx.output &&
              tx.output.contract_address
            ) {
              contractData.contract_address = tx.output.contract_address;
            }
            if (tx.name === "declare" && tx.output && tx.output.class_hash) {
              contractData.class_hash = tx.output.class_hash;
            }
          }
        }
        // Process contracts to find contract name
        if (
          Array.isArray(jsonData.contracts) &&
          jsonData.contracts.length > 0
        ) {
          const contract = jsonData.contracts[0];
          contractData.contract_name = contract.contract_name;
        }
        combinedJsonArray.push(contractData);

        combinedJsonArray.forEach((item) => {
          if (item.contract_name) {
            contractData.contract_name = item.contract_name;
          }
          if (item.contract_address) {
            contractData.contract_address = validateAndParseAddress(
              item.contract_address
            );
          }
          if (item.class_hash) {
            contractData.class_hash = item.class_hash;
          }
        });

        Object.entries(combinedJsonArray).forEach(([contractName, data]) => {
          if (
            data.contract_name !== "" &&
            data.address !== "" &&
            data.class_hash !== ""
          ) {
            try {
              const abiFilePath = path.join(
                __dirname,
                `../../target/dev/contracts_${data.contract_name}.contract_class.json`
              );
              const abiContent: CompiledSierra = JSON.parse(
                fs.readFileSync(abiFilePath, "utf8")
              );

              allContractsData[chainId] = {
                ...allContractsData[chainId],
                [data.contract_name]: {
                  //@ts-ignore
                  address: data.contract_address,
                  abi: abiContent.abi.filter(
                    (item) => item.type !== "l1_handler"
                  ),
                },
              };
            } catch (e) {}
          }
        });
      } catch (error) {
        console.error(`Error reading or parsing:`, error);
      }
    }
  });

  return allContractsData;
};

const generateTsAbis = () => {
  const allContractsData = getContractDataFromDeployments();

  const fileContent = Object.entries(allContractsData).reduce(
    (content, [chainId, chainConfig]) => {
      return `${content}${chainId}: ${JSON.stringify(chainConfig, null, 2)},`;
    },
    ""
  );

  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR);
  }

  fs.writeFileSync(
    path.join(TARGET_DIR, "deployedContracts.ts"),
    prettier.format(
      `${generatedContractComment}\n\nconst deployedContracts = {${fileContent}} as const;\n\nexport default deployedContracts;`,
      {
        parser: "typescript",
      }
    )
  );

  console.log(
    `📝 Updated TypeScript contract definition file on ${TARGET_DIR}/deployedContracts.ts`
  );
};

generateTsAbis();
