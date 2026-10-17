'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Users, Target, History, Award, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { title: 'الشفافية والمساءلة', desc: 'توثيق كامل لكل طرد ومعونة وتزويد المانحين بتقارير تدقيق ميدانية رقمية.' },
    { title: 'العدالة في التوزيع', desc: 'استخدام خوارزميات فحص ومنع ازدواجية الصرف لضمان وصول المساعدات للأسر الأشد فقراً.' },
    { title: 'الكرامة الإنسانية', desc: 'حفظ كرامة النازحين وتسهيل إجراءات التسجيل والاستلام دون طوابير مهينة أو تعقيدات.' },
    { title: 'التكامل والشراكة', desc: 'التعاون الوثيق مع لجان المخيمات والمؤسسات الإغاثية الشريكة محلياً ودولياً.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* الترويسة ونبذة التأسيس */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <History className="w-4 h-4 text-emerald-700" />
            <span>تاريخ عريق منذ عام 1992 في قطاع غزة</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            جمعية تطوير بيت لاهيا: مسيرة عطاء متجذرة في خدمة مجتمعنا
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            تأسست <strong>جمعية تطوير بيت لاهيا (BLDA)</strong> عام 1992 كمؤسسة أهلية غير ربحية مرخصة في قطاع غزة. انطلقت من بلدة بيت لاهيا شمال القطاع بهدف النهوض بالمستوى المعيشي والتعليمي والزراعي والاجتماعي لأهالي المنطقة.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            مع تفاقم الظروف الإنسانية وحرب النزوح التي شهدها قطاع غزة، وسعت الجمعية نطاق عملياتها لتصبح مظلة إغاثية ميدانية شاملة تدير قوافل السقيا، السلال التموينية، ومراكز الإسناد في تجمعات ومخيمات النزوح من الشمال إلى الجنوب.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/relief-request"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
            >
              تقديم استمارة مساعدة
            </Link>
            <a
              href="https://www.facebook.com/bldagaza"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
            >
              زيارة صفحتنا على فيسبوك
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000"
              alt="طواقم جمعية تطوير بيت لاهيا"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-emerald-800 text-white p-5 rounded-2xl shadow-xl border-2 border-emerald-600 hidden sm:block max-w-xs">
            <p className="font-black text-2xl font-mono" dir="ltr">+32 عاماً</p>
            <p className="text-xs text-emerald-200 mt-1">من العمل الخيري والمجتمعي الموثق في خدمة أبناء قطاع غزة</p>
          </div>
        </div>
      </div>

      {/* الرؤية والرسالة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-emerald-950">رؤيتنا</h2>
          <p className="text-sm text-emerald-900/80 leading-relaxed">
            مجتمع فلسطيني متكافل وصامد، قادر على تجاوز التحديات الإنسانية والكوارث، ومتمتع بحقوقه الكاملة في الغذاء والمأوى والرعاية الكريمة تمهيداً لإعادة الإعمار والتنمية المستدامة.
          </p>
        </div>

        <div className="bg-blue-50/70 border border-blue-100 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-blue-950">رسالتنا</h2>
          <p className="text-sm text-blue-900/80 leading-relaxed">
            تسخير كافة الموارد المادية والبشرية والتقنيات الحديثة لإيصال المساعدات الإغاثية والطارئة لمستحقيها بأعلى درجات الشفافية، مع إطلاق برامج تنموية تدعم التعليم، رعاية الأيتام، والأمن الغذائي.
          </p>
        </div>
      </div>

      {/* قيم الجمعية */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase">مبادئنا الأساسية</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">القيم التي تحكم عملنا الميداني</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-base text-slate-900">{v.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* التزام الشفافية والمشروع الجامعي */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <h3 className="text-xl font-bold">الحوكمة والتحول الرقمي لمشروع التخرج</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          تم تصميم وبناء هذه المنصة كأطروحة تخرج جامعية تطبيقية تهدف إلى حل إحدى أكبر معضلات إدارة الأزمات الإنسانية: تسجيل النازحين بدون انقطاع، تتبع المساعدات بشفافية عبر رموز التتبع (Tracking Codes)، وتوفير لوحة تحكم فورية ترتبط بقاعدة بيانات Supabase الموثوقة والمحمية بسياسات الأمان المتقدمة.
        </p>
      </div>

    </div>
  );
}
