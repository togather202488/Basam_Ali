'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Search, 
  Droplet, 
  Utensils, 
  Home, 
  Baby, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowLeft, 
  MapPin, 
  Users, 
  Truck, 
  Activity,
  FileCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const reliefStats = [
    { label: 'سلة غذائية وطرد تمويني', count: '48,500+', icon: Utensils, note: 'تم توزيعها للأسر النازحة' },
    { label: 'لتر ماء صالح للشرب يومياً', count: '140,000+', icon: Droplet, note: 'عبر الصهاريج ونقاط السقيا' },
    { label: 'أسرة مستفيدة موثقة', count: '9,200+', icon: Users, note: 'في كافة مراكز وتجمعات الخيام' },
    { label: 'مخيم ونقطة إيواء مغطاة', count: '16+', icon: MapPin, note: 'من شمال القطاع إلى جنوبه' },
  ];

  const services = [
    {
      title: 'السلال الغذائية والوجبات الساخنة',
      desc: 'توفير الطرود التموينية الأساسية والخضروات والوجبات للأسر الأشد فقراً والأيتام وذوي الاحتياجات الخاصة في المخيمات.',
      icon: Utensils,
      color: 'from-emerald-500 to-green-700',
    },
    {
      title: 'سقيا الماء الصالح للشرب',
      desc: 'تسيير شاحنات وصهاريج المياه العذبة يومياً إلى تجمعات الخيام ومراكز الإيواء التي تعاني من انقطاع شبكات المياه.',
      icon: Droplet,
      color: 'from-blue-500 to-cyan-700',
    },
    {
      title: 'مستلزمات الإيواء ومقاومة الطقس',
      desc: 'توزيع الشوادر، العوازل المطرية، الفرشات، والأغطية لحماية العائلات النازحة في ظل قسوة الظروف الجوية.',
      icon: Home,
      color: 'from-amber-500 to-orange-700',
    },
    {
      title: 'رعاية الأطفال والرضع',
      desc: 'تأمين حليب الأطفال المدعم، الحفاضات، والمكملات الغذائية للرضع لمنع حالات سوء التغذية والجفاف في مراكز النزوح.',
      icon: Baby,
      color: 'from-rose-500 to-pink-700',
    },
  ];

  const coveredCamps = [
    { name: 'مخيم جباليا وتجمعات الشمال', status: 'توزيع يومي نشط' },
    { name: 'مواصي خانيونس والخيام الساحلية', status: 'نقاط سقيا ومواد غذائية' },
    { name: 'مخيم دير البلح والمنطقة الوسطى', status: 'توزيع طرود إيوائية' },
    { name: 'مخيم النصيرات والزهراء', status: 'استجابة طارئة مستمرة' },
    { name: 'مخيم الشاطئ وتجمعات مدينة غزة', status: 'إسناد غذائي وطبي' },
    { name: 'مواصي رفح وتل السلطان', status: 'توزيع مياه وكسوة' },
  ];

  const latestDispatches = [
    {
      title: 'حملة سقيا الماء الكبرى في مواصي خانيونس ومخيم دير البلح',
      date: '16 أكتوبر 2026',
      tag: 'سقيا ماء',
      desc: 'تسيير 12 صهريج ماء نقي بسعة إجمالية بلغت 120,000 لتر على تجمعات الخيام التي تعاني من شح مياه الشرب.',
      image: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=800',
    },
    {
      title: 'توزيع 1,200 طرد خضار ومواد تموينية على أسر الأيتام',
      date: '14 أكتوبر 2026',
      tag: 'أمن غذائي',
      desc: 'استكمال المرحلة الثالثة من مشروع السلال الغذائية الطازجة لتخفيف العبء المعيشي عن الأسر المعيلة للأيتام والجرحى.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    },
    {
      title: 'مشروع صيانة وتدعيم خيام النازحين بالشوادر والعوازل',
      date: '10 أكتوبر 2026',
      tag: 'إيواء وطوارئ',
      desc: 'تزويد أكثر من 400 خيمة بشوادر بلاستيكية سميكة وحبال تثبيت استعداداً لمواجهة الأمطار والرياح.',
      image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=800',
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. قسم البداية والبانر الإنساني (Hero Section) */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        {/* خلفية جمالية */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600')` }}
        />
        <div className="absolute inset-0 hero-gradient" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>منصة الإغاثة الرقمية الموحدة • جمعية تطوير بيت لاهيا</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              إسناد أهلنا الصامدين في مخيمات <span className="text-emerald-400">قطاع غزة</span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
              تعمل جمعية تطوير بيت لاهيا (BLDA) منذ تأسيسها عام 1992 على تنمية وإسناد المجتمع الفلسطيني. واليوم، نكثف جهودنا الميدانية لتأمين السلال الغذائية، مياه الشرب، ومستلزمات الإيواء للنازحين والمتضررين بكل شفافية وكفاءة.
            </p>

            {/* أزرار الإجراءات السريعة */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/relief-request"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <ShieldAlert className="w-5 h-5 text-slate-900" />
                <span>تقديم طلب مساعدة إغاثية</span>
              </Link>

              <Link
                href="/track-request"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all"
              >
                <Search className="w-5 h-5 text-emerald-300" />
                <span>فحص وتتبع حالة طلبك</span>
              </Link>
            </div>

            {/* ملاحظة الشفافية وتفادي الازدواجية */}
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>كل طلب يحصل على كود تتبع فوري ورقم هوية مشفر لضمان وصول المساعدات لمستحقيها بعدالة.</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. بطاقات الإجراءات المباشرة (Quick Action Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 hover:shadow-2xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">استمارة المستفيدين والنازحين</h3>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              سجل بيانات أسرتك ومكان إقامتك الحالي في المخيم لتضمينك في أقرب كشف توزيع للطرود والمساعدات.
            </p>
            <Link
              href="/relief-request"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700"
            >
              <span>ابدأ تسجيل الطلب الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">الاستعلام برقم الهوية وكود الطلب</h3>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              تحقق من حالة طلبك (قيد المراجعة، معتمد للصرف، أو تم التسليم) بسهولة دون الحاجة لكلمة مرور.
            </p>
            <Link
              href="/track-request"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              <span>فحص حالة الطلب</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100 hover:shadow-2xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">الداعمون والشركاء والتطوع</h3>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              تواصل مع إدارة جمعية تطوير بيت لاهيا لتنسيق إرسال قوافل إغاثية أو تمويل مشاريع مياه وإيواء مباشرة.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800"
            >
              <span>تواصل مع غرفة التنسيق</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. شريط إحصائيات الأثر الميداني (Live Impact Stats) */}
      <section className="bg-emerald-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-emerald-300 text-xs font-bold tracking-widest uppercase">شفافية وتوثيق مستمر</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">حصيلة التدخلات الإغاثية الميدانية</h2>
            <p className="text-emerald-200 text-sm">أرقام موثقة تعكس حجم الجهود المبذولة لإغاثة أهلنا في قطاع غزة</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {reliefStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-emerald-800/60 border border-emerald-700/50 rounded-2xl p-5 text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-600/50 flex items-center justify-center text-emerald-300 mb-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-black text-white tracking-tight" dir="ltr">
                    {stat.count}
                  </div>
                  <div className="text-sm font-bold text-emerald-200">{stat.label}</div>
                  <p className="text-xs text-emerald-300/80">{stat.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. قطاعات ومشاريع التدخل الإغاثي (Services & Sectors) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            مجالات العمل الإنساني
          </span>
          <h2 className="text-3xl font-black text-slate-900">برامج الإغاثة والتنمية العاجلة</h2>
          <p className="text-slate-600 text-base">
            تغطي جمعية تطوير بيت لاهيا الاحتياجات الأساسية للنازحين عبر مسارات متكاملة تضمن الكرامة الإنسانية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${srv.color} text-white flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>
                <Link
                  href="/relief-request"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>طلب هذه المساعدة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. خريطة ونقاط تغطية المخيمات (Camps Coverage Grid) */}
      <section className="bg-slate-100/80 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 tracking-wide uppercase">التوزيع الجغرافي</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">تغطية مخيمات ومراكز قطاع غزة</h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              فرق العمل الميدانية للجمعية تتواجد بالتنسيق مع لجان الأحياء والمخيمات لإيصال المساعدات إلى مستحقيها في كل نقطة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coveredCamps.map((camp, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{camp.name}</h4>
                    <p className="text-xs text-emerald-700 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {camp.status}
                    </p>
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. آخر الأخبار والتقارير الميدانية المصورة (Dispatches) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase">توثيق ميداني</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">أحدث التقارير الإغاثية</h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700"
          >
            <span>عرض كافة التقارير والحملات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestDispatches.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {item.tag}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700">توثيق جمعية تطوير بيت لاهيا</span>
                  <Link href="/projects" className="text-xs font-bold text-slate-700 hover:text-emerald-600">
                    التفاصيل ←
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. دعوة للتضامن والتبرع (CTA Box) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-right">
            <h3 className="text-2xl sm:text-3xl font-black">كن شريكاً في إغاثة أهالينا بغزة</h3>
            <p className="text-sm sm:text-base text-emerald-200 leading-relaxed">
              إذا كنت تمثل جمعية خيرية، جهة مانحة، أو فاعل خير، يمكنك التنسيق المباشر مع طواقم جمعية تطوير بيت لاهيا لتنفيذ مشاريع إغاثية موثقة بالفيديو والصور وكشوفات المستفيدين.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white text-emerald-900 font-bold text-sm text-center shadow-lg hover:bg-emerald-50 transition-colors"
            >
              تواصل لتنسيق حملة إغاثية
            </Link>
            <a
              href="https://www.facebook.com/bldagaza"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-bold text-sm text-center border border-emerald-500/40 transition-colors"
            >
              متابعة صفحتنا الميدانية
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
