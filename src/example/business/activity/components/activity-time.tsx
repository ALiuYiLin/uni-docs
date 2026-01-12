import { Flex, TimelineProps } from "antd";
import { useEffect, useMemo } from "react";
import { ActivityStatus } from "../types";
import styles from './atctivity-time.module.css'
import dayjs from "dayjs";

function TimePoint({ left, title, isRed }: { left: string | number; title: string; isRed?: boolean }) {
  return (
    <div className="ball-wrapper absolute" style={{ left: typeof left === 'number' ? `${left}%` : left }}>
      <p className={`${styles['ball-title']} ${isRed ? 'text-[red] bg-white' : ''}`}>{title}</p>
      <div className={`ball rounded-full w-[10px] h-[10px] ${isRed ? 'bg-[red] ' : 'bg-[#000]'}`}></div>
    </div>
  );
}

export default function ActivityTime({
  start, voteEnd, matchStart, end, now,
}: {
  start: string;
  voteEnd: string;
  matchStart: string;
  end: string;
  now: string;
}) {
  const totalTime = useMemo(() => {
    return dayjs(end).valueOf() - dayjs(start).valueOf()
  }, [start, end])

  const getPercent = (t: string) => (dayjs(t).valueOf() - dayjs(start).valueOf()) / totalTime * 100;

  const points = [
    { title: "开始", time: start },
    { title: "投票截止", time: voteEnd },
    { title: "比赛开始", time: matchStart },
    { title: "活动结束", time: end },
    { title: "当前", time: now, isRed: true },
  ];

  return (
    <Flex gap={'small'} vertical className="py-[20px] relative">
      <Flex className="w-full h-[2px] bg-[#eee]  top-[5px] relative"> </Flex>
      {points.map((p) => (
        <TimePoint 
          key={p.title} 
          left={getPercent(p.time)} 
          title={p.title} 
          isRed={p.isRed} 
        />
      ))}
    </Flex>
  )
}
