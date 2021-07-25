import { useEffect, useState, useCallback } from "react";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useStakingContract from "./useStakingContract";
import useLastUpdated from "../useLastUpdated";

const useTotalDeposit = () => {
  const [totalDeposit, setTotalDeposit] = useState(BigNumber.from("0"));
  const contract = useStakingContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  const fetchTotalDepositInfo = useCallback(async () => {
    if (contract) {
      const totalDeposit = await contract.totalDeposit();
      setTotalDeposit(totalDeposit);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      fetchTotalDepositInfo();
    }
  }, [contract, lastUpdated, fetchTotalDepositInfo, totalDeposit]);

  return { totalDeposit, refreshUserInfo: setLastUpdated };
};

export default useTotalDeposit;
