use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store)]
enum SampleEnum {
    enum1: u256,
    enum2: u256,
    enum3: ByteArray,
}

#[derive(Drop, Serde, starknet::Store)]
struct SampleStruct {
    id: u256,
    name: ByteArray,
    status: SampleEnum,
}

#[starknet::interface]
pub trait ITuples<TContractState> {
    // Getters
    fn get_tuple_2_u256(self: @TContractState) -> (u256, u256);
    fn get_tuple_3_mixed(self: @TContractState) -> (felt252, u256, bool);
    fn get_tuple_4_mixed(self: @TContractState) -> (ContractAddress, felt252, u128, u8);
    fn get_tuple_with_byte_array(self: @TContractState) -> (ByteArray, felt252, u256);
    fn get_tuple_with_struct_element(self: @TContractState) -> (u256, SampleStruct);
    fn get_nested_tuple(self: @TContractState) -> ((u256, u256), (felt252, u256, bool));

    // Getters with values
    fn get_tuple_2_u256_with_value(self: @TContractState, value: (u256, u256)) -> (u256, u256);
    fn get_tuple_3_mixed_with_value(
        self: @TContractState, value: (felt252, u256, bool)
    ) -> (felt252, u256, bool);
    fn get_tuple_4_mixed_with_value(
        self: @TContractState, value: (ContractAddress, felt252, u128, u8)
    ) -> (ContractAddress, felt252, u128, u8);
    fn get_tuple_with_byte_array_with_value(
        self: @TContractState, value: (ByteArray, felt252, u256)
    ) -> (ByteArray, felt252, u256);
    fn get_tuple_with_struct_element_with_value(
        self: @TContractState, value: (u256, SampleStruct)
    ) -> (u256, SampleStruct);

    fn get_nested_tuple_with_value(
        self: @TContractState, value: ((u256, u256), (felt252, u256, bool))
    ) -> ((u256, u256), (felt252, u256, bool));

    // Getters with keys
    fn get_tuple_2_u256_with_key(self: @TContractState, key: felt252) -> (u256, u256);
    fn get_tuple_3_mixed_with_key(self: @TContractState, key: felt252) -> (felt252, u256, bool);
    fn get_tuple_4_mixed_with_key(
        self: @TContractState, key: felt252
    ) -> (ContractAddress, felt252, u128, u8);
    fn get_tuple_with_byte_array_with_key(
        self: @TContractState, key: felt252
    ) -> (ByteArray, felt252, u256);

    fn get_tuple_with_struct_element_with_key(
        self: @TContractState, key: felt252
    ) -> (u256, SampleStruct);

    fn get_nested_tuple_with_key(
        self: @TContractState, key: felt252
    ) -> ((u256, u256), (felt252, u256, bool));


    // Setters
    fn set_tuple_2_u256_with_key(ref self: TContractState, key: felt252, value: (u256, u256));
    fn set_tuple_3_mixed_with_key(
        ref self: TContractState, key: felt252, value: (felt252, u256, bool)
    );
    fn set_tuple_4_mixed_with_key(
        ref self: TContractState, key: felt252, value: (ContractAddress, felt252, u128, u8)
    );
    fn set_tuple_with_byte_array_with_key(
        ref self: TContractState, key: felt252, value: (ByteArray, felt252, u256)
    );

    fn set_tuple_with_struct_element_with_key(
        ref self: TContractState, key: felt252, value: (u256, SampleStruct)
    );

    fn set_nested_tuple_with_key(
        ref self: TContractState, key: felt252, value: ((u256, u256), (felt252, u256, bool))
    );
}

#[starknet::contract]
mod Tuples {
    use super::{ContractAddress, ITuples, SampleStruct, SampleEnum};

    #[storage]
    struct Storage {
        mapping_tuple_2_u256: LegacyMap<felt252, (u256, u256)>,
        mapping_tuple_3_mixed: LegacyMap<felt252, (felt252, u256, bool)>,
        mapping_tuple_4_mixed: LegacyMap<felt252, (ContractAddress, felt252, u128, u8)>,
        mapping_tuple_with_byte_array: LegacyMap<felt252, (ByteArray, felt252, u256)>,
        mapping_tuple_with_struct_element: LegacyMap<felt252, (u256, SampleStruct)>,
        mapping_nested_tuple: LegacyMap<felt252, ((u256, u256), (felt252, u256, bool))>,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[abi(embed_v0)]
    impl TuplesImpl of ITuples<ContractState> {
        // Getters
        fn get_tuple_2_u256(self: @ContractState) -> (u256, u256) {
            self.mapping_tuple_2_u256.read(0)
        }

