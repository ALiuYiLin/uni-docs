import React from 'react';
import { Flex, DatePicker } from 'antd';
import dayjs from 'dayjs';

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
  now, start, voteEnd, matchStart, end,
  setNow, setStart, setVoteEnd, setMatchStart, setEnd
}: MetaStatusProps) {
  return (
    <>
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
    </>
  );
}
