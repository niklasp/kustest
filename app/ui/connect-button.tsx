"use client";

import { FC, Key, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import { encodeAddress } from "@polkadot/util-crypto";
import {
  SubstrateWalletPlatform,
  allSubstrateWallets,
  isWalletInstalled,
  useBalance,
  useInkathon,
} from "@scio-labs/use-inkathon";
import { ArrowUpRight, CheckCircle, ChevronDown } from "lucide-react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { trimAddress } from "../util";
import Identicon from "@polkadot/react-identicon";
import { useRouter } from "next/navigation";
import UseCases from "@w3f/polkadot-icons/keyline/UseCases";
import { Button } from "@nextui-org/button";

export interface ConnectButtonProps {
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export const ConnectButton: FC<ConnectButtonProps> = ({ size }) => {
  const {
    activeChain,
    connect,
    disconnect,
    isConnecting,
    activeAccount,
    accounts,
    setActiveAccount,
    switchActiveChain,
  } = useInkathon();

  // Sort installed wallets first
  const [browserWallets] = useState([
    ...allSubstrateWallets.filter(
      (w) =>
        w.platforms.includes(SubstrateWalletPlatform.Browser) &&
        isWalletInstalled(w)
    ),
    ...allSubstrateWallets.filter(
      (w) =>
        w.platforms.includes(SubstrateWalletPlatform.Browser) &&
        !isWalletInstalled(w)
    ),
  ]);

  //   const router = useRouter();
  const handleChange = (key: Key) => {
    setActiveAccount?.(accounts?.find((acc) => acc.address === key));
  };

  // Connect Button
  if (!activeAccount)
    return (
      <Dropdown
        classNames={{
          content:
            "border-3 border-white bg-gradient-to-r from-[#105b5d] to-[#9a1c54]",
        }}
      >
        <DropdownTrigger>
          <Button
            variant="flat"
            size="lg"
            className="p-7 bg-transparent max-w-[300px] border-2 border-white"
            isLoading={isConnecting}
            isDisabled={isConnecting}
          >
            Connect Wallet
            <ChevronDown size={16} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="min-w-[14rem]"
          variant="bordered"
          aria-label="WalletSelect"
          classNames={{ base: "w-[250px]" }}
        >
          <DropdownSection>
            {!activeAccount &&
              browserWallets.map((w) =>
                isWalletInstalled(w) ? (
                  <DropdownItem
                    key={w.id}
                    className="cursor-pointer"
                    onClick={() => {
                      connect?.(undefined, w);
                    }}
                  >
                    {w.name}
                  </DropdownItem>
                ) : (
                  <DropdownItem key={w.id} className="opacity-50">
                    <Link href={w.urls.website}>
                      <div className="align-center flex justify-start gap-2">
                        <p>{w.name}</p>
                        <ArrowUpRight />
                      </div>
                      <p>Not installed</p>
                    </Link>
                  </DropdownItem>
                )
              )}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );

  // Account Menu & Disconnect Button
  return (
    <div className="flex select-none flex-wrap items-stretch justify-center gap-4">
      <Dropdown
        classNames={{
          content:
            "border-3 border-white bg-gradient-to-r from-[#105b5d] to-[#9a1c54]",
        }}
      >
        <DropdownTrigger>
          <Button
            variant="flat"
            size="lg"
            className="p-7 bg-transparent max-w-[300px] border-white"
          >
            <span className="truncate text-sm sm:flex hidden">
              {activeAccount.name || trimAddress(activeAccount?.address)}
            </span>
            <Identicon
              value={activeAccount?.address}
              size={45}
              theme="polkadot"
              className="hover:cursor-pointer"
              // prefix={ss58Prefix}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="bordered"
          aria-label="Account Select"
          onAction={handleChange}
          classNames={{ base: "w-[250px]" }}
        >
          <DropdownSection
            title="Accounts"
            showDivider
            className="max-h"
            classNames={{
              group: "max-h-72 overflow-y-scroll",
            }}
          >
            {accounts ? (
              accounts?.map((account) => (
                <DropdownItem
                  key={account.address}
                  value={account.address}
                  description={trimAddress(
                    encodeAddress(account.address, activeChain?.ss58Prefix)
                  )}
                  startContent={
                    <Identicon
                      value={account.address}
                      size={40}
                      theme="polkadot"
                      className="hover:cursor-pointer"
                    />
                  }
                  aria-label={account.address}
                  className="hover:bg-default-100"
                >
                  <span className="truncate text-xs">
                    {account?.name ||
                      trimAddress(
                        encodeAddress(account.address, activeChain?.ss58Prefix)
                      )}
                  </span>
                </DropdownItem>
              ))
            ) : (
              <></>
            )}
          </DropdownSection>
          <DropdownSection title="Actions">
            <DropdownItem
              startContent={
                <UseCases width={20} height={20} stroke="currentColor" />
              }
              key={"logout"}
              value={"logout"}
              aria-label={"logout"}
              onClick={disconnect}
              className="hover:bg-default-100"
            >
              Logout
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export interface AccountNameProps {
  account: InjectedAccount;
}

export const AccountName: FC<AccountNameProps> = ({ account, ...rest }) => {
  return <div>{account.name}</div>;
};