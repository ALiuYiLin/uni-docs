export const activityConfig = {
  // 当前时间（用于示例与判断逻辑），建议填写带时区的 ISO 字符串
  now: '2026-01-06T10:30:00+08:00',
  start: '2026-01-06T09:00:00+08:00',
  voteEnd: '2026-01-06T10:00:00+08:00',
  matchStart: '2026-01-06T11:00:00+08:00',
  matchEnd: true,
  end: '2026-01-06T13:00:00+08:00',
};



export enum ActivityStatus {
  Pending = 1,
  Voting = 2,
  PreMatch = 3,
  Matching = 4,
  Publicizing = 5,
  Ended = 6,
}

export const ActivityStatusMap: Record<ActivityStatus, string> = {
  [ActivityStatus.Pending]: "待开始",
  [ActivityStatus.Voting]: "投票中",
  [ActivityStatus.PreMatch]: "赛前",
  [ActivityStatus.Matching]: "比赛中",
  [ActivityStatus.Publicizing]: "公示中",
  [ActivityStatus.Ended]: "已结束",
};


