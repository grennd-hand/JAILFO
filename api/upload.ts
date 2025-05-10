// 上传API（Serverless）
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // TODO: 文件上传逻辑
  res.status(200).json({ message: '上传API占位' });
}
