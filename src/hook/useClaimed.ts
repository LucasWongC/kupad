import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import usePresaleContract from "./usePresaleContract";
import useLastUpdated from "./useLastUpdated";

const useClaimed = () => {
  const { active, account } = useWeb3React();
  const [claimed, setClaimed] = useState(false);
  const contract = usePresaleContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    const fetchClaimed = async () => {
      if (contract && account && active) {
        const claimed = await contract.claimed(account);
        setClaimed(claimed);
      }
    };

    if (contract && account && active) {
      fetchClaimed();
    }
  }, [contract, setClaimed, account, active, lastUpdated]);

  return { claimed, refreshClaimed: setLastUpdated };
};

export default useClaimed;
