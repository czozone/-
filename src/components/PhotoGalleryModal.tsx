import React, { useState } from 'react';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<string>('全部');

  if (!isOpen) return null;

  const photos = [
    {
      id: 'p1',
      title: '成果 #104 經典棉花糖球',
      category: '比熊精修',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVBxPAqtxuox8QiJSpG9cKFhnlvc8xKcmdpE3MdFKmXPvTaKYY2H_sr0SU-g1HjjSJcVNPaAie6wCQrvkFyn38PNzMEF8CdGDsg70ACNjFFWnR7p7D4cXxwJ1i23JsezM4n7VhczaU0H_dPDW2hpxiOL6_chH0QYinDwbBBVBCk067dnjRqspYf1cozDeC2nlMSClJrVINAT1oxbZFQOJYb2Ym2M5t2RFIfKm7T8CjqZ1H_6EzbGXD',
    },
    {
      id: 'p2',
      title: '貴賓精修 泰迪熊萌系剪裁',
      category: '貴賓造型',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4whkj8TkQTsm-DspFmzO66WyOzsaz4EPX2rFDj4ioX7mCKiH0bXPKfYZb9GqobeSP9AJrEIsAdx15S7H-b1o7cKStZrT6_e91y5UxAHAzi0gSEaDyt4Ze1heowNQsH-vo3TAQrVOBbJ1DvypqxAlZCb3JJdn2l6Vmu1XUntRR2vHXkj2-95WJWBhFFS15_7PokJmoB1p1EUfPRokVT9bQcyCUUTQ0yzxcfNoNHSaeso4Rk1t_JaEl',
    },
    {
      id: 'p3',
      title: '碳酸微氣泡活膚水療 SPA',
      category: '碳酸水療',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8EedkXhFzZDHo_P2X-KdjTKOvUCPIIYD8xm4xDma5q37KaxzpDSTeJkvIDFy6jd9NNtPTOic1w6GoEhDVbhWUZIgzUFGI7Vdps_wfLXx1suCPUlArdDk4JgCFI7umWVJtfIRNpqDs6QO3wmvyrenwxIDi2W7nd82a930TZX0CKeZcupjA9Y6oeI9ZeDXET_zJBHvDthr9yL8NosRIpW6kRLUytxNS6ygfWlbD5yj6O8kwCCqyoP8q',
    },
    {
      id: 'p4',
      title: '柴犬深層退毛與俐落修容',
      category: '雙層毛退毛',
      url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p5',
      title: '雪納瑞紳士經典鬍鬚剪裁',
      category: '梗犬專區',
      url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p6',
      title: 'Sarah 老師沙龍現場照護',
      category: '沙龍花絮',
      url: '/assets/aistudio/Image_9_7de53d4d.jpeg',
    },
  ];

  const filteredPhotos =
    filter === '全部' ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-surface-container-high max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
          <div>
            <h3 className="font-bold text-base text-on-surface">Sarah 老師美容造型成果相簿</h3>
            <p className="text-xs text-on-surface-variant">共計 45+ 筆精選實作紀錄 · 忠孝旗艦館</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4">
          {['全部', '比熊精修', '貴賓造型', '碳酸水療', '雙層毛退毛', '沙龍花絮'].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                filter === c
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative rounded-2xl overflow-hidden bg-surface-container aspect-square border border-surface-container-high shadow-sm"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2.5">
                <span className="text-[10px] bg-primary text-white font-bold px-1.5 py-0.2 rounded w-fit mb-1">
                  {photo.category}
                </span>
                <span className="text-xs font-bold text-white line-clamp-1">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:opacity-95 cursor-pointer"
        >
          關閉相簿
        </button>
      </div>
    </div>
  );
};
