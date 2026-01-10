import React from "react";
import { Flex, Checkbox, Divider, Switch, Row, Col } from "antd";
import { ActivityStatusMap } from "../map";
import { ActivityStatus } from "../types";

interface ActivityToolsProps {
  orderOk: boolean | null;
  status: ActivityStatus;
  countdownOpen: boolean;
  setCountdownOpen: (checked: boolean) => void;
}

export default function ActivityTools({
  orderOk,
  status,
  countdownOpen,
  setCountdownOpen,
}: ActivityToolsProps) {
  return (
    <>
      <Flex gap={16}>
        <Flex gap={8}>
          <Flex gap={"small"}>
            <label>时间顺序是否正确</label>
            <Checkbox checked={!!orderOk}></Checkbox>
          </Flex>
        </Flex>
        <Flex gap={8}>
          <Flex gap={"small"}>
            <label>当前状态:</label>
            <span>[{ActivityStatusMap[status]}]</span>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
