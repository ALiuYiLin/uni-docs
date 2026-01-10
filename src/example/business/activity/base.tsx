import React, { useEffect, useRef } from "react";
import { useBase } from "./hooks/useBase";
import { useDerived } from "./hooks/useDerived";
import { useUI } from "./hooks/useUI";
import { useMethods } from "./hooks/useMethods";
import { Checkbox, DatePicker, Divider, Flex, Switch } from "antd";
import dayjs from "dayjs";
import { ActivityStatusMap } from "./map";
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
    start, voteEnd, matchStart, matchEnd, end, now, 
    setStart, setVoteEnd, setMatchStart, setMatchEnd, setEnd, setNow,
    countdownOpen, setCountdownOpen
   } = useBase();

  // 2. 派生状态 (Derived State)
  const { status, orderOk } = useDerived(start, voteEnd, matchStart, matchEnd, end, now);

  // 3. UI 状态 (UI State)
  const { barRef, voted, setVoted, advanced, setAdvanced, claimed, setClaimed } = useUI();

  // 4. 方法 (Methods)
  const {
    
  } = useMethods();

  if(!status || !now || !start || !voteEnd || !matchStart || !matchEnd || !end) return <div>Loading...</div>


  return (
    <Flex vertical gap={'middle'} className="p-5 border border-[#eee] rounded-lg">
      <Divider>元状态</Divider>
      <Flex gap={'small'} align="center">
        <label className="w-20">当前时间</label>
        <DatePicker 
          showTime 
          value={dayjs(now)} 
          onChange={(d) => setNow(d.format('YYYY-MM-DDTHH:mm:ssZ'))} 
        />
      </Flex>
      <Flex gap={'small'} align="center">
        <label className="w-20">活动开始</label>
        <DatePicker 
          showTime 
          value={dayjs(start)} 
          onChange={(d) => setStart(d.format('YYYY-MM-DDTHH:mm:ssZ'))} 
        />
      </Flex>
      <Flex gap={'small'} align="center">
        <label className="w-20">投票截止</label>
        <DatePicker 
          showTime 
          value={dayjs(voteEnd)} 
          onChange={(d) => setVoteEnd(d.format('YYYY-MM-DDTHH:mm:ssZ'))} 
        />
      </Flex>
      <Flex gap={'small'} align="center">
        <label className="w-20">比赛开始</label>
        <DatePicker 
          showTime 
          value={dayjs(matchStart)} 
          onChange={(d) => setMatchStart(d.format('YYYY-MM-DDTHH:mm:ssZ'))} 
        />
      </Flex>
      <Flex gap={'small'} align="center">
        <label className="w-20">活动结束</label>
        <DatePicker 
          showTime 
          value={dayjs(end)} 
          onChange={(d) => setEnd(d.format('YYYY-MM-DDTHH:mm:ssZ'))} 
        />
      </Flex>
      <Divider>派生状态</Divider>
      <Flex gap={'small'} vertical>
        <Flex gap={"small"}>
          <label>时间顺序是否正确</label>
          <Checkbox checked={orderOk}></Checkbox>
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
    </Flex>
  )
}
