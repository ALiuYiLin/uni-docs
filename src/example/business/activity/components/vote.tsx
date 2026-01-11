import { Checkbox, Col, Flex, Select } from "antd";

import { TeamTagMap } from "../map";
import { TeamTag } from "../types";

export function Vote({
  selectedTeam,
  setSelectedTeam,
  advancedTeam,
  setAdvancedTeam,
  receivedReward,
  setReceivedReward,
}: {
  selectedTeam: TeamTag;
  setSelectedTeam: (team: TeamTag) => void;
  advancedTeam: TeamTag;
  setAdvancedTeam: (team: TeamTag) => void;
  receivedReward: boolean;
  setReceivedReward: (received: boolean) => void;
}) {
  const options = [
    { value: TeamTag.None, label: TeamTagMap[TeamTag.None] },
    { value: TeamTag.TeamA, label: TeamTagMap[TeamTag.TeamA] },
    { value: TeamTag.TeamB, label: TeamTagMap[TeamTag.TeamB] },
    { value: TeamTag.TeamC, label: TeamTagMap[TeamTag.TeamC] },
  ];
  return (
    <>
      <Col span={12}>
        <Flex gap={"small"} align="center"  >
          <span>投票队伍</span>
          <Select
            defaultValue={selectedTeam}
            onChange={setSelectedTeam}
            className="flex-1"
            options={options}
            />
        </Flex>
      </Col>
      <Col span={12}>
        <Flex gap={"small"} align="center"  >
          <span>晋级队伍</span>
          <Select
            defaultValue={advancedTeam}
            onChange={setAdvancedTeam}
            className="flex-1"
            options={options}
          />
        </Flex>
      </Col>
      <Col span={12}>
        <Flex gap={"small"} align="center"  >
          <span>收到奖励</span>
          <Checkbox checked={receivedReward} onChange={(e) => setReceivedReward(e.target.checked)} />
        </Flex>
      </Col>
    </>
  );
}
