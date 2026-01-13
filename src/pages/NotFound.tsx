import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ClassicLayout } from '../layouts'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <ClassicLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-2xl w-full p-8">
          <Result
            status="404"
            title={
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                404
              </div>
            }
            subTitle={
              <div className="text-xl text-gray-600">
                抱歉，您访问的页面不存在
              </div>
            }
            extra={
              <div className="flex gap-4 justify-center mt-8">
                <Button 
                  type="primary" 
                  size="large"
                  onClick={() => navigate('/')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  返回首页
                </Button>
                <Button 
                  size="large"
                  onClick={() => navigate(-1)}
                >
                  返回上一页
                </Button>
              </div>
            }
            className="bg-white rounded-lg shadow-lg p-8"
          />
          
          <div className="mt-8 text-center">
            <div className="text-gray-500 mb-4">您可能在寻找：</div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button type="link" onClick={() => navigate('/')}>
                首页
              </Button>
              <Button type="link" onClick={() => navigate('/doc')}>
                文档
              </Button>
              <Button type="link" onClick={() => navigate('/not-found')}>
                404 页面示例
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ClassicLayout>
  )
}