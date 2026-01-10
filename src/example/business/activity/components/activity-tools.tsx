import React from 'react';
import { Flex, Checkbox, Divider, Switch } from 'antd';
import { ActivityStatusMap } from '../map';
import { ActivityStatus } from '../types';

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
  setCountdownOpen
}: ActivityToolsProps) {
  return (
    <>
      <Flex gap={'small'} vertical>
        <Flex gap={"small"}>
          <label>时间顺序是否正确</label>
          <Checkbox checked={!!orderOk}></Checkbox>
        </Flex>
        <Flex gap={"small"}>
          <label>当前状态:</label>
          <span>[{ActivityStatusMap[status]}]</span>
        </Flex>
      </Flex>
      <Divider>UI tools</Divider>
      <Flex gap={'small'} vertical>
        <Flex gap={"small"}>
          <label>倒计时是否打开</label>
          <Switch checked={countdownOpen} onChange={setCountdownOpen}></Switch>
        </Flex>
      </Flex>
    </>
  );
}
