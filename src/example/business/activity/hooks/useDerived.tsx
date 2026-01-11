import { ReactNode, useMemo } from "react";
import { ActivityStatus, TeamTag } from "../types";
import { ActivityResolved } from "./useBase";
import dayjs from "dayjs";
import { Checkbox, Col, Flex, Row } from "antd";
import { ActivityStatusMap, TeamTagMap } from "../map";

function DerivedItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Col span={6}>
      <Flex gap={"small"} align="center">
        <label>{title}</label>
        {children}
      </Flex>
    </Col>
  );
}

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
  end: string,
  now: string,
  selectedTeam: TeamTag,
  advantageTeam: TeamTag,
  receivedReward: boolean,
) {
   const hasTeamAdvanced = useMemo(
    () => advantageTeam !== TeamTag.None,
    [advantageTeam]
  );
  const hasTeamSelected = useMemo(
    () => selectedTeam !== TeamTag.None,
    [selectedTeam]
  );
  const isSelectedTeamAdvanced = useMemo(
    () => selectedTeam === advantageTeam && hasTeamAdvanced,
    [selectedTeam, advantageTeam, hasTeamAdvanced]
  );
  // now-比赛开始 倒计时
  const matchStartCountdown = useMemo(
    () => dayjs(matchStart).valueOf() - dayjs(now).valueOf(),
    [now, matchStart]
  );

 

  const isMatchEnd = useMemo(
    () => advantageTeam !== TeamTag.None && dayjs(now).valueOf() >= dayjs(matchStart).valueOf(),
    [now, matchStart, advantageTeam]
  );


  
  const orderOk = useMemo(
    () => isOrderValid({ start, voteEnd, matchStart, matchEnd:isMatchEnd, end }),
    [start, voteEnd, matchStart, isMatchEnd, end]
  );
  const status = useMemo(
    () => getStatus(now, { start, voteEnd, matchStart, matchEnd:isMatchEnd, end }),
    [now, start, voteEnd, matchStart, isMatchEnd, end]
  );
 


   // 是否可以领取奖励
  const canReceiveReward = useMemo(
    () => status === ActivityStatus.Publicizing && isSelectedTeamAdvanced,
    [status, isSelectedTeamAdvanced]
  );
  
  

  function ActivityDerivedUI() {
    return (
      <>
        <Row gutter={[6, 16]}>
          <DerivedItem title="比赛倒计时:">
            <span>{dayjs(matchStartCountdown).format("HH:mm:ss")}</span>
          </DerivedItem>
          <DerivedItem title="时间顺序是否正确">
            <Checkbox checked={!!orderOk}></Checkbox>
          </DerivedItem>
          <DerivedItem title="当前状态:">
            <span>[{ActivityStatusMap[status]}]</span>
          </DerivedItem>
          <DerivedItem title="是否投票:">
            <Checkbox checked={!!hasTeamSelected}></Checkbox>
          </DerivedItem>
          <DerivedItem title="是否比赛结束:">
            <Checkbox checked={!!isMatchEnd}></Checkbox>
          </DerivedItem>
          <DerivedItem title="是否有队伍晋级:">
            <Checkbox checked={!!hasTeamAdvanced}></Checkbox>
          </DerivedItem>
          <DerivedItem title="所选队伍是否晋级:">
            <Checkbox checked={!!isSelectedTeamAdvanced}></Checkbox>
          </DerivedItem>
          <DerivedItem title="是否可以领取奖励:">
            <Checkbox checked={!!canReceiveReward}></Checkbox>
          </DerivedItem>
        </Row>
      </>
    );
  }
  return { status, orderOk, ActivityDerivedUI };
}
