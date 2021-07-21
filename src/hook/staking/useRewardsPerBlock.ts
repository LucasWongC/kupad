import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useStakingContract from "./useStakingContract";
import useLastUpdated from "../useLastUpdated";

const useRewardsPerBlock = () => {
  const { active, account } = useWeb3React();
  const [rewardsPerBlock, setRewardsPerBlock] = useState(BigNumber.from("0"));
  const contract = useStakingContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();
  useEffect(() => {
    const fetchRewardsPerBlockInfo = async () => {
      if (contract && active && account) {
        const rewardsPerBlock = await contract.rewardPerBlock();
        setRewardsPerBlock(rewardsPerBlock);
      }
    };

    if (contract && active && account) {
      fetchRewardsPerBlockInfo();
    }
  }, [contract, account, active, lastUpdated]);

  return { rewardsPerBlock, refreshUserInfo: setLastUpdated };
};

export default useRewardsPerBlock;
