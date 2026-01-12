import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ActivityStatus, TeamTag } from "../types";
import dayjs from "dayjs";
import { Col, Flex } from "antd";
import { DerivedDisplay } from "./derived-display";

export type DerivedProps = {
  isCountdownOpen: boolean;

  start: string;
  voteEnd: string;
  matchStart: string;
  end: string;

  selectedTeam: TeamTag;
  advantageTeam: TeamTag;
  receivedReward: boolean;


};

type ActivityTimes = {
  now: string;
  start: string;
  voteEnd: string;
  matchStart: string;
  matchEnd: boolean;
  end: string;
};

// 按生命周期计算当前状态
function getStatus(t: ActivityTimes): ActivityStatus {
  if (!t.now || !t) return null;
  if (dayjs(t.now).valueOf() < dayjs(t.start).valueOf())
    return ActivityStatus.Pending;
  if (
    dayjs(t.now).valueOf() >= dayjs(t.start).valueOf() &&
    dayjs(t.now).valueOf() < dayjs(t.voteEnd).valueOf()
  )
    return ActivityStatus.Voting;
  if (
    dayjs(t.now).valueOf() >= dayjs(t.voteEnd).valueOf() &&
    dayjs(t.now).valueOf() < dayjs(t.matchStart).valueOf()
  )
    return ActivityStatus.PreMatch;
  if (
    dayjs(t.now).valueOf() >= dayjs(t.matchStart).valueOf() &&
    dayjs(t.now).valueOf() < dayjs(t.end).valueOf()
  )
    return t.matchEnd ? ActivityStatus.Publicizing : ActivityStatus.Matching;
  return ActivityStatus.Ended;
}

export function DerivedSection(props: DerivedProps) {
  const [now, setNow] = useState<string>(dayjs().format("YYYY-MM-DDTHH:mm:ssZ"));
  const isMatchEnd = useMemo(() => props.advantageTeam !== TeamTag.None, [props.advantageTeam]);
  const status = useMemo(() => getStatus({ ...props, matchEnd: isMatchEnd, now }), [props])

  useEffect(() => {
    let mounted = true
    if (!mounted) return;
    const timer = setInterval(() => {
      if(props.isCountdownOpen){
        setNow(dayjs().format("YYYY-MM-DDTHH:mm:ssZ"))
      };
    }, 1000);
    return () => {
      clearInterval(timer)
      mounted = false
    };
  }, [props.isCountdownOpen]);

  return <DerivedDisplay {...{ ...props, now, isMatchEnd, status }} />;

}
