import { useState, useRef, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { DefaultNetwork } from "constants/misc";
import { NETWORK_URLS } from "connectors";

const useSigner = () => {
  const { library, account, active } = useWeb3React();
  const refEth = useRef(library);
  const [signer, setSigner] = useState<ethers.Signer | undefined>();
  const [provider, setProvider] = useState<
    ethers.providers.JsonRpcProvider | undefined
  >();

  useEffect(() => {
    if (account && active) {
      if (library !== refEth.current) {
        const _signer = library.getSigner(account).connectUnchecked();
        setSigner(_signer);
        refEth.current = library;
      }
    } else {
      setProvider(
        new ethers.providers.JsonRpcProvider(
          NETWORK_URLS[DefaultNetwork],
          DefaultNetwork
        )
      );
    }
  }, [library, account, active]);

  return {
    signer,
    provider,
  };
};

export default useSigner;
