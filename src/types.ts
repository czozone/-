export interface PetProfile {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: number;
  gender: '公' | '母';
  isNeutered: boolean;
  avatarUrl: string;
  traits: string[];
  sensitiveNotes: string;
  temperamentAlert: string;
  vaccines: {
    rabies: boolean;
    combo: boolean;
    lastDate: string;
  };
  ownerName: string;
  ownerPhone: string;
  lineBound: boolean;
  preferredStyle?: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: string;
  price: number;
  durationMinutes: number;
  badge?: string;
  description: string;
  items: string[];
}

export interface AddonService {
  id: string;
  title: string;
  price: number;
  durationMinutes: number;
  description: string;
  badge?: string;
  checkedByDefault?: boolean;
}

export interface Groomer {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  certifications: string;
  tags: string[];
  avatarUrl: string;
  portfolio: {
    id: string;
    title: string;
    imageUrl: string;
    tag: string;
  }[];
}

export type SlotStatus = 'available' | 'booked' | 'buffer' | 'break' | 'selected';

export interface TimeSlotItem {
  id: string;
  time: string;
  durationMinutes: number;
  status: SlotStatus;
  title: string;
  subtitle?: string;
  badge?: string;
  petName?: string;
  breed?: string;
  petWeight?: number;
  petAvatar?: string;
  ownerName?: string;
  lineBound?: boolean;
  services?: string[];
  notes?: string;
  depositPaid?: boolean;
  workstation?: string;
  progressStep?: number; // 0: 健康檢查, 1: 碳酸浴, 2: 剪毛造型, 3: 待接回, 4: 完成
  voucherCode?: string;
}

export interface Appointment {
  id: string;
  voucherCode: string;
  contractCode: string;
  dateStr: string; // e.g. "2024年10月24日 (四)"
  timeRange: string; // e.g. "10:00 - 11:30"
  groomer: Groomer;
  pet: PetProfile;
  servicePackage: ServicePackage;
  addons: AddonService[];
  totalPrice: number;
  depositPaid: number;
  remainingDue: number;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  progressStep: number; // 0: 健康檢查, 1: 碳酸浴, 2: 剪毛造型, 3: 待接回
  workstation: string;
  signedAt: string;
  signatureDataUrl?: string;
}

export interface HistoryRecord {
  id: string;
  dateStr: string;
  serviceTitle: string;
  itemsIncluded: string;
  groomerName: string;
  storeName: string;
  totalPrice: number;
  invoiceCode?: string;
  cooperationScore: number;
  careFeedback: string;
  nextVisitRecommendation: string;
  parentRating: number;
  parentReview: string;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
}
