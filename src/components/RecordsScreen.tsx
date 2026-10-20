import React, { useState } from 'react';
import { Appointment, HistoryRecord } from '../types';
import { MOCK_HISTORY_RECORDS } from '../data/mockData';

interface RecordsScreenProps {
  activeAppointment: Appointment | null;
  onViewContract: (appointment: Appointment) => void;
  onOpenLineChat: (groomerName: string) => void;
  onBookNext: () => void;
  onViewReport: (record: HistoryRecord) => void;
}

export const RecordsScreen: React.FC<RecordsScreenProps> = ({
  activeAppointment,
  onViewContract,
  onOpenLineChat,
  onBookNext,
  onViewReport,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'history' | 'drafts'>('upcoming');
  const [showQRZoom, setShowQRZoom] = useState(false);

  const steps = [
    { name: '到店健康檢查', icon: 'stethoscope' },
    { name: '摩氧臭氧活膚', icon: 'bathtub' },
    { name: '手工剪毛造型', icon: 'content_cut' },
    { name: '待家長接回', icon: 'hail' },
  ];

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Sub Tabs */}
      <div className="flex items-center p-1 bg-surface-container rounded-2xl mb-4 border border-surface-container-high">
        <button
          onClick={() => setActiveSubTab('upcoming')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'upcoming'
              ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(66,45,23,0.08)]'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>即將到來</span>
          <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary text-[10px] flex items-center justify-center font-bold">
            {activeAppointment ? '1' : '0'}
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'history'
              ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(66,45,23,0.08)]'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>歷史紀錄</span>
          <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] flex items-center justify-center font-bold">
            {MOCK_HISTORY_RECORDS.length}
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('drafts')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'drafts'
              ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(66,45,23,0.08)]'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>草稿 / 待簽約</span>
        </button>
      </div>

      {activeSubTab === 'upcoming' && (
        <>
          {activeAppointment ? (
            /* Active Reservation Card */
            <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_4px_20px_rgba(66,45,23,0.08)] border border-surface-container-high mb-6 relative overflow-hidden">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-bold text-on-surface">今日預約已確認，到店待核銷</span>
                </div>
                <span className="bg-primary-fixed/50 text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {activeAppointment.workstation}
                </span>
              </div>

              {/* Pet & Groomer Profile Row */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeAppointment.pet.avatarUrl}
                    alt={activeAppointment.pet.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/20 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-lg text-on-surface">{activeAppointment.pet.name}</h3>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {activeAppointment.pet.breed} · {activeAppointment.pet.weight} kg
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[14px]">pets</span>
                      <span>活潑 · 對剪指甲偶爾緊張</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <div>
                    <span className="text-xs font-bold text-on-surface block">
                      {activeAppointment.groomer.name}
                    </span>
                    <span className="text-[11px] text-tertiary font-bold flex items-center justify-end gap-0.5">
                      <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      5.0 (142評)
                    </span>
                  </div>
                  <img
                    src={activeAppointment.groomer.avatarUrl}
                    alt={activeAppointment.groomer.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/20"
                  />
                </div>
              </div>

              {/* Date & Service Tier */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/80 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                    <span className="text-sm font-bold text-on-surface">{activeAppointment.dateStr}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                    {activeAppointment.timeRange}
                  </span>
                </div>

                <div className="text-xs font-bold text-on-surface mb-2">
                  {activeAppointment.servicePackage.title}
                  {activeAppointment.addons.length > 0 &&
                    ` + ${activeAppointment.addons.map((a) => a.title).join(' + ')}`}
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-surface-container-highest/60 text-on-surface-variant">
                  <span>
                    已付訂金 <strong className="text-secondary font-bold">NT$ {activeAppointment.depositPaid}</strong>
                  </span>
                  <span>
                    到店現場待付 <strong className="text-primary font-bold">NT$ {activeAppointment.remainingDue}</strong>
                  </span>
                </div>
              </div>

              {/* Immediate Grooming Progress Stages */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[16px]">hourglass_top</span>
                    即時美容工序狀態
                  </span>
                  <span className="text-xs font-bold text-primary">預估完成 11:30</span>
                </div>

                <div className="grid grid-cols-4 gap-1 relative">
                  {/* Connecting Line */}
                  <div className="absolute top-4 left-6 right-6 h-0.5 bg-surface-container-high -z-0"></div>

                  {steps.map((step, idx) => {
                    const isDone = idx < activeAppointment.progressStep;
                    const isCurrent = idx === activeAppointment.progressStep;

                    return (
                      <div key={step.name} className="flex flex-col items-center text-center relative z-10">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isDone
                              ? 'bg-secondary text-white shadow-sm'
                              : isCurrent
                              ? 'bg-primary text-white ring-4 ring-primary-fixed animate-pulse'
                              : 'bg-surface-container text-on-surface-variant border border-outline-variant/40'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isDone ? 'check' : step.icon}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] mt-1.5 leading-tight ${
                            isCurrent
                              ? 'font-bold text-primary'
                              : isDone
                              ? 'font-bold text-secondary'
                              : 'text-on-surface-variant font-medium'
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* QR Code Check-In Pass */}
              <div className="bg-surface-container-low/80 rounded-2xl p-4 border border-surface-container-high text-center mb-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[16px]">qr_code_scanner</span>
                    到店免接觸快速報到
                  </span>
                  <span className="text-[11px] font-bold text-primary bg-primary-fixed/60 px-2 py-0.5 rounded-full">
                    倒數 28 分鐘
                  </span>
                </div>

                {/* Simulated QR Code Canvas */}
                <div
                  onClick={() => setShowQRZoom(!showQRZoom)}
                  className="w-44 h-44 mx-auto my-2 p-2 bg-white rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col items-center justify-center cursor-pointer hover:scale-102 transition-transform"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    {/* SVG QR Pattern */}
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    {/* Outer marker 1 */}
                    <rect x="10" y="10" width="26" height="26" rx="4" fill="#111c2d" />
                    <rect x="14" y="14" width="18" height="18" rx="2" fill="white" />
                    <rect x="18" y="18" width="10" height="10" rx="2" fill="#9d3e1a" />
                    {/* Outer marker 2 */}
                    <rect x="64" y="10" width="26" height="26" rx="4" fill="#111c2d" />
                    <rect x="68" y="14" width="18" height="18" rx="2" fill="white" />
                    <rect x="72" y="18" width="10" height="10" rx="2" fill="#9d3e1a" />
                    {/* Outer marker 3 */}
                    <rect x="10" y="64" width="26" height="26" rx="4" fill="#111c2d" />
                    <rect x="14" y="68" width="18" height="18" rx="2" fill="white" />
                    <rect x="18" y="72" width="10" height="10" rx="2" fill="#9d3e1a" />
                    {/* Data dots */}
                    <rect x="42" y="12" width="6" height="6" fill="#111c2d" />
                    <rect x="52" y="12" width="6" height="6" fill="#111c2d" />
                    <rect x="42" y="24" width="6" height="6" fill="#111c2d" />
                    <rect x="52" y="28" width="6" height="6" fill="#111c2d" />
                    <rect x="12" y="44" width="6" height="6" fill="#111c2d" />
                    <rect x="24" y="48" width="6" height="6" fill="#111c2d" />
                    <rect x="44" y="64" width="6" height="6" fill="#111c2d" />
                    <rect x="64" y="48" width="6" height="6" fill="#111c2d" />
                    <rect x="76" y="58" width="6" height="6" fill="#111c2d" />
                    <rect x="84" y="70" width="6" height="6" fill="#111c2d" />
                    <rect x="70" y="82" width="6" height="6" fill="#111c2d" />
                    {/* Center Paw Badge */}
                    <circle cx="50" cy="50" r="13" fill="#ffffff" stroke="#9d3e1a" strokeWidth="2" />
                    <circle cx="50" cy="53" r="4" fill="#9d3e1a" />
                    <circle cx="45" cy="45" r="2" fill="#9d3e1a" />
                    <circle cx="55" cy="45" r="2" fill="#9d3e1a" />
                    <circle cx="42" cy="49" r="1.5" fill="#9d3e1a" />
                    <circle cx="58" cy="49" r="1.5" fill="#9d3e1a" />
                  </svg>
                </div>

                <span className="font-mono text-xs font-bold text-on-surface tracking-wider block">
                  {activeAppointment.voucherCode}
                </span>
                <p className="text-[11px] text-on-surface-variant mt-1">
                  抵達忠孝門市時，請將條碼出示給迎賓接待員掃描驗證
                </p>
              </div>

              {/* Digital Signed Contract Pill */}
              <div className="p-3 rounded-2xl bg-surface-container-low border border-secondary/30 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                  <div>
                    <span className="text-xs font-bold text-on-surface block">定型化契約已完成數位簽署</span>
                    <span className="text-[11px] text-on-surface-variant">
                      合約憑證代碼 #{activeAppointment.contractCode}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onViewContract(activeAppointment)}
                  className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-bold border border-outline-variant/60 hover:bg-surface-container transition-colors shadow-sm cursor-pointer"
                >
                  檢視合約
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenLineChat(activeAppointment.groomer.name)}
                  className="h-11 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-high font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-secondary text-[17px]">chat</span>
                  <span>聯絡美容師 LINE</span>
                </button>
                <button
                  onClick={onBookNext}
                  className="h-11 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-high font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-tertiary text-[17px]">edit_calendar</span>
                  <span>修改或改期時段</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest rounded-3xl p-8 text-center border border-surface-container-high mb-6">
              <span className="material-symbols-outlined text-primary text-[48px] mb-2">event_available</span>
              <h3 className="text-sm font-bold text-on-surface mb-1">目前沒有待核銷預約</h3>
              <p className="text-xs text-on-surface-variant mb-4">歡迎立即為愛寵挑選專業美容師與摩氧水療時段！</p>
              <button
                onClick={onBookNext}
                className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md cursor-pointer"
              >
                立即線上預約
              </button>
            </div>
          )}
        </>
      )}

      {/* History Records Section */}
      {(activeSubTab === 'upcoming' || activeSubTab === 'history') && (
        <div className="flex flex-col mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base text-on-surface flex items-center gap-1.5">
              <span>🐾 Mico 的美容照護履歷</span>
              <span className="text-xs text-on-surface-variant font-normal">
                (共計 {MOCK_HISTORY_RECORDS.length + 1} 次服務)
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            {MOCK_HISTORY_RECORDS.map((rec) => (
              <div
                key={rec.id}
                className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_2px_12px_rgba(66,45,23,0.06)] border border-surface-container-high"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between pb-2.5 border-b border-surface-container mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold">
                      已圓滿完成
                    </span>
                    <span className="text-xs font-bold text-on-surface">{rec.dateStr}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary">NT$ {rec.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-bold text-on-surface">{rec.serviceTitle}</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    主理美容師：{rec.groomerName}，{rec.storeName} · {rec.itemsIncluded}
                  </p>
                </div>

                {/* Before & After Photo Comparison */}
                <div className="mb-3">
                  <span className="text-xs font-bold text-on-surface-variant block mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">photo_camera</span>
                    美容造型前後對比影像 (已建檔至雲端照護本)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative rounded-2xl overflow-hidden bg-surface-container aspect-square">
                      <img
                        src={rec.beforePhotoUrl}
                        alt="造型前"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                        造型前 Before
                      </span>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden bg-surface-container aspect-square ring-2 ring-primary/30">
                      <img
                        src={rec.afterPhotoUrl}
                        alt="造型後"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1.5 left-1.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                        造型後 After
                      </span>
                    </div>
                  </div>
                </div>

                {/* Groomer Care Feedback Journal */}
                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high/60 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[15px]">clinical_notes</span>
                      美容師現場照護反饋日誌
                    </span>
                    <span className="text-xs font-bold text-tertiary">
                      配合度 {rec.cooperationScore} / 5.0
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    「{rec.careFeedback}」
                  </p>
                  <div className="mt-2 pt-2 border-t border-surface-container-highest/60 flex items-center gap-1.5 text-[11px] text-secondary font-semibold">
                    <span className="material-symbols-outlined text-[14px]">event_repeat</span>
                    <span>下次保養週期提醒：{rec.nextVisitRecommendation}</span>
                  </div>
                </div>

                {/* Parent Review & Actions */}
                <div className="flex items-center justify-between pb-2 mb-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-tertiary font-bold">★ {rec.parentRating.toFixed(1)} 星級肯定</span>
                    <span className="text-on-surface-variant">"{rec.parentReview}"</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onViewReport(rec)}
                    className="h-10 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface text-xs font-bold flex items-center justify-center gap-1 hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">article</span>
                    <span>完整護理報告</span>
                  </button>
                  <button
                    onClick={onBookNext}
                    className="h-10 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-1 hover:opacity-95 shadow-sm transition-opacity cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">autorenew</span>
                    <span>以相同方案再預約</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loyalty Stamp Card */}
      <div className="rounded-3xl p-4 bg-gradient-to-br from-tertiary-fixed/30 via-surface-container-lowest to-surface-container-lowest border border-tertiary/20 shadow-sm mb-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-tertiary text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </span>
            <div>
              <h4 className="text-xs font-bold text-on-surface">Mico 的毛孩專屬集點卡</h4>
              <span className="text-[11px] text-on-surface-variant">每滿 10 點可享深層水療免費升級</span>
            </div>
          </div>
          <span className="text-base font-black text-tertiary">8 / 10 點</span>
        </div>

        {/* Stamp Nodes */}
        <div className="grid grid-cols-10 gap-1 my-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                i < 8
                  ? 'bg-tertiary text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant/40 border border-dashed border-outline-variant/50'
              }`}
            >
              {i < 8 ? '🐾' : i + 1}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-on-surface-variant font-medium">
            再預約 2 次即贈「免費寵物摩氧浴 臭氧活膚 SPA 乙次」！
          </p>
          <button
            onClick={onBookNext}
            className="px-3 py-1.5 rounded-xl bg-tertiary text-white text-xs font-bold shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
          >
            立即集點預約
          </button>
        </div>
      </div>

      {/* Floating Call-to-Action */}
      <div className="space-y-2">
        <button
          onClick={onBookNext}
          className="w-full h-12 rounded-2xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(157,62,26,0.3)] active:scale-[0.98] transition-transform hover:opacity-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>為愛寵預約下次美容沙龍服務</span>
        </button>
        <p className="text-[11px] text-center text-on-surface-variant">
          PawOxySpa 24 小時前可免費彈性改期，提供完整毛孩保險守護
        </p>
      </div>
    </div>
  );
};
