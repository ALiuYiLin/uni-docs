import React, { useMemo, useState, useRef, useCallback } from "react";
import styles from "./base.module.css";
import { activityConfig } from "./config";
import { ActivityStatus, ActivityStatusMap } from "./config";

type HandleProps = {
  leftPct: number;
  onMouseDown: (e: React.MouseEvent) => void;
  title: string;
};

function HandleMark({ leftPct, onMouseDown, title }: HandleProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className={styles.handle}
      style={{ left: `calc(${leftPct * 100}% - 8px)` }}
    >
      <p className={styles.handleTitle}>{title}</p>
    </div>
  );
}

// 解析后的活动时间配置（matchEnd 使用布尔表示比赛是否结束）
type ActivityResolved = {
  start: Date;
  voteEnd: Date;
  matchStart: Date;
  matchEnd: boolean;
  end: Date;
};

// 统一时间格式化展示
function formatTime(d: Date) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

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

// 从配置解析出时间对象
function fromConfig(): ActivityResolved {
  const start = new Date(activityConfig.start);
  const voteEnd = new Date(activityConfig.voteEnd);
  const matchStart = new Date(activityConfig.matchStart);
  const matchEnd = !!activityConfig.matchEnd;
  const end = new Date(activityConfig.end);
  return { start, voteEnd, matchStart, matchEnd, end };
}

export default function ActivityExample() {
  const [times, setTimes] = useState<ActivityResolved>(() => fromConfig());
  const [now, setNow] = useState<Date>(() => new Date(activityConfig.now));
  const status = getStatus(now, times);
  const orderOk = isOrderValid(times);
  const barRef = useRef<HTMLDivElement>(null);

  const canVote = useMemo(()=>{
    if(status === ActivityStatus.Voting){
      return true
    }
  },[status])


  const [voted, setVoted] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const totalMs = times.end.getTime() - times.start.getTime();
  const pctOf = useCallback(
    (d: Date) =>
      Math.max(0, Math.min(1, (d.getTime() - times.start.getTime()) / totalMs)),
    [times.start, totalMs]
  );
  const gap = 60 * 1000;

  const startDrag = useCallback(
    (onChange: (ms: number) => void) => (e: React.MouseEvent) => {
      e.preventDefault();
      const rect = barRef.current?.getBoundingClientRect();
      if (!rect) return;
      const onMove = (ev: MouseEvent) => {
        const x = Math.max(0, Math.min(rect.width, ev.clientX - rect.left));
        const pct = x / rect.width;
        const ms = times.start.getTime() + pct * totalMs;
        onChange(ms);
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [times.start, totalMs]
  );

  const setStartMs = useCallback(
    (ms: number) =>
      setTimes((prev) => {
        const start = Math.min(ms, prev.voteEnd.getTime() - gap);
        return { ...prev, start: new Date(start) };
      }),
    []
  );
  const setVoteEndMs = useCallback(
    (ms: number) =>
      setTimes((prev) => {
        const voteEnd = Math.max(
          prev.start.getTime() + gap,
          Math.min(ms, prev.matchStart.getTime())
        );
        return { ...prev, voteEnd: new Date(voteEnd) };
      }),
    []
  );
  const setMatchStartMs = useCallback(
    (ms: number) =>
      setTimes((prev) => {
        const matchStart = Math.max(
          prev.voteEnd.getTime(),
          Math.min(ms, prev.end.getTime() - gap)
        );
        return { ...prev, matchStart: new Date(matchStart) };
      }),
    []
  );
  const setEndMs = useCallback(
    (ms: number) =>
      setTimes((prev) => {
        const end = Math.max(prev.matchStart.getTime() + gap, ms);
        return { ...prev, end: new Date(end) };
      }),
    []
  );
  const setNowMs = useCallback(
    (ms: number) =>
      setNow(
        new Date(
          Math.max(times.start.getTime(), Math.min(ms, times.end.getTime()))
        )
      ),
    [times.start, times.end]
  );

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
      <div ref={barRef} className={styles.activityBar}>
        <div
          className={`${styles.segment} ${styles.segmentVote} ${styles.segmentLeftRounded}`}
          style={{ left: 0, width: `${pctOf(times.voteEnd) * 100}%` }}
        />
        <div
          className={`${styles.segment} ${styles.segmentPre}`}
          style={{
            left: `${pctOf(times.voteEnd) * 100}%`,
            width: `${(pctOf(times.matchStart) - pctOf(times.voteEnd)) * 100}%`,
          }}
        />
        <div
          className={`${styles.segment} ${styles.segmentMatch} ${styles.segmentRightRounded}`}
          style={{
            left: `${pctOf(times.matchStart) * 100}%`,
            width: `${(1 - pctOf(times.matchStart)) * 100}%`,
          }}
        />

        <HandleMark
          onMouseDown={startDrag(setStartMs)}
          leftPct={pctOf(times.start)}
          title={`活动开始 ${formatTime(times.start)}`}
        />
        <HandleMark
          onMouseDown={startDrag(setVoteEndMs)}
          leftPct={pctOf(times.voteEnd)}
          title={`投票截止 ${formatTime(times.voteEnd)}`}
        />
        <HandleMark
          onMouseDown={startDrag(setMatchStartMs)}
          leftPct={pctOf(times.matchStart)}
          title={`比赛开始 ${formatTime(times.matchStart)}`}
        />
        <HandleMark
          onMouseDown={startDrag(setEndMs)}
          leftPct={pctOf(times.end)}
          title={`活动结束 ${formatTime(times.end)}`}
        />
        <div
          onMouseDown={startDrag(setNowMs)}
          className={styles.nowLine}
          style={{ left: `calc(${pctOf(now) * 100}% - 1px)` }}
          title={`当前时间 ${formatTime(now)}`}
        />
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12,marginTop: 100}}>
        <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <input
            type="checkbox"
            checked={times.matchEnd}
            onChange={(e) => setTimes(prev => ({...prev, matchEnd: e.target.checked}))}
          />
          比赛已结束
        </label>
        <span>
          {ActivityStatusMap[status]}
        </span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12,marginTop: 100}}>
        <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <input
            type="checkbox"
            checked={voted}
            disabled={!canVote}
            onChange={(e) => setVoted(e.target.checked)}
          />
          {voted ? '已投票' : '未投票'}
        </label>
        <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <input
            type="checkbox"
            checked={advanced}
            disabled={ status !== ActivityStatus.Publicizing}
            onChange={(e) => setAdvanced(e.target.checked)}
          />
          {advanced ? '已晋级' : '未晋级'}
        </label>
          <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <input
              type="checkbox"
              checked={claimed}
              disabled={status !== ActivityStatus.Publicizing || !voted || !advanced}
              onChange={(e) => setClaimed(e.target.checked)}
            />
            {claimed ? '已领奖' : '未领奖'}
          </label>
      </div>
    </div>
  );
}
