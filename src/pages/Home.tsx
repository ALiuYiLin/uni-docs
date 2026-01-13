import { useState } from 'react'
import { Button, Card, Space, Typography, theme, Row, Col } from 'antd'
import { PlusOutlined, MinusOutlined, RocketOutlined, ThunderboltOutlined, BgColorsOutlined, BugOutlined } from '@ant-design/icons'
import { FeatureCard } from '../components'
import { ClassicLayout } from '../layouts'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

const { Title, Paragraph } = Typography

export const Home = () => {
  const [count, setCount] = useState(0)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const features = [
    {
      title: 'Vite',
      description: '极速的构建工具，提供闪电般的开发体验和优化的生产构建',
      icon: <ThunderboltOutlined className="text-yellow-500" />
    },
    {
      title: 'React',
      description: '现代化的前端框架，组件化开发，强大的生态系统',
      icon: <RocketOutlined className="text-blue-500" />
    },
    {
      title: 'TailwindCSS',
      description: '实用优先的CSS框架，快速构建现代化的用户界面',
      icon: <BgColorsOutlined className="text-cyan-500" />
    },
    {
      title: 'Ant Design',
      description: '企业级UI设计语言和React组件库，开箱即用',
      icon: <BugOutlined className="text-blue-600" />
    }
  ]

  return (
    <ClassicLayout>
      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Space size="large" className="mb-6">
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="h-20 w-20 hover:scale-110 transition-transform" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="h-20 w-20 hover:scale-110 transition-transform animate-spin-slow" alt="React logo" />
            </a>
          </Space>
          <Title level={1} className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            现代化前端开发栈
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
            基于 Vite + React + TailwindCSS + Ant Design 构建的现代化单页面应用模板
          </Paragraph>
        </div>

        {/* Interactive Demo */}
        <div className="mb-12">
          <Card 
            title={
              <div className="text-center">
                <Title level={3} className="mb-0">交互式计数器演示</Title>
              </div>
            }
            className="shadow-lg max-w-md mx-auto"
            style={{ background: colorBgContainer }}
          >
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-6">{count}</div>
              <Space size="large">
                <Button 
                  type="primary" 
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={() => setCount(count + 1)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  增加
                </Button>
                <Button 
                  size="large"
                  icon={<MinusOutlined />}
                  onClick={() => setCount(count - 1)}
                  disabled={count <= 0}
                >
                  减少
                </Button>
              </Space>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <Title level={2} className="text-center mb-8">技术栈特性</Title>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <FeatureCard {...feature} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Getting Started */}
        <Card className="shadow-lg" style={{ background: colorBgContainer }}>
          <Title level={3} className="text-center mb-6">快速开始</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">📦</div>
                <Title level={5}>安装依赖</Title>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm">npm install</code>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🚀</div>
                <Title level={5}>启动开发</Title>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm">npm run dev</code>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🏗️</div>
                <Title level={5}>构建生产</Title>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm">npm run build</code>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </ClassicLayout>
  )
}