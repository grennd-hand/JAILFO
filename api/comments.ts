require('dotenv').config()

// 评论API（Serverless）
const mongoose = require('mongoose')
const url = require('url')

const MONGODB_URI = process.env.MONGODB_URI

if (!(global as any)._mongoose) {
  (global as any)._mongoose = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const CommentSchema = new mongoose.Schema({
  postId: { type: String, default: null }, // null 表示主帖，否则是评论
  nickname: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
})

const CommentModel = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)

module.exports = async (req: any, res: any) => {
  await (global as any)._mongoose

  const parsedUrl = url.parse(req.url, true)
  const idMatch = /^\/api\/comments\/(\w+)$/.exec(parsedUrl.pathname || '')

  if (req.method === 'GET' && parsedUrl.pathname === '/api/comments') {
    // 查询所有主帖，按时间倒序
    const posts = await CommentModel.find({ postId: null }).sort({ createdAt: -1 })
    res.status(200).json(posts)
  } else if (req.method === 'POST' && parsedUrl.pathname === '/api/comments') {
    // 新增主帖或评论
    const { postId, nickname, content } = req.body
    if (!content) {
      res.status(400).json({ error: '内容不能为空' })
      return
    }
    const realPostId = postId ? postId : null;
    const comment = await CommentModel.create({ postId: realPostId, nickname, content })
    res.status(201).json(comment)
  } else if (req.method === 'GET' && idMatch) {
    // 查询某主帖下的所有评论
    const postId = idMatch[1]
    const comments = await CommentModel.find({ postId }).sort({ createdAt: 1 })
    res.status(200).json(comments)
  } else {
    res.status(404).json({ error: 'Not Found' })
  }
}

// 本地调试入口
if (require.main === module) {
  const http = require('http')
  const PORT = 3001
  http.createServer(async (req: any, res: any) => {
    res.status = function (code: number) {
      res.statusCode = code
      return res
    }
    res.json = function (data: any) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data))
    }

    const parsedUrl = url.parse(req.url, true)
    if (req.method === 'POST' && parsedUrl.pathname === '/api/comments') {
      let body = ''
      req.on('data', (chunk: any) => { body += chunk })
      req.on('end', async () => {
        try {
          req.body = JSON.parse(body)
        } catch (e) {
          req.body = {}
        }
        await module.exports(req, res)
      })
    } else {
      await module.exports(req, res)
    }
  }).listen(PORT, () => {
    console.log('本地API调试服务已启动: http://localhost:' + PORT + '/api/comments')
  })
}
