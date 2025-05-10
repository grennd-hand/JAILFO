// 数据埋点API（Serverless）
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // TODO: 数据埋点逻辑
  res.status(200).json({ message: '数据埋点API占位' });
}
