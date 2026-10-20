import React from 'react';
import { Appointment } from '../types';

interface ContractViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

export const ContractViewerModal: React.FC<ContractViewerModalProps> = ({
  isOpen,
  onClose,
  appointment,
}) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-surface-container-high max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        {/* Certificate Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </span>
            <div>
              <h3 className="font-bold text-base text-on-surface">數位定型化寵物美容服務契約憑證</h3>
              <p className="text-xs text-on-surface-variant font-mono">憑證編號 #{appointment.contractCode}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Legal Seal Badge */}
        <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high mb-4 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-on-surface block">立合約人 (飼主)：{appointment.pet.ownerName}</span>
            <span className="text-[11px] text-on-surface-variant">
              受託服務沙龍：PawOxySpa 忠孝旗艦館 (主理：{appointment.groomer.name})
            </span>
          </div>
          <div className="text-right">
            <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-2 py-0.5 rounded-full">
              合約合法有效
            </span>
            <span className="text-[10px] text-on-surface-variant block mt-0.5">{appointment.signedAt}</span>
          </div>
        </div>

        {/* Contract Key Clauses */}
        <div className="space-y-3 text-xs mb-5 text-on-surface-variant leading-relaxed">
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/60">
            <h4 className="font-bold text-on-surface mb-1">第一條：服務項目與收費保障</h4>
            <p>
              本契約約定提供之服務為「{appointment.servicePackage.title}
              {appointment.addons.length > 0 && ` + ${appointment.addons.map((a) => a.title).join('、')}`}
              」，總計金額 NT$ {appointment.totalPrice.toLocaleString()} 元（已預付訂金 NT$ {appointment.depositPaid} 元，餘額於離店時驗收後結清）。
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/60">
            <h4 className="font-bold text-on-surface mb-1">第二條：毛孩福祉與安全守護規範</h4>
            <p>
              店家承諾施作全程不使用高溫烘箱，採用低溫無重力吹整。預約前享有 10 分鐘健康快篩，若毛孩有重大心血管、急症或傳染病，美容師有權評估暫緩施作以保毛孩生命安全。
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/60">
            <h4 className="font-bold text-on-surface mb-1">第三條：24 小時免費彈性改期與取消</h4>
            <p>
              飼主若需改期或取消，於約定時段 24 小時前可於線上系統或 LINE 官方帳號免費調整一次；若未滿 24 小時且無不可抗力證明，訂金將保留作為保留工位補貼。
            </p>
          </div>
        </div>

        {/* Digital Signature Presentation */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-dashed border-outline-variant/80 text-center mb-5 relative">
          <span className="text-[11px] font-bold text-on-surface-variant block mb-2">
            飼主數位簽章 (電子簽署憑證時間戳記已上鏈存證)
          </span>

          <div className="w-full h-24 bg-white rounded-xl border border-outline-variant/50 flex items-center justify-center p-2 relative shadow-inner">
            {appointment.signatureDataUrl ? (
              <img
                src={appointment.signatureDataUrl}
                alt="飼主數位簽名"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="font-serif italic text-lg text-primary font-bold">
                {appointment.pet.ownerName} (數位核章簽署)
              </span>
            )}
            <div className="absolute right-2 bottom-1 text-[10px] text-on-surface-variant font-mono">
              HASH: #7F2B-9C01-PawOxy
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:opacity-95 cursor-pointer"
        >
          已確認合約條款無誤
        </button>
      </div>
    </div>
  );
};
