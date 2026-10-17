'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Droplet, Utensils, Home, Baby, Heart, Calendar, Users, CheckCircle2, ArrowLeft, Filter } from 'lucide-react';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', 'سقيا ماء', 'أمن غذائي', 'إيواء وطوارئ', 'رعاية أطفال وأيتام'];

  const campaigns = [
    {
      id: 1,
      title: 'مشروع سقيا الماء الصالح للشرب للمخيمات',
      category: 'سقيا ماء',
      desc: 'تسيير شاحنات صهاريج المياه العذبة يومياً لتزويد تجمعات خيام النازحين في مواصي خانيونس ومخيم دير البلح والنصيرات.',
      target: '150,000 لتر يومياً',
      beneficiaries: '14,000 فرد',
      status: 'حملة مستمرة يومياً',
      donor: 'جمعية تطوير بيت لاهيا وشركاء الإغاثة الدولية',
      image: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=800',
    },
    {
      id: 2,
      title: 'السلال التموينية والخضار الطازجة للأسر النازحة',
      category: 'أمن غذائي',
      desc: 'توزيع طرود المواد الغذائية الأساسية والخضار الطازجة لدعم صمود العائلات التي فقدت مصادر دخلها وتخفيف حدة المجاعة.',
      target: '3,500 سلة غذائية',
      beneficiaries: '22,000 فرد',
      status: 'المرحلة الرابعة قيد التنفيذ',
      donor: 'محسنون وداعمون عبر غرفة التنسيق',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    },
    {
      id: 3,
      title: 'تأمين شوادر وخيام الإيواء العاجل لمواجهة الشتاء',
      category: 'إيواء وطوارئ',
      desc: 'توفير شوادر بلاستيكية مقواة، شوادر قماشية، خيام جديدة، وحبال تثبيت لحماية العائلات النازحة من الرياح والأمطار.',
      target: '1,200 خيمة وشادر',
      beneficiaries: '6,000 فرد',
      status: 'قيد التوزيع الميداني',
      donor: 'حملات التكافل المجتمعي',
      image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=800',
    },
    {
      id: 4,
      title: 'كفالة أيتام العدوان والإسناد المالي الطارئ',
      category: 'رعاية أطفال وأيتام',
      desc: 'تقديم مخصصات نقدية عاجلة للأمهات المعيلات للأيتام لتوفير المتطلبات العاجلة من دواء وملابس واحتياجات معيشية.',
      target: '450 يتيماً مكفولاً',
      beneficiaries: '450 أسرة',
      status: 'توزيع شهري منتظم',
      donor: 'صناديق رعاية الأيتام - بيت لاهيا',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    },
    {
      id: 5,
      title: 'حليب الأطفال ومستلزمات العناية بالرضع',
      category: 'رعاية أطفال وأيتام',
      desc: 'تأمين الحليب الخاص وحفاضات الأطفال للرضع في مراكز الإيواء والمخيمات للحد من انتشار الأمراض وسوء التغذية الحاد.',
      target: '2,000 طرد رعاية أطفال',
      beneficiaries: '2,000 رضيع',
      status: 'استجابة مستمرة',
      donor: 'شركاء الإغاثة الصحية',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800',
    },
    {
      id: 6,
      title: 'المطابخ الإغاثية والوجبات الساخنة',
      category: 'أمن غذائي',
      desc: 'تشغيل تكيات طهي الوجبات الساخنة وتوزيعها على العائلات في النقاط الأشد فقرًا والتي تنعدم فيها أفران الغاز والوقود.',
      target: '2,500 وجبة يومياً',
      beneficiaries: '10,000 فرد يومياً',
      status: 'نشطة يومياً',
      donor: 'مبادرات الإطعام الخيري',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800',
    },
  ];

  const filtered = activeCategory === 'الكل'
    ? campaigns
    : campaigns.filter(c => c.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* الترويسة */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          مشاريع جمعية تطوير بيت لاهيا
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          حملات وتدخلات الإغاثة الميدانية
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          نستعرض معكم أبرز البرامج الإغاثية والتنموية التي تنفذها الجمعية ميدانياً في مخيمات قطاع غزة بشفافية وتوثيق مستمر مع الداعمين والشركاء.
        </p>
      </div>

      {/* أزرار الفلترة */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* شبكة المشاريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="h-52 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {item.status}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                <div className="bg-slate-50 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-500 block">المستهدف:</span>
                    <span className="font-bold text-slate-800">{item.target}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">المستفيدون:</span>
                    <span className="font-bold text-emerald-700">{item.beneficiaries}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500 block">الجهة الشريكة:</span>
                    <span className="font-semibold text-slate-700">{item.donor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <Link
                href="/relief-request"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                <span>طلب مساعدة من هذا المشروع</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                دعم المشروع
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
