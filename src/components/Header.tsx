import { Layout, Typography, Space, Button } from 'antd'
import { GithubOutlined, HeartFilled, HomeOutlined, BookOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const { Header: AntHeader } = Layout
const { Title } = Typography

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AntHeader className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
        <Title level={3} className="m-0 text-gray-800 cursor-pointer" onClick={() => navigate('/')}>
          Uni-Docs
        </Title>
        <Space size="large">
          <Button 
            type={location.pathname === '/' ? 'primary' : 'text'}
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
          >
            首页
          </Button>
          <Button 
            type={location.pathname === '/doc' ? 'primary' : 'text'}
            icon={<BookOutlined />}
            onClick={() => navigate('/doc')}
          >
            文档
          </Button>
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