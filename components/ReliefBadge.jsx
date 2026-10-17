import React from 'react';
import { Clock, CheckCircle2, PackageCheck, AlertCircle, XCircle } from 'lucide-react';

export default function ReliefBadge({ status, size = 'md' }) {
  let config = {
    bg: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: Clock,
    label: 'قيد المراجعة',
  };

  if (status === 'معتمد') {
    config = {
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: CheckCircle2,
      label: 'معتمد للصرف',
    };
  } else if (status === 'قيد التجهيز') {
    config = {
      bg: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: PackageCheck,
      label: 'قيد التجهيز الميداني',
    };
  } else if (status === 'تم التسليم') {
    config = {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
      icon: CheckCircle2,
      label: 'تم التسليم للمستفيد',
    };
  } else if (status === 'مرفوض') {
    config = {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: XCircle,
      label: 'غير مطابق للشروط',
    };
  }

  const Icon = config.icon;
  const paddingClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${paddingClass} font-medium`}>
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span>{config.label}</span>
    </span>
  );
}
