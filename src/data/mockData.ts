// Mock data store for admin dashboard - replace with Supabase queries later

export interface Applicant {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  emergency_contact: string;
  selected_plan_id: number;
  wants_treadmill: boolean;
  wants_locker: boolean;
  status: "pending" | "approved" | "rejected";
  rejection_note?: string;
  applied_at: string;
}

export interface Member {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  email: string;
  plan_name: string;
  start_date: string;
  expiry_date: string;
  status: "active" | "expired" | "suspended";
  addons: string[];
}

export interface Plan {
  id: number;
  name: string;
  duration_months: number;
  price: number;
  admission_fee_waived: boolean;
  is_visible: boolean;
}

export interface Addon {
  id: number;
  name: string;
  price_per_month: number;
  is_visible: boolean;
}

export interface Payment {
  id: string;
  member_name: string;
  amount: number;
  payment_type: string;
  payment_method: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paid_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  published_from: string;
  expires_on: string | null;
  is_archived: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  photo_url: string;
  specialization: string;
  bio: string;
  is_active: boolean;
}

// --- MOCK DATA ---

export const mockApplicants: Applicant[] = [
  {
    id: "a1", full_name: "রাহুল ইসলাম", age: 24, gender: "পুরুষ", phone: "01712345678",
    email: "rahul@email.com", address: "গাজীপুর", emergency_contact: "01799999999",
    selected_plan_id: 2, wants_treadmill: true, wants_locker: false,
    status: "pending", applied_at: "2026-04-14T10:00:00Z",
  },
  {
    id: "a2", full_name: "ফাতেমা খানম", age: 28, gender: "মহিলা", phone: "01812345678",
    email: "fatema@email.com", address: "টঙ্গী", emergency_contact: "01899999999",
    selected_plan_id: 1, wants_treadmill: false, wants_locker: true,
    status: "pending", applied_at: "2026-04-15T14:30:00Z",
  },
  {
    id: "a3", full_name: "সাকিব আলম", age: 30, gender: "পুরুষ", phone: "01912345678",
    email: "sakib@email.com", address: "বোর্ড বাজার", emergency_contact: "01999888777",
    selected_plan_id: 3, wants_treadmill: true, wants_locker: true,
    status: "approved", applied_at: "2026-04-10T09:00:00Z",
  },
];

export const mockMembers: Member[] = [
  {
    id: "m1", user_id: "u1", full_name: "সাকিব আলম", phone: "01912345678", email: "sakib@email.com",
    plan_name: "৬ মাস", start_date: "2026-04-10", expiry_date: "2026-10-10",
    status: "active", addons: ["ট্রেডমিল", "লকার"],
  },
  {
    id: "m2", user_id: "u2", full_name: "আরিফ হোসেন", phone: "01612345678", email: "arif@email.com",
    plan_name: "মাসিক", start_date: "2026-03-01", expiry_date: "2026-04-01",
    status: "expired", addons: ["ট্রেডমিল"],
  },
  {
    id: "m3", user_id: "u3", full_name: "নুসরাত জাহান", phone: "01512345678", email: "nusrat@email.com",
    plan_name: "১২ মাস", start_date: "2026-01-15", expiry_date: "2027-01-15",
    status: "active", addons: [],
  },
  {
    id: "m4", user_id: "u4", full_name: "তানভীর রহমান", phone: "01412345678", email: "tanvir@email.com",
    plan_name: "৩ মাস", start_date: "2026-02-01", expiry_date: "2026-05-01",
    status: "active", addons: ["লকার"],
  },
];

export const mockPlans: Plan[] = [
  { id: 1, name: "মাসিক", duration_months: 1, price: 1200, admission_fee_waived: true, is_visible: true },
  { id: 2, name: "৩ মাস", duration_months: 3, price: 1800, admission_fee_waived: false, is_visible: true },
  { id: 3, name: "৬ মাস", duration_months: 6, price: 3500, admission_fee_waived: false, is_visible: true },
  { id: 4, name: "১২ মাস", duration_months: 12, price: 6500, admission_fee_waived: false, is_visible: true },
];

export const mockAddons: Addon[] = [
  { id: 1, name: "ট্রেডমিল অ্যাক্সেস", price_per_month: 200, is_visible: true },
  { id: 2, name: "লকার", price_per_month: 300, is_visible: true },
  { id: 3, name: "ব্যক্তিগত প্রশিক্ষক", price_per_month: 0, is_visible: true },
];

export const mockPayments: Payment[] = [
  { id: "p1", member_name: "সাকিব আলম", amount: 3500, payment_type: "monthly_fee", payment_method: "bKash", status: "completed", paid_at: "2026-04-10T10:00:00Z" },
  { id: "p2", member_name: "সাকিব আলম", amount: 200, payment_type: "addon_treadmill", payment_method: "bKash", status: "completed", paid_at: "2026-04-10T10:01:00Z" },
  { id: "p3", member_name: "সাকিব আলম", amount: 300, payment_type: "addon_locker", payment_method: "bKash", status: "completed", paid_at: "2026-04-10T10:02:00Z" },
  { id: "p4", member_name: "আরিফ হোসেন", amount: 1200, payment_type: "monthly_fee", payment_method: "Nagad", status: "completed", paid_at: "2026-03-01T12:00:00Z" },
  { id: "p5", member_name: "নুসরাত জাহান", amount: 6500, payment_type: "monthly_fee", payment_method: "card", status: "completed", paid_at: "2026-01-15T09:00:00Z" },
  { id: "p6", member_name: "তানভীর রহমান", amount: 1800, payment_type: "monthly_fee", payment_method: "cash", status: "completed", paid_at: "2026-02-01T11:00:00Z" },
  { id: "p7", member_name: "তানভীর রহমান", amount: 300, payment_type: "addon_locker", payment_method: "cash", status: "pending", paid_at: "2026-04-01T11:00:00Z" },
];

export const mockNotices: Notice[] = [
  { id: "n1", title: "ভর্তি ফিতে ১০০% ছাড়!", content: "সীমিত সময়ের জন্য প্রথম মাসের ভর্তি ফিতে ১০০% ছাড়।", published_from: "2026-04-01", expires_on: null, is_archived: false },
  { id: "n2", title: "জিমের সময়সূচি", content: "সকাল ৬:০০ – রাত ১০:০০। শুক্রবার সকাল ৮:০০ – রাত ১০:০০।", published_from: "2026-01-01", expires_on: null, is_archived: false },
  { id: "n3", title: "নতুন সরঞ্জাম সংযোজন", content: "আমাদের জিমে নতুন আধুনিক সরঞ্জাম যোগ করা হয়েছে।", published_from: "2026-04-10", expires_on: "2026-05-10", is_archived: false },
];

export const mockTrainers: Trainer[] = [
  { id: "t1", name: "রাকিব হোসেন", photo_url: "", specialization: "ওজন কমানো ও কার্ডিও", bio: "৫ বছরের অভিজ্ঞতা", is_active: true },
  { id: "t2", name: "তানভীর আহমেদ", photo_url: "", specialization: "মাসল বিল্ডিং ও স্ট্রেংথ", bio: "৭ বছরের অভিজ্ঞতা", is_active: true },
  { id: "t3", name: "ফারিয়া ইসলাম", photo_url: "", specialization: "যোগব্যায়াম ও ফিটনেস", bio: "৪ বছরের অভিজ্ঞতা", is_active: true },
];

// Plan name lookup
export const getPlanName = (planId: number) => {
  const plan = mockPlans.find(p => p.id === planId);
  return plan ? plan.name : "অজানা";
};
