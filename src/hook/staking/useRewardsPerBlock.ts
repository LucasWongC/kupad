import { useEffect, useState, useCallback } from "react";
import { BigNumber } from "ethers";
import useStakingContract from "./useStakingContract";
import useLastUpdated from "../useLastUpdated";

const useRewardsPerBlock = () => {
  const [rewardsPerBlock, setRewardsPerBlock] = useState(BigNumber.from("0"));
  const contract = useStakingContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  const fetchRewardsPerBlockInfo = useCallback(async () => {
    if (contract) {
      const rewardsPerBlock = await contract.rewardPerBlock();
      setRewardsPerBlock(rewardsPerBlock);
    }
  }, [contract]);
  useEffect(() => {
    if (contract) {
      fetchRewardsPerBlockInfo();
    }
  }, [contract, lastUpdated, setRewardsPerBlock, fetchRewardsPerBlockInfo]);

  return { rewardsPerBlock, refreshUserInfo: setLastUpdated };
};

export default useRewardsPerBlock;
