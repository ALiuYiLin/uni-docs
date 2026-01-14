import { Dispatch, SetStateAction, useCallback } from "react";
import { ActivityResolved } from "./useBase";

export type UseMethodsProps = {
  isCountdownOpen: boolean
  showRewordModal: boolean
  showSelectTeamModal: boolean

  setIsCoundownOpen: Dispatch<SetStateAction<boolean>>
  setShowRewordModal: Dispatch<SetStateAction<boolean>>
  setShowSelectTeamModal: Dispatch<SetStateAction<boolean>>
}

export function useMethods(props:UseMethodsProps) {

  // 打开领取奖励模态框
  async function openRewardModal() {
    props.setShowRewordModal(true)
  }
  // 关闭领取奖励模态框
  async function closeRewardModal() {
    props.setShowRewordModal(false)
  }

  // 确认领取奖励
  async function confirmReward() {
    props.setShowSelectTeamModal(false)
  }

  // 打开选择队伍模特框
  async function openSelectTeamModal() {
    props.setShowSelectTeamModal(true)
  }

  // 关闭选择队伍模特框 
  async function closeSelecTeamModal() {
    props.setShowSelectTeamModal(false)
  }

  // 提交投票
  async function confirmSelectTeam() {
    props.setShowSelectTeamModal(false)
  }

  return {
    openRewardModal,
    closeRewardModal,
    confirmReward,
    openSelectTeamModal,
    closeSelecTeamModal,
    confirmSelectTeam
  };
}
