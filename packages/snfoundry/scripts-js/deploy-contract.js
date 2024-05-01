const fs = require("fs");
const path = require("path");
const networks = require("./helpers/networks");
const argv = require("yargs/yargs")(process.argv.slice(2)).argv;
const { CallData, hash } = require("starknet-dev");

const networkName = argv.network;

const { provider, deployer } = networks[networkName];
const deployContract = async (
  constructorArgs,
  contractName,
  exportContractName
) => {
  const compiledContractCasm = JSON.parse(
    fs
      .readFileSync(
        path.resolve(
          __dirname,
          `../contracts/target/dev/contracts_${contractName}.compiled_contract_class.json`
        )
      )
      .toString("ascii")
  );

  const compiledContractSierra = JSON.parse(
    fs
      .readFileSync(
        path.resolve(
          __dirname,
          `../contracts/target/dev/contracts_${contractName}.contract_class.json`
        )
      )
      .toString("ascii")
  );

  let contractAddress;

  const precomputedClassHash = hash.computeSierraContractClassHash(
    compiledContractSierra
  );
  const contractCalldata = new CallData(compiledContractSierra.abi);
  const constructorCalldata = constructorArgs
    ? contractCalldata.compile("constructor", constructorArgs)
    : [];
  console.log("Deploying Contract ", contractName);

  let totalFee = 0n;

  let existingClassHash;

  try {
    existingClassHash = await provider.getClassByHash(precomputedClassHash);
  } catch (e) {}

  try {
    if (!existingClassHash) {
      const { suggestedMaxFee: estimatedFeeDeclare } =
        await deployer.estimateDeclareFee(
          {
            contract: compiledContractSierra,
            casm: compiledContractCasm,
          },
          {}
        );
      totalFee += estimatedFeeDeclare * 2n;
    } else {
      const { suggestedMaxFee: estimatedFeeDeploy } =
        await deployer.estimateDeployFee({
          classHash: precomputedClassHash,
          constructorCalldata,
        });
      totalFee += estimatedFeeDeploy * 2n;
    }
  } catch (e) {
    console.error("Failed to estimate fee, setting up fee to 0.001 eth");
    totalFee = 500000000000000n;
  }

  try {
    const tryDeclareAndDeploy = await deployer.declareAndDeploy(
      {
        contract: compiledContractSierra,
        casm: compiledContractCasm,
        constructorCalldata,
      },
      {
        maxFee: totalFee * 20n, // this optional max fee serves when error AccountValidation Failed or small fee on public networks , try 5n , 10n, 20n, 50n, 100n
      }
    );
    contractAddress = tryDeclareAndDeploy.deploy.address;
    contractAddress = "0x" + contractAddress.slice(2).padStart(64, "0");
  } catch (e) {
    console.log("Error", e);
  }
  console.log("Deployed contract ", contractName, " at: ", contractAddress);
  const networkPath = path.resolve(
    __dirname,
    `../deployments/${networkName}_latest.json`
  );
  let deployments = {};
  if (fs.existsSync(networkPath)) {
    const currentTimestamp = new Date().getTime();
    fs.renameSync(
      networkPath,
      networkPath.replace("_latest.json", `_${currentTimestamp}.json`)
    );
  }

  let finalContractName = exportContractName || contractName;

  deployments[finalContractName] = {
    classHash: precomputedClassHash,
    address: contractAddress,
    contract: contractName,
  };

  fs.writeFileSync(networkPath, JSON.stringify(deployments, null, 2));
  return {
    classHash: precomputedClassHash,
    address: contractAddress,
  };
};

module.exports = {
  deployContract,
  deployer,
};
