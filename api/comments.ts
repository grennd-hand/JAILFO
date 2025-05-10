// 评论API（Serverless）
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // TODO: MongoDB评论逻辑
  res.status(200).json({ message: '评论API占位' });
}
