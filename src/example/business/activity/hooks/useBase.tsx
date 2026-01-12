import { useEffect, useState } from "react";
import { activityConfig } from "../config";
import { TeamTag } from "../types";
import { API } from "../api";
import ActiveTime from "./active-time";
import MatchInfo from "./match-info";

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
  const [end, setEnd] = useState<string>();

  const [selectedTeam, setSelectedTeam] = useState<TeamTag>(TeamTag.None);
  const [advantageTeam, setAdvantageTeam] = useState<TeamTag>(TeamTag.None);

  // 是否领取了奖励
  const [receivedReward, setReceivedReward] = useState<boolean>(false);


  async function init() {
    try{
      const response = await API.ActivityInitDataLoad();
      if(response.code != 0) throw new Error(response.msg);
      if(!response.data) throw new Error("数据为空");
      setStart(response.data.start);
      setVoteEnd(response.data.voteEnd);
      setMatchStart(response.data.matchStart);
      setEnd(response.data.end);
      setSelectedTeam(response.data.select_team);
      setAdvantageTeam(response.data.success_team);
      setReceivedReward(response.data.has_present_id_group && response.data.has_present_id_group.length > 0);
    }catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    init();
  }, []);


  return {
    read:{
      start,
      voteEnd,
      matchStart,
      end,
      selectedTeam,
      advantageTeam,
      receivedReward
    },
    write: {
      setStart,
      setVoteEnd,
      setMatchStart,
      setEnd,
      setSelectedTeam,
      setAdvantageTeam,
      setReceivedReward
    },
    load:{
      init
    },
    components: {
      ActivityTime: ()=>ActiveTime({ start, voteEnd, matchStart, end, setStart, setVoteEnd, setMatchStart, setEnd }),
      MatchInfo: ()=>MatchInfo({ selectedTeam, advantageTeam, receivedReward, setSelectedTeam, setAdvantageTeam, setReceivedReward}),
    }
  };
}
