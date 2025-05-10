import React from 'react';
import { motion } from 'framer-motion';

interface CommentListProps {
  comments: any[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments.length) {
    return (
      <div className="text-center py-4 text-gray-400">
        暂无评论，来发表第一条评论吧！
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment, index) => (
        <motion.div
          key={comment._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-gray-700/30 rounded-lg p-3 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400/80 to-orange-600/80 flex items-center justify-center text-white text-sm">
              {comment.nickname?.[0]?.toUpperCase() || '匿'}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <span className="font-medium text-orange-400/90">{comment.nickname || '匿名'}</span>
                <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <div className="mt-1 text-white/90 text-sm">{comment.content}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CommentList;
