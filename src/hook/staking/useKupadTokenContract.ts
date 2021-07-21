import { useMemo, useState } from "react";
import { ethers } from "ethers";
import { kupadTokenAddress } from "constants/misc";
import useSigner from "../useSigner";

const abi = require("constants/abi/KupadToken.json");

const useKupadTokenContract = (): ethers.Contract | undefined => {
  const { signer, provider } = useSigner();
  const [contract, setContract] = useState<ethers.Contract | undefined>();

  useMemo(() => {
    if (signer ?? provider) {
      const contract = new ethers.Contract(
        kupadTokenAddress,
        abi,
        signer ?? provider
      );
      setContract(contract);
    }
  }, [signer, provider]);

  return contract;
};

export default useKupadTokenContract;
