import { useState } from "react";
import { activityConfig } from "../config";

// 解析后的活动时间配置（matchEnd 使用布尔表示比赛是否结束）
export type ActivityResolved = {
  start: Date;
  voteEnd: Date;
  matchStart: Date;
  matchEnd: boolean;
  end: Date;
};

// 从配置解析出时间对象
function fromConfig(): ActivityResolved {
  const start = new Date(activityConfig.start);
  const voteEnd = new Date(activityConfig.voteEnd);
  const matchStart = new Date(activityConfig.matchStart);
  const matchEnd = !!activityConfig.matchEnd;
  const end = new Date(activityConfig.end);
  return { start, voteEnd, matchStart, matchEnd, end };
}

export function useBase() {
  const [times, setTimes] = useState<ActivityResolved>(() => fromConfig());
  const [now, setNow] = useState<Date>(() => new Date(activityConfig.now));

  return { times, setTimes, now, setNow };
}
