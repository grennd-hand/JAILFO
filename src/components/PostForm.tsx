import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import ProgressBar from './ProgressBar';

interface PostFormProps {
  postId?: string;
  onSuccess?: (content: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ postId, onSuccess }) => {
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setLoading(true);
    try {
      const [response] = await Promise.all([
        api.post('/comments', { postId, content, nickname }),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);
      
      onSuccess?.(content);
      setContent('');
      setNickname('');
    } catch (error) {
      console.error('发帖失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        <ProgressBar isVisible={loading} />
      </AnimatePresence>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="flex-1 bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600/50 
                     focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20
                     transition-all duration-200 placeholder-gray-400"
            placeholder="昵称（可选）"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            maxLength={12}
          />
        </div>
        
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-lg border border-gray-600/50
                   focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20
                   transition-all duration-200 resize-none placeholder-gray-400"
          placeholder={postId ? '写下你的评论...' : '发帖内容...'}
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={postId ? 2 : 4}
          maxLength={300}
        />
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            还可以输入 {300 - content.length} 字
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg
                     shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                     hover:shadow-orange-500/20"
            disabled={loading || !content.trim()}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                发送中...
              </span>
            ) : postId ? '评论' : '发帖'}
          </motion.button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
