'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  PackageCheck, 
  Download, 
  Search, 
  Filter, 
  RefreshCw, 
  LogOut, 
  Home, 
  MapPin, 
  Phone, 
  AlertCircle,
  FileSpreadsheet,
  Check,
  Edit3
} from 'lucide-react';
import { getAllRequests, updateRequestStatus, getCamps } from '@/lib/supabase';
import ReliefBadge from '@/components/ReliefBadge';
import { formatArabicDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [campFilter, setCampFilter] = useState('الكل');
  const [updatingId, setUpdatingId] = useState(null);
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [currentNote, setCurrentNote] = useState('');

  // فحص تسجيل الدخول
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('blda_admin_auth');
      if (!isAuth) {
        router.push('/admin/login');
        return;
      }
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reqs, campsList] = await Promise.all([
        getAllRequests(),
        getCamps(),
      ]);
      setRequests(reqs || []);
      setCamps(campsList || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    await updateRequestStatus(id, newStatus);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    setUpdatingId(null);
  };

  const handleSaveNotes = async (id) => {
    await updateRequestStatus(id, requests.find(r => r.id === id)?.status, currentNote);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, admin_notes: currentNote } : r));
    setEditingNotesId(null);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('blda_admin_auth');
    }
    router.push('/admin/login');
  };

  // تصدير كشوفات الإغاثة إلى ملف CSV متوافق مع Excel باللغة العربية (UTF-8 with BOM)
  const exportToCSV = () => {
    const headers = [
      'كود التتبع',
      'اسم المستفيد',
      'رقم الهوية',
      'رقم الجوال',
      'المخيم / المنطقة',
      'مكان الخيمة / المأوى',
      'عدد أفراد الأسرة',
      'فئة المساعدة',
      'الحالة',
      'تاريخ الطلب',
      'ملاحظات المنسق'
    ];

    const rows = filteredRequests.map(r => [
      r.tracking_code,
      `"${r.full_name}"`,
      `'${r.national_id}'`,
      `'${r.phone}'`,
      `"${r.camp_name || ''}"`,
      `"${r.shelter_address || ''}"`,
      r.family_members_count,
      `"${r.aid_category}"`,
      `"${r.status}"`,
      `"${r.created_at ? new Date(r.created_at).toLocaleDateString('ar-EG') : ''}"`,
      `"${r.admin_notes || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `كشف_إغاثة_بيت_لاهيا_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // تصفية الطلبات حسب البحث والحالة والمخيم
  const filteredRequests = requests.filter(r => {
    const matchQuery = 
      !searchQuery.trim() ||
      r.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.national_id?.includes(searchQuery) ||
      r.tracking_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone?.includes(searchQuery);

    const matchStatus = statusFilter === 'الكل' || r.status === statusFilter;
    const matchCamp = campFilter === 'الكل' || r.camp_name === campFilter;

    return matchQuery && matchStatus && matchCamp;
  });

  // حساب الإحصائيات
  const totalCount = requests.length;
  const approvedCount = requests.filter(r => r.status === 'معتمد').length;
  const pendingCount = requests.filter(r => r.status === 'قيد المراجعة').length;
  const deliveredCount = requests.filter(r => r.status === 'تم التسليم').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* شريط أدوات الترويسة العليا */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>لوحة العمليات الميدانية والتحكم</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            إدارة وتدقيق طلبات الإغاثة • جمعية تطوير بيت لاهيا
          </h1>
          <p className="text-xs text-slate-500">
            متابعة المستفيدين، تدقيق الاستحقاق، وفرز كشوفات التوزيع في مخيمات قطاع غزة.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all"
            title="تنزيل كشف Excel للباحثين الميدانيين"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>تصدير كشف التوزيع (Excel)</span>
          </button>

          <button
            onClick={loadData}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            title="تحديث البيانات"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج</span>
          </button>
        </div>
      </div>

      {/* بطاقات المؤشرات الرقمية */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block">إجمالي المسجلين</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1 block">{totalCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 block">معتمد للصرف</span>
            <span className="text-2xl sm:text-3xl font-black text-blue-700 font-mono mt-1 block">{approvedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 block">قيد المراجعة</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-700 font-mono mt-1 block">{pendingCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 block">تم التسليم الميداني</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono mt-1 block">{deliveredCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <PackageCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* شريط الفلاتر والبحث */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* حقل البحث السريع */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم، الهوية، أو الكود..."
            className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>

        {/* فلاتر الحالة والمخيم */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-bold">الحالة:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white outline-none"
            >
              <option value="الكل">كافة الحالات</option>
              <option value="قيد المراجعة">قيد المراجعة</option>
              <option value="معتمد">معتمد</option>
              <option value="قيد التجهيز">قيد التجهيز</option>
              <option value="تم التسليم">تم التسليم</option>
              <option value="مرفوض">غير مطابق</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-bold">المخيم:</span>
            <select
              value={campFilter}
              onChange={(e) => setCampFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white outline-none max-w-[200px]"
            >
              <option value="الكل">كافة المخيمات</option>
              {camps.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* جدول الطلبات وسجلات المستفيدين */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">كود الطلب</th>
                <th className="py-3.5 px-4">اسم المستفيد / الهوية</th>
                <th className="py-3.5 px-4">المخيم وتفاصيل المأوى</th>
                <th className="py-3.5 px-4">الأسرة والاحتياج</th>
                <th className="py-3.5 px-4">نوع المساعدة</th>
                <th className="py-3.5 px-4">الحالة وإجراء الصرف</th>
                <th className="py-3.5 px-4 text-center">ملاحظات الباحث</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    لا توجد طلبات مطابقة لمعايير البحث الحالية.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* كود التتبع وتاريخه */}
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800" dir="ltr">
                      {req.tracking_code}
                      <span className="block text-[10px] text-slate-400 font-sans mt-0.5" dir="rtl">
                        {req.created_at ? new Date(req.created_at).toLocaleDateString('ar-EG') : ''}
                      </span>
                    </td>

                    {/* اسم المستفيد والهوية والجوال */}
                    <td className="py-3.5 px-4 space-y-0.5">
                      <span className="font-bold text-slate-900 block text-sm">{req.full_name}</span>
                      <div className="flex items-center gap-2 text-slate-500 text-[11px] font-mono">
                        <span>هوية: {req.national_id}</span>
                        <span>•</span>
                        <span>جوال: {req.phone}</span>
                      </div>
                    </td>

                    {/* المخيم والمأوى */}
                    <td className="py-3.5 px-4 space-y-0.5">
                      <span className="font-bold text-slate-800 block">{req.camp_name || 'مخيم عام'}</span>
                      <span className="text-[11px] text-slate-500 block max-w-xs truncate" title={req.shelter_address}>
                        {req.shelter_type} - {req.shelter_address}
                      </span>
                    </td>

                    {/* الأسرة والظرف */}
                    <td className="py-3.5 px-4 space-y-1">
                      <span className="font-semibold text-slate-800 block">
                        {req.family_members_count} أفراد
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {req.has_special_needs && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold">
                            جرحى / مرضى
                          </span>
                        )}
                        {req.is_orphan_caregiver && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold">
                            يعيل أيتام
                          </span>
                        )}
                      </div>
                    </td>

                    {/* نوع المساعدة والإلحاح */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-emerald-900 block">{req.aid_category}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">أولوية: {req.urgency_level}</span>
                    </td>

                    {/* تغيير الحالة الفوري */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <select
                          value={req.status}
                          disabled={updatingId === req.id}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="قيد المراجعة">قيد المراجعة</option>
                          <option value="معتمد">معتمد للصرف</option>
                          <option value="قيد التجهيز">قيد التجهيز</option>
                          <option value="تم التسليم">تم التسليم</option>
                          <option value="مرفوض">مرفوض</option>
                        </select>
                        <ReliefBadge status={req.status} size="sm" />
                      </div>
                    </td>

                    {/* ملاحظات الباحث والتعديل */}
                    <td className="py-3.5 px-4 text-center">
                      {editingNotesId === req.id ? (
                        <div className="space-y-1.5 min-w-[180px]">
                          <textarea
                            rows={2}
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            className="w-full p-1.5 text-xs border rounded-lg"
                            placeholder="اكتب ملاحظة للباحث..."
                          />
                          <div className="flex gap-1 justify-center">
                            <button
                              onClick={() => handleSaveNotes(req.id)}
                              className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold"
                            >
                              حفظ
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]"
                            >
                              إلغاء
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-[11px] text-slate-600 max-w-[140px] truncate" title={req.admin_notes}>
                            {req.admin_notes || '—'}
                          </span>
                          <button
                            onClick={() => {
                              setEditingNotesId(req.id);
                              setCurrentNote(req.admin_notes || '');
                            }}
                            className="p-1 rounded text-slate-400 hover:text-emerald-700 hover:bg-slate-100"
                            title="تعديل الملاحظات"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
