import { useMemo, useState } from "react";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";
import useKupadTokenContract from "./useKupadTokenContract";
import useSigner from "../useSigner";

const useKupadBalance = () => {
  const { active, account } = useWeb3React();
  const kupadTokenContract = useKupadTokenContract();
  const [balance, setBalance] = useState(BigNumber.from("0"));
  useMemo(() => {
    const fetchBalance = async () => {
      if (account && kupadTokenContract && active) {
        const walletBalance = await kupadTokenContract.balanceOf(account);
        setBalance(walletBalance);
      }
    };

    if (account && kupadTokenContract && active) {
      fetchBalance();
    }
  }, [account, kupadTokenContract, active, setBalance]);

  return balance;
};

export default useKupadBalance;
