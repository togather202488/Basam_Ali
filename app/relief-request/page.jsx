'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertCircle, 
  Search, 
  User, 
  Phone, 
  CreditCard, 
  Users, 
  Home, 
  MapPin, 
  Heart, 
  Send,
  HelpCircle,
  FileText
} from 'lucide-react';
import { getCamps, submitReliefRequest } from '@/lib/supabase';
import { generateTrackingCode, isValidNationalId } from '@/lib/utils';

export default function ReliefRequestPage() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    national_id: '',
    phone: '',
    alternate_phone: '',
    family_members_count: 5,
    children_under_five: 1,
    has_special_needs: false,
    is_orphan_caregiver: false,
    camp_id: '1',
    shelter_type: 'خيمة في تجمع نزوح',
    shelter_address: '',
    aid_category: 'سلة غذائية وتموينية عاجلة',
    urgency_level: 'عاجل',
    notes: '',
  });

  useEffect(() => {
    async function loadCamps() {
      const data = await getCamps();
      setCamps(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, camp_id: data[0].id.toString() }));
      }
    }
    loadCamps();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // التحقق من الحقول
    if (!formData.full_name.trim() || formData.full_name.trim().split(' ').length < 3) {
      setFormError('يرجى إدخال الاسم ثلاثياً أو رباعياً على الأقل.');
      return;
    }

    if (!isValidNationalId(formData.national_id)) {
      setFormError('رقم الهوية يجب أن يتكون من 9 أرقام صحيحة.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 9) {
      setFormError('يرجى كتابة رقم جوال صحيح للتواصل والتنسيق الميداني.');
      return;
    }

    if (!formData.shelter_address.trim()) {
      setFormError('يرجى توضيح مكان الخيمة أو المأوى بالتفصيل لتسهيل وصول المنسق.');
      return;
    }

    setLoading(true);

    try {
      const trackingCode = generateTrackingCode();
      const payload = {
        ...formData,
        tracking_code: trackingCode,
      };

      const result = await submitReliefRequest(payload);
      if (result.success) {
        setSubmittedData({
          ...formData,
          tracking_code: trackingCode,
          camp_name: camps.find(c => c.id.toString() === formData.camp_id)?.name || 'مخيم عام',
          date: new Date().toLocaleDateString('ar-EG'),
        });
      } else {
        setFormError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة ثانية.');
      }
    } catch (err) {
      console.error(err);
      setFormError('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (submittedData?.tracking_code) {
      navigator.clipboard.writeText(submittedData.tracking_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* شاشة النجاح وتوليد كود التتبع */}
      {submittedData ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-100 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-emerald-700 font-bold text-sm">تم إرسال الطلب بنجاح إلى غرفة عمليات الجمعية</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              أهلاً بك أ. {submittedData.full_name}
            </h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              تم تسجيل استمارتك الإغاثية في قاعدة بيانات جمعية تطوير بيت لاهيا، وسيتم فرز الطلب والتحقق منه من قِبل باحث النقطة الميدانية في {submittedData.camp_name}.
            </p>
          </div>

          {/* بطاقة كود التتبع الفريد */}
          <div className="bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl p-6 max-w-md mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">كود تتبع طلبك الخاص</span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl font-black text-emerald-900 font-mono tracking-widest" dir="ltr">
                {submittedData.tracking_code}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2.5 rounded-xl bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-200 shadow-sm transition-all"
                title="نسخ الكود"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-emerald-700">
              {copied ? 'تم نسخ الكود للحافظة بنجاح!' : 'احفظ هذا الكود أو التقط صورة للشاشة لمتابعة حالة المساعدة.'}
            </p>
          </div>

          {/* ملخص تفاصيل الطلب */}
          <div className="bg-slate-50 rounded-xl p-4 text-xs sm:text-sm text-slate-700 max-w-lg mx-auto grid grid-cols-2 gap-3 text-right">
            <div>
              <span className="text-slate-500 block">رقم الهوية:</span>
              <span className="font-bold">{submittedData.national_id}</span>
            </div>
            <div>
              <span className="text-slate-500 block">فئة المساعدة:</span>
              <span className="font-bold">{submittedData.aid_category}</span>
            </div>
            <div>
              <span className="text-slate-500 block">المخيم / المنطقة:</span>
              <span className="font-bold">{submittedData.camp_name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">أفراد الأسرة:</span>
              <span className="font-bold">{submittedData.family_members_count} أفراد</span>
            </div>
          </div>

          {/* أزرار الإجراء اللاحق */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href={`/track-request?code=${submittedData.tracking_code}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <Search className="w-4 h-4" />
              <span>الانتقال لشاشة فحص حالة الطلب</span>
            </Link>

            <button
              onClick={() => {
                setSubmittedData(null);
                setFormData(prev => ({ ...prev, national_id: '', full_name: '', notes: '' }));
              }}
              className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-all"
            >
              تسجيل استمارة لأسرة أخرى
            </button>
          </div>

        </div>
      ) : (
        /* استمارة إدخال البيانات الرئيسية */
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-8">
          
          {/* ترويسة الاستمارة */}
          <div className="border-b border-slate-100 pb-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>استمارة المستفيدين والنازحين • قطاع غزة</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              تسجيل طلب مساعدة إغاثية عاجلة
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              يرجى تحري الدقة في إدخال بيانات الأسرة ومكان النزوح الحالي لمساعدة فرق جمعية تطوير بيت لاهيا الميدانية في الوصول إليكم والتنسيق العادل.
            </p>
          </div>

          {formError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* القسم 1: بيانات رب الأسرة */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-r-4 border-emerald-600 pr-3">
                <User className="w-5 h-5 text-emerald-700" />
                <span>1. البيانات الشخصية لرب الأسرة أو المعيل</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم رباعياً كما في الهوية <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="مثال: أحمد محمد خليل النجار"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الهوية الوطنية (9 أرقام) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="national_id"
                    maxLength={9}
                    required
                    value={formData.national_id}
                    onChange={handleChange}
                    placeholder="مثال: 401234567"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الجوال الأساسي / واتساب <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="مثال: 0599123456"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم جوال بديل (للطوارئ)
                  </label>
                  <input
                    type="tel"
                    name="alternate_phone"
                    value={formData.alternate_phone}
                    onChange={handleChange}
                    placeholder="رقم أحد الأقارب أو الجيران"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all font-mono"
                  />
                </div>
              </div>
            </div>

            {/* القسم 2: تفاصيل الأسرة والمأوى */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-r-4 border-emerald-600 pr-3">
                <Users className="w-5 h-5 text-emerald-700" />
                <span>2. تركيبة الأسرة والظرف المعيشي</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    إجمالي عدد أفراد الأسرة <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="family_members_count"
                    min="1"
                    max="35"
                    required
                    value={formData.family_members_count}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    عدد الأطفال الرضع دون سن 5 سنوات
                  </label>
                  <input
                    type="number"
                    name="children_under_five"
                    min="0"
                    max="15"
                    value={formData.children_under_five}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* صناديق الاختيار للحالات الخاصة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="has_special_needs"
                    checked={formData.has_special_needs}
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    يوجد في الأسرة جرحى، مرضى مزمنين، أو ذوي احتياجات خاصة
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="is_orphan_caregiver"
                    checked={formData.is_orphan_caregiver}
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    الأسرة تعيل أيتاماً فقدوا معيلهم
                  </span>
                </label>
              </div>
            </div>

            {/* القسم 3: المخيم ومكان التواجد الحالي */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-r-4 border-emerald-600 pr-3">
                <MapPin className="w-5 h-5 text-emerald-700" />
                <span>3. مكان النزوح والمخيم الحالي في قطاع غزة</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    المخيم أو نقطة التواجد الرئيسية <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="camp_id"
                    value={formData.camp_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none bg-white transition-all"
                  >
                    {camps.map(camp => (
                      <option key={camp.id} value={camp.id}>
                        {camp.name} ({camp.governorate})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    طبيعة المأوى الحالي <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="shelter_type"
                    value={formData.shelter_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none bg-white transition-all"
                  >
                    <option value="خيمة في تجمع نزوح">خيمة في تجمع نزوح عشوائي</option>
                    <option value="مركز إيواء حكومي / مدرسة">مركز إيواء حكومي أو مدرسة</option>
                    <option value="منزل متضرر جزئياً">منزل متضرر جزئياً وغير صالح تماماً</option>
                    <option value="مستضاف لدى أقارب">مستضاف لدى عائلة أخرى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  تفاصيل عنوان الخيمة أو المعلم البارز <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="shelter_address"
                  required
                  value={formData.shelter_address}
                  onChange={handleChange}
                  placeholder="مثال: مواصي خانيونس - بجوار محطة تحلية مياه البحر - خيمة رقم 18"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* القسم 4: نوع المساعدة المطلوبة */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-r-4 border-emerald-600 pr-3">
                <Heart className="w-5 h-5 text-emerald-700" />
                <span>4. الاحتياج الإغاثي الأولي وملاحظات المستفيد</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    فئة المساعدة الأكثر إلحاحاً <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="aid_category"
                    value={formData.aid_category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none bg-white transition-all"
                  >
                    <option value="سلة غذائية وتموينية عاجلة">سلة غذائية وطرد تمويني عاجل</option>
                    <option value="سقيا ماء صالح للشرب">سقيا ماء صالح للشرب</option>
                    <option value="شوادر وخيام ومستلزمات إيواء">شوادر وخيام ومستلزمات إيواء</option>
                    <option value="حليب أطفال وحفاضات للرضع">حليب أطفال وحفاضات للرضع</option>
                    <option value="مساعدة صحية وأدوية">مساعدة صحية وأدوية لأصحاب الأمراض المزمنة</option>
                    <option value="كفالة أيتام ومساعدة نقدية">كفالة أيتام ومساعدة نقدية طارئة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    درجة إلحاح الحالة
                  </label>
                  <select
                    name="urgency_level"
                    value={formData.urgency_level}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none bg-white transition-all"
                  >
                    <option value="عاجل">عاجل (خلال الأيام القادمة)</option>
                    <option value="حرج جداً">حرج جداً (انعدام تام للمأوى أو الغذاء)</option>
                    <option value="طبيعي">طبيعي (ضمن التوزيعات الدورية)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  شرح مختصر لظرف الأسرة أو احتياجات خاصة
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="أية تفاصيل إضافية تود إبلاغ منسق جمعية تطوير بيت لاهيا بها..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* زر الإرسال */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>البيانات سرية وتخضع لسياسات الأمان الخاصة بجمعية تطوير بيت لاهيا.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>جارٍ إرسال وتوليد الكود...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>إرسال استمارة طلب المساعدة</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  );
}
