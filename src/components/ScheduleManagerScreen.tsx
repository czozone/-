import React, { useState } from 'react';
import { MOCK_SCHEDULE_SLOTS } from '../data/mockData';

export const ScheduleManagerScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [bufferTime, setBufferTime] = useState<number>(30);
  const [googleCalendarSync, setGoogleCalendarSync] = useState<boolean>(true);
  const [linePushSync, setLinePushSync] = useState<boolean>(true);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const days = [
    { day: 21, name: '週一', count: 3 },
    { day: 22, name: '週二', count: 4 },
    { day: 23, name: '週三', count: 5 },
    { day: 24, name: '週四', count: 4, isToday: true },
    { day: 25, name: '週五', count: 6 },
    { day: 26, name: '週六', count: 7 },
    { day: 27, name: '週日', count: 6 },
  ];

  const handleTriggerSync = () => {
    setSyncToast('已觸發與 Google Calendar 和 LINE 官方推播之雙向強制同步...');
    setTimeout(() => {
      setSyncToast('雙向同步完成！所有 4 筆預約工時與消毒緩衝已成功寫入 Google 日曆。');
      setTimeout(() => setSyncToast(null), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-on-surface">排程引擎與班表管理</h2>
          <p className="text-xs text-on-surface-variant">自動防止預約撞期，守護毛孩無重疊消毒間隔</p>
        </div>
        <button
          onClick={handleTriggerSync}
          className="px-3 py-1.5 rounded-xl bg-secondary text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">sync</span>
          <span>立即雙向同步</span>
        </button>
      </div>

      {syncToast && (
        <div className="p-3 rounded-2xl bg-secondary-container text-on-secondary-container text-xs font-bold mb-3 flex items-center gap-2 border border-secondary/30 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{syncToast}</span>
        </div>
      )}

      {/* Two-Way Integrations Control Card */}
      <div className="p-4 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-sm mb-4">
        <h3 className="text-xs font-bold text-on-surface mb-2.5 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[17px]">sync_saved_locally</span>
          第三方排程與通知連線狀態
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <div>
                <span className="font-bold text-on-surface block">Google 日曆</span>
                <span className="text-[10px] text-on-surface-variant">雙向同步開啟</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={googleCalendarSync}
              onChange={() => setGoogleCalendarSync(!googleCalendarSync)}
              className="w-4 h-4 rounded accent-primary cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <div>
                <span className="font-bold text-on-surface block">LINE 官方帳號</span>
                <span className="text-[10px] text-on-surface-variant">預約通知推播</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={linePushSync}
              onChange={() => setLinePushSync(!linePushSync)}
              className="w-4 h-4 rounded accent-primary cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Week Selector */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-on-surface">2024 年 10 月 第四週排班</span>
          <span className="text-xs text-secondary font-bold">總產能利用率：82%</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d) => {
            const isSelected = selectedDay === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`py-2 rounded-2xl flex flex-col items-center transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-high hover:bg-surface-container'
                }`}
              >
                <span className="text-[10px] font-semibold">{d.name}</span>
                <span className="text-sm font-bold mt-0.5">{d.day}</span>
                <span className={`text-[10px] mt-1 ${isSelected ? 'text-primary-fixed' : 'text-primary'}`}>
                  {d.count} 預約
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sterilization & Engine Buffer Settings */}
      <div className="p-4 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">sanitizer</span>
            <div>
              <span className="text-xs font-bold text-on-surface block">工位紫外線消毒與清潔緩衝時間</span>
              <span className="text-[11px] text-on-surface-variant">
                系統會在每筆大美容預約結束後自動保留此間隔
              </span>
            </div>
          </div>
          <span className="text-sm font-bold text-secondary">{bufferTime} 分鐘</span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          {[15, 30, 45].map((mins) => (
            <button
              key={mins}
              onClick={() => setBufferTime(mins)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                bufferTime === mins
                  ? 'bg-secondary text-white border-secondary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant border-surface-container-high hover:bg-surface-container-highest'
              }`}
            >
              {mins} 分鐘標準
            </button>
          ))}
        </div>
      </div>

      {/* Workstation Matrix */}
      <div className="p-4 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-sm mb-4">
        <h3 className="text-xs font-bold text-on-surface mb-3 flex items-center justify-between">
          <span>工位即時佔用一覽 (忠孝旗艦館)</span>
          <span className="text-[11px] text-secondary font-semibold">運作正常</span>
        </h3>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-on-surface">主修剪台 #1</span>
                <span className="bg-primary-fixed text-primary px-1.5 py-0.2 rounded text-[10px] font-bold">
                  使用中
                </span>
              </div>
              <span className="text-on-surface-variant text-[11px] mt-0.5 block">
                Sarah 老師 · 正在服務：Mic (貴賓犬)
              </span>
            </div>
            <span className="text-primary font-bold">預估至 11:30</span>
          </div>

          <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-on-surface">摩氧水療浴槽 #A</span>
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.2 rounded text-[10px] font-bold">
                  消毒完畢
                </span>
              </div>
              <span className="text-on-surface-variant text-[11px] mt-0.5 block">
                高濃度碳酸錠儲備充足 · 待命下一場次
              </span>
            </div>
            <span className="text-secondary font-bold">隨時可用</span>
          </div>

          <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-on-surface">貓咪獨立造型房 #C</span>
                <span className="bg-surface-container-highest text-on-surface-variant px-1.5 py-0.2 rounded text-[10px] font-bold">
                  閒置待命
                </span>
              </div>
              <span className="text-on-surface-variant text-[11px] mt-0.5 block">
                費洛蒙恆溫擴散器運作中 · 隔音無干擾
              </span>
            </div>
            <span className="text-on-surface-variant font-bold">可預約</span>
          </div>
        </div>
      </div>
    </div>
  );
};
