import { useState, useRef } from "react";

export function useUI() {
  const barRef = useRef<HTMLDivElement>(null);
  const [voted, setVoted] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [claimed, setClaimed] = useState(false);

  return { barRef, voted, setVoted, advanced, setAdvanced, claimed, setClaimed };
}