        fn get_tuple_3_mixed(self: @ContractState) -> (felt252, u256, bool) {
            self.mapping_tuple_3_mixed.read(0)
        }

        fn get_tuple_4_mixed(self: @ContractState) -> (ContractAddress, felt252, u128, u8) {
            self.mapping_tuple_4_mixed.read(0)
        }

        fn get_tuple_with_byte_array(self: @ContractState) -> (ByteArray, felt252, u256) {
            self.mapping_tuple_with_byte_array.read(0)
        }

        fn get_tuple_with_struct_element(self: @ContractState) -> (u256, SampleStruct) {
            self.mapping_tuple_with_struct_element.read(0)
        }

        fn get_nested_tuple(self: @ContractState) -> ((u256, u256), (felt252, u256, bool)) {
            self.mapping_nested_tuple.read(0)
        }

        // Getters with values
        fn get_tuple_2_u256_with_value(self: @ContractState, value: (u256, u256)) -> (u256, u256) {
            value
        }

        fn get_tuple_3_mixed_with_value(
            self: @ContractState, value: (felt252, u256, bool)
        ) -> (felt252, u256, bool) {
            value
        }

        fn get_tuple_4_mixed_with_value(
            self: @ContractState, value: (ContractAddress, felt252, u128, u8)
        ) -> (ContractAddress, felt252, u128, u8) {
            value
        }

        fn get_tuple_with_byte_array_with_value(
            self: @ContractState, value: (ByteArray, felt252, u256)
        ) -> (ByteArray, felt252, u256) {
            value
        }

        fn get_tuple_with_struct_element_with_value(
            self: @ContractState, value: (u256, SampleStruct)
        ) -> (u256, SampleStruct) {
            value
        }

        fn get_nested_tuple_with_value(
            self: @ContractState, value: ((u256, u256), (felt252, u256, bool))
        ) -> ((u256, u256), (felt252, u256, bool)) {
            value
        }


        // Getters with keys
        fn get_tuple_2_u256_with_key(self: @ContractState, key: felt252) -> (u256, u256) {
            self.mapping_tuple_2_u256.read(key)
        }

        fn get_tuple_3_mixed_with_key(self: @ContractState, key: felt252) -> (felt252, u256, bool) {
            self.mapping_tuple_3_mixed.read(key)
        }

        fn get_tuple_4_mixed_with_key(
            self: @ContractState, key: felt252
        ) -> (ContractAddress, felt252, u128, u8) {
            self.mapping_tuple_4_mixed.read(key)
        }

        fn get_tuple_with_byte_array_with_key(
            self: @ContractState, key: felt252
        ) -> (ByteArray, felt252, u256) {
            self.mapping_tuple_with_byte_array.read(key)
        }

        fn get_tuple_with_struct_element_with_key(
            self: @ContractState, key: felt252
        ) -> (u256, SampleStruct) {
            self.mapping_tuple_with_struct_element.read(key)
        }

        fn get_nested_tuple_with_key(
            self: @ContractState, key: felt252
        ) -> ((u256, u256), (felt252, u256, bool)) {
            self.mapping_nested_tuple.read(key)
        }

        // Setters
        fn set_tuple_2_u256_with_key(ref self: ContractState, key: felt252, value: (u256, u256)) {
            self.mapping_tuple_2_u256.write(key, value);
        }

        fn set_tuple_3_mixed_with_key(
            ref self: ContractState, key: felt252, value: (felt252, u256, bool)
        ) {
            self.mapping_tuple_3_mixed.write(key, value);
        }

        fn set_tuple_4_mixed_with_key(
            ref self: ContractState, key: felt252, value: (ContractAddress, felt252, u128, u8)
        ) {
            self.mapping_tuple_4_mixed.write(key, value);
        }

        fn set_tuple_with_byte_array_with_key(
            ref self: ContractState, key: felt252, value: (ByteArray, felt252, u256)
        ) {
            self.mapping_tuple_with_byte_array.write(key, value);
        }

        fn set_tuple_with_struct_element_with_key(
            ref self: ContractState, key: felt252, value: (u256, SampleStruct)
        ) {
            self.mapping_tuple_with_struct_element.write(key, value);
        }

        fn set_nested_tuple_with_key(
            ref self: ContractState, key: felt252, value: ((u256, u256), (felt252, u256, bool))
        ) {
            self.mapping_nested_tuple.write(key, value);
        }
    }
}
