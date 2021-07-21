import { useMemo, useState } from "react";
import { ethers } from "ethers";
import { stakingAddress } from "constants/misc";
import useSigner from "../useSigner";

const abi = require("constants/abi/KupadStaking.json");

const useStakingContract = (): ethers.Contract | undefined => {
  const { signer, provider } = useSigner();
  const [contract, setContract] = useState<ethers.Contract | undefined>();

  useMemo(() => {
    if (signer ?? provider) {
      const contract = new ethers.Contract(
        stakingAddress,
        abi,
        signer ?? provider
      );
      setContract(contract);
    }
  }, [signer, provider]);

  return contract;
};

export default useStakingContract;
