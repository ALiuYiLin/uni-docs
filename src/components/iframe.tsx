import { useEffect, useRef, useState } from "react";
import { IFRAME_ORIGIN_LIST } from "../common";
export default function Iframe({
  src,
}: {
  src: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState('100vh')
  const previousHeight = useRef(0);
  const resizeAttempts = useRef(0);
  const isHeightStable = useRef(false);
  useEffect(()=>{
    window.addEventListener('message', (e) => {
      if(isHeightStable.current) return;
      if(resizeAttempts.current > 10) return;
      if (!IFRAME_ORIGIN_LIST.includes(e.origin)) return; // 子页面 origin（务必校验）
      if (e.data?.type !== 'IFRAME_RESIZE') return;

      console.log('e.data.height: ', e.data.height);
      const newHeight = Number(e.data.height);
      console.log('h diff', newHeight - previousHeight.current);
      previousHeight.current = newHeight;
      setIframeHeight(`${newHeight}px`)
      if(newHeight - previousHeight.current === 0){
        isHeightStable.current = true;
      }
      resizeAttempts.current++;
    });
  },[])
  return (
    <iframe ref={iframeRef} src={src} style={{width: '100%',height: iframeHeight}} scrolling="no"/>
  );
}
