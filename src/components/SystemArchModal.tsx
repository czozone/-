import React, { useState } from 'react';

interface SystemArchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchModal: React.FC<SystemArchModalProps> = ({ isOpen, onClose }) => {
  const [activeNode, setActiveNode] = useState<string>('booking-engine');

  if (!isOpen) return null;

  const nodes = [
    {
      id: 'google-calendar',
      name: 'Google Calendar (美容師行事曆)',
      category: '系統整合',
      icon: 'calendar_month',
      desc: '雙向排程同步：自動同步沙龍門市美容師 Google 行事曆，阻擋撞期並預留 30 分鐘工位消毒緩衝。',
    },
    {
      id: 'line-oa',
      name: 'LINE OA (官方帳號整合)',
      category: '顧客端與通訊',
      icon: 'chat',
      desc: '會員一鍵登入、預約訂金推播提醒、服務工序即時進度更新、洗沐後美照雲端相簿推播。',
    },
    {
      id: 'booking-engine',
      name: '即時排程引擎 (Realtime Scheduling Engine)',
      category: '核心中樞',
      icon: 'hub',
      desc: '結合美容師排班、工位設備分配、犬種體型服務時長、紫外線消毒緩衝計算之智慧排程中樞。',
    },
    {
      id: 'workbench',
      name: '美容師專屬工作台 (Groomer Workbench)',
      category: '門市營運',
      icon: 'content_cut',
      desc: '排班節奏掌握、毛孩行為性情預警、4階段工序即時更新、到店 QR 免接觸核銷。',
    },
    {
      id: 'check-in',
      name: '到店免接觸報到 (QR Code 核銷)',
      category: '門市接待',
      icon: 'qr_code_scanner',
      desc: '飼主出示數位憑證，迎賓接待員手機或平板即時掃碼驗證，自動更新工作台工位狀態。',
    },
    {
      id: 'records-crm',
      name: '美容照護履歷與 CRM (Service Records)',
      category: '會員經營',
      icon: 'history_edu',
      desc: '造型前後對比高畫質照護履歷、耳道與皮膚健康反饋日誌、集點卡與定期回訪自動提醒。',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-surface-container-high max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">account_tree</span>
            </span>
            <div>
              <h3 className="font-bold text-base text-on-surface">PawOxySpa 系統架構整合流向圖</h3>
              <p className="text-xs text-on-surface-variant">雙向即時排程、LINE OA、Google Calendar 與門市營運閉環</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Embedded Architecture Diagram Asset */}
        <div className="rounded-2xl overflow-hidden border border-surface-container-high mb-4 bg-slate-900 p-2 shadow-inner">
          <img
            src="/assets/aistudio/Image_13_e3bf1e96.png"
            alt="System Integration Flowchart"
            className="w-full h-auto object-contain max-h-72 mx-auto rounded-xl"
          />
        </div>

        {/* Interactive Architecture Nodes */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-on-surface mb-2">點擊檢視各模組整合機制：</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {nodes.map((n) => {
              const isSelected = activeNode === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveNode(n.id)}
                  className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[16px]">{n.icon}</span>
                    <span className="font-bold text-[11px] leading-tight line-clamp-1">{n.name}</span>
                  </div>
                  <span
                    className={`text-[9px] font-semibold ${
                      isSelected ? 'text-primary-fixed' : 'text-on-surface-variant'
                    }`}
                  >
                    {n.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Box */}
        {(() => {
          const curr = nodes.find((n) => n.id === activeNode);
          if (!curr) return null;
          return (
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-secondary/30 mb-4 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary text-[18px]">{curr.icon}</span>
                <span className="font-bold text-sm text-on-surface">{curr.name}</span>
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-2 py-0.2 rounded-full">
                  {curr.category}
                </span>
              </div>
              <p className="text-on-surface-variant leading-relaxed mt-1">{curr.desc}</p>
            </div>
          );
        })()}

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:opacity-95 cursor-pointer"
        >
          關閉架構圖
        </button>
      </div>
    </div>
  );
};
