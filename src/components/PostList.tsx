import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import PostItem from './PostItem';

interface PostListProps {
  onNewPost?: (content: string) => void;
}

const PostList: React.FC<PostListProps> = ({ onNewPost }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/comments');
        setPosts(res.data);
      } catch (error) {
        console.error('获取帖子失败:', error);
        // mock数据兜底
        setPosts([
          { _id: '1', nickname: '匿名', content: '测试发帖', createdAt: new Date().toISOString() }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // 每3秒自动刷新一次
    const interval = setInterval(() => {
      fetchPosts();
    }, 3000);

    return () => clearInterval(interval);
  }, [refresh]);

  const handleCommented = (content: string) => {
    onNewPost?.(content);
    setRefresh(r => r + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PostItem post={post} onCommented={handleCommented} />
          </motion.div>
        ))}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            暂无帖子，来发第一个帖子吧！
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default PostList;
