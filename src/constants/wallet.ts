import { AbstractConnector } from "@web3-react/abstract-connector";
import METAMASK_ICON_URL from "assets/icons/Metamask.svg";
import WALLETCONNECT_ICON_URL from "assets/icons/WalletConnect.svg";
import { injected, walletconnect } from "../connectors";

const INJECTED_ICON_URL = METAMASK_ICON_URL;

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconURL: string;
  href: string | null;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: "Injected",
    iconURL: INJECTED_ICON_URL,
    href: null,
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconURL: METAMASK_ICON_URL,
    href: null,
  },
  WALLETCONNECT: {
    connector: walletconnect,
    name: "Wallet Connect",
    iconURL: WALLETCONNECT_ICON_URL,
    href: null,
  },
};
