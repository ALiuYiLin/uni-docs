import { useEffect, useRef } from "react";

export const useRenderLog = (componentName: string) => {
    // 1. 生成唯一实例 ID，仅在组件创建时生成一次
    const instanceId = useRef(Math.random().toString(36).slice(2, 7)).current;


    // 2. 打印渲染日志（每次重渲染都会打印）
    console.log(`[组件:${componentName}-${instanceId}] 正在渲染 (Re-render)`);

    // 3. 监控生命周期
    useEffect(() => {
        console.log(`[组件:${componentName}-${instanceId}] 已挂载 (Mounted) ✅`);

        return () => {
            console.log(`[组件:${componentName}-${instanceId}] 即将卸载 (Unmounted) ❌`);
        };
    }, []); // 空依赖数组确保只在挂载/卸载时执行
};