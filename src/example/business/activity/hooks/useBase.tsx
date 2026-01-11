import { useEffect, useState } from "react";
import { activityConfig } from "../config";
import dayjs from "dayjs";
import MetaStatus from "../components/meta-status";
import ActivityTime from "../components/activity-time";
import { TeamTag } from "../types";
import { Vote } from "../components/vote";

// 解析后的活动时间配置（matchEnd 使用布尔表示比赛是否结束）
export type ActivityResolved = {
  start: string;
  voteEnd: string;
  matchStart: string;
  matchEnd: boolean;
  end: string;
};

export function useBase() {
  const [start, setStart] = useState<string>();
  const [voteEnd, setVoteEnd] = useState<string>();
  const [matchStart, setMatchStart] = useState<string>();
  const [matchEnd, setMatchEnd] = useState<boolean>();
  const [end, setEnd] = useState<string>();
  const [now, setNow] = useState<string>();

  const [selectedTeam, setSelectedTeam] = useState<TeamTag>(TeamTag.None);
  const [advantageTeam, setAdvantageTeam] = useState<TeamTag>(TeamTag.None);

  // 是否领取了奖励
  const [receivedReward, setReceivedReward] = useState<boolean>(false);

  // 倒计时是否打开
  const [countdownOpen, setCountdownOpen] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let isMounted = true;

    async function init() {
      // 模拟初始化延迟
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isMounted) return;
      setStart(activityConfig.start);
      setVoteEnd(activityConfig.voteEnd);
      setMatchStart(activityConfig.matchStart);
      setMatchEnd(activityConfig.matchEnd);
      setEnd(activityConfig.end);

      // 初始化时默认选择队伍 A
      // setSelectedTeam(TeamTag.TeamA);
      // 初始化时默认优势队伍为队伍 A
      // setAdvantageTeam(TeamTag.TeamA);
      // 初始化时默认未领取奖励
      // setHasReceivedReward(false);
    }

    init();

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let isMounted = true;
    function updateNow() {
      const date = dayjs(Math.floor(Date.now() / 1000) * 1000);
      setNow(date.format("YYYY-MM-DDTHH:mm:ssZ"));
    }

    async function init() {
      // 模拟初始化延迟
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isMounted) return;
      // 初始化时更新一次 now
      updateNow();
      interval = setInterval(() => {
        if (countdownOpen) updateNow();
      }, 500);
    }

    init();
    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [countdownOpen]);
  function ActivityTimeUI() {
    return (
      <ActivityTime
        start={start}
        voteEnd={voteEnd}
        matchStart={matchStart}
        matchEnd={matchEnd}
        end={end}
        now={now}
      />
    );
  }
  function VoteUI() {
    return (
      <>
        <Vote
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          advancedTeam={advantageTeam}
          setAdvancedTeam={setAdvantageTeam}
          receivedReward={receivedReward}
          setReceivedReward={setReceivedReward}
        />
      </>
    );
  }
  function ActivityBaseUI() {
    return (
      <>
        <MetaStatus
          now={now}
          start={start}
          voteEnd={voteEnd}
          matchStart={matchStart}
          end={end}
          setNow={setNow}
          setStart={setStart}
          setVoteEnd={setVoteEnd}
          setMatchStart={setMatchStart}
          setEnd={setEnd}
        />
      </>
    );
  }

  return {
    // 倒计时是否打开
    countdownOpen,
    start,
    voteEnd,
    matchStart,
    matchEnd,
    end,
    now,
    selectedTeam,
    advantageTeam,
    receivedReward,
    setCountdownOpen,
    setSelectedTeam,
    setAdvantageTeam,
    setStart,
    setVoteEnd,
    setMatchStart,
    setMatchEnd,
    setEnd,
    setNow,
    ActivityBaseUI,
    ActivityTimeUI,
    VoteUI,
  };
}
