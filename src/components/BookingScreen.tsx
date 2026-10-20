import React, { useState } from 'react';
import { MOCK_GROOMERS, SERVICE_PACKAGES, ADDON_SERVICES } from '../data/mockData';
import { ServicePackage, AddonService, Groomer } from '../types';

interface BookingScreenProps {
  onProceedToIntake: (bookingData: {
    servicePackage: ServicePackage;
    addons: AddonService[];
    selectedDate: string;
    selectedTime: string;
    groomer: Groomer;
    totalPrice: number;
    estimatedMinutes: number;
  }) => void;
  onOpenGallery: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  onProceedToIntake,
  onOpenGallery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部美容師');
  const [selectedGroomer, setSelectedGroomer] = useState<Groomer>(MOCK_GROOMERS[0]);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage>(SERVICE_PACKAGES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon-spa']);
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('14:00');

  const categories = [
    { label: '全部美容師', icon: 'stars' },
    { label: '小美容洗沐' },
    { label: '深層大美容' },
    { label: '寵物摩氧浴 臭氧活膚', icon: 'water_drop' },
    { label: '貓咪專屬護理', icon: 'pets' },
  ];

  const weekDays = [
    { day: 21, weekName: '週一', dotColor: 'bg-outline-variant', label: '' },
    { day: 22, weekName: '週二', dotColor: 'bg-outline-variant', label: '' },
    { day: 23, weekName: '週三', dotColor: 'bg-outline-variant', label: '' },
    { day: 24, weekName: '週四', dotColor: '', label: '本日首選' },
    { day: 25, weekName: '週五', dotColor: 'bg-secondary', label: '' },
    { day: 26, weekName: '週六', dotColor: 'bg-tertiary', label: '' },
    { day: 27, weekName: '週日', dotColor: 'bg-outline-variant', label: '' },
  ];

  const timeSlots = [
    {
      time: '10:00',
      status: 'available',
      badge: '推薦時段',
      desc: '晨間安靜時段・毛孩心情放鬆',
      recommended: true,
    },
    {
      time: '11:30',
      status: 'booked',
      badge: '已約滿',
      desc: '預約已滿 (貴賓大修)',
    },
    {
      time: '14:00',
      status: 'available',
      badge: '已選擇',
      desc: '紫外線緩衝消毒 30 分已就緒',
      isBufferReady: true,
    },
    {
      time: '16:00',
      status: 'available',
      badge: '可預約',
      desc: '午後柔光修毛時段',
    },
    {
      time: '18:00',
      status: 'booked',
      badge: '客滿',
      desc: '晚間時段客滿 (門市深度消毒收工時間)',
      fullWidth: true,
    },
  ];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const currentAddons = ADDON_SERVICES.filter((a) => selectedAddons.includes(a.id));
  const addonsPrice = currentAddons.reduce((sum, a) => sum + a.price, 0);
  const addonsMinutes = currentAddons.reduce((sum, a) => sum + a.durationMinutes, 0);

  const totalPrice = selectedPackage.price + addonsPrice;
  const totalMinutes = selectedPackage.durationMinutes + addonsMinutes;

  const handleNext = () => {
    onProceedToIntake({
      servicePackage: selectedPackage,
      addons: currentAddons,
      selectedDate: `2024年10月${selectedDay}日 (${weekDays.find((d) => d.day === selectedDay)?.weekName})`,
      selectedTime: selectedTimeSlot,
      groomer: selectedGroomer,
      totalPrice,
      estimatedMinutes: totalMinutes,
    });
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top Greeting & Reassurance Notice */}
      <div className="flex items-center justify-between py-2 mb-2">
        <div className="flex flex-col">
          <span className="font-bold text-lg text-on-surface flex items-center gap-1">
            預約專業美容服務
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </span>
          <span className="text-xs text-on-surface-variant">
            透明排程與嚴格消毒，守護寶貝安心體驗
          </span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[11px] font-semibold">
          <span className="material-symbols-outlined text-[14px]">nest_eco_leaf</span>
          <span>低敏芳療配方</span>
        </div>
      </div>

      {/* 1. Quick Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 mb-3.5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1 ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat.icon && (
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Featured Groomer Profile Card (Sarah) */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-[0_2px_12px_rgba(66,45,23,0.06)] border border-surface-container-high/80 mb-4 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full pointer-events-none"></div>
        <div className="flex items-start gap-3.5">
          <div className="relative flex-shrink-0">
            <img
              className="w-16 h-16 rounded-xl object-cover shadow-sm ring-1 ring-primary/20"
              alt="Sarah 美容師"
              src={selectedGroomer.avatarUrl}
            />
            <span className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary rounded-full p-0.5 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[13px]">award_star</span>
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base text-on-surface">{selectedGroomer.name}</h3>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-1.5 py-0.5 rounded text-[11px] font-semibold">
                  資深首席
                </span>
              </div>
              <span className="text-sm font-bold text-primary flex items-center gap-0.5">
                <span
                  className="material-symbols-outlined text-[17px] text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                {selectedGroomer.rating.toFixed(1)}{' '}
                <span className="text-xs text-on-surface-variant font-normal">
                  ({selectedGroomer.reviewCount}評)
                </span>
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
              <span>{selectedGroomer.certifications}</span>
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedGroomer.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    idx === selectedGroomer.tags.length - 1
                      ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Groomer Portfolio Thumbnails */}
        <div className="mt-3.5 pt-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {selectedGroomer.portfolio.map((item) => (
            <div
              key={item.id}
              onClick={onOpenGallery}
              className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-surface-container cursor-pointer group shadow-sm"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                alt={item.title}
                src={item.imageUrl}
              />
              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1 py-0.2 rounded backdrop-blur-sm">
                {item.tag}
              </span>
            </div>
          ))}
          <div
            onClick={onOpenGallery}
            className="flex-shrink-0 w-20 h-20 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer border border-dashed border-outline-variant/60"
          >
            <span className="material-symbols-outlined text-[20px]">photo_library</span>
            <span className="text-[11px] font-semibold mt-0.5">+42 張</span>
          </div>
        </div>
      </div>

      {/* 3. Service Package Selection */}
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-base text-on-surface">選擇服務項目</h3>
          <span className="text-xs text-primary font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            已含一對一保姆式照顧
          </span>
        </div>

        {/* Packages List */}
        <div className="space-y-2.5">
          {SERVICE_PACKAGES.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`rounded-2xl p-3.5 transition-all cursor-pointer border relative ${
                  isSelected
                    ? 'bg-surface-container-lowest border-primary shadow-[0_2px_10px_rgba(157,62,26,0.12)]'
                    : 'bg-surface-container-lowest/70 border-surface-container-high hover:border-outline-variant hover:bg-surface-container-lowest'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white transition-colors ${
                          isSelected ? 'bg-primary' : 'border border-outline-variant bg-transparent'
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        )}
                      </span>
                      <h4 className="font-bold text-sm text-on-surface">{pkg.title}</h4>
                      {pkg.badge && (
                        <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold px-2 py-0.2 rounded-full">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant mb-2 pl-7 leading-relaxed">
                      {pkg.description}
                    </p>
                    <div className="pl-7 grid grid-cols-2 gap-y-1 text-[11px] font-medium text-on-surface-variant">
                      {pkg.items.map((item, idx) => (
                        <span
                          key={item}
                          className={`flex items-center gap-1 ${
                            idx === pkg.items.length - 1 && pkg.items.length % 2 !== 0
                              ? 'col-span-2'
                              : ''
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end flex-shrink-0">
                    <span className="font-bold text-base text-primary">NT$ {pkg.price.toLocaleString()}</span>
                    <span className="text-[11px] text-on-surface-variant flex items-center gap-0.5 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">timer</span>
                      約 {pkg.durationMinutes} 分鐘
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-on Service Option */}
        <div className="mt-3 space-y-2">
          {ADDON_SERVICES.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`rounded-2xl p-3.5 transition-all cursor-pointer border relative ${
                  isChecked
                    ? 'bg-gradient-to-r from-surface-container-lowest via-tertiary-fixed/20 to-surface-container-lowest border-tertiary/40 shadow-sm'
                    : 'bg-surface-container-lowest border-surface-container-high hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="w-5 h-5 rounded-md accent-primary text-primary focus:ring-0 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <label className="text-sm text-on-surface font-bold cursor-pointer">
                          {addon.title}
                        </label>
                        {addon.badge && (
                          <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                            {addon.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="text-sm font-bold text-tertiary">
                      + NT$ {addon.price}
                    </span>
                    <span className="block text-[11px] text-on-surface-variant">
                      + {addon.durationMinutes} 分鐘
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Date & Time Slot Calendar */}
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-base text-on-surface">預約日期與時段</h3>
            <span className="text-xs text-on-surface-variant">2024 年 10 月</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            排程引擎實時連線中
          </div>
        </div>

        {/* Horizontal Week Calendar Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 mb-3">
          {weekDays.map((d) => {
            const isSelected = selectedDay === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`flex-shrink-0 transition-all flex flex-col items-center shadow-sm rounded-2xl ${
                  isSelected
                    ? 'w-16 py-2.5 bg-primary text-on-primary shadow-[0_4px_12px_rgba(157,62,26,0.3)] scale-[1.03]'
                    : 'w-14 py-2 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span
                  className={`text-[11px] font-semibold ${
                    isSelected ? 'text-primary-fixed' : d.weekName.includes('六') || d.weekName.includes('日') ? 'text-tertiary' : ''
                  }`}
                >
                  {d.weekName}
                </span>
                <span
                  className={`mt-0.5 font-bold ${
                    isSelected ? 'text-xl leading-none' : 'text-base'
                  }`}
                >
                  {d.day}
                </span>
                {isSelected ? (
                  <span className="text-[10px] text-primary-fixed mt-1 font-semibold">
                    本日首選
                  </span>
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                      d.dotColor || 'bg-outline-variant'
                    }`}
                  ></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Time Slot Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {timeSlots.map((slot) => {
            const isSelected = selectedTimeSlot === slot.time && slot.status === 'available';
            const isBooked = slot.status === 'booked';

            if (slot.fullWidth) {
              return (
                <div
                  key={slot.time}
                  className="col-span-2 p-3 rounded-2xl bg-surface-container-low/60 text-left flex items-center justify-between opacity-60 cursor-not-allowed border border-surface-container-high"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface-variant line-through">
                      {slot.time}
                    </span>
                    <span className="text-xs text-on-surface-variant">{slot.desc}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-dim text-on-surface-variant text-[11px] font-semibold">
                    {slot.badge}
                  </span>
                </div>
              );
            }

            if (isBooked) {
              return (
                <div
                  key={slot.time}
                  className="p-3 rounded-2xl bg-surface-container-low/60 text-left flex flex-col justify-between opacity-60 cursor-not-allowed border border-surface-container-high"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-on-surface-variant line-through">
                      {slot.time}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-surface-dim text-on-surface-variant text-[10px] font-semibold">
                      {slot.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant leading-tight">
                    {slot.desc}
                  </span>
                </div>
              );
            }

            return (
              <button
                key={slot.time}
                onClick={() => setSelectedTimeSlot(slot.time)}
                className={`p-3 rounded-2xl text-left flex flex-col justify-between transition-all relative border ${
                  isSelected
                    ? 'bg-surface-container-lowest border-primary shadow-[0_4px_14px_rgba(157,62,26,0.18)] scale-[1.01]'
                    : 'bg-surface-container-lowest border-surface-container-high hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {isSelected && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                    <span
                      className={`text-sm font-bold ${
                        isSelected ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      {slot.time}
                    </span>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : slot.recommended
                        ? 'bg-secondary-container text-on-secondary-container flex items-center gap-0.5'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {slot.recommended && !isSelected && (
                      <span className="material-symbols-outlined text-[11px]">thumb_up</span>
                    )}
                    {isSelected ? '已選擇' : slot.badge}
                  </span>
                </div>
                <div
                  className={`text-[11px] leading-snug font-medium ${
                    isSelected ? 'text-on-surface-variant' : slot.recommended ? 'text-secondary' : 'text-on-surface-variant'
                  }`}
                >
                  {slot.isBufferReady ? (
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-secondary">sanitizer</span>
                      <span>紫外線緩衝消毒 30 分已就緒</span>
                    </div>
                  ) : (
                    slot.desc
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Warm Safety Guarantee Note */}
      <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-start gap-3 mb-4">
        <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">
          health_and_safety
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-on-surface">PawGroom 守護承諾</span>
          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
            每位毛孩美容前均享有 10 分鐘免費安撫放鬆與皮毛健康快篩。全程採用無重力吊帶與恆溫吹風機，不使用烘箱，用心呵護如家人。
          </p>
        </div>
      </div>

      {/* 5. Sticky Bottom Reservation Summary & Call-To-Action Dock */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-[0_8px_24px_rgba(66,45,23,0.12)] border border-surface-container-high">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-on-surface-variant font-medium">預約總計 (含加購)</span>
              <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] px-1.5 py-0.2 rounded font-bold">
                免收加急費
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-primary">NT$ {totalPrice.toLocaleString()}</span>
              <span className="text-xs text-on-surface-variant font-medium">/ 預估 {totalMinutes} 分鐘</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-on-surface block">
              10月{selectedDay}日 ({weekDays.find((d) => d.day === selectedDay)?.weekName}) {selectedTimeSlot}
            </span>
            <span className="text-xs text-on-surface-variant flex items-center justify-end gap-0.5 mt-0.5 font-medium">
              <span className="material-symbols-outlined text-[14px] text-primary">face</span>
              {selectedGroomer.name}
            </span>
          </div>
        </div>

        {/* Next Step Action Button */}
        <button
          onClick={handleNext}
          className="w-full h-12 rounded-xl bg-primary text-on-primary font-bold text-sm flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(157,62,26,0.35)] active:scale-[0.98] transition-transform hover:opacity-95 cursor-pointer"
        >
          <span>下一步：填寫毛孩資料與合約簽署</span>
          <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
