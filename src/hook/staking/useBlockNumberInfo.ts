import { useEffect, useState, useCallback } from "react";
import { BigNumber } from "ethers";
import Web3 from "web3";
import useStakingContract from "./useStakingContract";
import useLastUpdated from "../useLastUpdated";

const useBlockNumberInfo = () => {
  const [blockNumber, setBlockNumber] = useState(0);
  const contract = useStakingContract();
  const { lastUpdated, setLastUpdated } = useLastUpdated();
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc-mainnet.kcc.network")
  );

  const fetchBlockNumber = useCallback(async () => {
    if (contract) {
      const blockNumber = await web3.eth.getBlockNumber();
      setBlockNumber(blockNumber);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      fetchBlockNumber();
    }
  }, [contract, fetchBlockNumber, lastUpdated, setBlockNumber]);

  return { blockNumber, refreshIsFinished: setLastUpdated };
};

export default useBlockNumberInfo;
