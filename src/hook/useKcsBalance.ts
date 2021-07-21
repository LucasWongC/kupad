import { useMemo, useState } from "react";
import { BigNumber } from "ethers";
import useSigner from "./useSigner";

const useKcsBalance = () => {
  const [balance, setBalance] = useState(BigNumber.from("0"));
  const signer = useSigner();

  useMemo(() => {
    const fetchBalance = async () => {
      if (signer.signer) {
        const walletBalance = await signer.signer.getBalance();
        setBalance(walletBalance);
      }
    };

    if (signer) {
      fetchBalance();
    }
  }, [signer, setBalance]);

  return balance;
};

export default useKcsBalance;
