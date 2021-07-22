import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import getLibrary from "../utils/getLibrary";

import { NetworkConnector } from "./NetworkConnector";

export const NETWORK_URLS: {
  [chainId: number]: string;
} = {
  321: "https://rpc-mainnet.kcc.network",
};

const SUPPORTED_CHAIN_IDS = [321];
const POLLING_INTERVAL = 12000;

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 321,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  if (!networkLibrary) {
    networkLibrary = getLibrary(network.provider);
  }
  return networkLibrary;
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

export const walletconnect = new WalletConnectConnector({
  rpc: NETWORK_URLS,
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
