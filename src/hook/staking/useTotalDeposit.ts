import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useStakingContract from "./useStakingContract";
import useLastUpdated from "../useLastUpdated";

const useTotalDeposit = () => {
  const { active, account } = useWeb3React();
  const [totalDeposit, setTotalDeposit] = useState(BigNumber.from("0"));
  const contract = useStakingContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();
  useEffect(() => {
    const fetchTotalDepositInfo = async () => {
      if (contract && active && account) {
        const totalDeposit = await contract.totalDeposit();
        setTotalDeposit(totalDeposit);
      }
    };

    if (contract && active && account) {
      fetchTotalDepositInfo();
    }
  }, [contract, account, active, lastUpdated]);

  return { totalDeposit, refreshUserInfo: setLastUpdated };
};

export default useTotalDeposit;
