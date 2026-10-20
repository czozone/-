import React, { useState } from 'react';
import { Appointment } from '../types';

interface CheckInScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeAppointment: Appointment | null;
  onCheckInSuccess: () => void;
}

export const CheckInScannerModal: React.FC<CheckInScannerModalProps> = ({
  isOpen,
  onClose,
  activeAppointment,
  onCheckInSuccess,
}) => {
  const [code, setCode] = useState<string>(activeAppointment?.voucherCode || 'PG-VOUCHER-20241024-MICO');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setSuccess(true);
      setTimeout(() => {
        onCheckInSuccess();
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-3xl p-5 shadow-2xl border border-surface-container-high animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            </span>
            <div>
              <h3 className="font-bold text-base text-on-surface">門市到店免接觸報到核銷</h3>
              <p className="text-xs text-on-surface-variant">掃描飼主手機 QR 憑證以啟動美容工位</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Camera Scanner Viewport Mock */}
        <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden mb-4 flex items-center justify-center border-2 border-primary/40 shadow-inner">
          {/* Animated Scan Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse shadow-[0_0_8px_#9d3e1a]"></div>

          <div className="w-32 h-32 border-2 border-white/60 rounded-xl flex items-center justify-center relative">
            <span className="material-symbols-outlined text-white/40 text-[48px]">filter_center_focus</span>
            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
          </div>

          <span className="absolute bottom-2 text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
            相機對準飼主 QR Code 或手動輸入
          </span>
        </div>

        {/* Input Voucher Code */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-bold text-on-surface">預約憑證代碼</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary focus:outline-none uppercase"
            />
            <button
              onClick={() => setCode('PG-VOUCHER-20241024-MICO')}
              className="px-3 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-highest cursor-pointer"
            >
              帶入 Mic 條碼
            </button>
          </div>
        </div>

        {success ? (
          <div className="p-3 rounded-2xl bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center justify-center gap-2 mb-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>核銷成功！Mic 已正式報到，工位 #1 進入到店體檢程序。</span>
          </div>
        ) : (
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            {isVerifying ? (
              <>
                <span className="material-symbols-outlined text-[17px] animate-spin">refresh</span>
                <span>系統核銷驗證中...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[17px]">verified</span>
                <span>確認核銷報到 (自動啟動工序)</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
