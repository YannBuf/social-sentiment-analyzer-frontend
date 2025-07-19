"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Plus,
  Settings,
  Bell,
  Mail,
  MessageSquare,
  Trash2,
  Edit,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { useState } from "react"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: "负面情感激增预警",
      type: "sentiment",
      level: "high",
      condition: "负面情感占比 > 30%",
      status: "active",
      triggered: true,
      lastTriggered: "2分钟前",
      notifications: ["email", "sms"],
    },
    {
      id: 2,
      name: "品牌提及量异常",
      type: "volume",
      level: "medium",
      condition: "提及量变化 > 50%",
      status: "active",
      triggered: false,
      lastTriggered: "昨天 14:30",
      notifications: ["email"],
    },
    {
      id: 3,
      name: "竞品话题热度上升",
      type: "competitor",
      level: "low",
      condition: "竞品提及量 > 1000",
      status: "paused",
      triggered: false,
      lastTriggered: "3天前",
      notifications: ["email", "webhook"],
    },
  ])

  const user = {
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const handleCreateAlert = () => {
    console.log("创建新预警...")
  }

  const toggleAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: alert.status === "active" ? "paused" : "active" } : alert,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar isAuthenticated={true} user={user} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">预警管理</h1>
            <p className="text-gray-300">智能监控异常情况，及时预警风险事件</p>
          </div>
          <Button
            onClick={handleCreateAlert}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            创建预警
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/20">
              预警概览
            </TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-purple-500/20">
              预警规则
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20">
              预警历史
            </TabsTrigger>
          </TabsList>

          {/* 预警概览 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 统计卡片 */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">活跃预警</p>
                      <p className="text-2xl font-bold text-white">5</p>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">今日触发</p>
                      <p className="text-2xl font-bold text-white">3</p>
                      <div className="flex items-center mt-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-yellow-400 text-sm">需关注</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">高风险事件</p>
                      <p className="text-2xl font-bold text-white">1</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-red-400 mr-1" />
                        <span className="text-red-400 text-sm">紧急</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">响应时间</p>
                      <p className="text-2xl font-bold text-white">2.3分</p>
                      <div className="flex items-center mt-1">
                        <TrendingDown className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">优化中</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 最新预警事件 */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">最新预警事件</CardTitle>
                <CardDescription className="text-gray-300">需要立即关注的预警事件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold">负面情感激增预警</h3>
                        <Badge className="bg-red-500/20 text-red-400">高风险</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">检测到品牌相关负面情感占比达到35%，超过预设阈值30%</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          2分钟前触发
                        </span>
                        <span>影响范围: 微博、抖音</span>
                        <span>提及量: 1,247</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
                        立即处理
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                        查看详情
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold">品牌提及量异常上升</h3>
                        <Badge className="bg-yellow-500/20 text-yellow-400">中风险</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">品牌提及量在过去1小时内增长了65%，可能存在突发事件</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          15分钟前触发
                        </span>
                        <span>影响范围: 全平台</span>
                        <span>提及量: 3,892</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        关注
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                        查看详情
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold">新增关键词监控</h3>
                        <Badge className="bg-blue-500/20 text-blue-400">信息</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        系统自动检测到新的相关关键词"AI助手"，建议添加到监控列表
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          1小时前触发
                        </span>
                        <span>相关度: 85%</span>
                        <span>提及量: 567</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        添加监控
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                        忽略
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 预警规则 */}
          <TabsContent value="rules" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">预警规则管理</CardTitle>
                    <CardDescription className="text-gray-300">配置和管理预警触发条件</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Plus className="mr-2 h-4 w-4" />
                    新建规则
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-white font-semibold">{alert.name}</h3>
                            <Badge
                              className={
                                alert.level === "high"
                                  ? "bg-red-500/20 text-red-400"
                                  : alert.level === "medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-blue-500/20 text-blue-400"
                              }
                            >
                              {alert.level === "high" ? "高风险" : alert.level === "medium" ? "中风险" : "低风险"}
                            </Badge>
                            <Badge
                              className={
                                alert.status === "active"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }
                            >
                              {alert.status === "active" ? "启用" : "暂停"}
                            </Badge>
                            {alert.triggered && <Badge className="bg-orange-500/20 text-orange-400">已触发</Badge>}
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">触发条件</p>
                              <p className="text-white">{alert.condition}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">通知方式</p>
                              <div className="flex items-center space-x-2 mt-1">
                                {alert.notifications.includes("email") && <Mail className="h-4 w-4 text-blue-400" />}
                                {alert.notifications.includes("sms") && (
                                  <MessageSquare className="h-4 w-4 text-green-400" />
                                )}
                                {alert.notifications.includes("webhook") && (
                                  <Bell className="h-4 w-4 text-purple-400" />
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-400">最后触发</p>
                              <p className="text-white">{alert.lastTriggered}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleAlert(alert.id)}
                            className="bg-transparent border-white/20 text-white"
                          >
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent border-red-500/20 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 创建预警规则表单 */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">创建新预警规则</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-white">规则名称</Label>
                    <Input placeholder="例如: 负面情感预警" className="bg-white/5 border-white/20 text-white" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-white">预警级别</Label>
                    <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white">
                      <option value="low">低风险</option>
                      <option value="medium">中风险</option>
                      <option value="high">高风险</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-white">触发条件</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <select className="p-2 bg-white/5 border border-white/20 rounded-md text-white">
                      <option value="sentiment">情感指标</option>
                      <option value="volume">提及量</option>
                      <option value="trend">趋势变化</option>
                    </select>
                    <select className="p-2 bg-white/5 border border-white/20 rounded-md text-white">
                      <option value="gt">大于</option>
                      <option value="lt">小于</option>
                      <option value="eq">等于</option>
                    </select>
                    <Input placeholder="阈值" className="bg-white/5 border-white/20 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-white">通知方式</Label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 text-white">
                      <input type="checkbox" className="rounded" />
                      <Mail className="h-4 w-4" />
                      <span>邮件通知</span>
                    </label>
                    <label className="flex items-center space-x-2 text-white">
                      <input type="checkbox" className="rounded" />
                      <MessageSquare className="h-4 w-4" />
                      <span>短信通知</span>
                    </label>
                    <label className="flex items-center space-x-2 text-white">
                      <input type="checkbox" className="rounded" />
                      <Bell className="h-4 w-4" />
                      <span>Webhook</span>
                    </label>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">创建预警规则</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 预警历史 */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">预警历史记录</CardTitle>
                <CardDescription className="text-gray-300">查看历史预警事件和处理记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>预警历史功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
