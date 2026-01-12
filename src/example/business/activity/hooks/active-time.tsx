import { Col, DatePicker, Flex } from "antd";
import dayjs from "dayjs";

export interface ActiveTimeProps {
  start: string;
  voteEnd: string;
  matchStart: string;
  end: string;
  setStart: (val: string) => void;
  setVoteEnd: (val: string) => void;
  setMatchStart: (val: string) => void;
  setEnd: (val: string) => void;
}
export default function ActiveTime({
  start,
  voteEnd,
  matchStart,
  end,
  setStart,
  setVoteEnd,
  setMatchStart,
  setEnd,
}: ActiveTimeProps) {
  const fields: Array<{
    label: string;
    value: string;
    set: (v: string) => void;
  }> = [
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
