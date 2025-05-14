import React, { useState, useRef, useEffect } from 'react';
import Moveable from 'react-moveable';
import domtoimage from 'dom-to-image';

const defaultCard = {
  photo: '',
  name: '',
  profession: '',
  desc: '',
};

const Crimes = () => {
  const [card, setCard] = useState(defaultCard);
  const [showTips, setShowTips] = useState(false);

  // refs for moveable targets
  const nameContainerRef = useRef(null);
  const professionContainerRef = useRef(null);
  const descContainerRef = useRef(null);
  const photoContainerRef = useRef(null);

  const [nameTarget, setNameTarget] = useState(null);
  const [professionTarget, setProfessionTarget] = useState(null);
  const [descTarget, setDescTarget] = useState(null);
  const [photoTarget, setPhotoTarget] = useState(null);

  const cardRef = useRef<HTMLDivElement>(null);

  // 旋转角度状态
  const [photoRotate, setPhotoRotate] = useState(0);
  const [nameRotate, setNameRotate] = useState(0);
  const [professionRotate, setProfessionRotate] = useState(0);
  const [descRotate, setDescRotate] = useState(0);
  const photoRotateRef = useRef(0);
  const nameRotateRef = useRef(0);
  const professionRotateRef = useRef(0);
  const descRotateRef = useRef(0);

  const nameRef = useRef(null);
  const professionRef = useRef(null);
  const descRef = useRef(null);
  const photoRef = useRef(null);

  const [nameFontSize, setNameFontSize] = useState(28);
  const [professionFontSize, setProfessionFontSize] = useState(28);

  const [photoScale, setPhotoScale] = useState(1);

  const getDefaultNamePos = () => {
    const saved = localStorage.getItem('namePos');
    return saved ? JSON.parse(saved) : { left: '50%', top: '75%' };
  };
  const [namePos, setNamePos] = useState(getDefaultNamePos);

  const getDefaultProfessionPos = () => {
    const saved = localStorage.getItem('professionPos');
    return saved ? JSON.parse(saved) : { left: '50%', top: '50%' };
  };
  const [professionPos, setProfessionPos] = useState(getDefaultProfessionPos);

  useEffect(() => {
    setPhotoTarget(photoContainerRef.current);
  }, [card.photo]);

  useEffect(() => {
    setNameTarget(nameContainerRef.current);
  }, [card.name]);

  useEffect(() => {
    setProfessionTarget(professionContainerRef.current);
  }, [card.profession]);

  useEffect(() => {
    setDescTarget(descContainerRef.current);
  }, [card.desc]);

  // 处理图片上传
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCard(c => ({ ...c, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const canExport = card.name && card.profession && card.desc && card.photo;

  const handleExport = () => {
    if (!cardRef.current) return;
    domtoimage.toPng(cardRef.current)
      .then((dataUrl: string) => {
        const link = document.createElement('a');
        link.download = '亏损者身份令牌.png';
        link.href = dataUrl;
        link.click();
      });
  };

  const handleRotateStart = (rotateRef: React.MutableRefObject<number>, setRotate: React.Dispatch<React.SetStateAction<number>>) => (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startDeg = rotateRef.current;
    const onMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      setRotate(startDeg + delta);
      rotateRef.current = startDeg + delta;
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f6fa] py-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row p-10 gap-10">
        {/* 卡片预览 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div ref={cardRef} className="relative w-[384px] h-[384px] flex items-center justify-center">
            {/* 卡片底图 */}
            <img
              src="/bnb-card-bg.png"
              alt="卡片底图"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl"
              draggable={false}
            />
            {/* 头像 */}
            {card.photo && (
              <>
                <div ref={photoContainerRef} className="relative" style={{ position: 'absolute', left: '60px', top: '140px', zIndex: 2, transform: `rotate(${photoRotate}deg) scale(${photoScale})` }}>
                  <img
                    ref={photoRef}
                    src={card.photo}
                    alt="avatar"
                    className="w-[90px] h-[90px] rounded-lg object-cover border-2 border-white shadow cursor-move"
                  />
                  <div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex gap-1"
                    style={{ pointerEvents: 'none' }}
                  >
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onPointerDown={e => { e.stopPropagation(); handleRotateStart(photoRotateRef, setPhotoRotate)(e); }} title="旋转">
                      <svg width="18" height="18" fill="none" stroke="#ffd600" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15.364 8.636A5 5 0 1 0 17 12" />
                        <path d="M17 7v5h-5" />
                      </svg>
                    </button>
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onClick={() => setPhotoScale(s => Math.min(3, s + 0.1))} title="放大">+</button>
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onClick={() => setPhotoScale(s => Math.max(0.3, s - 0.1))} title="缩小">-</button>
                  </div>
                </div>
              </>
            )}
            {card.photo && photoTarget && (
              <Moveable
                target={photoTarget}
                className="moveable-yellow"
                draggable={true}
                resizable={true}
                rotatable={true}
                onDrag={e => {
                  e.target.style.left = `${e.left}px`;
                  e.target.style.top = `${e.top}px`;
                }}
                onResize={e => {
                  const img = e.target.querySelector('img');
                  if (img) {
                    img.style.width = `${e.width}px`;
                    img.style.height = `${e.height}px`;
                  }
                }}
                onRotate={e => {
                  const img = e.target.querySelector('img');
                  if (img) {
                    img.style.transform = `rotate(${e.beforeRotate}deg)`;
                  }
                }}
                throttleDrag={0}
                throttleResize={0}
                throttleRotate={0}
                keepRatio={true}
              />
            )}
            {/* 昵称 */}
            {card.name && (
              <>
                <div ref={nameContainerRef} className="relative" style={{ position: 'absolute', left: namePos.left, top: namePos.top, transform: `translate(-50%, -50%) rotate(${nameRotate}deg)`, zIndex: 2, minWidth: '60px', minHeight: '40px', padding: '8px', border: '2px dashed #f44336', borderRadius: '12px', background: 'transparent' }}>
                  {/* 顶部按钮组 */}
                  <div style={{ position: 'absolute', top: '-36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10, pointerEvents: 'none' }}>
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onPointerDown={e => { e.stopPropagation(); handleRotateStart(nameRotateRef, setNameRotate)(e); }} title="旋转">
                      <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.364 8.636A5 5 0 1 0 17 12" /><path d="M17 7v5h-5" /></svg>
                    </button>
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onClick={() => setNameFontSize(f => f + 4)} title="增大">+</button>
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onClick={() => setNameFontSize(f => Math.max(10, f - 4))} title="减小">-</button>
                  </div>
                  <div
                    ref={nameRef}
                    className="font-bold text-[#222] cursor-move"
                    style={{ fontSize: nameFontSize }}
                  >
                    {card.name}
                  </div>
                </div>
              </>
            )}
            {card.name && nameTarget && (
              <Moveable
                target={nameTarget}
                draggable={true}
                resizable={true}
                rotatable={true}
                padding={{ left: 8, top: 8, right: 8, bottom: 8 }}
                onDrag={e => {
                  const pos = { left: `${e.left}px`, top: `${e.top}px` };
                  setNamePos(pos);
                  localStorage.setItem('namePos', JSON.stringify(pos));
                }}
                onResize={e => {
                  const text = e.target.querySelector('div');
                  if (text) {
                    text.style.fontSize = `${e.width / 10}px`;
                  }
                }}
                onRotate={e => {
                  const text = e.target.querySelector('div');
                  if (text) {
                    text.style.transform = `rotate(${e.beforeRotate}deg)`;
                  }
                }}
                throttleDrag={0}
                throttleResize={0}
                throttleRotate={0}
              />
            )}
            {/* 职业 */}
            {card.profession && (
              <>
                <div ref={professionContainerRef} className="relative" style={{ position: 'absolute', left: professionPos.left, top: professionPos.top, transform: `translate(-50%, -50%) rotate(${professionRotate}deg)`, zIndex: 2, minWidth: '60px', minHeight: '40px', padding: '8px', border: '2px dashed #f44336', borderRadius: '12px', background: 'transparent' }}>
                  {/* 顶部按钮组 */}
                  <div style={{ position: 'absolute', top: '-36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10, pointerEvents: 'none' }}>
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onPointerDown={e => { e.stopPropagation(); handleRotateStart(professionRotateRef, setProfessionRotate)(e); }} title="旋转">
                      <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.364 8.636A5 5 0 1 0 17 12" /><path d="M17 7v5h-5" /></svg>
                    </button>
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onClick={() => setProfessionFontSize(f => f + 4)} title="增大">+</button>
                    <button className="move-btn" style={{ pointerEvents: 'auto' }} onClick={() => setProfessionFontSize(f => Math.max(10, f - 4))} title="减小">-</button>
                  </div>
                  <div
                    ref={professionRef}
                    className="font-bold text-[#222] cursor-move"
                    style={{ fontSize: professionFontSize }}
                  >
                    {card.profession}
                  </div>
                </div>
              </>
            )}
            {card.profession && professionTarget && (
              <Moveable
                target={professionTarget}
                draggable={true}
                resizable={true}
                rotatable={true}
                onDrag={e => {
                  const pos = { left: `${e.left}px`, top: `${e.top}px` };
                  setProfessionPos(pos);
                  localStorage.setItem('professionPos', JSON.stringify(pos));
                }}
                onResize={e => {
                  const text = e.target.querySelector('div');
                  if (text) {
                    text.style.fontSize = `${e.width / 10}px`;
                  }
                }}
                onRotate={e => {
                  const text = e.target.querySelector('div');
                  if (text) {
                    text.style.transform = `rotate(${e.beforeRotate}deg)`;
                  }
                }}
                throttleDrag={0}
                throttleResize={0}
                throttleRotate={0}
              />
            )}
            {/* 描述 */}
            {card.desc && (
              <>
                <div ref={descContainerRef} className="relative" style={{ position: 'absolute', left: '170px', top: '250px', zIndex: 2 }}>
                  <div
                    ref={descRef}
                    className="text-sm text-[#666] cursor-move"
                    style={{ transform: `rotate(${descRotate}deg)` }}
                  >
                    {card.desc}
                  </div>
                  <div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 cursor-pointer bg-white border-2 border-yellow-400 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-yellow-200 transition"
                    onMouseDown={handleRotateStart(descRotateRef, setDescRotate)}
                    title="旋转"
                  >
                    <svg width="18" height="18" fill="none" stroke="#ffd600" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15.364 8.636A5 5 0 1 0 17 12" />
                      <path d="M17 7v5h-5" />
                    </svg>
                  </div>
                </div>
              </>
            )}
            {card.desc && descTarget && (
              <Moveable
                target={descTarget}
                draggable={true}
                resizable={true}
                rotatable={true}
                onDrag={e => {
                  e.target.style.left = `${e.left}px`;
                  e.target.style.top = `${e.top}px`;
                }}
                onResize={e => {
                  const text = e.target.querySelector('div');
                  if (text) {
                    text.style.fontSize = `${e.width / 10}px`;
                  }
                }}
                onRotate={e => {
                  const text = e.target.querySelector('div');
                  if (text) {
                    text.style.transform = `rotate(${e.beforeRotate}deg)`;
                  }
                }}
                throttleDrag={0}
                throttleResize={0}
                throttleRotate={0}
              />
            )}
          </div>
        </div>
        {/* 表单 */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-orange-500 mb-2">创建您的亏损者身份令牌</h2>
          <label className="block w-full">
            <span className="text-gray-700 font-medium">上传照片</span>
            <div className="mt-2">
              <button
                type="button"
                className="w-full h-12 bg-orange-100 hover:bg-orange-200 text-orange-500 font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                onClick={() => document.getElementById('photo-input')?.click()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                选择照片
              </button>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="hidden"
              />
            </div>
          </label>
          <input
            className="border rounded-xl px-4 py-3 bg-white text-gray-900 text-lg"
            placeholder="昵称"
            value={card.name}
            onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
          />
          <div className="flex gap-2">
            <input
              className="border rounded-xl px-4 py-3 flex-1 bg-white text-gray-900 text-lg"
              placeholder="职业"
              value={card.profession}
              onChange={e => setCard(c => ({ ...c, profession: e.target.value }))}
            />
            <button
              className="px-3 py-2 bg-gray-200 rounded-xl text-sm text-gray-600 font-medium"
              onClick={() => setCard(c => ({ ...c, profession: c.profession + ' / 其他职业' }))}
              type="button"
            >+ 添加其他职业</button>
          </div>
          <input
            className="border rounded-xl px-4 py-3 bg-white text-gray-900 text-lg"
            placeholder="描述"
            value={card.desc}
            onChange={e => setCard(c => ({ ...c, desc: e.target.value }))}
          />
          <button
            className={`w-full h-14 rounded-xl bg-orange-300 hover:bg-orange-400 text-white font-bold text-lg transition-all disabled:bg-orange-100 disabled:text-orange-300 disabled:cursor-not-allowed shadow`}
            disabled={!canExport}
            onClick={handleExport}
          >
            导出身份令牌
          </button>
          <div>
            <button
              className="text-base text-orange-400 underline"
              onClick={() => setShowTips(v => !v)}
              type="button"
            >
              {showTips ? '收起使用技巧' : '使用技巧'}
            </button>
            {showTips && (
              <div className="mt-2 text-sm text-gray-500 bg-orange-50 rounded-xl p-3">
                您的图片仅保存在本地 - 并未上传到我们的服务器
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 text-gray-400 text-base text-center">
        您的图片仅保存在本地 - 并未上传到我们的服务器
      </div>
    </div>
  );
};

export default Crimes;
