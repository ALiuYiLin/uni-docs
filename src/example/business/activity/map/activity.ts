import { ActivityStatus } from "../types";

export const ActivityStatusMap: Record<ActivityStatus, string> = {
  [ActivityStatus.Pending]: "待开始",
  [ActivityStatus.Voting]: "投票中",
  [ActivityStatus.PreMatch]: "赛前",
  [ActivityStatus.Matching]: "比赛中",
  [ActivityStatus.Publicizing]: "公示中",
  [ActivityStatus.Ended]: "已结束",
};