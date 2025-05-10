// meme生成相关API（Serverless）
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // TODO: meme生成逻辑
  res.status(200).json({ message: 'meme生成API占位' });
}
