import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import usePresaleContract from "./usePresaleContract";
import useLastUpdated from "./useLastUpdated";

const useInvested = () => {
  const { active, account } = useWeb3React();
  const [invested, setInvested] = useState(BigNumber.from("0"));
  const contract = usePresaleContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    const fetchInvested = async () => {
      if (contract && account && active) {
        const invested = await contract.invested(account);
        setInvested(invested);
      }
    };

    if (contract && account && active) {
      fetchInvested();
    }
  }, [contract, setInvested, account, active, lastUpdated]);

  return { invested, refreshInvested: setLastUpdated };
};

export default useInvested;
