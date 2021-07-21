import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useStakingContract from "./useStakingContract";
import useLastUpdated from "../useLastUpdated";

const useUserInfo = () => {
  const { active, account } = useWeb3React();
  const [userInfo, setUserInfo] = useState<any>();
  const contract = useStakingContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (contract && active && account) {
        const userInfo = await contract.userInfo(account);
        setUserInfo(userInfo);
      }
    };

    if (contract && active && account) {
      fetchUserInfo();
    }
  }, [contract, setUserInfo, account, active, lastUpdated]);

  return { userInfo, refreshUserInfo: setLastUpdated };
};

export default useUserInfo;
