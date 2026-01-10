import { useEffect, useState } from "react";
import { activityConfig } from "../config";
import dayjs from "dayjs";

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
      const date = dayjs(Math.floor(Date.now() / 1000) * 1000 );
      setNow(date.format('YYYY-MM-DDTHH:mm:ssZ'));
    }

    async function init() {
      // 模拟初始化延迟
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isMounted) return;
      // 初始化时更新一次 now
      updateNow();    
      interval = setInterval(() => {
        if(countdownOpen) updateNow();
      }, 500);
    }

    init();
    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };

  }, [countdownOpen]);
  return { 
    // 倒计时是否打开
    countdownOpen, setCountdownOpen,
    start, voteEnd, matchStart, matchEnd, end, now,
    setStart, setVoteEnd, setMatchStart, setMatchEnd, setEnd,setNow 
  };
}
