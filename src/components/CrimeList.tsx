import React, { useEffect, useState } from 'react';
import api from '../api';

const CrimeList = () => {
  const [crimes, setCrimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCrimes = () => {
    api.get('/crimes').then(res => setCrimes(res.data)).catch(() => {
      setCrimes([
        { _id: '1', title: '第1号罪状：用“IP赋能”把散户锁进牢笼', desc: '项目方宣传IP赋能，实际让用户资金被锁，亏损惨重。', votes: 0 },
        { _id: '2', title: '第2号罪状：承诺的百倍币变归零', desc: '承诺百倍币，结果上线即暴跌，用户血本无归。', votes: 0 }
      ]);
    });
  };

  useEffect(() => {
    fetchCrimes();
  }, []);

  const handleVote = async (id: string) => {
    setLoading(true);
    try {
      await api.post('/crimes', { id });
      fetchCrimes();
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMeme = (crime: any) => {
    alert(`生成囚衣梗图：${crime.title}`);
  };

  return (
    <div>
      {crimes.map(crime => (
        <div key={crime._id} className="bg-gray-900 rounded shadow p-4 mb-4">
          <div className="font-bold text-orange-400 text-lg">{crime.title}</div>
          <div className="text-white my-2">{crime.desc}</div>
          <div className="flex items-center gap-4">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
              onClick={() => handleVote(crime._id)}
              disabled={loading}
            >
              投票{loading ? '中...' : ''}
            </button>
            <span className="text-orange-300">票数：{crime.votes}</span>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              onClick={() => handleGenerateMeme(crime)}
            >
              生成囚衣梗图
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrimeList;
