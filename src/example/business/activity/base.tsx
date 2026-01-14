import React from "react";
import { useBase } from "./hooks/useBase";
import { DerivedSection } from "./hooks/useDerived";
import { Button, Divider, Flex, Modal, Row, Switch } from "antd";
import { useRenderLog } from "@site/src/hooks/use-render-log";
import useUITools from "./hooks/useUITools";
import { useMethods } from "./hooks/useMethods";
export default function ActivityExample() {

  useRenderLog("ActivityExample")


  const { read: { isCountdownOpen, showRewordModal, showSelectTeamModal }, write: { setIsCoundownOpen, setShowRewordModal, setShowSelectTeamModal } } = useUITools()

  // 1. 初始数据 (Initial Data)
  const { read: baseData, components: { ActivityTime, MatchInfo } } = useBase();

  // 2. 派生状态 (Derived State)
  // const DerivedSection  = useDerived(baseData);

  const opt = useMethods({isCountdownOpen,showRewordModal,showSelectTeamModal,setIsCoundownOpen,setShowRewordModal,setShowSelectTeamModal})

  return (
    <Flex vertical gap={'middle'} className="p-5 border border-[#eee] rounded-lg">
      <Divider>UI工具</Divider>
      <Flex gap={"middle"}>
        <Switch checked={isCountdownOpen} onChange={setIsCoundownOpen} />
      </Flex>
      <Divider>元数据</Divider>
      <Row gutter={[16, 16]}>
        <ActivityTime />
        <MatchInfo />
      </Row>
      <Divider>派生数据</Divider>
      <Flex gap={"large"} vertical>
        <DerivedSection isCountdownOpen={isCountdownOpen}  {...baseData} />
      </Flex>
      <Divider>操作</Divider>
      <Flex>
        <Button onClick={opt.openSelectTeamModal}>11111</Button>
      </Flex>
      <Modal
        title="Title"
        open={showSelectTeamModal}
        onOk={() => opt.confirmSelectTeam()}
        onCancel={()=>opt.closeSelecTeamModal()}
      >
        <p>12345555</p>
      </Modal>
    </Flex>
  )
}
