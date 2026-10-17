'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldAlert, Search, FileText, Info, PhoneCall, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/relief-request', label: 'طلب إغاثة عاجل', highlight: true },
    { href: '/track-request', label: 'فحص وتتبع الطلب' },
    { href: '/projects', label: 'مشاريعنا وتدخلاتنا' },
    { href: '/about', label: 'عن الجمعية' },
    { href: '/contact', label: 'اتصل بنا والشكاوى' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-emerald-100 shadow-sm transition-all">
      {/* شريط الإشعارات العلوي لحالة الطوارئ في قطاع غزة */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>طواقم جمعية تطوير بيت لاهيا تواصل العمل الميداني في مخيمات قطاع غزة لإسناد أهلنا الصامدين</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* الشعار والهوية الرسمية */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-2 shadow-md flex items-center justify-center text-white transform group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tighter">BLDA</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl text-emerald-950 leading-tight group-hover:text-emerald-700 transition-colors">
                جمعية تطوير بيت لاهيا
              </span>
              <span className="text-xs text-emerald-700 font-semibold hidden sm:inline-block">
                بوابة الإغاثة والتنمية المجتمعية - قطاع غزة
              </span>
            </div>
          </Link>

          {/* روابط التصفح للشاشات الكبيرة */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              if (link.highlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition-all transform hover:-translate-y-0.5"
                  >
                    <ShieldAlert className="w-4 h-4 text-emerald-200" />
                    <span>{link.label}</span>
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-emerald-800 bg-emerald-50 font-bold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* زر لوحة التحكم والقائمة المتنقلة */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 border border-slate-200 transition-all"
              title="دخول الباحثين الميدانيين وإدارة الجمعية"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
              <span>لوحة الإدارة</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="فتح القائمة"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* قائمة الجوال المتنقلة */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                link.highlight
                  ? 'bg-emerald-600 text-white font-bold'
                  : isActive(link.href)
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-800 hover:bg-emerald-100"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
              <span>لوحة إدارة النظام والباحث الميداني</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
