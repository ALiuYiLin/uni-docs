import { useMemo } from "react";
import { ActivityStatus, TeamTag } from "../types";
import { ActivityResolved } from "./useBase";
import dayjs from "dayjs";
import { Checkbox, Flex } from "antd";
import { ActivityStatusMap, TeamTagMap } from "../map";

// 按生命周期计算当前状态
function getStatus(now: string, t: ActivityResolved): ActivityStatus {
  if (!now || !t) return null;
  if (dayjs(now).valueOf() < dayjs(t.start).valueOf())
    return ActivityStatus.Pending;
  if (
    dayjs(now).valueOf() >= dayjs(t.start).valueOf() &&
    dayjs(now).valueOf() < dayjs(t.voteEnd).valueOf()
  )
    return ActivityStatus.Voting;
  if (
    dayjs(now).valueOf() >= dayjs(t.voteEnd).valueOf() &&
    dayjs(now).valueOf() < dayjs(t.matchStart).valueOf()
  )
    return ActivityStatus.PreMatch;
  if (
    dayjs(now).valueOf() >= dayjs(t.matchStart).valueOf() &&
    dayjs(now).valueOf() < dayjs(t.end).valueOf()
  )
    return t.matchEnd ? ActivityStatus.Publicizing : ActivityStatus.Matching;
  return ActivityStatus.Ended;
}

// 时间顺序约束（布尔结束标记不参与顺序校验）
function isOrderValid(t: ActivityResolved) {
  if (!t) return null;
  const s = new Date(t.start).getTime();
  const v = new Date(t.voteEnd).getTime();
  const m = new Date(t.matchStart).getTime();
  const e = new Date(t.end).getTime();

  return s < v && v <= m && m < e;
}

export function useDerived(
  start: string,
  voteEnd: string,
  matchStart: string,
  matchEnd: boolean,
  end: string,
  now: string,
  selectedTeam: TeamTag,
  advantageTeam: TeamTag
) {
  const orderOk = useMemo(
    () => isOrderValid({ start, voteEnd, matchStart, matchEnd, end }),
    [start, voteEnd, matchStart, matchEnd, end]
  );
  const status = useMemo(
    () => getStatus(now, { start, voteEnd, matchStart, matchEnd, end }),
    [now, start, voteEnd, matchStart, matchEnd, end]
  );
  function ActivityDerivedUI() {
    return (
      <>
        <Flex gap={16}>
          <Flex gap={"small"}>
            <label>时间顺序是否正确</label>
            <Checkbox checked={!!orderOk}></Checkbox>
          </Flex>
          <Flex gap={"small"}>
            <label>当前状态:</label>
            <span>[{ActivityStatusMap[status]}]</span>
          </Flex>
          <Flex gap={"small"}>
            <label>是否投票</label>
            <Checkbox checked={!!selectedTeam}></Checkbox>
          </Flex>
        </Flex>
      </>
    );
  }
  return { status, orderOk, ActivityDerivedUI };
}
