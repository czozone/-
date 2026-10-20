import React, { useRef, useState, useEffect } from 'react';
import { PetProfile, ServicePackage, AddonService, Groomer, Appointment } from '../types';
import { MOCK_PETS } from '../data/mockData';

interface BookingIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    servicePackage: ServicePackage;
    addons: AddonService[];
    selectedDate: string;
    selectedTime: string;
    groomer: Groomer;
    totalPrice: number;
    estimatedMinutes: number;
  };
  onConfirmBooking: (appointment: Appointment) => void;
}

export const BookingIntakeModal: React.FC<BookingIntakeModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  onConfirmBooking,
}) => {
  const [selectedPet, setSelectedPet] = useState<PetProfile>(MOCK_PETS[0]);
  const [customNotes, setCustomNotes] = useState<string>(selectedPet.sensitiveNotes);
  const [temperamentNotes, setTemperamentNotes] = useState<string>(selectedPet.temperamentAlert);
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [hasSigned, setHasSigned] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setCustomNotes(selectedPet.sensitiveNotes);
    setTemperamentNotes(selectedPet.temperamentAlert);
  }, [selectedPet]);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#9d3e1a';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasSigned(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    const signatureUrl = canvas ? canvas.toDataURL() : '';
    const depositAmount = 500;
    const remainingAmount = bookingData.totalPrice - depositAmount;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      voucherCode: `PG-VOUCHER-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${new Date().getDate()}-${selectedPet.name.toUpperCase()}`,
      contractCode: `PG-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${new Date().getDate()}`,
      dateStr: bookingData.selectedDate,
      timeRange: `${bookingData.selectedTime} - ${calculateEndTime(bookingData.selectedTime, bookingData.estimatedMinutes)}`,
      groomer: bookingData.groomer,
      pet: {
        ...selectedPet,
        sensitiveNotes: customNotes,
        temperamentAlert: temperamentNotes,
      },
      servicePackage: bookingData.servicePackage,
      addons: bookingData.addons,
      totalPrice: bookingData.totalPrice,
      depositPaid: depositAmount,
      remainingDue: remainingAmount,
      status: 'confirmed',
      progressStep: 0,
      workstation: '1 號美容台',
      signedAt: new Date().toLocaleString('zh-TW', { hour12: false }),
      signatureDataUrl: signatureUrl,
    };

    onConfirmBooking(newAppointment);
  };

  function calculateEndTime(startTime: string, minutes: number): string {
    const [h, m] = startTime.split(':').map(Number);
    const totalMinutes = h * 60 + m + minutes;
    const endH = Math.floor(totalMinutes / 60) % 24;
    const endM = totalMinutes % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-surface-container-high my-auto max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </span>
            <div>
              <h3 className="font-bold text-base text-on-surface">毛孩照護資料與合約簽署</h3>
              <p className="text-xs text-on-surface-variant">PawGroom 數位定型化寵物美容服務契約</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Selected Plan Summary Capsule */}
        <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high mb-4 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-on-surface block">
              {bookingData.servicePackage.title}
              {bookingData.addons.length > 0 && ` + ${bookingData.addons.map((a) => a.title).join('、')}`}
            </span>
            <span className="text-on-surface-variant mt-0.5 block">
              {bookingData.selectedDate} · {bookingData.selectedTime} · {bookingData.groomer.name}
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-primary">NT$ {bookingData.totalPrice.toLocaleString()}</span>
            <span className="text-[11px] text-on-surface-variant block font-medium">訂金 NT$ 500</span>
          </div>
        </div>

        {/* Section 1: Pet Selection */}
        <div className="mb-4">
          <label className="text-xs font-bold text-on-surface mb-2 block flex items-center justify-between">
            <span>選擇預約毛孩</span>
            <span className="text-secondary text-[11px] font-semibold">健康紀錄自動帶入</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MOCK_PETS.map((pet) => {
              const isSelected = selectedPet.id === pet.id;
              return (
                <button
                  key={pet.id}
                  type="button"
                  onClick={() => setSelectedPet(pet)}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col items-center cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary-fixed/20 shadow-sm'
                      : 'border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <img
                    src={pet.avatarUrl}
                    alt={pet.name}
                    className="w-12 h-12 rounded-xl object-cover mb-1.5 shadow-sm"
                  />
                  <span className="font-bold text-xs text-on-surface">{pet.name}</span>
                  <span className="text-[11px] text-on-surface-variant">{pet.breed}</span>
                  <span className="text-[10px] text-on-surface-variant mt-0.5">{pet.weight} kg</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Special Care & Temperament Warnings */}
        <div className="mb-4 space-y-3">
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-tertiary text-[16px]">warning</span>
              性情行為與敏感部位提示
            </label>
            <input
              type="text"
              value={temperamentNotes}
              onChange={(e) => setTemperamentNotes(e.target.value)}
              placeholder="例如：剪指甲容易緊張、害怕吹風機強風..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[16px]">spa</span>
              皮毛與護理備註
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="例如：雙耳道易紅、肉球乾燥、造型喜好..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Vaccine & Contact Verification Badges */}
          <div className="p-3 rounded-2xl bg-surface-container-low/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
              <div>
                <span className="font-bold text-on-surface block">疫苗健康認證核可</span>
                <span className="text-[11px] text-on-surface-variant">狂犬病 / 多合一疫苗效期內 (最近: {selectedPet.vaccines.lastDate})</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-on-surface font-semibold block">{selectedPet.ownerName}</span>
              <span className="text-[11px] text-secondary font-bold flex items-center justify-end gap-0.5">
                <span className="material-symbols-outlined text-[12px]">chat</span> LINE 已綁定
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Digital Signature Pad */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[16px]">draw</span>
              家長數位手寫簽署
            </label>
            <button
              type="button"
              onClick={clearCanvas}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              清除重簽
            </button>
          </div>

          {/* Signature Canvas Box */}
          <div className="relative w-full h-32 rounded-2xl bg-surface-container-lowest border-2 border-dashed border-outline-variant/80 overflow-hidden flex items-center justify-center shadow-inner">
            <canvas
              ref={canvasRef}
              width={460}
              height={128}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair touch-none"
            />
            {/* Paw Watermark & Baseline */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-10">
              <span className="material-symbols-outlined text-[72px] text-primary">pets</span>
            </div>
            {!hasSigned && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <span className="text-xs text-on-surface-variant/60 font-medium">請於此框線內以手指或滑鼠完成正楷簽署</span>
                <div className="w-3/4 h-[1px] border-b border-dashed border-outline-variant/50 mt-6"></div>
              </div>
            )}
          </div>
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="mb-4 p-3 rounded-2xl bg-surface-container-low/60 border border-surface-container-high">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-primary text-primary focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-on-surface-variant leading-relaxed">
              我已詳閱並同意
              <span className="text-primary font-bold">《PawOxySpa 定型化美容服務契約》</span>
              ，包含 24 小時前彈性免費改期、全程無烘箱低敏承諾、以及到店健康快篩規範。
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-surface-container-highest text-on-surface-variant font-bold text-xs hover:bg-surface-container transition-colors cursor-pointer"
          >
            返回修改
          </button>
          <button
            type="button"
            disabled={!agreedTerms || !hasSigned}
            onClick={handleSubmit}
            className={`flex-2 h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
              agreedTerms && hasSigned
                ? 'bg-primary text-on-primary shadow-primary/30 hover:opacity-95'
                : 'bg-surface-dim text-on-surface-variant/50 cursor-not-allowed'
            }`}
          >
            <span>確認簽約並預約 (付訂 NT$500)</span>
            <span className="material-symbols-outlined text-[17px]">verified</span>
          </button>
        </div>
      </div>
    </div>
  );
};
