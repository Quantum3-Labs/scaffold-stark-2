"use client";

// @refresh reset
import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-stark";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-stark";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Address } from "@starknet-react/chains";
import { useEffect, useState } from "react";
import ConnectModal from "./ConnectModal";

/**
 * Custom Connect Button (watch balance + custom design)
 */
export const CustomConnectButton = () => {
  useAutoConnect();
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();
  const { account, status } = useAccount();
  const [accountChainId, setAccountChainId] = useState<bigint>(0n);
  const [accountAddress, setAccountAddress] = useState<Address>();
  const { chain } = useNetwork();
  const [modalOpen, setModalOpen] = useState(false);

  const blockExplorerAddressLink = accountAddress
    ? getBlockExplorerAddressLink(targetNetwork, accountAddress)
    : undefined;

  const handleWalletConnect = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (account) {
      const getChainId = async () => {
        const chainId = await account.channel.getChainId();
        setAccountChainId(BigInt(chainId as string));
        const address = account.address;
        setAccountAddress(address as Address);
      };

      getChainId();
    }
  }, [account]);

  return status == "disconnected" ? (
    <>
      <button
        className={`rounded-[18px] btn-sm font-bold px-8 bg-btn-wallet`}
        onClick={handleWalletConnect}
        type="button"
      >
        Connect
      </button>
      <ConnectModal isOpen={modalOpen} onClose={handleModalClose} />
    </>
  ) : accountChainId != targetNetwork.id ? (
    <WrongNetworkDropdown />
  ) : (
    <>
      <div className="flex flex-col items-center mr-1">
        <Balance
          address={accountAddress as Address}
          className="min-h-0 h-auto"
        />
        <span className="text-xs" style={{ color: networkColor }}>
          {chain.name}
        </span>
      </div>
      <AddressInfoDropdown
        address={accountAddress as Address}
        displayName={""}
        ensAvatar={""}
        blockExplorerAddressLink={blockExplorerAddressLink}
      />
      <AddressQRCodeModal
        address={accountAddress as Address}
        modalId="qrcode-modal"
      />
    </>
  );
};
