import { useMemo, useCallback } from "react";
import { ActivityStatus } from "../types";
import { ActivityResolved } from "./useBase";

// 按生命周期计算当前状态
function getStatus(now: Date, t: ActivityResolved): ActivityStatus {
  if (now < t.start) return ActivityStatus.Pending;
  if (now >= t.start && now < t.voteEnd) return ActivityStatus.Voting;
  if (now >= t.voteEnd && now < t.matchStart) return ActivityStatus.PreMatch;
  if (now >= t.matchStart && now < t.end)
    return t.matchEnd ? ActivityStatus.Publicizing : ActivityStatus.Matching;
  return ActivityStatus.Ended;
}

// 时间顺序约束（布尔结束标记不参与顺序校验）
function isOrderValid(t: ActivityResolved) {
  return (
    t.start.getTime() < t.voteEnd.getTime() &&
    t.voteEnd.getTime() <= t.matchStart.getTime() &&
    t.matchStart.getTime() < t.end.getTime()
  );
}

export function useDerived(times: ActivityResolved, now: Date) {
  const status = getStatus(now, times);
  const orderOk = isOrderValid(times);

  const canVote = useMemo(() => {
    if (status === ActivityStatus.Voting) {
      return true;
    }
    return false;
  }, [status]);

  const totalMs = times.end.getTime() - times.start.getTime();
  const pctOf = useCallback(
    (d: Date) =>
      Math.max(0, Math.min(1, (d.getTime() - times.start.getTime()) / totalMs)),
    [times.start, totalMs]
  );

  return { status, orderOk, canVote, totalMs, pctOf };
}
