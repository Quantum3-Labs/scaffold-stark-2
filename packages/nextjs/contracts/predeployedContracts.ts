/**
 * This file is autogenerated by Scaffold-Stark.
 * You should not edit it manually or your changes might be overwritten.
 */
const universalERC20Abi =
  "0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7";

const preDeployedContracts = {
  devnet: {
    Eth: {
      address: universalERC20Abi,
      abi: [
        {
          type: "impl",
          name: "ERC20Impl",
          interface_name: "openzeppelin::token::erc20::interface::IERC20",
        },
        {
          name: "openzeppelin::token::erc20::interface::IERC20",
          type: "interface",
          items: [
            {
              name: "name",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::felt252",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "symbol",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::felt252",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "decimals",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u8",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "allowance",
              type: "function",
              inputs: [
                {
                  name: "owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "spender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "transfer",
              type: "function",
              inputs: [
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
            {
              name: "approve",
              type: "function",
              inputs: [
                {
                  name: "spender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          name: "ERC20CamelOnlyImpl",
          type: "impl",
          interface_name:
            "openzeppelin::token::erc20::interface::IERC20CamelOnly",
        },
        {
          type: "interface",
          name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
          items: [
            {
              name: "totalSupply",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "balanceOf",
              type: "function",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "transferFrom",
              type: "function",
              inputs: [
                {
                  name: "sender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          kind: "struct",
          name: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
          type: "event",
          members: [
            {
              kind: "data",
              name: "from",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              kind: "data",
              name: "to",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              kind: "data",
              name: "value",
              type: "core::integer::u256",
            },
          ],
        },
        {
          kind: "enum",
          name: "openzeppelin::token::erc20_v070::erc20::ERC20::Event",
          type: "event",
          variants: [
            {
              kind: "nested",
              name: "Transfer",
              type: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
            },
          ],
        },
      ],
    },
    Strk: {
      address: universalERC20Abi,
      abi: [
        {
          type: "impl",
          name: "ERC20Impl",
          interface_name: "openzeppelin::token::erc20::interface::IERC20",
        },
        {
          name: "openzeppelin::token::erc20::interface::IERC20",
          type: "interface",
          items: [
            {
              name: "name",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::felt252",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "symbol",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::felt252",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "decimals",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u8",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "allowance",
              type: "function",
              inputs: [
                {
                  name: "owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "spender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "transfer",
              type: "function",
              inputs: [
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
            {
              name: "approve",
              type: "function",
              inputs: [
                {
                  name: "spender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          name: "ERC20CamelOnlyImpl",
          type: "impl",
          interface_name:
            "openzeppelin::token::erc20::interface::IERC20CamelOnly",
        },
        {
          type: "interface",
          name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
          items: [
            {
              name: "totalSupply",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "balanceOf",
              type: "function",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "transferFrom",
              type: "function",
              inputs: [
                {
                  name: "sender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          kind: "struct",
          name: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
          type: "event",
          members: [
            {
              kind: "data",
              name: "from",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              kind: "data",
              name: "to",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              kind: "data",
              name: "value",
              type: "core::integer::u256",
            },
          ],
        },
        {
          kind: "enum",
          name: "openzeppelin::token::erc20_v070::erc20::ERC20::Event",
          type: "event",
          variants: [
            {
              kind: "nested",
              name: "Transfer",
              type: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
            },
          ],
        },
      ],
    },
  },
  sepolia: {
    Eth: {
      address: universalERC20Abi,
      abi: [
        {
          type: "impl",
          name: "ERC20Impl",
          interface_name: "openzeppelin::token::erc20::interface::IERC20",
        },
        {
          name: "openzeppelin::token::erc20::interface::IERC20",
          type: "interface",
          items: [
            {
              name: "name",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::felt252",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "symbol",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::felt252",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "decimals",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u8",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "total_supply",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "balance_of",
              type: "function",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "allowance",
              type: "function",
              inputs: [
                {
                  name: "owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "spender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "transfer",
              type: "function",
              inputs: [
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
            {
              name: "transfer_from",
              type: "function",
              inputs: [
                {
                  name: "sender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
            {
              name: "approve",
              type: "function",
              inputs: [
                {
                  name: "spender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          name: "ERC20CamelOnlyImpl",
          type: "impl",
          interface_name:
            "openzeppelin::token::erc20::interface::IERC20CamelOnly",
        },
        {
          type: "interface",
          name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
          items: [
            {
              name: "totalSupply",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "balanceOf",
              type: "function",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "transferFrom",
              type: "function",
              inputs: [
                {
                  name: "sender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          kind: "struct",
          name: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
          type: "event",
          members: [
            {
              kind: "data",
              name: "from",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              kind: "data",
              name: "to",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              kind: "data",
              name: "value",
              type: "core::integer::u256",
            },
          ],
        },
        {
          kind: "enum",
          name: "openzeppelin::token::erc20_v070::erc20::ERC20::Event",
          type: "event",
          variants: [
            {
              kind: "nested",
              name: "Transfer",
              type: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
            },
          ],
        },
      ],
    },
    Strk: {
      address: universalERC20Abi,
      abi: [
        {
          type: "impl",
          name: "ERC20Impl",
          interface_name: "openzeppelin::token::erc20::interface::IERC20",
        },
        {
          name: "openzeppelin::token::erc20::interface::IERC20",
          type: "interface",
          items: [
            {
              name: "name",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::felt252",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "symbol",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::felt252",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "decimals",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u8",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "total_supply",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "balance_of",
              type: "function",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "allowance",
              type: "function",
              inputs: [
                {
                  name: "owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "spender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "transfer",
              type: "function",
              inputs: [
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
            {
              name: "transfer_from",
              type: "function",
              inputs: [
                {
                  name: "sender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
            {
              name: "approve",
              type: "function",
              inputs: [
                {
                  name: "spender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          name: "ERC20CamelOnlyImpl",
          type: "impl",
          interface_name:
            "openzeppelin::token::erc20::interface::IERC20CamelOnly",
        },
        {
          type: "interface",
          name: "openzeppelin::token::erc20::interface::IERC20CamelOnly",
          items: [
            {
              name: "totalSupply",
              type: "function",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "balanceOf",
              type: "function",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              name: "transferFrom",
              type: "function",
              inputs: [
                {
                  name: "sender",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "amount",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          kind: "struct",
          name: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
          type: "event",
          members: [
            {
              kind: "data",
              name: "from",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              kind: "data",
              name: "to",
              type: "core::starknet::contract_address::ContractAddress",
            },
            {
              kind: "data",
              name: "value",
              type: "core::integer::u256",
            },
          ],
        },
        {
          kind: "enum",
          name: "openzeppelin::token::erc20_v070::erc20::ERC20::Event",
          type: "event",
          variants: [
            {
              kind: "nested",
              name: "Transfer",
              type: "openzeppelin::token::erc20_v070::erc20::ERC20::Transfer",
            },
          ],
        },
      ],
    },
  },
} as const;

export default preDeployedContracts;
