const { deployContract } = require("./deploy_contract");
const argv = require("yargs/yargs")(process.argv.slice(2)).argv;
const networks = require("./helpers/networks");
const networkName = argv.network;
const { deployer } = networks[networkName];
const last_devnet_account = "0x4b3f4ba8c00a02b66142a4b1dd41a4dfab4f92650922a3280977b0f03c75ee1";
const deployer_address = deployer.address || last_devnet_account

const deployScript = async () => {
  // const {
  //   classHash: helloStarknetClassHash,
  //   abi: helloStarknetAbi,
  //   address: ContractAddress,
  // } = await deployContract(null, "HelloStarknet"); // can pass another argument for the exported contract name
  // await deployContract(
  //   {
  //     name: 1,
  //   },
  //   "SimpleStorage"
  // );

  await deployContract(
    {
      owner: deployer_address,
    },
    "Challenge0"
  );

  // const values = {
  //     classHash: helloStarknetClassHash,
  //     abi: helloStarknetAbi,
  //     address: ContractAddress,
  //   } = await deployContract(null, "ExampleExternalContract");
  // await deployContract({ external_contract_address: values.address, eth_contract_address: "0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7" }
  //   , "Challenge1");
  

  //await deployContract(null, "TransferETH");
  //   await deployContract(
  //   {
  //     name: "Marquis",
  //     symbol: "MRQ",
  //     fixed_supply: 10,
  //     recipient:
  //       "0x06072Bb27d275a0bC1deBf1753649b8721CF845B681A48443Ac46baF45769f8E",
  //   },
  //   "PresetERC20"
  // );

  // await deployContract(
  //   {
  //     base_uri: "https://example.com/",
  //     recipient:
  //       "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691",
  //     token_ids: [2],
  //     values: [100],
  //   },
  //   "PresetERC1155"
  // );

  // await deployContract(
  //   {
  //     public_key:
  //       "0x6e4fd4f9d6442e10cf8e20a799be3533be3756c5ea4d13e16a297d7d2717039",
  //   },
  //   "Challenge3"
  // );

  // await deployContract(
  //   {
  //     voter_1:
  //       "0x06072Bb27d275a0bC1deBf1753649b8721CF845B681A48443Ac46baF45769f8E",
  //     voter_2:
  //       "0x06072Bb27d275a0bC1deBf1753649b8721CF845B681A48443Ac46baF45769f8E",
  //     voter_3:
  //       "0x06072Bb27d275a0bC1deBf1753649b8721CF845B681A48443Ac46baF45769f8E",
  //   },
  //   "Vote"
  // );
  // await deployContract(
  //   {
  //     initial_owner:
  //       "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691",
  //   },
  //   "Ownable"
  // ); // simple storage receives an argument in the constructor
};

deployScript()
  .then(() => {
    console.log("All Setup Done");
  })
  .catch(console.error);
