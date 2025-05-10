// 评论API（Serverless）
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!global._mongoose) {
  global._mongoose = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const CommentSchema = new mongoose.Schema({
  nickname: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
})

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)

module.exports = async (req, res) => {
  await global._mongoose

  if (req.method === 'GET') {
    // 查询所有评论，按时间倒序
    const comments = await Comment.find().sort({ createdAt: -1 })
    res.status(200).json(comments)
  } else if (req.method === 'POST') {
    // 新增评论
    const { nickname, content } = req.body
    if (!content) {
      res.status(400).json({ error: '内容不能为空' })
      return
    }
    const comment = await Comment.create({ nickname, content })
    res.status(201).json(comment)
  } else {
    res.status(405).json({ error: '不支持该方法' })
  }
}
