"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  Heart,
  MessageSquare,
  Users,
  Globe,
  PieChart,
  LineChart,
} from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"

export default function AnalyticsPage() {
  const user = {
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar isAuthenticated={true} user={user} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">数据分析报告</h1>
            <p className="text-gray-300">深度洞察情感趋势和用户行为</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="bg-transparent border-white/20 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              时间范围
            </Button>
            <Button variant="outline" className="bg-transparent border-white/20 text-white">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Download className="mr-2 h-4 w-4" />
              导出报告
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/5 border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/20">
              总览
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-purple-500/20">
              情感分析
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-purple-500/20">
              趋势分析
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-purple-500/20">
              平台分析
            </TabsTrigger>
            <TabsTrigger value="keywords" className="data-[state=active]:bg-purple-500/20">
              关键词分析
            </TabsTrigger>
          </TabsList>

          {/* 总览 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 关键指标 */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">总提及量</p>
                      <p className="text-2xl font-bold text-white">24,567</p>
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
                      <p className="text-gray-400 text-sm">情感得分</p>
                      <p className="text-2xl font-bold text-white">7.2</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">+0.3</span>
                      </div>
                    </div>
                    <Heart className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">活跃用户</p>
                      <p className="text-2xl font-bold text-white">8,924</p>
                      <div className="flex items-center mt-1">
                        <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                        <span className="text-red-400 text-sm">-2.1%</span>
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
                      <p className="text-gray-400 text-sm">覆盖平台</p>
                      <p className="text-2xl font-bold text-white">8</p>
                      <div className="flex items-center mt-1">
                        <Globe className="h-4 w-4 text-blue-400 mr-1" />
                        <span className="text-blue-400 text-sm">全平台</span>
                      </div>
                    </div>
                    <Globe className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 图表区域 */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LineChart className="mr-2 h-5 w-5" />
                    情感趋势图
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <LineChart className="h-12 w-12 mx-auto mb-4" />
                      <p>情感趋势图表</p>
                      <p className="text-sm">（集成图表库后显示）</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    情感分布
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">正面情感</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                        <span className="text-white font-bold w-12">68%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-300">中性情感</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-gray-400 h-2 rounded-full" style={{ width: "22%" }}></div>
                        </div>
                        <span className="text-white font-bold w-12">22%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span className="text-gray-300">负面情感</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-red-400 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                        <span className="text-white font-bold w-12">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 热门话题 */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">热门话题排行</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { topic: "#新品发布会", mentions: 15234, sentiment: "positive", change: "+12.3%" },
                    { topic: "#用户体验优化", mentions: 8967, sentiment: "neutral", change: "+5.7%" },
                    { topic: "#客服响应时间", mentions: 3421, sentiment: "negative", change: "-2.1%" },
                    { topic: "#产品功能更新", mentions: 2156, sentiment: "positive", change: "+8.9%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400 font-mono">#{index + 1}</span>
                        <span className="text-white font-semibold">{item.topic}</span>
                        <Badge
                          className={
                            item.sentiment === "positive"
                              ? "bg-green-500/20 text-green-400"
                              : item.sentiment === "negative"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-gray-500/20 text-gray-400"
                          }
                        >
                          {item.sentiment === "positive" ? "正面" : item.sentiment === "negative" ? "负面" : "中性"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-300">{item.mentions.toLocaleString()} 提及</span>
                        <span className={item.change.startsWith("+") ? "text-green-400" : "text-red-400"}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 其他标签页内容 */}
          <TabsContent value="sentiment" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">情感分析详情</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>情感分析详情功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">趋势分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>趋势分析功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">平台分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>平台分析功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">关键词分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>关键词分析功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
