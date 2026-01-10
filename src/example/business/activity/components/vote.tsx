import { Flex, Select } from "antd";

import { Checkbox } from "antd";
import { TeamTagMap } from "../map";
import { TeamTag } from "../types";

export function Vote({selectedTeam, setSelectedTeam}: {selectedTeam: TeamTag, setSelectedTeam: (team: TeamTag) => void}) {
  return (
    <>
      <Flex gap={16}>
        <Flex gap={"small"}>
          <label>投票队伍</label>
          <Select defaultValue={selectedTeam}  onChange={setSelectedTeam}>
            <Select.Option value={TeamTag.None}>{TeamTagMap[TeamTag.None ]}</Select.Option>
            <Select.Option value={TeamTag.TeamA}>{TeamTagMap[TeamTag.TeamA]}</Select.Option>
            <Select.Option value={TeamTag.TeamB}>{TeamTagMap[TeamTag.TeamB]}</Select.Option>
            <Select.Option value={TeamTag.TeamC}>{TeamTagMap[TeamTag.TeamC]}</Select.Option>
          </Select>
        </Flex>
      </Flex>
    </>
  );
}