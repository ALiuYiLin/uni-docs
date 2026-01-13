import { Typography, Divider, Space, Tag, Card, Row, Col, Alert } from 'antd'
import { 
  CheckCircleOutlined, 
  RocketOutlined, 
  ThunderboltOutlined,
  CodeOutlined 
} from '@ant-design/icons'
import { DocLayout } from '../layouts'

const { Title, Paragraph, Text } = Typography

export const Doc = () => {
  return (
    <DocLayout>
      <div>
        {/* 页面头部 */}
        <div className="mb-6">
          <Space>
            <Tag color="blue">v1.0.0</Tag>
            <Tag color="green">稳定版</Tag>
          </Space>
          <Title level={1} className="mt-4 mb-2">
            快速开始
          </Title>
          <Paragraph className="text-lg text-gray-600">
            欢迎使用 Uni-Docs，这是一个现代化的前端开发模板。本文档将帮助您快速上手项目开发。
          </Paragraph>
        </div>

        <Divider />

        {/* 安装说明 */}
        <section className="mb-8">
          <Title level={2}>
            <RocketOutlined className="mr-2" />
            安装
          </Title>
          <Paragraph>
            首先，确保您的开发环境中已安装 Node.js 18+ 和 npm/pnpm/yarn 包管理器。
          </Paragraph>
          
          <Card className="mb-4 bg-gray-50">
            <Title level={4}>克隆项目</Title>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
              <code>git clone https://github.com/your-repo/uni-docs.git{'\n'}cd uni-docs</code>
            </pre>
          </Card>

          <Card className="mb-4 bg-gray-50">
            <Title level={4}>安装依赖</Title>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
              <code>npm install</code>
            </pre>
          </Card>

          <Card className="bg-gray-50">
            <Title level={4}>启动开发服务器</Title>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
              <code>npm run dev</code>
            </pre>
          </Card>
        </section>

        <Divider />

        {/* 技术栈 */}
        <section className="mb-8">
          <Title level={2}>
            <ThunderboltOutlined className="mr-2" />
            技术栈
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card hoverable>
                <Space direction="vertical" size="small">
                  <Text strong className="text-lg">⚡ Vite</Text>
                  <Paragraph className="mb-0 text-gray-600">
                    下一代前端构建工具，提供极速的开发体验
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card hoverable>
                <Space direction="vertical" size="small">
                  <Text strong className="text-lg">⚛️ React 19</Text>
                  <Paragraph className="mb-0 text-gray-600">
                    用于构建用户界面的 JavaScript 库
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card hoverable>
                <Space direction="vertical" size="small">
                  <Text strong className="text-lg">🎨 TailwindCSS</Text>
                  <Paragraph className="mb-0 text-gray-600">
                    实用优先的 CSS 框架
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card hoverable>
                <Space direction="vertical" size="small">
                  <Text strong className="text-lg">🐜 Ant Design</Text>
                  <Paragraph className="mb-0 text-gray-600">
                    企业级 UI 设计语言和 React 组件库
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          </Row>
        </section>

        <Divider />

        {/* 项目结构 */}
        <section className="mb-8">
          <Title level={2}>
            <CodeOutlined className="mr-2" />
            项目结构
          </Title>
          <Card className="bg-gray-50">
            <pre className="text-sm overflow-x-auto">
{`uni-docs/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── Header.tsx
│   │   ├── FeatureCard.tsx
│   │   └── index.ts
│   ├── layouts/            # 布局组件
│   │   ├── ClassicLayout.tsx
│   │   ├── DocLayout.tsx
│   │   └── index.ts
│   ├── pages/              # 页面组件
│   │   ├── Home.tsx
│   │   ├── Doc.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   ├── assets/             # 静态资源
│   ├── App.tsx             # 路由配置
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── public/                 # 公共资源
└── package.json            # 项目配置`}
            </pre>
          </Card>
        </section>

        <Divider />

        {/* 特性列表 */}
        <section className="mb-8">
          <Title level={2}>核心特性</Title>
          <Space direction="vertical" size="middle" className="w-full">
            <Card>
              <Space>
                <CheckCircleOutlined className="text-green-500 text-xl" />
                <Text strong>组件化开发</Text>
              </Space>
              <Paragraph className="mt-2 mb-0 ml-7 text-gray-600">
                使用 React 组件化思想，构建可复用、可维护的 UI 组件
              </Paragraph>
            </Card>
            
            <Card>
              <Space>
                <CheckCircleOutlined className="text-green-500 text-xl" />
                <Text strong>响应式设计</Text>
              </Space>
              <Paragraph className="mt-2 mb-0 ml-7 text-gray-600">
                使用 TailwindCSS 和 Ant Design 的响应式工具，适配各种屏幕尺寸
              </Paragraph>
            </Card>

            <Card>
              <Space>
                <CheckCircleOutlined className="text-green-500 text-xl" />
                <Text strong>TypeScript 支持</Text>
              </Space>
              <Paragraph className="mt-2 mb-0 ml-7 text-gray-600">
                完整的 TypeScript 类型支持，提供更好的开发体验和代码质量
              </Paragraph>
            </Card>

            <Card>
              <Space>
                <CheckCircleOutlined className="text-green-500 text-xl" />
                <Text strong>热模块替换</Text>
              </Space>
              <Paragraph className="mt-2 mb-0 ml-7 text-gray-600">
                Vite 提供的 HMR 功能，修改代码后即时看到效果，无需刷新页面
              </Paragraph>
            </Card>
          </Space>
        </section>

        <Divider />

        {/* 提示信息 */}
        <Alert
          message="开发提示"
          description="建议使用 VS Code 作为开发工具，并安装 ESLint、Prettier、Tailwind CSS IntelliSense 等插件以获得更好的开发体验。"
          type="info"
          showIcon
          className="mb-4"
        />

        <Alert
          message="下一步"
          description="现在您可以开始开发了！查看左侧导航了解更多功能和配置选项。"
          type="success"
          showIcon
        />
      </div>
    </DocLayout>
  )
}