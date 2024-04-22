use starknet::ContractAddress;

#[starknet::interface]
trait IChallenge0<T> {
    fn mint_item(ref self: T, recipient: ContractAddress, uri: ByteArray) -> u256;
    fn token_id_counter(self: @T) -> u256;
    fn token_of_owner_by_index(self: @T, owner: ContractAddress, index: u256) -> u256;
    fn total_supply(self: @T) -> u32;
}
#[starknet::contract]
mod Challenge0 {
    use core::traits::TryInto;
    use core::traits::Into;
    use super::{IChallenge0, ContractAddress};
    use core::num::traits::zero::Zero;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::token::erc721::interface::IERC721Metadata;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);


    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;

    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        counter: u256,
        token_uris: LegacyMap<u256, ByteArray>,
        // Mapping from owner to list of owned token IDs
        owned_tokens: LegacyMap<(ContractAddress, u256), u256>,
        // Mapping from token ID to index of the owner tokens list
        owned_tokens_index: LegacyMap<u256, u256>,
        // Array with all token ids, used for enumeration
        all_tokens: Array<u256>,
        // Mapping from token id to position in the allTokens array
        all_tokens_index: LegacyMap<u256, u256>
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        let name: ByteArray = "YourCollectible";
        let symbol: ByteArray = "YCB";
        let base_uri: ByteArray = "https://ipfs.io/";

        self.erc721.initializer(name, symbol, base_uri);
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl WrappedIERC721MetadataImpl of IERC721Metadata<ContractState> {
        fn token_uri(self: @ContractState, token_id: u256) -> ByteArray {
            self._token_uri(token_id)
        }
        fn name(self: @ContractState) -> ByteArray {
            self.erc721.name()
        }
        fn symbol(self: @ContractState) -> ByteArray {
            self.erc721.symbol()
        }
    }

    #[abi(embed_v0)]
    impl Challenge0Impl of IChallenge0<ContractState> {
        fn mint_item(ref self: ContractState, recipient: ContractAddress, uri: ByteArray) -> u256 {
            self._increment();
            let token_id = self._current();
            self.erc721._mint(recipient, token_id);
            self._set_token_uri(token_id, uri);
            token_id
        }
        fn token_id_counter(self: @ContractState) -> u256 {
            self._current()
        }
        fn token_of_owner_by_index(
            self: @ContractState, owner: ContractAddress, index: u256
        ) -> u256 {
            assert(index < self.erc721.balance_of(owner), 'Owner index out of bounds');
            self.owned_tokens.read((owner, index))
        }
        fn total_supply(self: @ContractState) -> u32 {
            self.all_tokens.read().len()
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _increment(ref self: ContractState) {
            self.counter.write(self.counter.read() + 1);
        }

        fn _current(self: @ContractState) -> u256 {
            self.counter.read()
        }

        fn _token_uri(self: @ContractState, token_id: u256) -> ByteArray {
            assert(self.erc721._exists(token_id), ERC721Component::Errors::INVALID_TOKEN_ID);
            let base_uri = self.erc721._base_uri();
            let uri = self.token_uris.read(token_id);
            format!("{}{}", base_uri, uri)
        }

        fn _set_token_uri(ref self: ContractState, token_id: u256, uri: ByteArray) {
            self.token_uris.write(token_id, uri);
        }

        fn _add_token_to_owner_enumeration(
            ref self: ContractState, recipient: ContractAddress, token_id: u256
        ) {
            let length = self.erc721.balance_of(recipient);
            self.owned_tokens.write((recipient, length), token_id);
            self.owned_tokens_index.write(token_id, length);
        }

        fn _remove_token_from_owner_enumeration(
            ref self: ContractState, from: ContractAddress, token_id: u256
        ) {
            // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
            // then delete the last slot (swap and pop).
            let last_token_index = self.erc721.balance_of(from) - 1;
            let token_index = self.owned_tokens_index.read(token_id);

            // When the token to delete is the last token, the swap operation is unnecessary
            if (token_index != last_token_index) {
                let last_token_id = self.owned_tokens.read((from, last_token_index));
                // Move the last token to the slot of the to-delete token
                self.owned_tokens.write((from, token_index), last_token_id);
                // Update the moved token's index
                self.owned_tokens_index.write(last_token_id, token_index);
            }

            // Clear the last slot
            self.owned_tokens.write((from, last_token_index), 0);
            self.owned_tokens_index.write(token_id, 0);
        }

        // ToDo: handle array limitations
        // fn _remove_token_from_all_tokens_enumeration(ref self: ContractState, token_id: u256) {
        //     let last_token_index: u256 = (self.all_tokens.read().len() - 1).into();
        //     let token_index = self.all_tokens_index.read(token_id);

        //     let last_token_id = *self.all_tokens.read().at(last_token_index.try_into().unwrap());

        //     self.all_tokens.write(token_index, last_token_id);
        //     self.all_tokens_index.write(last_token_id, token_index);

        //     self.all_tokens.write(last_token_index, 0);
        //     self.all_tokens_index.write(token_id, 0);
        // }

        fn _add_token_to_all_tokens_enumeration(ref self: ContractState, token_id: u256) {
            let length: u256 = self.all_tokens.read().len().into();
            self.all_tokens_index.write(token_id, length);
        }

        fn _before_token_transfer(
            ref self: ContractState,
            from: ContractAddress,
            to: ContractAddress,
            first_token_id: u256,
            batch_size: u256
        ) {
            assert(batch_size <= 1, 'Consecutive transfers error');
            if (from == Zero::zero()) {
                self._add_token_to_all_tokens_enumeration(first_token_id);
            } else if (from != to) {
                self._remove_token_from_owner_enumeration(from, first_token_id);
            }
            if (to == Zero::zero()) {//self._remove_token_from_all_tokens_enumeration(first_token_id);
            } else if (to != from) {
                self._add_token_to_owner_enumeration(to, first_token_id);
            }
        }
    }
}
