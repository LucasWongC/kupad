import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useStakingContract from "./useStakingContract";
import useLastUpdated from "../useLastUpdated";

const useAccKupadPerShare = () => {
  const { active, account } = useWeb3React();
  const [accKupadPerShare, setAccKupadPerShare] = useState(BigNumber.from("0"));
  const contract = useStakingContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();
  useEffect(() => {
    const fetchAccKupadPerShareInfo = async () => {
      if (contract && active && account) {
        const accKupadPerShare = await contract.accKupadPerShare();
        setAccKupadPerShare(accKupadPerShare);
      }
    };

    if (contract && active && account) {
      fetchAccKupadPerShareInfo();
    }
  }, [contract, account, active, lastUpdated, setAccKupadPerShare]);

  return { accKupadPerShare, refreshUserInfo: setLastUpdated };
};

export default useAccKupadPerShare;
