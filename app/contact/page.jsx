'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { submitContactMessage } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    sender_name: '',
    contact_info: '',
    message_type: 'استفسار',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.sender_name.trim() || !formData.contact_info.trim() || !formData.message.trim()) {
      setErrorMsg('يرجى ملء كافة الحقول الأساسية قبل الإرسال.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSentSuccess(true);
        setFormData({
          sender_name: '',
          contact_info: '',
          message_type: 'استفسار',
          subject: '',
          message: '',
        });
      } else {
        setErrorMsg('حدث خطأ أثناء الإرسال. يرجى إعادة المحاولة.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* الترويسة */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          غرفة التنسيق والاستجابة
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          تواصل مع جمعية تطوير بيت لاهيا
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          نرحب باستفساراتكم، مقترحاتكم، والشكاوى المتعلقة بكشوفات وتوزيع المساعدات، كما نرحب بالجهات المانحة الراغبة في تنسيق تدخلات إغاثية مشتركة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* معلومات الاتصال والقنوات الرسمية */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              قنوات الاتصال الميدانية
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900">المقر والنقاط الميدانية:</span>
                  <span className="text-slate-600">بيت لاهيا - شمال غزة (المركز الرئيسي) / ونقاط الطوارئ في تجمعات دير البلح وخانيونس.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900">أرقام هواتف الطوارئ والواتساب:</span>
                  <span className="text-slate-600 font-mono" dir="ltr">0599-000-000 / 0569-000-000</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900">البريد الإلكتروني للجهات المانحة:</span>
                  <span className="text-slate-600 font-mono">info@blda-gaza.org</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">تابع أنشطتنا الميدانية لحظة بلحظة:</span>
              <a
                href="https://www.facebook.com/bldagaza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>الصفحة الرسمية: facebook.com/bldagaza</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 space-y-2 text-xs sm:text-sm text-emerald-950">
            <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>ميثاق معالجة الشكاوى:</span>
            </h4>
            <p className="leading-relaxed">
              تلتزم الجمعية بالسرية التامة في التعامل مع أي شكوى مقدمة من المستفيدين بخصوص سوء التوزيع أو عدم وصول المعونات، ويتم التحقق منها عبر لجان الرقابة الميدانية خلال 48 ساعة.
            </p>
          </div>
        </div>

        {/* نموذج المراسلة والتواصل */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">أرسل رسالة إلى غرفة العمليات</h2>
            <p className="text-xs text-slate-500 mt-1">سيتم توجيه رسالتك للقسم المختص (الإغاثة، التبرعات، أو الرقابة والشكاوى).</p>
          </div>

          {sentSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">تم إرسال رسالتك بنجاح</h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                شكراً لتواصلك مع جمعية تطوير بيت لاهيا. تم حفظ رسالتك وسيقوم مسؤول المتابعة بالتواصل معك في أقرب وقت.
              </p>
              <button
                onClick={() => setSentSuccess(false)}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم الكامل <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="sender_name"
                    required
                    value={formData.sender_name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك الكريم"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الجوال أو البريد الإلكتروني <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact_info"
                    required
                    value={formData.contact_info}
                    onChange={handleChange}
                    placeholder="رقم للتواصل والرد عليك"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نوع الرسالة <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="message_type"
                    value={formData.message_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none bg-white transition-all"
                  >
                    <option value="استفسار">استفسار عام عن المساعدات</option>
                    <option value="شكوى">شكوى بخصوص كشوفات التوزيع</option>
                    <option value="رغبة في التبرع والشراكة">رغبة جهة مانحة أو متبرع في الشراكة</option>
                    <option value="تطوع ميداني">طلب تطوع ميداني مع الجمعية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    موضوع الرسالة
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="عنوان ملخص للرسالة"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نص الرسالة أو تفاصيل الشكوى <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="اكتب رسالتك هنا بكل وضوح..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>إرسال الرسالة الآن</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
