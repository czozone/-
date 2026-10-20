import React, { useState } from 'react';

interface HeaderProps {
  currentMode: 'parent' | 'groomer';
  onModeChange: (mode: 'parent' | 'groomer') => void;
  onOpenArch: () => void;
  onOpenNotifications?: () => void;
  syncTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  onOpenArch,
  syncTime,
}) => {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: '1',
      title: '即時工序更新',
      desc: 'Sarah 美容師已開始為 Mic 進行「手工剪毛造型」',
      time: '10 分鐘前',
      unread: true,
    },
    {
      id: '2',
      title: '雙向日曆同步完成',
      desc: '今日 4 筆預約已排入 Google 日曆與 LINE 官方推播',
      time: '剛剛',
      unread: false,
    },
    {
      id: '3',
      title: '集點里程碑提醒',
      desc: 'Mico 集點卡已達 8/10 點，再預約 2 次享免費碳酸水療！',
      time: '昨天',
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-4xl mx-auto h-20 px-4 flex items-center justify-between gap-2">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onModeChange('parent')}>
          <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 p-1.5 flex items-center justify-center border border-primary/20 shadow-sm overflow-hidden flex-shrink-0">
            <img
              src="/assets/aistudio/Image_1_1cca6f2c.jpeg"
              alt="PawOxySpa Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-primary leading-tight tracking-tight">PawOxySpa</span>
              <span className="text-[10px] font-semibold bg-primary-fixed text-primary px-1.5 py-0.2 rounded-full">
                摩氧浴
              </span>
            </div>
            <span className="text-xs text-on-surface-variant font-medium leading-none">毛沐美妍 · 頂級微氣泡沙龍</span>
          </div>
        </div>

        {/* Dual-Mode Pill Toggle */}
        <div className="flex items-center p-1 bg-surface-container rounded-full shadow-[0_1px_3px_rgba(66,45,23,0.04)] border border-surface-container-highest">
          <button
            onClick={() => onModeChange('parent')}
            className={`h-8 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              currentMode === 'parent'
                ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(66,45,23,0.1)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">pets</span>
            <span>飼主預約端</span>
          </button>
          <button
            onClick={() => onModeChange('groomer')}
            className={`h-8 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              currentMode === 'groomer'
                ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(66,45,23,0.1)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">content_cut</span>
            <span>美容師工作台</span>
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 relative">
          {/* Architecture Chart trigger */}
          <button
            onClick={onOpenArch}
            title="檢視系統整合與串接流程"
            className="w-9 h-9 rounded-full hidden sm:flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">hub</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationMenu(!showNotificationMenu);
                setShowProfileMenu(false);
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors relative"
            >
              <span className="material-symbols-outlined text-[21px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotificationMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-surface-container-high p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[16px]">notifications_active</span>
                    系統通知與推播
                  </span>
                  <span className="text-[10px] text-secondary font-medium">LINE OA 連線中</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        n.unread ? 'bg-surface-container-low/70' : 'hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-on-surface">{n.title}</span>
                        <span className="text-[10px] text-on-surface-variant">{n.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotificationMenu(false);
              }}
              className="relative flex items-center justify-center focus:outline-none"
            >
              <img
                alt="Sarah 美容師 / 飼主林小姐"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/50 transition-all"
                src="/assets/aistudio/Image_9_7de53d4d.jpeg"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface" title="系統連線中"></span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-surface-container-high p-3 z-50">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-surface-container mb-2">
                  <img
                    src="/assets/aistudio/Image_9_7de53d4d.jpeg"
                    alt="Sarah"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-on-surface">Sarah 老師 / 林小姐</div>
                    <div className="text-[11px] text-on-surface-variant">忠孝旗艦館 · 主理首席</div>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      onOpenArch();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container-low text-on-surface flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">account_tree</span>
                    <span>查看架構整合流向圖</span>
                  </button>
                  <button
                    onClick={() => {
                      onModeChange(currentMode === 'parent' ? 'groomer' : 'parent');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container-low text-on-surface flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">swap_horiz</span>
                    <span>切換至 {currentMode === 'parent' ? '美容師工作台' : '飼主預約端'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
