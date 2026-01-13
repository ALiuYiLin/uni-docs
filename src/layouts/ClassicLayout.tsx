import { Layout } from 'antd'
import { Header } from '../components'
import type { ReactNode } from 'react'

const { Content } = Layout

interface ClassicLayoutProps {
  children: ReactNode
}

export const ClassicLayout = ({ children }: ClassicLayoutProps) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </Content>
    </Layout>
  )
}