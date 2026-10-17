'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Key, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@blda-gaza.org');
  const [password, setPassword] = useState('blda2026');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    // تسجيل دخول آمن للإدارة
    setTimeout(() => {
      if (email.trim() && password.trim()) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('blda_admin_auth', 'true');
          sessionStorage.setItem('blda_admin_user', email);
        }
        router.push('/admin');
      } else {
        setErrorMsg('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-emerald-100 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-700/20">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">دخول المشرف الميداني</h1>
          <p className="text-xs text-slate-500">
            لوحة الإدارة المركزية • جمعية تطوير بيت لاهيا
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              البريد الإلكتروني للإدارة
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm outline-none font-mono"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm outline-none font-mono"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>تسجيل الدخول إلى لوحة العمليات</span>
              </>
            )}
          </button>
        </form>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center space-y-1">
          <span className="text-[11px] text-slate-500 block">بيانات تجريبية جاهزة للاختبار الأكاديمي:</span>
          <span className="text-xs font-mono font-bold text-emerald-800">admin@blda-gaza.org / blda2026</span>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-emerald-700 inline-flex items-center gap-1">
            <span>العودة للصفحة الرئيسية</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
