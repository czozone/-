import React from 'react';
import { HistoryRecord } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: HistoryRecord | null;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-surface-container-high max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </span>
            <div>
              <h3 className="font-bold text-base text-on-surface">毛孩沙龍護理完整檢測報告</h3>
              <p className="text-xs text-on-surface-variant font-mono">日期：{record.dateStr} · {record.storeName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Pet & Groomer Badge */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high mb-4 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-on-surface block">{record.serviceTitle}</span>
            <span className="text-on-surface-variant mt-0.5 block">主理美容師：{record.groomerName}</span>
          </div>
          <div className="text-right">
            <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-2 py-0.5 rounded-full">
              配合度 {record.cooperationScore} / 5.0
            </span>
            <span className="text-primary font-bold block mt-1">NT$ {record.totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Physical Health 快篩五大指標 */}
        <div className="space-y-2.5 text-xs mb-4">
          <h4 className="font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[16px]">health_and_safety</span>
            <span>現場皮毛與健康指標快篩 (五大評估)</span>
          </h4>

          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-high space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-on-surface font-semibold">1. 雙耳道清潔度與發炎風險</span>
              <span className="text-tertiary font-bold">輕度敏感 (已投洋甘菊舒緩)</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '85%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-on-surface font-semibold">2. 腳掌肉球角質與滋潤度</span>
              <span className="text-secondary font-bold">良好 (已抹玻尿酸護理膏)</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '95%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-on-surface font-semibold">3. 皮膚微生態與深層除垢</span>
              <span className="text-secondary font-bold">極佳 (寵物摩氧浴臭氧深層除垢，清潔保養)</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '98%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-on-surface font-semibold">4. 齒齦口氣與指甲修形弧度</span>
              <span className="text-secondary font-bold">標準圓滑無利角</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

        {/* Care Diary */}
        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/60 mb-5 text-xs">
          <span className="font-bold text-on-surface block mb-1">美容師專屬叮嚀日誌</span>
          <p className="text-on-surface-variant leading-relaxed">「{record.careFeedback}」</p>
          <div className="mt-2.5 pt-2 border-t border-surface-container-highest flex items-center justify-between text-[11px] text-secondary font-bold">
            <span>週期建議：{record.nextVisitRecommendation}</span>
            <span>家長評分：★ {record.parentRating.toFixed(1)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:opacity-95 cursor-pointer"
        >
          關閉報告
        </button>
      </div>
    </div>
  );
};
