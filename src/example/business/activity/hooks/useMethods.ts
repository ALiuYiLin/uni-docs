import { useCallback } from "react";
import { ActivityResolved } from "./useBase";

export function useMethods(
  times: ActivityResolved,
  setTimes: React.Dispatch<React.SetStateAction<ActivityResolved>>,
  setNow: React.Dispatch<React.SetStateAction<Date>>,
  barRef: React.RefObject<HTMLDivElement>,
  totalMs: number
) {
  const gap = 60 * 1000;

  const startDrag = useCallback(
    (onChange: (ms: number) => void) => (e: React.MouseEvent) => {
      e.preventDefault();
      const rect = barRef.current?.getBoundingClientRect();
      if (!rect) return;
      const onMove = (ev: MouseEvent) => {
        const x = Math.max(0, Math.min(rect.width, ev.clientX - rect.left));
        const pct = x / rect.width;
        const ms = times.start.getTime() + pct * totalMs;
        onChange(ms);
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [times.start, totalMs, barRef]
  );

  const setStartMs = useCallback(
    (ms: number) =>
      setTimes((prev) => {
        const start = Math.min(ms, prev.voteEnd.getTime() - gap);
        return { ...prev, start: new Date(start) };
      }),
    [setTimes, gap]
  );

  const setVoteEndMs = useCallback(
    (ms: number) =>
      setTimes((prev) => {
        const voteEnd = Math.max(
          prev.start.getTime() + gap,
          Math.min(ms, prev.matchStart.getTime())
        );
        return { ...prev, voteEnd: new Date(voteEnd) };
      }),
    [setTimes, gap]
  );

  const setMatchStartMs = useCallback(
    (ms: number) =>
      setTimes((prev) => {
        const matchStart = Math.max(
          prev.voteEnd.getTime(),
          Math.min(ms, prev.end.getTime() - gap)
        );
        return { ...prev, matchStart: new Date(matchStart) };
      }),
    [setTimes, gap]
  );

  const setEndMs = useCallback(
    (ms: number) =>
      setTimes((prev) => {
        const end = Math.max(prev.matchStart.getTime() + gap, ms);
        return { ...prev, end: new Date(end) };
      }),
    [setTimes, gap]
  );

  const setNowMs = useCallback(
    (ms: number) =>
      setNow(
        new Date(
          Math.max(times.start.getTime(), Math.min(ms, times.end.getTime()))
        )
      ),
    [times.start, times.end, setNow]
  );

  return {
    startDrag,
    setStartMs,
    setVoteEndMs,
    setMatchStartMs,
    setEndMs,
    setNowMs,
  };
}
