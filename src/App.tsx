import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabKey } from './components/BottomNav';
import { BookingScreen } from './components/BookingScreen';
import { BookingIntakeModal } from './components/BookingIntakeModal';
import { RecordsScreen } from './components/RecordsScreen';
import { WorkbenchScreen } from './components/WorkbenchScreen';
import { ScheduleManagerScreen } from './components/ScheduleManagerScreen';
import { PetsScreen } from './components/PetsScreen';
import { ContractViewerModal } from './components/ContractViewerModal';
import { SystemArchModal } from './components/SystemArchModal';
import { LineChatModal } from './components/LineChatModal';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { CheckInScannerModal } from './components/CheckInScannerModal';
import { ReportModal } from './components/ReportModal';
import { INITIAL_ACTIVE_APPOINTMENT, SERVICE_PACKAGES, ADDON_SERVICES, MOCK_GROOMERS } from './data/mockData';
import { Appointment, ServicePackage, AddonService, Groomer, HistoryRecord } from './types';

export default function App() {
  const [currentMode, setCurrentMode] = useState<'parent' | 'groomer'>('parent');
  const [activeTab, setActiveTab] = useState<TabKey>('booking');
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(INITIAL_ACTIVE_APPOINTMENT);

  // Modals state
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [pendingBookingData, setPendingBookingData] = useState<{
    servicePackage: ServicePackage;
    addons: AddonService[];
    selectedDate: string;
    selectedTime: string;
    groomer: Groomer;
    totalPrice: number;
    estimatedMinutes: number;
  }>({
    servicePackage: SERVICE_PACKAGES[0],
    addons: [ADDON_SERVICES[0]],
    selectedDate: '2024年10月24日 (週四)',
    selectedTime: '14:00',
    groomer: MOCK_GROOMERS[0],
    totalPrice: 1850,
    estimatedMinutes: 105,
  });

  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [selectedContractAppointment, setSelectedContractAppointment] = useState<Appointment | null>(INITIAL_ACTIVE_APPOINTMENT);

  const [archModalOpen, setArchModalOpen] = useState(false);
  const [lineChatOpen, setLineChatOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedReportRecord, setSelectedReportRecord] = useState<HistoryRecord | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleModeChange = (mode: 'parent' | 'groomer') => {
    setCurrentMode(mode);
    if (mode === 'parent' && (activeTab === 'today-tasks' || activeTab === 'schedule')) {
      setActiveTab('booking');
    } else if (mode === 'groomer' && (activeTab === 'booking' || activeTab === 'records')) {
      setActiveTab('today-tasks');
    }
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (tab === 'today-tasks' || tab === 'schedule') {
      setCurrentMode('groomer');
    } else if (tab === 'booking' || tab === 'records') {
      setCurrentMode('parent');
    }
  };

  const handleProceedToIntake = (data: typeof pendingBookingData) => {
    setPendingBookingData(data);
    setIntakeModalOpen(true);
  };

  const handleConfirmBooking = (newApt: Appointment) => {
    setActiveAppointment(newApt);
    setIntakeModalOpen(false);
    setActiveTab('records');
    setCurrentMode('parent');
    showToast(`🎉 預約成功！條碼憑證已生成，已同步至 LINE OA 與 Google 日曆。`);
  };

  const handleUpdateStep = (newStep: number) => {
    if (activeAppointment) {
      setActiveAppointment({
        ...activeAppointment,
        progressStep: newStep,
        status: newStep >= 3 ? 'completed' : 'in_progress',
      });
      showToast(`工位進度已更新，已同步推播通知飼主手機！`);
    }
  };

  const handleCheckInSuccess = () => {
    if (activeAppointment) {
      setActiveAppointment({
        ...activeAppointment,
        status: 'in_progress',
        progressStep: 1,
      });
      showToast(`✅ 到店核銷完成！工位 #1 紫外線消毒結束，現已進入水療階段。`);
    }
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface flex flex-col font-sans">
      {/* Top Fixed Header */}
      <Header
        currentMode={currentMode}
        onModeChange={handleModeChange}
        onOpenArch={() => setArchModalOpen(true)}
        syncTime="剛剛"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-22 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md p-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-xl border border-white/10 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
          <span className="flex-1 leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Main Canvas Viewport */}
      <main className="flex-1 flex flex-col relative w-full pt-22 pb-24 px-4 max-w-md mx-auto">
        {activeTab === 'booking' && (
          <BookingScreen
            onProceedToIntake={handleProceedToIntake}
            onOpenGallery={() => setGalleryOpen(true)}
          />
        )}

        {activeTab === 'pets' && <PetsScreen />}

        {activeTab === 'today-tasks' && (
          <WorkbenchScreen
            activeAppointment={activeAppointment}
            onUpdateAppointmentStep={handleUpdateStep}
            onSwitchToCalendar={() => setActiveTab('schedule')}
            onOpenCheckInScanner={() => setScannerOpen(true)}
          />
        )}

        {activeTab === 'schedule' && <ScheduleManagerScreen />}

        {activeTab === 'records' && (
          <RecordsScreen
            activeAppointment={activeAppointment}
            onViewContract={(apt) => {
              setSelectedContractAppointment(apt);
              setContractModalOpen(true);
            }}
            onOpenLineChat={() => setLineChatOpen(true)}
            onBookNext={() => setActiveTab('booking')}
            onViewReport={(rec) => {
              setSelectedReportRecord(rec);
              setReportModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        bookingBadgeCount={activeAppointment ? 1 : 0}
      />

      {/* Modal 1: Booking Intake & Digital Signature */}
      <BookingIntakeModal
        isOpen={intakeModalOpen}
        onClose={() => setIntakeModalOpen(false)}
        bookingData={pendingBookingData}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Modal 2: Contract Certificate Viewer */}
      <ContractViewerModal
        isOpen={contractModalOpen}
        onClose={() => setContractModalOpen(false)}
        appointment={selectedContractAppointment}
      />

      {/* Modal 3: System Architecture Flowchart Viewer */}
      <SystemArchModal
        isOpen={archModalOpen}
        onClose={() => setArchModalOpen(false)}
      />

      {/* Modal 4: LINE Official Direct Chat */}
      <LineChatModal
        isOpen={lineChatOpen}
        onClose={() => setLineChatOpen(false)}
        groomerName="Sarah 老師"
      />

      {/* Modal 5: Portfolio Photo Gallery */}
      <PhotoGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      {/* Modal 6: In-store Check-In QR Scanner */}
      <CheckInScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        activeAppointment={activeAppointment}
        onCheckInSuccess={handleCheckInSuccess}
      />

      {/* Modal 7: Full Care Report */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        record={selectedReportRecord}
      />
    </div>
  );
}
