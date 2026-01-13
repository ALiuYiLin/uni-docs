import { useEffect, useRef, useState } from "react";
export default function Iframe({
  src,
}: {
  src: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [heightNum, setHeightNum] = useState('100vh')
  useEffect(()=>{

    window.addEventListener('message', (e) => {
      if (e.origin !== 'http://localhost:5176') return; // 子页面 origin（务必校验）
      if (e.data?.type !== 'IFRAME_RESIZE') return;

      console.log('e.data.height: ', e.data.height);
      const h = Number(e.data.height);
      // if (Number.isFinite(h) && h > 0 && iframeRef.current) {
      //   iframeRef.current.style.height = `${h}px`;
      // }
      setHeightNum(`${h}px`)
    });

  },[])
  return (
    <iframe ref={iframeRef} src={src}  width={'100%'} height={heightNum}/>
  );
}
