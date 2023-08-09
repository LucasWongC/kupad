import { useCallback, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Modal } from "components";
import { injected } from "connectors";
import { SUPPORTED_WALLETS } from "constants/wallet";
import CloseIcon from "assets/icons/CloseIcon.svg";
import ArrowRight from "assets/images/white-arrow-right.svg";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

const ConnectWalletModal = ({ isOpen, onDismiss }: Props) => {
  const { connector, activate } = useWeb3React();

  const [pendingError, setPendingError] = useState<boolean>();

  const addNetwork = () => {
    if (window.ethereum) {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x141",
            chainName: "KCC-MAINNET",
            nativeCurrency: "KCS",
            rpcUrls: ["https://rpc-mainnet.kcc.network"],
            blockExplorerUrls: ["https://explorer.kcc.io/en"],
          },
        ],
      });
    }
  };

  const tryActivation = useCallback(
    async (connector: AbstractConnector | undefined) => {
      let name = "";
      Object.keys(SUPPORTED_WALLETS).map((key) => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          name = SUPPORTED_WALLETS[key].name;
          return true;
        }
        return true;
      });

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.connector?.uri
      ) {
        // eslint-disable-next-line no-param-reassign
        connector.walletConnectProvider = undefined;
      }

      if (connector) {
        activate(connector, undefined, true).catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector); // a little janky...can't use setError because the connector isn't set
          } else {
            setPendingError(true);
          }
        });
      }
    },
    [activate]
  );

  const getOptions = useCallback(() => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === "MetaMask") {
            return (
              <a
                className="wallet-item"
                href="https://metamask.io/"
                target="__blank"
              >
                <span>Install Metamask</span>
                <div className="logo">
                  <img src={option.iconURL} alt={option.name} />
                </div>
              </a>
            );
          }
          return null; // dont want to return install twice
        }
        // don't return metamask if injected provider isn't metamask
        if (option.name === "MetaMask" && !isMetamask) {
          return null;
        }
        // likewise for generic
        if (option.name === "Injected" && isMetamask) {
          return null;
        }
      }

      return (
        <button
          className="wallet-item"
          onClick={() => {
            tryActivation(option.connector);
            onDismiss();
          }}
          key={key}
        >
          <span>{option.name}</span>
          <div className="logo">
            <img src={option.iconURL} alt={option.name} />
          </div>
        </button>
      );
    });
  }, [connector, onDismiss, tryActivation]);

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
      <div className="kpd-connect-modal">
        <div className="header">
          <span className="title">Connect to a Wallet</span>
          <button className="btn-close" onClick={onDismiss}>
            <img src={CloseIcon} alt="close" />
          </button>
        </div>

        {getOptions()}
        {window.ethereum && (
          <>
            <button className="add-kcs-network" onClick={addNetwork}>
              Add KCS Network
            </button>
            <a
              href="https://lasercrypt.medium.com/setting-up-kucoin-on-metamask-87b0c13ef685"
              target="__blank"
              className="add-kcs-network-manually"
            >
              <img src={ArrowRight} alt="close" />
              Add KCS Network (manually)
            </a>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
