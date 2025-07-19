"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Search, Globe, Loader2, CheckCircle, TrendingUp, Clock, Filter, Eye, RefreshCw } from "lucide-react"
import { Brain, Download, Share2, MessageSquare, Heart, BarChart3, Zap } from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/app/contexts/authcontext"

interface SearchResult {
  id: string
  platform: string
  content: string
  author: string
  publishTime: string
  likes: number
  comments: number
  shares: number
  url: string
}

interface AnalysisResult {
  overall_sentiment: {
    label: string
    confidence: number
    score: number
  }
  emotions: {
    joy: number
    anger: number
    fear: number
    sadness: number
    surprise: number
    trust: number
    anticipation: number
    disgust: number
  }
  keywords: string[]
  topics: string[]
  summary: string
  insights: string[]
  recommendations: string[]
}

export default function SearchAnalysisPage() {
  const { user, logout } = useAuth()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["weibo", "douyin", "xiaohongshu"])
  const [isSearching, setIsSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [searchHistory, setSearchHistory] = useState([
    {
      id: 1,
      query: "人工智能发展趋势",
      timestamp: "2024-01-15 14:30:25",
      resultsCount: 156,
      sentiment: "positive",
      platforms: ["微博", "抖音"],
    },
    {
      id: 2,
      query: "新能源汽车市场",
      timestamp: "2024-01-15 13:45:10",
      resultsCount: 89,
      sentiment: "neutral",
      platforms: ["小红书", "知乎"],
    },
  ])
  const [inputText, setInputText] = useState("")
  const [singleAnalysisResult, setSingleAnalysisResult] = useState<AnalysisResult | null>(null)

  // 检测来源以确定导航栏模式
  const from = searchParams.get("from")
  const isFromDashboard = from === "dashboard"
  const isAuthenticated = true // 假设用户已登录，实际应该从认证状态获取

  const platforms = [
    { id: "weibo", name: "微博", icon: "🐦" },
    { id: "douyin", name: "抖音", icon: "🎵" },
    { id: "xiaohongshu", name: "小红书", icon: "📖" },
    { id: "zhihu", name: "知乎", icon: "🤔" },
    { id: "bilibili", name: "B站", icon: "📺" },
    { id: "toutiao", name: "今日头条", icon: "📰" },
  ]

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }
  const displayUser = {
    name: user?.username || user?.email || "匿名用户",
    email: user?.email || "",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const handleSearch = async () => {
    if (!searchQuery.trim() || selectedPlatforms.length === 0) return

    setIsSearching(true)
    setSearchProgress(0)
    setSearchResults([])
    setAnalysisResult(null)

    // 模拟搜索进度
    const searchInterval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(searchInterval)
          setIsSearching(false)
          // 模拟搜索结果
          const mockResults: SearchResult[] = [
            {
              id: "1",
              platform: "微博",
              content: `关于"${searchQuery}"的讨论：这个话题确实很有意思，我觉得未来发展前景很好，值得关注和投资。`,
              author: "科技达人小王",
              publishTime: "2024-01-15 14:30",
              likes: 128,
              comments: 45,
              shares: 23,
              url: "https://weibo.com/example1",
            },
            {
              id: "2",
              platform: "抖音",
              content: `${searchQuery}真的太棒了！强烈推荐大家了解一下，这个趋势不容错过。`,
              author: "生活博主Lisa",
              publishTime: "2024-01-15 13:45",
              likes: 256,
              comments: 78,
              shares: 34,
              url: "https://douyin.com/example2",
            },
            {
              id: "3",
              platform: "小红书",
              content: `分享一下我对${searchQuery}的看法，虽然有些争议，但整体来说还是比较看好的。`,
              author: "时尚达人Amy",
              publishTime: "2024-01-15 12:20",
              likes: 89,
              comments: 32,
              shares: 15,
              url: "https://xiaohongshu.com/example3",
            },
          ]
          setSearchResults(mockResults)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleAnalyze = async () => {
    if (searchResults.length === 0) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // 模拟分析进度
    const analysisInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(analysisInterval)
          setIsAnalyzing(false)
          // 模拟OpenAI分析结果
          const mockAnalysis: AnalysisResult = {
            overall_sentiment: {
              label: "积极",
              confidence: 0.87,
              score: 0.72,
            },
            emotions: {
              joy: 0.65,
              trust: 0.58,
              anticipation: 0.45,
              surprise: 0.23,
              fear: 0.12,
              anger: 0.08,
              sadness: 0.15,
              disgust: 0.05,
            },
            keywords: ["发展", "前景", "投资", "趋势", "推荐"],
            topics: ["技术发展", "市场前景", "投资机会"],
            summary: `基于对"${searchQuery}"相关内容的分析，整体舆论呈现积极态度。用户普遍对该话题表现出乐观情绪，认为具有良好的发展前景和投资价值。`,
            insights: [
              "用户对该话题的关注度较高，讨论活跃",
              "正面情感占主导地位，负面声音较少",
              "主要集中在发展前景和投资价值的讨论",
              "不同平台用户的观点基本一致",
            ],
            recommendations: [
              "可以加大在该领域的宣传投入",
              "关注用户关心的具体问题并及时回应",
              "利用积极舆论进行品牌建设",
              "持续监控舆情变化趋势",
            ],
          }
          setAnalysisResult(mockAnalysis)

          // 添加到搜索历史
          const newHistoryItem = {
            id: Date.now(),
            query: searchQuery,
            timestamp: new Date().toLocaleString("zh-CN"),
            resultsCount: searchResults.length,
            sentiment: mockAnalysis.overall_sentiment.label === "积极" ? "positive" : "neutral",
            platforms: selectedPlatforms.map((id) => platforms.find((p) => p.id === id)?.name || id),
          }
          setSearchHistory((prev) => [newHistoryItem, ...prev])

          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const handleSingleAnalyze = async () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)

    // 模拟分析过程
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        overall_sentiment: {
          label: "积极",
          confidence: 0.87,
          score: 0.72,
        },
        emotions: {
          joy: 0.65,
          trust: 0.58,
          anticipation: 0.45,
          surprise: 0.23,
          fear: 0.12,
          anger: 0.08,
          sadness: 0.15,
          disgust: 0.05,
        },
        keywords: ["产品", "体验", "满意", "推荐"],
        topics: ["用户体验", "产品评价"],
        summary: `基于输入文本的分析，整体情感倾向为积极。`,
        insights: ["文本表达了对产品的正面评价", "用户对产品体验非常满意", "包含明确的推荐意图"],
        recommendations: ["可以将此类正面反馈用于营销推广", "继续保持产品质量和用户体验", "鼓励用户分享更多使用心得"],
      }
      setSingleAnalysisResult(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar
        isAuthenticated={!!user}
        user={user ? displayUser : undefined}
        onLogout={logout}
        forceMode="dashboard" // ✅ 加上这个
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">智能搜索分析</h1>
          <p className="text-gray-300">输入关键词，AI自动搜索抓取相关内容并进行深度情感分析</p>
        </div>

        <Tabs defaultValue="single" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
            <TabsTrigger value="single" className="data-[state=active]:bg-purple-500/20">
              单文本分析
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-purple-500/20">
              智能搜索
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-purple-500/20">
              搜索结果
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20">
              搜索历史
            </TabsTrigger>
          </TabsList>

          {/* 单文本分析 */}
          <TabsContent value="single" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 输入区域 */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    文本输入
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    输入您想要分析的文本内容，支持中文、英文等多种语言
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="请输入要分析的文本内容，例如：这个产品的用户体验真的很棒，界面设计简洁美观，功能也很实用，强烈推荐给大家！"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-40 bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{inputText.length}/5000 字符</span>
                    <Button
                      onClick={handleSingleAnalyze}
                      disabled={!inputText.trim() || isAnalyzing}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          分析中...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          开始分析
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 分析结果 */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      分析结果
                    </div>
                    {singleAnalysisResult && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!singleAnalysisResult ? (
                    <div className="text-center py-12 text-gray-400">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>请输入文本并点击"开始分析"查看结果</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* 整体情感 */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                          <Heart className="mr-2 h-4 w-4" />
                          整体情感倾向
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <div>
                              <p className="text-white font-semibold">
                                {singleAnalysisResult.overall_sentiment.label}情感
                              </p>
                              <p className="text-gray-400 text-sm">
                                置信度: {(singleAnalysisResult.overall_sentiment.confidence * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              singleAnalysisResult.overall_sentiment.label === "积极"
                                ? "bg-green-500/20 text-green-400"
                                : singleAnalysisResult.overall_sentiment.label === "消极"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-gray-500/20 text-gray-400"
                            }
                          >
                            {singleAnalysisResult.overall_sentiment.label}
                          </Badge>
                        </div>
                      </div>

                      {/* 情感细分 */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-3">情感细分分析</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(singleAnalysisResult.emotions).map(([emotion, value]) => (
                            <div key={emotion} className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm capitalize">{emotion}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-700 rounded-full h-1.5">
                                  <div
                                    className="bg-purple-400 h-1.5 rounded-full"
                                    style={{ width: `${value * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-white text-xs w-8">{(value * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 关键词和实体 */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-3">关键词</h3>
                          <div className="flex flex-wrap gap-2">
                            {singleAnalysisResult.keywords.map((keyword, index) => (
                              <Badge key={index} className="bg-blue-500/20 text-blue-300">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-3">话题分类</h3>
                          <div className="flex flex-wrap gap-2">
                            {singleAnalysisResult.topics.map((topic, index) => (
                              <Badge key={index} className="bg-purple-500/20 text-purple-300">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 示例文本 */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">试试这些示例文本</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card
                    className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                    onClick={() =>
                      setInputText("这个产品的用户体验真的很棒，界面设计简洁美观，功能也很实用，强烈推荐给大家！")
                    }
                  >
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-green-500/20 text-green-400">正面示例</Badge>
                      <p className="text-gray-300 text-sm">
                        "这个产品的用户体验真的很棒，界面设计简洁美观，功能也很实用，强烈推荐给大家！"
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                    onClick={() => setInputText("客服态度很差，问题解决不了，浪费了我很多时间，非常失望。")}
                  >
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-red-500/20 text-red-400">负面示例</Badge>
                      <p className="text-gray-300 text-sm">
                        "客服态度很差，问题解决不了，浪费了我很多时间，非常失望。"
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                    onClick={() => setInputText("今天天气还不错，去公园走了走，看到很多人在锻炼。")}
                  >
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-gray-500/20 text-gray-400">中性示例</Badge>
                      <p className="text-gray-300 text-sm">"今天天气还不错，去公园走了走，看到很多人在锻炼。"</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 其他标签页内容保持不变... */}
          {/* 智能搜索 */}
          <TabsContent value="search" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* 搜索配置 */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Search className="mr-2 h-5 w-5" />
                      搜索配置
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      输入关键词并选择要搜索的平台，AI将自动抓取和分析相关内容
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="search-query" className="text-white">
                        搜索关键词 *
                      </Label>
                      <Input
                        id="search-query"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="例如: 人工智能发展趋势、新能源汽车、元宇宙技术..."
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      />
                      <p className="text-gray-400 text-sm">支持中英文关键词，建议使用具体的话题或产品名称</p>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-white">选择搜索平台</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {platforms.map((platform) => (
                          <label
                            key={platform.id}
                            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedPlatforms.includes(platform.id)
                                ? "bg-purple-500/20 border-purple-500/50 text-white"
                                : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedPlatforms.includes(platform.id)}
                              onChange={() => handlePlatformToggle(platform.id)}
                              className="rounded"
                            />
                            <span className="text-lg">{platform.icon}</span>
                            <span className="font-medium">{platform.name}</span>
                          </label>
                        ))}
                      </div>
                      <p className="text-gray-400 text-sm">
                        已选择 {selectedPlatforms.length} 个平台，建议选择2-4个平台以获得更全面的数据
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">搜索数量限制</Label>
                        <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white">
                          <option value="50">50条内容</option>
                          <option value="100">100条内容</option>
                          <option value="200">200条内容</option>
                          <option value="500">500条内容</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">时间范围</Label>
                        <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white">
                          <option value="1d">最近1天</option>
                          <option value="3d">最近3天</option>
                          <option value="7d">最近7天</option>
                          <option value="30d">最近30天</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={handleSearch}
                      disabled={!searchQuery.trim() || selectedPlatforms.length === 0 || isSearching}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isSearching ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          搜索中...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          开始智能搜索
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* 搜索进度 */}
                {isSearching && (
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Globe className="mr-2 h-5 w-5" />
                        搜索进度
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">正在搜索相关内容...</span>
                          <span className="text-white">{searchProgress}%</span>
                        </div>
                        <Progress value={searchProgress} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {selectedPlatforms.map((platformId) => {
                          const platform = platforms.find((p) => p.id === platformId)
                          return (
                            <div key={platformId} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                              <span className="text-gray-300">{platform?.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 搜索结果预览 */}
                {searchResults.length > 0 && (
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <MessageSquare className="mr-2 h-5 w-5" />
                          搜索结果预览
                        </CardTitle>
                        <Badge className="bg-green-500/20 text-green-400">找到 {searchResults.length} 条相关内容</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {searchResults.slice(0, 3).map((result) => (
                          <div key={result.id} className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-blue-500/20 text-blue-400">{result.platform}</Badge>
                                <span className="text-gray-400 text-sm">@{result.author}</span>
                              </div>
                              <span className="text-gray-400 text-sm">{result.publishTime}</span>
                            </div>
                            <p className="text-white mb-3">{result.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Heart className="mr-1 h-3 w-3" />
                                {result.likes}
                              </span>
                              <span className="flex items-center">
                                <MessageSquare className="mr-1 h-3 w-3" />
                                {result.comments}
                              </span>
                              <span className="flex items-center">
                                <Share2 className="mr-1 h-3 w-3" />
                                {result.shares}
                              </span>
                            </div>
                          </div>
                        ))}
                        {searchResults.length > 3 && (
                          <div className="text-center">
                            <Button variant="outline" className="bg-transparent border-white/20 text-white">
                              查看全部 {searchResults.length} 条结果
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* 侧边栏 */}
              <div className="space-y-6">
                {/* AI分析 */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Brain className="mr-2 h-5 w-5" />
                      AI深度分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {searchResults.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <Brain className="h-8 w-8 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">完成搜索后可进行AI分析</p>
                      </div>
                    ) : isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 mx-auto mb-3 text-purple-400 animate-spin" />
                          <p className="text-white font-semibold">AI正在分析中...</p>
                          <p className="text-gray-400 text-sm">使用OpenAI进行深度情感分析</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">分析进度</span>
                            <span className="text-white">{analysisProgress}%</span>
                          </div>
                          <Progress value={analysisProgress} className="h-2" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center">
                          <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-400" />
                          <p className="text-white font-semibold">准备就绪</p>
                          <p className="text-gray-400 text-sm">点击开始AI分析</p>
                        </div>
                        <Button onClick={handleAnalyze} className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
                          <Brain className="mr-2 h-4 w-4" />
                          开始AI分析
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 快速统计 */}
                {searchResults.length > 0 && (
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">快速统计</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">搜索结果</span>
                        <span className="text-white font-bold">{searchResults.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">覆盖平台</span>
                        <span className="text-white font-bold">{selectedPlatforms.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">总互动量</span>
                        <span className="text-white font-bold">
                          {searchResults.reduce((sum, result) => sum + result.likes + result.comments, 0)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 搜索结果和分析 */}
          <TabsContent value="results" className="space-y-6">
            {analysisResult ? (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* 分析结果 */}
                <div className="lg:col-span-2 space-y-6">
                  {/* 总体情感 */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <div className="flex items-center">
                          <Heart className="mr-2 h-5 w-5" />
                          总体情感分析
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold">情感倾向</h3>
                            <Badge
                              className={
                                analysisResult.overall_sentiment.label === "积极"
                                  ? "bg-green-500/20 text-green-400"
                                  : analysisResult.overall_sentiment.label === "消极"
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-gray-500/20 text-gray-400"
                              }
                            >
                              {analysisResult.overall_sentiment.label}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">情感得分</span>
                              <span className="text-white">
                                {(analysisResult.overall_sentiment.score * 10).toFixed(1)}/10
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-green-400 h-2 rounded-full"
                                style={{ width: `${analysisResult.overall_sentiment.score * 100}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">置信度</span>
                              <span className="text-white">
                                {(analysisResult.overall_sentiment.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-3">情感分布</h3>
                          <div className="space-y-2">
                            {Object.entries(analysisResult.emotions)
                              .sort(([, a], [, b]) => b - a)
                              .slice(0, 4)
                              .map(([emotion, value]) => (
                                <div key={emotion} className="flex items-center justify-between">
                                  <span className="text-gray-300 text-sm capitalize">{emotion}</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-16 bg-gray-700 rounded-full h-1.5">
                                      <div
                                        className="bg-purple-400 h-1.5 rounded-full"
                                        style={{ width: `${value * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-white text-xs w-8">{(value * 100).toFixed(0)}%</span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI洞察 */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Brain className="mr-2 h-5 w-5" />
                        AI深度洞察
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-white font-semibold mb-3">内容摘要</h3>
                        <p className="text-gray-300 leading-relaxed">{analysisResult.summary}</p>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold mb-3">关键洞察</h3>
                        <div className="space-y-2">
                          {analysisResult.insights.map((insight, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold mb-3">行动建议</h3>
                        <div className="space-y-2">
                          {analysisResult.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <TrendingUp className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{recommendation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 侧边栏 */}
                <div className="space-y-6">
                  {/* 关键词云 */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">关键词</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.map((keyword, index) => (
                          <Badge key={index} className="bg-blue-500/20 text-blue-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 话题分类 */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">话题分类</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {analysisResult.topics.map((topic, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 数据来源 */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">数据来源</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">搜索关键词</span>
                          <Badge className="bg-purple-500/20 text-purple-300">{searchQuery}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">数据条数</span>
                          <span className="text-white font-bold">{searchResults.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">分析时间</span>
                          <span className="text-white text-sm">{new Date().toLocaleString("zh-CN")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400 opacity-50" />
                  <h3 className="text-white text-xl font-semibold mb-2">暂无分析结果</h3>
                  <p className="text-gray-300 mb-6">请先进行搜索并完成AI分析</p>
                  <Button
                    onClick={() => (window.location.hash = "#search")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    开始搜索分析
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 搜索历史 */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">搜索历史</CardTitle>
                  <Button variant="outline" className="bg-transparent border-white/20 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    筛选
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchHistory.map((item) => (
                    <div key={item.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-white font-semibold">{item.query}</h3>
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
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {item.timestamp}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              {item.resultsCount} 条结果
                            </div>
                            <div className="flex items-center">
                              <Globe className="mr-1 h-3 w-3" />
                              {item.platforms.join(", ")}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
