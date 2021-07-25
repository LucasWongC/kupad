import { useEffect, useState, useCallback } from "react";
import { BigNumber } from "ethers";
import useStakingContract from "./useStakingContract";
import useLastUpdated from "../useLastUpdated";

const useLastUpdateBlock = () => {
  const [lastUpdateBlock, setLastUpdateBlock] = useState(BigNumber.from("0"));
  const contract = useStakingContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  const fetchLastUpdateNumber = useCallback(async () => {
    if (contract) {
      const lastUpdateBlock = await contract.lastUpdateBlock();
      setLastUpdateBlock(lastUpdateBlock);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      fetchLastUpdateNumber();
    }
  }, [
    contract,
    fetchLastUpdateNumber,
    lastUpdated,
    setLastUpdateBlock,
    lastUpdateBlock,
  ]);

  return { lastUpdateBlock, refreshIsFinished: setLastUpdated };
};

export default useLastUpdateBlock;
