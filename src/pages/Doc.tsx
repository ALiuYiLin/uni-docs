import Iframe from '../components/iframe'
import { DocLayout } from '../layouts'

export const Doc = () => {
  return (
    <DocLayout>
        <Iframe src="http://localhost:5176/whale-docs/%E9%9D%A2%E8%AF%95%E9%A2%98/Webpack/webpack.html" />
    </DocLayout>
  )
}