import { Layout, Menu, theme } from 'antd'
import { Header } from '../components'
import { useState, type ReactNode }  from 'react'

import {
  FileTextOutlined,
  BookOutlined,
  ApiOutlined,
  SettingOutlined,
  BulbOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Content, Sider } = Layout

interface DocLayoutProps {
  children: ReactNode
}

type MenuItem = Required<MenuProps>['items'][number]

export const DocLayout = ({ children }: DocLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const menuItems: MenuItem[] = [
    {
      key: 'getting-started',
      icon: <RocketOutlined />,
      label: '快速开始',
      children: [
        { key: 'intro', label: '简介' },
        { key: 'installation', label: '安装' },
        { key: 'first-app', label: '第一个应用' },
      ],
    },
    {
      key: 'guide',
      icon: <BookOutlined />,
      label: '指南',
      children: [
        { key: 'components', label: '组件开发' },
        { key: 'routing', label: '路由配置' },
        { key: 'state', label: '状态管理' },
        { key: 'styling', label: '样式方案' },
      ],
    },
    {
      key: 'api',
      icon: <ApiOutlined />,
      label: 'API 参考',
      children: [
        { key: 'hooks', label: 'Hooks' },
        { key: 'utils', label: '工具函数' },
        { key: 'types', label: '类型定义' },
      ],
    },
    {
      key: 'examples',
      icon: <BulbOutlined />,
      label: '示例',
      children: [
        { key: 'basic', label: '基础示例', children: [{key:'aaaa', label:'aaaa'}]},
        { key: 'advanced', label: '高级示例' },
      ],
    },
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: '配置',
    },
    {
      key: 'changelog',
      icon: <FileTextOutlined />,
      label: '更新日志',
    },
  ]

  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={250}
          style={{ background: colorBgContainer }}
          className="border-r"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['intro']}
            defaultOpenKeys={['getting-started']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className="bg-white rounded-lg shadow-sm"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}