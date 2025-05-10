import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import Barrage from '../components/Barrage';

const Forum = () => {
  const [barrages, setBarrages] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  // 监听新消息来更新弹幕
  const handleNewPost = (content: string) => {
    // 只发送内容文本作为弹幕
    const barrageText = content.trim();
    setBarrages(prev => [...prev, barrageText]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* 弹幕层 */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <Barrage barrage={barrages} speed={1.2} maxBarrages={15} />
      </div>

      {/* 主内容 */}
      <div className="relative z-10 max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
              meme监狱广场 · 讨论区
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-lg 
                       transition-all duration-200 transform hover:shadow-orange-500/20"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '收起' : '发帖'}
            </motion.button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50 shadow-xl">
                  <PostForm onSuccess={(content) => {
                    handleNewPost(content);
                  }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <PostList onNewPost={handleNewPost} />
          </div>
        </motion.div>
      </div>

      {/* 装饰元素 */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-500/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
    </div>
  );
};

export default Forum;
