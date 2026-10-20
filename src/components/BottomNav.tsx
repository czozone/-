import React from 'react';

export type TabKey = 'booking' | 'pets' | 'today-tasks' | 'schedule' | 'records';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  bookingBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  bookingBadgeCount = 1,
}) => {
  const tabs: { key: TabKey; label: string; icon: string; badge?: number }[] = [
    { key: 'booking', label: '預約服務', icon: 'event_available' },
    { key: 'pets', label: '寵物資料', icon: 'pets' },
    { key: 'today-tasks', label: '今日工作台', icon: 'checklist' },
    { key: 'schedule', label: '排程管理', icon: 'calendar_month' },
    { key: 'records', label: '服務紀錄', icon: 'history_edu', badge: bookingBadgeCount },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/92 backdrop-blur-xl border-t border-surface-container-high/60 shadow-[0_-2px_12px_rgba(66,45,23,0.05)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all relative ${
                isActive ? 'text-primary font-bold scale-[1.02]' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.badge !== undefined && tab.badge > 0 && tab.key === 'records' && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-surface">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] leading-tight mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary absolute bottom-1.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
