import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 随机生成昵称、金额、编号等
function randomNickname() {
  const names = ['韭菜王', '币圈老哥', '链上猎人', 'FOMO侠', '割肉侠', '梭哈王', '亏麻了', '币圈小白'];
  return names[Math.floor(Math.random() * names.length)];
}
function randomAmount() {
  return (Math.random() * 100000 - Math.random() * 1000).toFixed(2);
}
function randomId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}
function randomAvatar() {
  const id = Math.floor(Math.random() * 1000);
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${id}`;
}

const genToken = () => {
  return {
    nickname: randomNickname(),
    amount: randomAmount(),
    id: randomId(),
    avatar: randomAvatar(),
    time: new Date().toLocaleString('zh-CN', { hour12: false })
  };
};

const Token: React.FC = () => {
  const [token, setToken] = useState(genToken());

  const handleGenerate = () => setToken(genToken());
  const handleCopy = () => {
    const text = `身份令牌\n昵称: ${token.nickname}\n亏损金额: ${token.amount}\n编号: ${token.id}\n生成时间: ${token.time}`;
    navigator.clipboard.writeText(text);
    alert('令牌信息已复制');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <motion.div
        className="w-full max-w-xs bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl shadow-2xl p-6 flex flex-col items-center relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(255,140,0,0.3)' }}
      >
        <img src={token.avatar} alt="avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-4 bg-white" />
        <div className="text-white text-2xl font-bold mb-2 tracking-wide drop-shadow">{token.nickname}</div>
        <div className="text-lg text-white/80 mb-2">亏损金额 <span className="font-mono text-orange-200">¥{token.amount}</span></div>
        <div className="text-sm text-white/70 mb-1">身份编号 <span className="font-mono">{token.id}</span></div>
        <div className="text-xs text-white/50 mb-4">生成时间 {token.time}</div>
        <div className="flex gap-3 mt-2">
          <button onClick={handleGenerate} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/40 text-white font-bold shadow transition-all">生成新令牌</button>
          <button onClick={handleCopy} className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/40 text-white font-bold shadow transition-all">分享</button>
        </div>
      </motion.div>
      <div className="mt-8 text-gray-400 text-sm text-center">本页面纯属娱乐，数据随机生成，灵感来源于 <a href=\"https://bnb-card.vercel.app/\" className=\"underline text-orange-400\" target=\"_blank\">bnb-card</a></div>
    </div>
  );
};

export default Token; 