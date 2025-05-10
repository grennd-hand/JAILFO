const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 模拟数据存储
let posts = [
  {
    _id: '1',
    nickname: '匿名',
    content: '欢迎来到FO监狱讨论区',
    createdAt: new Date().toISOString(),
    comments: []
  }
];

// 获取帖子列表
app.get('/comments', (req, res) => {
  res.json(posts);
});

// 创建新帖子
app.post('/comments', (req, res) => {
  const { content, nickname } = req.body;
  const post = {
    _id: Date.now().toString(),
    content,
    nickname: nickname || '匿名',
    createdAt: new Date().toISOString(),
    comments: []
  };
  posts.unshift(post);
  res.json(post);
});

// 获取评论列表
app.get('/comments/:postId', (req, res) => {
  const post = posts.find(p => p._id === req.params.postId);
  if (!post) return res.status(404).json({ message: '帖子不存在' });
  res.json(post.comments);
});

// 添加评论
app.post('/comments/:postId', (req, res) => {
  const { content, nickname } = req.body;
  const post = posts.find(p => p._id === req.params.postId);
  if (!post) return res.status(404).json({ message: '帖子不存在' });
  
  const comment = {
    _id: Date.now().toString(),
    content,
    nickname: nickname || '匿名',
    createdAt: new Date().toISOString()
  };
  
  post.comments.push(comment);
  res.json(comment);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
}); 