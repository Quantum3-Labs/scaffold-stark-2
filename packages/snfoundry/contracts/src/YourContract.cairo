use starknet::ContractAddress;

#[starknet::interface]
pub trait IYourContract<TContractState> {
    fn gretting(self: @TContractState) -> ByteArray;
    fn set_gretting(ref self: TContractState, new_greeting: ByteArray, amount_eth: u256);
    fn withdraw(ref self: TContractState);
    fn premium(self: @TContractState) -> bool;
}

#[starknet::contract]
mod YourContract {
    use openzeppelin::access::ownable::ownable::OwnableComponent::InternalTrait;
    use super::{ContractAddress, IYourContract};
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::token::erc20::interface::{IERC20CamelDispatcher, IERC20CamelDispatcherTrait};

    use starknet::{get_caller_address, get_contract_address};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        GreetingChanged: GreetingChanged
    }

    #[derive(Drop, starknet::Event)]
    struct GreetingChanged {
        #[key]
        greeting_setter: ContractAddress,
        // #[key]
        // new_greeting: ByteArray,
        premium: bool,
        value: u256,
    }


    #[storage]
    struct Storage {
        eth_token: IERC20CamelDispatcher,
        greeting: ByteArray,
        premium: bool,
        total_counter: u256,
        user_gretting_counter: LegacyMap<ContractAddress, u256>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.greeting.write("Building Unstoppable Apps!!!");
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl YourContractImpl of IYourContract<ContractState> {
        fn gretting(self: @ContractState) -> ByteArray {
            self.greeting.read()
        }
        fn set_gretting(ref self: ContractState, new_greeting: ByteArray, amount_eth: u256) {
            self.greeting.write(new_greeting);
            self.total_counter.write(self.total_counter.read() + 1);
            let user_counter = self.user_gretting_counter.read(get_caller_address());
            self.user_gretting_counter.write(get_caller_address(), user_counter + 1);

            if amount_eth > 0 {
                // call approve on UI
                self
                    .eth_token
                    .read()
                    .transferFrom(get_caller_address(), get_contract_address(), amount_eth);
                self.premium.write(true);
            } else {
                self.premium.write(false);
            }
            self
                .emit(
                    GreetingChanged {
                        greeting_setter: get_caller_address(), //new_greeting: self.greeting.read(),
                        premium: true, value: 100
                    }
                );
        }
        fn withdraw(ref self: ContractState) {
            self.ownable.assert_only_owner();
            let balance = self.eth_token.read().balanceOf(get_contract_address());
            self.eth_token.read().transfer(self.ownable.owner(), balance);
        }
        fn premium(self: @ContractState) -> bool {
            self.premium.read()
        }
    }
}
