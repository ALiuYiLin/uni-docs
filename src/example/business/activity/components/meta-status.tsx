import React from "react";
import { Flex, DatePicker, Row, Col } from "antd";
import dayjs from "dayjs";

interface MetaStatusProps {
  now: string;
  start: string;
  voteEnd: string;
  matchStart: string;
  end: string;
  setNow: (val: string) => void;
  setStart: (val: string) => void;
  setVoteEnd: (val: string) => void;
  setMatchStart: (val: string) => void;
  setEnd: (val: string) => void;
}

export default function MetaStatus({
  now,
  start,
  voteEnd,
  matchStart,
  end,
  setNow,
  setStart,
  setVoteEnd,
  setMatchStart,
  setEnd,
}: MetaStatusProps) {
  const fields: Array<{
    label: string;
    value: string;
    set: (v: string) => void;
  }> = [
    { label: "当前时间", value: now, set: setNow },
    { label: "活动开始", value: start, set: setStart },
    { label: "投票截止", value: voteEnd, set: setVoteEnd },
    { label: "比赛开始", value: matchStart, set: setMatchStart },
    { label: "活动结束", value: end, set: setEnd },
  ];
  return (
    <>
      {fields.map((f) => (
        <Col span={12} key={f.label}>
          <Flex gap={"small"} align="center">
            <span>{f.label}</span>
            <DatePicker
              className="flex-1"
              showTime
              value={dayjs(f.value)}
              onChange={(d) => d && f.set(d.format("YYYY-MM-DDTHH:mm:ssZ"))}
            />
          </Flex>
        </Col>
      ))}
    </>
  );
}
