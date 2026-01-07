import React from "react";
import styles from "./base.module.css";
import { ActivityStatus } from "./types";
import { ActivityStatusMap } from "./map";

import { useBase } from "./hooks/useBase";
import { useDerived } from "./hooks/useDerived";
import { useUI } from "./hooks/useUI";
import { useMethods } from "./hooks/useMethods";

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

export default function ActivityExample() {
  // 1. 初始数据 (Initial Data)
  const { times, setTimes, now, setNow } = useBase();

  // 2. 派生状态 (Derived State)
  const { status, canVote, totalMs, pctOf } = useDerived(times, now);

  // 3. UI 状态 (UI State)
  const { barRef, voted, setVoted, advanced, setAdvanced, claimed, setClaimed } = useUI();

  // 4. 方法 (Methods)
  const {
    startDrag,
    setStartMs,
    setVoteEndMs,
    setMatchStartMs,
    setEndMs,
    setNowMs,
  } = useMethods(times, setTimes, setNow, barRef, totalMs);

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
        <HandleMark
          onMouseDown={startDrag(setNowMs)}
          leftPct={pctOf(now)}
          title={`当前时间 ${formatTime(now)}`}
        />
        <div
          onMouseDown={startDrag(setNowMs)}
          className={styles.nowLine}
          style={{ left: `calc(${pctOf(now) * 100}% - 1px)` }}
          title={`当前时间 ${formatTime(now)}`}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, marginTop: 100 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={times.matchEnd}
            onChange={(e) => setTimes(prev => ({ ...prev, matchEnd: e.target.checked }))}
          />
          比赛已结束
        </label>
        <span>
          {ActivityStatusMap[status]}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, marginTop: 100 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={voted}
            disabled={!canVote}
            onChange={(e) => setVoted(e.target.checked)}
          />
          {voted ? '已投票' : '未投票'}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={advanced}
            disabled={status !== ActivityStatus.Publicizing}
            onChange={(e) => setAdvanced(e.target.checked)}
          />
          {advanced ? '已晋级' : '未晋级'}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
