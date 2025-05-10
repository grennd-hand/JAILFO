import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Forum from './pages/Forum';
import Crimes from './pages/Crimes';
import './styles/global.css';

const App = () => {
  // 移动设备视口高度修复
  useEffect(() => {
    // 首次加载设置视口高度
    setViewportHeight();
    
    // 监听窗口尺寸变化和设备方向变化
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  // 设置CSS变量以修复移动端100vh问题
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  return (
    <BrowserRouter>
      <div 
        className="min-h-screen bg-gray-900 flex flex-col"
        style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }} // 使用CSS变量确保正确高度
      >
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/crimes" element={<Crimes />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 border-t border-gray-700 py-4 safe-padding-bottom">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-xs sm:text-sm">
            FO改造监狱 © {new Date().getFullYear()} - 因割韭菜罪终身监禁
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
