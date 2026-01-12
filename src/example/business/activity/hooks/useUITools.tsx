import { useState } from "react";

export default function useUITools() {
    const [isCountdownOpen , setIsCoundownOpen] = useState(false);
    return {
        read: {
            isCountdownOpen,
        },
        write: {
            setIsCoundownOpen,
        }
    }
}
