import { Card, Typography } from 'antd'
import { ReactNode } from 'react'

const { Title, Paragraph } = Typography

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  className?: string
}

export const FeatureCard = ({ title, description, icon, className = '' }: FeatureCardProps) => {
  return (
    <Card 
      className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}
      bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div className="text-center mb-4">
        <div className="text-4xl mb-3">{icon}</div>
        <Title level={4} className="mb-2">{title}</Title>
      </div>
      <Paragraph className="text-gray-600 flex-1 text-center">
        {description}
      </Paragraph>
    </Card>
  )
}