import { useMemo, useState } from "react";
import usePresaleContract from "./usePresaleContract";

const useCanClaim = () => {
  const [canClaim, setCanClaim] = useState(false);
  const contract = usePresaleContract();

  useMemo(() => {
    const fetchCanClaim = async () => {
      if (contract) {
        const canClaim = await contract.canClaim();
        setCanClaim(canClaim);
      }
    };

    if (contract) {
      fetchCanClaim();
    }
  }, [contract, setCanClaim]);

  return canClaim;
};

export default useCanClaim;
