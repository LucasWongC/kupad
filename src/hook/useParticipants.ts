import { useMemo, useState } from "react";
import usePresaleContract from "./usePresaleContract";

const useParticipants = () => {
  const [participants, setParticipants] = useState(0);
  const contract = usePresaleContract();

  useMemo(() => {
    const fetchParticipants = async () => {
      if (contract) {
        const participants = (await contract.participants()).toNumber();
        setParticipants(participants);
      }
    };

    if (contract) {
      fetchParticipants();
    }
  }, [contract, setParticipants]);

  return participants;
};

export default useParticipants;
