import { useState } from "react";

export default function useUITools() {
    const [isCountdownOpen , setIsCoundownOpen] = useState(false);
    const [showSelectTeamModal,setShowSelectTeamModal] = useState(false);
    const [showRewordModal,setShowRewordModal] = useState(false)
    return {
        read: {
            isCountdownOpen,
            showRewordModal,
            showSelectTeamModal
        },
        write: {
            setIsCoundownOpen,
            setShowRewordModal,
            setShowSelectTeamModal
        }
    }
}
