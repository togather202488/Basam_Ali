import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Heart, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-emerald-950/50 mt-16">
      {/* القسم العلوي: رسالة الإسناد */}
      <div className="bg-emerald-900/40 border-b border-emerald-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Heart className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-white text-base">معاً لإسناد عائلاتنا في مخيمات قطاع غزة</p>
              <p className="text-xs text-emerald-300">نعمل يداً بيد لتأمين الاحتياجات الأساسية والكرامة الإنسانية</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-md"
          >
            تنسيق تبرع أو دعم إغاثي
          </Link>
        </div>
      </div>

      {/* الروابط والمعلومات الرئيسية */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* العمود 1: عن الجمعية */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-black text-sm">
                BLDA
              </div>
              <h3 className="text-white font-bold text-lg">جمعية تطوير بيت لاهيا</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              مؤسسة أهلية غير حكومية تأسست عام 1992. تكرس جهودها لخدمة وتطوير المجتمع الفلسطيني، وتكثف حالياً عملياتها الإغاثية الميدانية لدعم النازحين والمتضررين في كافة مخيمات ومناطق قطاع غزة.
            </p>
            <div className="pt-2">
              <a
                href="https://www.facebook.com/bldagaza"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 text-xs border border-blue-500/30 transition-colors"
              >
                <span>صفحة الجمعية الرسمية على فيسبوك</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide border-r-2 border-emerald-500 pr-2">
              بوابات المستفيدين
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/relief-request" className="hover:text-emerald-400 transition-colors">
                  • تقديم استمارة طلب مساعدة إغاثية
                </Link>
              </li>
              <li>
                <Link href="/track-request" className="hover:text-emerald-400 transition-colors">
                  • الاستعلام ومتابعة حالة الطلب
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-emerald-400 transition-colors">
                  • برامج وحملات التوزيع الميداني
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  • صندوق الشكاوى والمقترحات
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 3: تغطية المخيمات */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide border-r-2 border-emerald-500 pr-2">
              نقاط التغطية الميدانية
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>📍 مخيم جباليا وتجمعات شمال قطاع غزة</li>
              <li>📍 مخيم الشاطئ وتجمعات مدينة غزة</li>
              <li>📍 مخيمات الوسطى (دير البلح، النصيرات، البريج)</li>
              <li>📍 مواصي خانيونس ومراكز الإيواء الساحلية</li>
              <li>📍 مواصي وتجمعات رفح الجنوبية</li>
            </ul>
          </div>

          {/* العمود 4: التواصل والطوارئ */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide border-r-2 border-emerald-500 pr-2">
              التواصل وغرفة العمليات
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>المقر الرئيسي: بيت لاهيا - قطاع غزة / نقاط الإيواء الميدانية</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span dir="ltr">0599-000-000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>info@blda-gaza.org</span>
              </p>
            </div>
          </div>

        </div>

        {/* سطر حقوق الملكية ومشروع التخرج */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} جمعية تطوير بيت لاهيا (BLDA). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>مشروع تخرج جامعي: المنصة الرقمية المتكاملة لإدارة الإغاثة والتنمية (Next.js + Supabase)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
