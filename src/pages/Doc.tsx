import Iframe from '../components/iframe'
import { DocLayout } from '../layouts'
export const Doc = ({src}:{src:string}) => {
  return (
    <DocLayout>
        <Iframe src={src} />
    </DocLayout>
  )
}