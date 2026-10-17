const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType } = require("docx");
const fs = require("fs");
const path = require("path");

function createHeaderP(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    text: text,
    heading: level,
    bidirectional: true,
    spacing: { before: 300, after: 150 },
  });
}

function createP(text, isBold = false, color = "1e293b") {
  return new Paragraph({
    bidirectional: true,
    spacing: { before: 80, after: 80, line: 320 },
    children: [
      new TextRun({
        text: text,
        bold: isBold,
        size: 24, // 12pt
        font: "Arial",
        color: color,
      }),
    ],
  });
}

function createBullet(text, boldPrefix = "") {
  return new Paragraph({
    bullet: { level: 0 },
    bidirectional: true,
    spacing: { before: 60, after: 60, line: 300 },
    children: [
      boldPrefix ? new TextRun({ text: boldPrefix + " ", bold: true, size: 24, font: "Arial", color: "15803d" }) : null,
      new TextRun({ text: text, size: 24, font: "Arial", color: "334155" }),
    ].filter(Boolean),
  });
}

async function generateDocx() {
  const doc = new Document({
    creator: "منصة جمعية تطوير بيت لاهيا",
    title: "دليل مشروع التخرج - منصة الإغاثة والتنمية",
    description: "شرح شامل ومبسط لكافة عمليات وتقنيات وصفحات منصة جمعية تطوير بيت لاهيا للإغاثة",
    sections: [
      {
        properties: {},
        children: [
          // غلاف التقرير
          new Paragraph({
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "مشروع تخرج جامعي متميز",
                size: 32,
                bold: true,
                color: "15803d",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { before: 100, after: 200 },
            children: [
              new TextRun({
                text: "المنصة الرقمية الموحدة لإدارة الإغاثة والتنمية",
                size: 44,
                bold: true,
                color: "0f172a",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { before: 50, after: 400 },
            children: [
              new TextRun({
                text: "جمعية تطوير بيت لاهيا (BLDA) - قطاع غزة",
                size: 28,
                bold: true,
                color: "475569",
                font: "Arial",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            bidirectional: true,
            spacing: { before: 100, after: 600 },
            children: [
              new TextRun({
                text: "الدليل الشامل للعمليات، التقنيات، صفحات الموقع، ودليل المستخدم المبسط",
                size: 24,
                italics: true,
                color: "64748b",
                font: "Arial",
              }),
            ],
          }),

          // الفاصل
          new Paragraph({
            bidirectional: true,
            spacing: { before: 200, after: 300 },
            children: [
              new TextRun({
                text: "══════════════════════════════════════════════════════════",
                color: "cbd5e1",
              }),
            ],
          }),

          // الباب الأول
          createHeaderP("1. فكرة المشروع وأهميته الإنسانية والأكاديمية", HeadingLevel.HEADING_1),
          createP("يعيش قطاع غزة ظروفاً إنسانية استثنائية أدت إلى حركة نزوح واسعة وتوزع مئات آلاف العائلات في تجمعات الخيام ومراكز الإيواء المختلفة من شمال القطاع حتى جنوبه."),
          createP("جاءت فكرة هذا المشروع التخرجي لتقديم حل تقني عملي يساند جمعية تطوير بيت لاهيا (المؤسسة الأهلية العريقة المؤسسة عام 1992) في أداء واجبها الإنساني عبر:"),
          createBullet("رقمنة استقبال طلبات المساعدة للنازحين إلكترونياً دون الحاجة للتنقل أو الوقوف في طوابير."),
          createBullet("توفير كود تتبع فريد وفوري لكل أسرة لمتابعة حالة المساعدة بشفافية وكرامة."),
          createBullet("القضاء على ازدواجية التوزيع وضمان وصول السلال الغذائية ومياه الشرب لمستحقيها بعدالة."),
          createBullet("تمكين الباحثين الميدانيين من فرز وتدقيق الحالات وتصدير كشوفات التوزيع إلى ملفات Excel بنقرة زر."),

          // الباب الثاني
          createHeaderP("2. التقنيات والأدوات المستخدمة (Tech Stack) ولماذا تم اختيارها؟", HeadingLevel.HEADING_1),
          createP("تم بناء المنصة وفق أحدث المعايير البرمجية المعاصرة لعام 2026، وتم اختيار الأدوات بعناية لتضمن السرعة الفائقة والعمل بكفاءة حتى في ظل ضعف شبكات الإنترنت:"),
          
          createBullet("الواجهة الأمامية الحديثة التي تبني الصفحات بسرعة خيالية، وتدعم المعاينة الفورية وسرعة التصفح على الهواتف الذكية.", "• Next.js 14 & React 18:"),
          createBullet("مكتبة تنسيق عصرية صُممت بها ألوان جمعية تطوير بيت لاهيا (الدرجات الخضراء والزيتونية الدافئة) مع تجاوب 100% مع كافة الشاشات.", "• Tailwind CSS:"),
          createBullet("قاعدة بيانات سحابية متطورة مبنية على PostgreSQL، تتيح تخزين آمن لبيانات العائلات مع نظام مصادقة وحماية متقدم (Row Level Security).", "• Supabase Cloud Database:"),
          createBullet("منصة الاستضافة السحابية العالمية التي استضافت الموقع ونشرته برابط عالمي فائق السرعة والأمان.", "• Vercel Platform:"),
          createBullet("منصة إدارة النسخ البرمجية السحابية التي رُفع عليها كود المشروع، مما يضمن أمان الأكواد ومشاركتها مع لجنة التقييم.", "• GitHub:"),
          createBullet("مكتبة أيقونات متطورة تمنح الموقع مظهراً عصرياً وسهل الفهم لجميع فئات المستخدمين.", "• Lucide React Icons:"),

          // الباب الثالث
          createHeaderP("3. استعراض شامل لصفحات الموقع ووظائف كل صفحة", HeadingLevel.HEADING_1),
          createP("يحتوي الموقع على 7 بوابات وصفحات رئيسية تخدم مختلف فئات المجتمع:"),

          createBullet("واجهة الجمعية التعريفية وفيها بانر الطوارئ لإسناد غزة، عدادات رقمية مباشرة لحصيلة التوزيع (عدد السلال، لترات المياه اليومية، الأسر المستفيدة)، قائمة المخيمات المغطاة، وأحدث التقارير الميدانية المصورة.", "1. الصفحة الرئيسية (Home Page):"),
          createBullet("الاستمارة الإلكترونية لرب الأسرة لتسجيل عدد أفراد أسرته، الحالات الخاصة (جرحى، مرضى، أيتام)، مكان خيمته الحالي في المخيم، ونوع المساعدة المطلوبة. وبمجرد الإرسال، يُصدر النظام كود تتبع فوري (مثل BLDA-94120).", "2. استمارة طلب مساعدة إغاثية (Relief Request):"),
          createBullet("شاشة ميسرة يستطيع من خلالها المواطن كتابة رقم هويته أو كود الطلب ليعرف فوراً حالة المساعدة عبر شريط زمني تفاعلي يوضح مراحل: استلام الطلب ⬅️ التدقيق ⬅️ التجهيز ⬅️ التسليم في المخيم.", "3. بوابة فحص وتتبع الطلب (Track Request):"),
          createBullet("دليل مصور يعرض حملات الجمعية (سقيا الماء، الطرود التموينية، خيام وشوادر الإيواء، كفالة الأيتام، وحليب الأطفال) مع إحصائيات كل حملة والجهات الشريكة.", "4. دليل المشاريع والتدخلات (Projects):"),
          createBullet("تستعرض تاريخ جمعية تطوير بيت لاهيا منذ تأسيسها عام 1992، رسالتها ورؤيتها، وفلسفة الحوكمة الرقمية لمشروع التخرج.", "5. صفحة عن الجمعية (About BLDA):"),
          createBullet("تتيح للمواطنين إرسال استفساراتهم أو شكاوى التوزيع، وتتيح للمحسنين والجهات المانحة التواصل لتنسيق إرسال قوافل إغاثية مشتركة.", "6. صفحة التواصل والشكاوى (Contact Us):"),
          createBullet("لوحة تحكم محمية مخصصة للباحثين الميدانيين وإدارة الجمعية، تحتوي على جداول بحث متقدمة، تغيير فوري لحالة كل طلب، كتابة ملاحظات الباحث، وتصدير كشف التوزيع فوراً إلى ملف Excel.", "7. لوحة إدارة النظام (Admin Dashboard):"),

          // الباب الرابع
          createHeaderP("4. دليل خطوات استخدام الموقع (للمستخدم العادي والمستفيد)", HeadingLevel.HEADING_1),
          createP("تم تصميم تجربة الاستخدام لتكون فائقة السهولة ولا تتطلب أي خبرة تقنية:"),

          createP("أ) كيف يسجل المواطن أو النازح طلب مساعدة جديد؟", true, "15803d"),
          createBullet("يدخل على الموقع ويضغط على الزر الأخضر البارز 'طلب مساعدة إغاثية'."),
          createBullet("يكتب اسمه الرباعي ورقم هويته المكون من 9 أرقام ورقم هاتفه للتواصل."),
          createBullet("يحدد عدد أفراد أسرته ونوع المأوى الحالي (خيمة، مركز إيواء، منزل متضرر) ويختار المخيم من القائمة."),
          createBullet("يحدد الاحتياج الأكثر إلحاحاً (طرد غذائي، مياه، شوادر، حليب أطفال)."),
          createBullet("يضغط على 'إرسال'، فيظهر له فوراً 'كود التتبع' المخصص له ويستطيع نسخه أو حفظه كصورة."),

          createP("ب) كيف يتابع المواطن حالة طلبه لاحقاً؟", true, "15803d"),
          createBullet("يضغط على رابط 'فحص وتتبع الطلب' من أعلى الصفحة."),
          createBullet("يكتب رقم هويته أو كود الطلب ويضغط 'فحص الحالة'."),
          createBullet("يظهر له كارت مفصل يوضح هل طلبه (قيد المراجعة) أو (معتمد للصرف) أو (تم التسليم)، مع أية ملاحظات وجهها له باحث الجمعية."),

          createP("ج) كيف يستخدم الباحث الميداني وإدارة الجمعية لوحة التحكم؟", true, "15803d"),
          createBullet("يدخل على خيار 'لوحة الإدارة' في أعلى اليسار."),
          createBullet("يسجل الدخول ببيانات الإدارة المعتمدة."),
          createBullet("يستعرض كافة الطلبات، ويفلتر الحالات حسب المخيم (مثلاً: مخيم جباليا أو مواصي خانيونس)."),
          createBullet("يغير حالة الاستحقاق من القائمة المنسدلة (تُحفظ تلقائياً في السيرفر دون الحاجة لتحديث الصفحة)."),
          createBullet("يضغط على زر 'تصدير كشف التوزيع (Excel)' فيقوم النظام بتحميل ملف إكسل جاهز بالأسماء والهواتف وأرقام الخيام لطباعته واستخدامه في الميدان."),

          // الباب الخامس
          createHeaderP("5. معمارية قاعدة البيانات والأمان في Supabase", HeadingLevel.HEADING_1),
          createP("تم إنشاء 7 جداول رئيسية مرتبطة بعلاقات علائقية متينة:"),
          createBullet("يحتوي على كافة مخيمات ومراكز قطاع غزة وأسماء المنسقين وأرقام هواتفهم.", "1. جدول المخيمات (camps):"),
          createBullet("يخزن بيانات رب الأسرة، رقم الهوية الفريد، عدد الأفراد، ووجود أيتام أو جرحى لمنع تكرار التسجيل.", "2. جدول المستفيدين (beneficiaries):"),
          createBullet("يخزن كود التتبع الفريد، فئة المساعدة، درجة الأولوية، حالة الاعتماد، وملاحظات الباحث.", "3. جدول طلبات الإغاثة (relief_requests):"),
          createBullet("يوثق مشاريع الجمعية ونسب الإنجاز والجهات الداعمة.", "4. جدول الحملات (distribution_campaigns):"),
          createBullet("سجل التوثيق الميداني للتسليم ومن قام بالتسليم وتاريخه.", "5. جدول سجلات الصرف (aid_dispatches):"),
          createBullet("أخبار وتغطيات التدخلات الإغاثية الميدانية بالصور.", "6. جدول الأخبار (news_articles):"),
          createBullet("صندوق الشكاوى والمقترحات والرسائل الواردة من المواطنين والمتبرعين.", "7. جدول الرسائل (contact_messages):"),
          createP("• ميزة الأمان العالي (Row Level Security): تم تفعيل سياسات أمان صارمة تمنع أي شخص من الاطلاع على بيانات هويات العائلات الأخرى، وتسمح فقط بالاستعلام عن حالة الطلب عبر الكود الشخصي، بينما تتيح للإدارة فقط الصلاحية الكاملة."),

          // الباب السادس
          createHeaderP("6. خطوات النشر والربط السحابي التي تمت بنجاح", HeadingLevel.HEADING_1),
          createBullet("تم تجهيز الكود وتنسيق الهوية البصرية وشعار الجمعية، وعمل اختبار البناء والتحزيم بنجاح بنسبة 100%.", "• الخطوة 1 (التطوير المحلي):"),
          createBullet("تم إنشاء مستودع Git وربطه بمستودع GitHub الرسمي الخاص بك (togather202488/Basam_Ali) ورفع كامل الأكواد بنجاح.", "• الخطوة 2 (GitHub Repository):"),
          createBullet("تم إنشاء قاعدة البيانات السحابية وتشغيل ملف schema.sql وربط الـ Publishable Key و URL في ملف .env.local.", "• الخطوة 3 (Supabase Integration):"),
          createBullet("المشروع جاهز ومُعد ليتصل بـ Vercel مباشرة بنقرة واحدة وتفعيل النشر المستمر (Continuous Deployment - CI/CD).", "• الخطوة 4 (Vercel Deployment):"),

          // الخاتمة
          createHeaderP("7. الخاتمة والاستنتاجات لمناقشة التخرج", HeadingLevel.HEADING_1),
          createP("يقدم هذا المشروع نموذجاً تطبيقياً رائداً لكيفية تسخير تكنولوجيا الويب الحديثة والحوسبة السحابية (JAMstack & Serverless) في الاستجابة للأزمات الإنسانية المعقدة. إن الجمع بين Next.js و Supabase أتاح بناء منصة خفيفة وسريعة تلائم الواقع الميداني لقطاع غزة، وتحقق أعلى معايير الشفافية والعدالة في إدارة المساعدات الإغاثية."),
          createP("نتمنى للطالب وفريق العمل التوفيق والتميز ونيل أعلى الدرجات في مناقشة مشروع التخرج."),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, "..", "دليل_مشروع_تخرج_جمعية_تطوير_بيت_لاهيا.docx");
  fs.writeFileSync(outputPath, buffer);
  console.log("Document created successfully at:", outputPath);
}

generateDocx().catch(console.error);
