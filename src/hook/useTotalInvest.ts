import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import usePresaleContract from "./usePresaleContract";
import useLastUpdated from "./useLastUpdated";

const useTotalInvest = () => {
  const [totalInvest, setTotalInvest] = useState(BigNumber.from("0"));
  const contract = usePresaleContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    const fetchTotalInvest = async () => {
      if (contract) {
        const totalInvested = await contract.totalInvested();
        setTotalInvest(totalInvested);
      }
    };

    if (contract) {
      fetchTotalInvest();
    }
  }, [contract, setTotalInvest, lastUpdated]);

  return { totalInvest, refreshTotalInvest: setLastUpdated };
};

export default useTotalInvest;
