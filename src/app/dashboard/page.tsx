"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  BarChart3,
  Heart,
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  LogOut,
} from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import Link from "next/link"
import { RequireAuth } from "@/components/RequireAuth"
import { useAuth } from "@/app/contexts/authcontext"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  
  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  const displayUser = {
    name: user?.username || user?.email || "匿名用户",
    email: user?.email || "",
    avatar: "/placeholder.svg?height=32&width=32",
  }


  return (
    <RequireAuth>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar
          isAuthenticated={!!user}
          user={user ? displayUser : undefined}
          onLogout={logout} // ✅ 传入 logout
          forceMode="dashboard"
        />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">欢迎回来！</h1>
          <p className="text-gray-300">这是您的情感分析数据概览</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">今日分析量</p>
                  <p className="text-2xl font-bold text-white">12,847</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+15.3%</span>
                  </div>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">正面情感占比</p>
                  <p className="text-2xl font-bold text-white">68.2%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+2.1%</span>
                  </div>
                </div>
                <Heart className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">活跃用户数</p>
                  <p className="text-2xl font-bold text-white">8,924</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                    <span className="text-red-400 text-sm">-3.2%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">预警事件</p>
                  <p className="text-2xl font-bold text-white">3</p>
                  <div className="flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-400 text-sm">需关注</span>
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sentiment Trend Chart */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">情感趋势分析</CardTitle>
                  <CardDescription className="text-gray-300">过去7天的情感变化趋势</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    7天
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                    <p>情感趋势图表</p>
                    <p className="text-sm">（此处将显示实际图表）</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hot Topics */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">热门话题</CardTitle>
                  <CardDescription className="text-gray-300">当前讨论最多的话题</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-semibold">#新品发布会</p>
                        <p className="text-gray-400 text-sm">讨论量: 15,234</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500/20 text-green-400">正面 85%</Badge>
                      <p className="text-gray-400 text-sm mt-1">+12.3%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-semibold">#用户体验优化</p>
                        <p className="text-gray-400 text-sm">讨论量: 8,967</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-blue-500/20 text-blue-400">中性 62%</Badge>
                      <p className="text-gray-400 text-sm mt-1">+5.7%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-semibold">#客服响应时间</p>
                        <p className="text-gray-400 text-sm">讨论量: 3,421</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-500/20 text-yellow-400">关注 45%</Badge>
                      <p className="text-gray-400 text-sm mt-1">-2.1%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-semibold">#系统故障</p>
                        <p className="text-gray-400 text-sm">讨论量: 1,892</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-red-500/20 text-red-400">负面 78%</Badge>
                      <p className="text-gray-400 text-sm mt-1">+8.9%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  asChild
                >
                  <Link href="/dashboard/monitoring">创建新监控</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/search-analysis?from=dashboard">智能搜索分析</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/dashboard/analytics">生成报告</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 用户信息面板 + 退出 */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">账户信息</CardTitle>
                  <CardDescription className="text-gray-300">您当前的登录信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-white">
                  <div>
                    <p className="text-sm text-gray-400">用户名</p>
                    <p>{user?.username || "未命名用户"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">邮箱</p>
                    <p>{user?.email}</p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 mt-4 text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    退出登录
                  </Button>
                </CardContent>
              </Card>

            {/* Recent Alerts */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">最新预警</CardTitle>
                <CardDescription className="text-gray-300">需要关注的事件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold">高风险预警</p>
                    <p className="text-gray-300 text-xs">负面情感激增，建议立即处理</p>
                    <p className="text-gray-400 text-xs mt-1">2分钟前</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold">中风险提醒</p>
                    <p className="text-gray-300 text-xs">话题热度异常上升</p>
                    <p className="text-gray-400 text-xs mt-1">15分钟前</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold">信息提醒</p>
                    <p className="text-gray-300 text-xs">新增关键词监控</p>
                    <p className="text-gray-400 text-xs mt-1">1小时前</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">平台数据分布</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">微博</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="text-white text-sm">45%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">抖音</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: "32%" }}></div>
                    </div>
                    <span className="text-white text-sm">32%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">小红书</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-pink-400 h-2 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                    <span className="text-white text-sm">18%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">其他</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                    <span className="text-white text-sm">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </RequireAuth>
  )
}
