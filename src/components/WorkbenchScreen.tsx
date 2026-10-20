import React, { useState } from 'react';
import { TimeSlotItem, Appointment } from '../types';
import { MOCK_SCHEDULE_SLOTS } from '../data/mockData';

interface WorkbenchScreenProps {
  activeAppointment: Appointment | null;
  onUpdateAppointmentStep: (newStep: number) => void;
  onSwitchToCalendar: () => void;
  onOpenCheckInScanner: () => void;
}

export const WorkbenchScreen: React.FC<WorkbenchScreenProps> = ({
  activeAppointment,
  onUpdateAppointmentStep,
  onSwitchToCalendar,
  onOpenCheckInScanner,
}) => {
  const [viewType, setViewType] = useState<'day' | 'week'>('day');
  const [isOnDuty, setIsOnDuty] = useState<boolean>(true);
  const [slots, setSlots] = useState<TimeSlotItem[]>(MOCK_SCHEDULE_SLOTS);
  const [showDetailSlot, setShowDetailSlot] = useState<TimeSlotItem | null>(null);
  const [syncStatus, setSyncStatus] = useState<string>('剛剛');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [restSlotLocked, setRestSlotLocked] = useState<boolean>(true);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('剛剛完成');
    }, 600);
  };

  const handleExtendSlot = (slotId: string, extraMinutes: number) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, durationMinutes: s.durationMinutes + extraMinutes } : s))
    );
  };

  const currentStep = activeAppointment?.progressStep ?? 2;

  const stepLabels = ['到店體檢', '臭氧活膚', '造型剪毛', '等候接回'];

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top Header Controls: Single Day vs Week + Groomer Dropdown */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center p-1 bg-surface-container rounded-2xl border border-surface-container-high">
          <button
            onClick={() => setViewType('day')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              viewType === 'day'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">calendar_view_day</span>
            <span>單日視角</span>
          </button>
          <button
            onClick={() => {
              setViewType('week');
              onSwitchToCalendar();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              viewType === 'week'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">calendar_view_week</span>
            <span>本週視角</span>
          </button>
        </div>

        {/* Groomer Profile Dropdown */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-sm">
          <img
            src="/assets/aistudio/Image_9_7de53d4d.jpeg"
            alt="Sarah 美容師"
            className="w-6 h-6 rounded-full object-cover ring-1 ring-primary/30"
          />
          <span className="text-xs font-bold text-on-surface">Sarah 美容師</span>
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className="p-2.5 rounded-2xl bg-secondary-container/50 border border-secondary/20 flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-1.5 text-on-secondary-container">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span>已與 Google 日曆及 LINE OA 雙向同步 (最近同步：{syncStatus})</span>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="text-secondary font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span className={`material-symbols-outlined text-[15px] ${isSyncing ? 'animate-spin' : ''}`}>
            sync
          </span>
          <span>刷新</span>
        </button>
      </div>

      {/* Date Navigator & Occupancy Metrics */}
      <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-high mb-3 flex items-center justify-between shadow-sm">
        <button className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
            <span className="font-bold text-sm text-on-surface">10 月 24 日 (四)</span>
          </div>
          <span className="text-xs text-on-surface-variant mt-0.5 block font-medium">
            今日總預約：4 毛孩 · 空檔率：18%
          </span>
        </div>
        <button className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>

      {/* Shift & Workstation Bar */}
      <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-high mb-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">content_cut</span>
          </div>
          <div>
            <div className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span>排班工時：10:00 - 19:00</span>
              <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.2 rounded font-bold">
                執勤中
              </span>
            </div>
            <span className="text-[11px] text-on-surface-variant mt-0.5 block">
              工位：主修剪台 #1 | 今日預估 6.5 小時
            </span>
          </div>
        </div>

        {/* Duty Toggle Switch */}
        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isOnDuty}
              onChange={() => setIsOnDuty(!isOnDuty)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-base text-on-surface">時段節奏與預約清單</h3>
        <span className="text-xs text-on-surface-variant">點擊卡片可調整工時或改期</span>
      </div>

      {/* Live Timeline Schedule */}
      <div className="space-y-3 mb-6">
        {slots.map((slot) => {
          if (slot.status === 'buffer') {
            return (
              <div
                key={slot.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-dashed border-outline-variant/60"
              >
                <div className="w-12 text-center flex-shrink-0">
                  <span className="text-xs font-bold text-on-surface block leading-tight">{slot.time}</span>
                  <span className="text-[10px] text-on-surface-variant">{slot.durationMinutes} 分鐘</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[16px]">sanitizer</span>
                    <span className="text-xs font-bold text-on-surface">{slot.title}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{slot.subtitle}</p>
                </div>
                <button
                  onClick={() => alert('已鎖定紫外線消毒緩衝 30 分鐘，確保器材無菌。')}
                  className="px-2.5 py-1 rounded-xl bg-surface-container-lowest text-on-surface-variant text-[11px] font-bold border border-surface-container-high hover:bg-surface-container shadow-sm cursor-pointer"
                >
                  調整緩衝
                </button>
              </div>
            );
          }

          if (slot.status === 'break') {
            return (
              <div
                key={slot.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-surface-container-high"
              >
                <div className="w-12 text-center flex-shrink-0">
                  <span className="text-xs font-bold text-on-surface block leading-tight">{slot.time}</span>
                  <span className="text-[10px] text-on-surface-variant">{slot.durationMinutes} 分鐘</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-[16px]">restaurant</span>
                    <span className="text-xs font-bold text-on-surface">{slot.title}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{slot.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-on-surface-variant">不可預約</span>
                  <input
                    type="checkbox"
                    checked={restSlotLocked}
                    onChange={() => setRestSlotLocked(!restSlotLocked)}
                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                  />
                </div>
              </div>
            );
          }

          if (slot.status === 'available') {
            return (
              <div
                key={slot.id}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-lowest border border-secondary/30 shadow-sm"
              >
                <div className="w-12 text-center flex-shrink-0">
                  <span className="text-xs font-bold text-on-surface block leading-tight">{slot.time}</span>
                  <span className="text-[10px] text-secondary font-bold">{slot.durationMinutes} 分鐘</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                    <span className="text-xs font-bold text-secondary">{slot.title}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{slot.subtitle}</p>
                </div>
                <button
                  onClick={() => alert('已切換為臨時保留時段，線上通道將暫時關閉。')}
                  className="px-2.5 py-1.5 rounded-xl bg-surface-container text-on-surface-variant text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  點擊臨時保留
                </button>
              </div>
            );
          }

          // Booked Appointment Card (e.g. Mic or 麻糬)
          const isMicSlot = slot.petName === 'Mic';

          return (
            <div
              key={slot.id}
              className="p-3.5 rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-[0_2px_12px_rgba(66,45,23,0.06)]"
            >
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-surface-container mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">
                    已預約
                  </span>
                  <span className="text-xs font-bold text-on-surface">{slot.time} ({slot.durationMinutes} 分鐘)</span>
                  <span className="text-[11px] text-on-surface-variant font-medium">| {slot.workstation}</span>
                </div>

                {slot.depositPaid && (
                  <span className="text-[10px] text-secondary font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px]">check</span> 預約金已付
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={
                      slot.petName === 'Mic'
                        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4whkj8TkQTsm-DspFmzO66WyOzsaz4EPX2rFDj4ioX7mCKiH0bXPKfYZb9GqobeSP9AJrEIsAdx15S7H-b1o7cKStZrT6_e91y5UxAHAzi0gSEaDyt4Ze1heowNQsH-vo3TAQrVOBbJ1DvypqxAlZCb3JJdn2l6Vmu1XUntRR2vHXkj2-95WJWBhFFS15_7PokJmoB1p1EUfPRokVT9bQcyCUUTQ0yzxcfNoNHSaeso4Rk1t_JaEl'
                        : 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={slot.petName}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-primary/20"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">{slot.title}</h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">{slot.subtitle}</p>
                    <div className="text-[11px] text-on-surface-variant mt-1 flex items-center gap-2">
                      <span>飼主：{slot.ownerName}</span>
                      {slot.lineBound && (
                        <span className="text-secondary font-bold text-[10px] bg-secondary-container px-1.5 py-0.2 rounded-full">
                          LINE 已綁定
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Voucher code / Quick check */}
                {slot.voucherCode && (
                  <button
                    onClick={onOpenCheckInScanner}
                    title="核銷報到"
                    className="text-right p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-bold text-[11px] border border-outline-variant/40 cursor-pointer flex flex-col items-end"
                  >
                    <span className="material-symbols-outlined text-[18px]">qr_code</span>
                    <span>到店核銷</span>
                  </button>
                )}
              </div>

              {/* Real-time Progress Controller for Active Grooming (Mic) */}
              {isMicSlot && (
                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[15px]">tune</span>
                      即時進度同步 (點擊切換現況)
                    </span>
                    <span className="text-[11px] text-primary font-bold">
                      當前階段：{stepLabels[currentStep] || '已完成'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {stepLabels.map((lbl, idx) => {
                      const isActive = idx === currentStep;
                      const isPast = idx < currentStep;
                      return (
                        <button
                          key={lbl}
                          onClick={() => onUpdateAppointmentStep(idx)}
                          className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all border cursor-pointer ${
                            isActive
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : isPast
                              ? 'bg-secondary text-white border-secondary'
                              : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-highest hover:bg-surface-container'
                          }`}
                        >
                          {isPast && '✓ '}
                          {lbl}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Slot Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setShowDetailSlot(slot)}
                  className="flex-1 h-9 rounded-xl bg-surface-container-low text-on-surface font-bold text-xs hover:bg-surface-container transition-colors border border-surface-container-high cursor-pointer"
                >
                  查看照護指引
                </button>
                <button
                  onClick={() => handleExtendSlot(slot.id, 30)}
                  className="px-3 h-9 rounded-xl bg-surface-container-low text-on-surface font-bold text-xs hover:bg-surface-container transition-colors border border-surface-container-high cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px] text-tertiary">add_alarm</span>
                  <span>時長 +30分</span>
                </button>
                <button
                  onClick={() => alert(`已開啟 ${slot.petName} 改期時段指派選單。`)}
                  className="px-3 h-9 rounded-xl bg-primary text-white font-bold text-xs hover:opacity-95 transition-opacity shadow-sm cursor-pointer"
                >
                  調整排程
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Care Modal */}
      {showDetailSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-3xl p-5 shadow-2xl border border-surface-container-high animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-3">
              <h3 className="font-bold text-base text-on-surface">毛孩照護詳細指引</h3>
              <button
                onClick={() => setShowDetailSlot(null)}
                className="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-xs mb-4">
              <div>
                <span className="font-bold text-on-surface block mb-1">毛孩與品種</span>
                <p className="text-on-surface-variant">{showDetailSlot.title}</p>
              </div>
              <div className="p-3 rounded-xl bg-tertiary-fixed/30 border border-tertiary/20">
                <span className="font-bold text-tertiary block mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">warning</span>
                  性情照護注意事項
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {showDetailSlot.notes || '無特殊攻擊性，依日常標準溫和洗沐流程操作。'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
                <span className="font-bold text-on-surface block mb-1">工位與消毒協議</span>
                <p className="text-on-surface-variant">
                  使用 {showDetailSlot.workstation || '主修剪台 #1'}，完成後依規定啟動 30 分鐘紫外線抑菌緩衝。
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDetailSlot(null)}
              className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs cursor-pointer shadow-sm"
            >
              了解並返回工作台
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => alert('已新增 17:30 臨時特約時段至排程！')}
          className="h-11 rounded-2xl bg-surface-container-low text-on-surface border border-surface-container-high font-bold text-xs flex items-center justify-center gap-1 hover:bg-surface-container transition-colors shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">add_circle</span>
          <span>新增特約時段</span>
        </button>
        <button
          onClick={() => alert('已開啟美容師排休與請假申請單。')}
          className="h-11 rounded-2xl bg-surface-container-low text-on-surface border border-surface-container-high font-bold text-xs flex items-center justify-center gap-1 hover:bg-surface-container transition-colors shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-tertiary">event_busy</span>
          <span>批次休假</span>
        </button>
        <button
          onClick={onOpenCheckInScanner}
          className="h-11 rounded-2xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px]">qr_code_scanner</span>
          <span>到店核銷報到</span>
        </button>
      </div>
    </div>
  );
};
