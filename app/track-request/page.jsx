'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  PackageCheck, 
  XCircle, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  User, 
  FileText,
  Phone,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { trackRequest } from '@/lib/supabase';
import ReliefBadge from '@/components/ReliefBadge';
import { formatArabicDate } from '@/lib/utils';

function TrackRequestContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // فحص إذا كان هناك كود تتبع في رابط الصفحة (مثلاً عند التحويل من الاستمارة)
  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      setQuery(codeParam);
      performSearch(codeParam);
    }
  }, [searchParams]);

  const performSearch = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setErrorMessage('');
    setSearched(true);

    try {
      const data = await trackRequest(searchTerm);
      if (data) {
        setResult(data);
      } else {
        setResult(null);
        setErrorMessage('لم يتم العثور على طلب مطابق لرقم الهوية أو كود التتبع المدخل. يرجى التحقق وإعادة المحاولة.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('تعذر جلب البيانات. يرجى المحاولة بعد قليل.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  // تحديد المراحل الإجرائية للطلب
  const stages = [
    { title: 'استلام الاستمارة', desc: 'تم إدراج الطلب في سجلات الجمعية' },
    { title: 'التدقيق الميداني', desc: 'التحقق من بيانات الأسرة والمخيم' },
    { title: 'الاعتماد والتجهيز', desc: 'تجهيز الطرود وحصص التوزيع' },
    { title: 'التسليم الميداني', desc: 'استلام المعونة في نقطة المخيم' },
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'قيد المراجعة': return 1;
      case 'معتمد': return 2;
      case 'قيد التجهيز': return 2;
      case 'تم التسليم': return 4;
      case 'مرفوض': return 1;
      default: return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* الترويسة الرئيسية */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Search className="w-3.5 h-3.5" />
          <span>خدمة الاستعلام والمتابعة اللحظية</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          فحص وتتبع حالة طلب المساعدة الإغاثية
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          أدخل رقم الهوية الوطنية (9 أرقام) أو كود التتبع الذي حصلت عليه (مثال: BLDA-82419) لمعرفة حالة اعتماد المساعدة وموعد التوزيع.
        </p>
      </div>

      {/* صندوق البحث */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 max-w-2xl mx-auto">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              رقم الهوية الوطنية أو كود التتبع:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="أدخل رقم الهوية أو BLDA-XXXXX"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>فحص الحالة</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>بيانات تجريبية سريعة للفحص:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setQuery('BLDA-94120'); performSearch('BLDA-94120'); }}
                className="text-emerald-700 underline font-mono hover:text-emerald-900"
              >
                BLDA-94120
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => { setQuery('401234567'); performSearch('401234567'); }}
                className="text-emerald-700 underline font-mono hover:text-emerald-900"
              >
                401234567
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* رسالة الخطأ إن لم يُعثر على الطلب */}
      {errorMessage && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">تنبيه:</p>
            <p className="text-xs leading-relaxed">{errorMessage}</p>
            <div className="pt-2">
              <Link href="/relief-request" className="text-xs font-bold text-emerald-700 underline">
                تقديم استمارة طلب جديدة الآن ←
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* بطاقة نتيجة الفحص */}
      {result && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 space-y-6 animate-in zoom-in-95 duration-200 max-w-3xl mx-auto">
          
          {/* الجزء العلوي: الكود والحالة */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs text-slate-500 block">رقم وتصنيف الطلب</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-wider" dir="ltr">
                  {result.tracking_code}
                </span>
                <ReliefBadge status={result.status} />
              </div>
            </div>
            <div className="text-xs text-slate-500 sm:text-left">
              <span>تاريخ التسجيل:</span>
              <span className="font-semibold block text-slate-700 mt-0.5">{formatArabicDate(result.created_at)}</span>
            </div>
          </div>

          {/* المسار المرحلي التفاعلي (Timeline) */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-700 mb-4">مسار معالجة المساعدة:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
              {stages.map((stage, idx) => {
                const currentStageIdx = getStageIndex(result.status);
                const isCompleted = idx + 1 <= currentStageIdx;
                const isCurrent = idx + 1 === currentStageIdx;

                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isCurrent ? 'text-emerald-800' : 'text-slate-800'}`}>
                        {stage.title}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* تفاصيل المستفيد والمأوى */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 block text-xs">اسم رب الأسرة:</span>
              <span className="font-bold text-slate-900">{result.full_name}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 block text-xs">المخيم الحالي:</span>
              <span className="font-bold text-slate-900">{result.camp_name || result.camps?.name || 'مخيم عام'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 block text-xs">فئة المساعدة المطلوبة:</span>
              <span className="font-bold text-emerald-800">{result.aid_category}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 block text-xs">عنوان وتفاصيل الخيمة:</span>
              <span className="font-semibold text-slate-800">{result.shelter_address || 'في تجمع النزوح'}</span>
            </div>
          </div>

          {/* ملاحظات الباحث الميداني إن وجدت */}
          {result.admin_notes && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm space-y-1">
              <span className="font-bold block text-emerald-900">ملاحظات طاقم جمعية تطوير بيت لاهيا:</span>
              <p className="leading-relaxed">{result.admin_notes}</p>
            </div>
          )}

          {/* رسالة الطمأنينة وإرشادات الاستلام */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
            <span>يرجى إبراز الهوية الأصلية عند الاستلام الميداني من المنسق.</span>
            <Link href="/contact" className="text-emerald-700 font-bold hover:underline">
              استفسار عن هذا الطلب ←
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}

export default function TrackRequestPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-500">جارٍ تحميل نظام الاستعلام...</div>}>
      <TrackRequestContent />
    </Suspense>
  );
}
