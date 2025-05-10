import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import PostForm from './PostForm';
import CommentList from './CommentList';

interface PostItemProps {
  post: any;
  onCommented: (content: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onCommented }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setLoading(true);
      const fetchComments = async () => {
        try {
          const res = await api.get(`/comments/${post._id}`);
          setComments(res.data);
        } catch (error) {
          setComments([]);
        } finally {
          setLoading(false);
        }
      };

      fetchComments();

      // 每3秒自动刷新评论
      const interval = setInterval(fetchComments, 3000);
      return () => clearInterval(interval);
    }
  }, [showComments, refresh, post._id]);

  const handleCommentSuccess = (content: string) => {
    // 立即刷新评论列表
    setRefresh(r => r + 1);
    // 强制重新获取评论
    api.get(`/comments/${post._id}`)
      .then(res => setComments(res.data))
      .catch(() => setComments([]));
  };

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl
                hover:shadow-orange-500/5 transition-all duration-300"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-lg font-bold">
            {post.nickname?.[0]?.toUpperCase() || '匿'}
          </div>
          <div>
            <div className="font-bold text-orange-400">{post.nickname || '匿名'}</div>
            <div className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-white whitespace-pre-line">{post.content}</div>

      <div className="mt-4 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-orange-400 hover:text-orange-500 text-sm flex items-center space-x-1"
          onClick={() => setShowComments(v => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{showComments ? '收起评论' : '查看评论'}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <div className="space-y-4">
              <PostForm postId={post._id} onSuccess={handleCommentSuccess} />
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent"></div>
                </div>
              ) : (
                <CommentList comments={comments} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostItem;
