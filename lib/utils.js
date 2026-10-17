import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// توليد كود تتبع فريد وعملي للمستفيد (مثال: BLDA-82419)
export function generateTrackingCode() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `BLDA-${randomNum}`;
}

// تنسيق التاريخ والوقت باللغة العربية
export function formatArabicDate(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
}

// التحقق من صحة رقم الهوية (9 أرقام)
export function isValidNationalId(id) {
  if (!id) return false;
  const cleaned = id.trim();
  return /^\d{9}$/.test(cleaned);
}
