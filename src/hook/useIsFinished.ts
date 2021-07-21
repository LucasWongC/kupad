import { useEffect, useCallback, useState } from "react";
import usePresaleContract from "./usePresaleContract";
import useLastUpdated from "./useLastUpdated";

const useIsFinished = () => {
  const [isFinished, setIsFinished] = useState(false);
  const contract = usePresaleContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  const fetchIsFinished = useCallback(async () => {
    if (contract) {
      const isFinished = await contract.isFinished();
      setIsFinished(isFinished);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      fetchIsFinished();
    }
  }, [contract, fetchIsFinished, lastUpdated]);

  return { isFinished, refreshIsFinished: setLastUpdated };
};

export default useIsFinished;
