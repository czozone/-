import React, { useState } from 'react';

interface LineChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomerName: string;
}

export const LineChatModal: React.FC<LineChatModalProps> = ({
  isOpen,
  onClose,
  groomerName,
}) => {
  const [messages, setMessages] = useState<
    { sender: 'groomer' | 'user'; text: string; time: string; image?: string }[]
  >([
    {
      sender: 'groomer',
      text: '林小姐您好！我是 Sarah 老師，Mico 剛剛完成到店體檢，精神非常好喔！現在正在享受「寵物摩氧浴 臭氧活膚」（臭氧深層除垢，舒緩肌膚清潔與保養中）～',
      time: '10:15',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC8EedkXhFzZDHo_P2X-KdjTKOvUCPIIYD8xm4xDma5q37KaxzpDSTeJkvIDFy6jd9NNtPTOic1w6GoEhDVbhWUZIgzUFGI7Vdps_wfLXx1suCPUlArdDk4JgCFI7umWVJtfIRNpqDs6QO3wmvyrenwxIDi2W7nd82a930TZX0CKeZcupjA9Y6oeI9ZeDXET_zJBHvDthr9yL8NosRIpW6kRLUytxNS6ygfWlbD5yj6O8kwCCqyoP8q',
    },
    {
      sender: 'user',
      text: '看到照片太安心了！今天耳毛跟指甲也麻煩老師輕柔處理囉，謝謝！',
      time: '10:18',
    },
    {
      sender: 'groomer',
      text: '沒問題的！雙耳道已使用洋甘菊草本舒敏滴劑清潔，指甲修得很順，現在開始手工吹蓬剪泰迪熊圓頭囉，預估 11:30 可以接回～',
      time: '10:40',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: inputText,
      time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'groomer',
          text: '好的收到！我會隨時留意 Mico 的心情狀態～',
          time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#8c9fc4]/30 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-surface-container-high flex flex-col h-[560px] animate-in zoom-in-95 bg-[#7a92b8]">
        {/* LINE Chat Header */}
        <div className="bg-[#24334a] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src="/assets/aistudio/Image_9_7de53d4d.jpeg"
                alt="Sarah"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#24334a]"></span>
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>{groomerName}</span>
                <span className="text-[10px] bg-emerald-600 px-1.5 py-0.2 rounded-full font-semibold">
                  LINE 官方認證
                </span>
              </div>
              <span className="text-[11px] text-slate-300">PawOxySpa 忠孝旗艦館主理 · 執勤中</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-[#7b93b8]">
          <div className="text-center">
            <span className="bg-black/20 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm">
              2024年10月24日 今日美容專屬通訊通道
            </span>
          </div>

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-[#62cb6b] text-slate-900 rounded-tr-none font-medium'
                    : 'bg-white text-slate-900 rounded-tl-none font-medium'
                }`}
              >
                {m.image && (
                  <img
                    src={m.image}
                    alt="現場照片"
                    className="w-full rounded-xl mb-2 object-cover aspect-video"
                  />
                )}
                <p>{m.text}</p>
              </div>
              <span className="text-[10px] text-white/80 mt-0.5 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Dock */}
        <form onSubmit={handleSend} className="bg-white p-2.5 flex items-center gap-2 border-t border-slate-200">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="傳送訊息給美容師..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:bg-white text-slate-800"
          />
          <button
            type="submit"
            className="h-9 px-4 rounded-xl bg-[#06c755] text-white text-xs font-bold hover:bg-[#05b34c] transition-colors flex items-center justify-center cursor-pointer shadow-sm"
          >
            傳送
          </button>
        </form>
      </div>
    </div>
  );
};
