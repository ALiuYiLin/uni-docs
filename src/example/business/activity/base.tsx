import React from "react";
import { useBase } from "./hooks/useBase";
import { useDerived } from "./hooks/useDerived";
import { Divider, Flex, Row } from "antd";
import { useRenderLog } from "@site/src/hooks/use-render-log";
export default function ActivityExample() {

  useRenderLog("ActivityExample")

  // 1. 初始数据 (Initial Data)
  const { components: {ActivityTime,MatchInfo}} = useBase();

  // 2. 派生状态 (Derived State)
  const { } = useDerived();

  return (
    <Flex vertical gap={'middle'} className="p-5 border border-[#eee] rounded-lg">
      <Divider>元数据</Divider>
      <Row gutter={[16, 16]}>
        <ActivityTime />
        <MatchInfo />
      </Row>
    </Flex>
  )
}
