import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, Doc, NotFound } from './pages'
import {
  BookOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'


type MenuItem = Required<MenuProps>['items'][number] & { path: string }


const menuItems: MenuItem[] = [
  {
    key: 'getting-started',
    icon: <RocketOutlined />,
    label: '快速开始',
    path: 'http://localhost:5174/whale-docs/%E9%9D%A2%E8%AF%95%E9%A2%98/Webpack/webpack.html'
  },
  {
    key: 'guide',
    icon: <BookOutlined />,
    label: '指南',
    path: 'http://localhost:5174/whale-docs/vue/%E6%B8%B2%E6%9F%93%E6%9C%BA%E5%88%B6.html'
  },
]

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {menuItems.map((menu) => (
          <Route key={menu.key} path={`/doc/${menu.key}`} element={<Doc src={menu.path} />} />
        ))}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App