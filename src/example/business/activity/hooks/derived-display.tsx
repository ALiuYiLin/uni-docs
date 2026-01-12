import { memo, ReactNode } from "react";
import { ActivityStatus } from "../types";
import { DerivedProps } from "./useDerived";
import { Col, Flex } from "antd";
import { ActivityStatusMap } from "../map";
import ActiveTime from "./active-time";
import ActivityTimeLine from "../components/activity-time-line";

type DerivedDisplayProps = {
  now: string;
  isMatchEnd: boolean;
  status: ActivityStatus;
} & DerivedProps;

export const DerivedDisplay = memo(function DerivedDisplay(props: DerivedDisplayProps) {
  return (
    <>
        <ActivityTimeLine {...props} />
        <Flex gap={"large"}>
          <   DerivedItem title="当前时间">
            <span>[{props.now}]</span>
          </DerivedItem>
          <DerivedItem title="比赛是否结束">
            <span>[{props.isMatchEnd ? '是' : '否'}]</span>
          </DerivedItem>
          <DerivedItem title="活动状态">
            <span>[{ActivityStatusMap[props.status]}]</span>
          </DerivedItem>
        </Flex>
    </>
  )
})

function DerivedItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Flex gap={"small"} align="center">
      <label>{title}:</label>
      {children}
    </Flex>
  );
}