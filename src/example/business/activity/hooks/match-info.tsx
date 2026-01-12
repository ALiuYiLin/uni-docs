import { Checkbox, Col, DatePicker, Flex, Select } from "antd";
import { TeamTag } from "../types";
import dayjs from "dayjs";

interface MatchInfoProps {
    selectedTeam: TeamTag;
    advantageTeam: TeamTag;
    receivedReward: boolean;
    setSelectedTeam: (val: TeamTag) => void;
    setAdvantageTeam: (val: TeamTag) => void;
    setReceivedReward: (val: boolean) => void;
}

export default function MatchInfo({ selectedTeam, advantageTeam, receivedReward, setSelectedTeam, setAdvantageTeam, setReceivedReward}: MatchInfoProps) {
    const options = [
        { label: "未选择", value: TeamTag.None},
        { label: "队伍1", value: TeamTag.TeamA },
        { label: "队伍2", value: TeamTag.TeamB },
        { label: "队伍3", value: TeamTag.TeamC },
    ];
    return (
        <>
            <Col span={12}>
                <Flex gap={"small"} align="center">
                    <span>选择队伍</span>
                    <Select options={options} value={selectedTeam} onChange={(v)=> setSelectedTeam(v)} className="flex-1"></Select>
                </Flex>
            </Col>
            <Col span={12}>
                <Flex gap={"small"} align="center">
                    <span>获胜队伍</span>
                    <Select options={options} value={advantageTeam} onChange={(v)=> setAdvantageTeam(v)}className="flex-1"></Select>
                </Flex>
            </Col>
            <Col span={12}>
                <Flex gap={"small"} align="center">
                    <span>是否领取了奖励</span>
                    <Checkbox checked={receivedReward} onChange={(e) =>setReceivedReward(e.target.checked)}></Checkbox>
                </Flex>
            </Col>
        </>
    )
}