import React, { useEffect, useRef } from "react";
import { useBase } from "./hooks/useBase";
import { useDerived } from "./hooks/useDerived";
import { useUI } from "./hooks/useUI";
import { useMethods } from "./hooks/useMethods";
import { Divider, Flex, Row, Switch } from "antd";
export default function ActivityExample() {


  // 1. 生成唯一实例 ID，仅在组件创建时生成一次
  const instanceId = useRef(Math.random().toString(36).slice(2, 7)).current;

  // 2. 打印渲染日志（每次重渲染都会打印）
  console.log(`[组件:${instanceId}] 正在渲染 (Re-render)`);

  // 3. 监控生命周期
  useEffect(() => {
    console.log(`[组件:${instanceId}] 已挂载 (Mounted) ✅`);

    return () => {
      console.log(`[组件:${instanceId}] 即将卸载 (Unmounted) ❌`);
    };
  }, []); // 空依赖数组确保只在挂载/卸载时执行

  // 1. 初始数据 (Initial Data)
  const { 
    start, voteEnd, matchStart, matchEnd, end, now, selectedTeam,advantageTeam,
    receivedReward,
    countdownOpen, setCountdownOpen,
    ActivityBaseUI,
    ActivityTimeUI,
    VoteUI,
   } = useBase();

  // 2. 派生状态 (Derived State)
  const { status, orderOk,ActivityDerivedUI } = useDerived(start, voteEnd, matchStart, end, now, selectedTeam, advantageTeam, receivedReward);

  // 3. UI 状态 (UI State)
  const { barRef, voted, setVoted, advanced, setAdvanced, claimed, setClaimed } = useUI();

  // 4. 方法 (Methods)
  const {
    
  } = useMethods();

  if(!status || !now || !start || !voteEnd || !matchStart || !matchEnd || !end) return <div>Loading...</div>


  return (
    <Flex vertical gap={'middle'} className="p-5 border border-[#eee] rounded-lg">
      <Divider>活动时间</Divider>
      <ActivityTimeUI />
      <Divider>元状态</Divider>
      <Row gutter={[16, 16]}>
        <ActivityBaseUI />  
        <VoteUI />
      </Row>
      <Divider>派生状态</Divider>
      <ActivityDerivedUI />
      <Divider>UI tools</Divider>
      <Flex gap={'small'} vertical>
        <Flex gap={"small"} align='center'>
          <label>时间同步？</label>
          <Switch checked={countdownOpen} onChange={setCountdownOpen}></Switch>
        </Flex>
      </Flex>
      
    </Flex>
  )
}
