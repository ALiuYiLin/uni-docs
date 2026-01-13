import { Layout, Typography, Space } from 'antd'
import { GithubOutlined, HeartFilled } from '@ant-design/icons'

const { Header: AntHeader } = Layout
const { Title } = Typography

export const Header = () => {
  return (
    <AntHeader className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
        <Title level={3} className="m-0 text-gray-800">
          Uni-Docs
        </Title>
        <Space>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <GithubOutlined className="text-xl" />
          </a>
          <span className="text-gray-500 flex items-center gap-1">
            Made with <HeartFilled className="text-red-500" />
          </span>
        </Space>
      </div>
    </AntHeader>
  )
}