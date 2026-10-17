-- =====================================================================
-- جمعية تطوير بيت لاهيا (BLDA) - المنصة الرقمية لإدارة الإغاثة والتنمية
-- ملف تهيئة قاعدة البيانات في Supabase (PostgreSQL Schema & Security)
-- متوافق تماماً مع متطلبات مشروع التخرج الجامعي
-- =====================================================================

-- 1. تفعيل الإضافات الضرورية
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================================
-- 2. جدول المخيمات ومناطق النزوح وتجمعات الأهالي
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.camps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    governorate VARCHAR(100) NOT NULL, -- شمال غزة، غزة، الوسطى، خانيونس، رفح
    focal_point_name VARCHAR(150),     -- مسؤول النقطة / المنسق الميداني
    focal_point_phone VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 3. جدول المستفيدين وأرباب الأسر (Beneficiaries)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.beneficiaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    national_id VARCHAR(20) UNIQUE NOT NULL, -- رقم الهوية (9 أرقام)
    full_name VARCHAR(200) NOT NULL,         -- الاسم الرباعي
    phone VARCHAR(30) NOT NULL,              -- رقم الجوال / الواتساب
    alternate_phone VARCHAR(30),             -- رقم طوارئ بديل
    family_members_count INT NOT NULL DEFAULT 1, -- عدد أفراد الأسرة
    children_under_five INT DEFAULT 0,       -- عدد الأطفال دون 5 سنوات
    has_special_needs BOOLEAN DEFAULT false, -- هل يوجد جرحى / ذوي احتياجات خاصة / أمراض مزمنة
    is_orphan_caregiver BOOLEAN DEFAULT false, -- هل يعيل أيتام
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 4. جدول طلبات الإغاثة والمساعدات (Relief Requests)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.relief_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_code VARCHAR(30) UNIQUE NOT NULL, -- كود التتبع (مثال: BLDA-2026-X741)
    beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    camp_id INT REFERENCES public.camps(id) ON DELETE SET NULL,
    shelter_type VARCHAR(100) NOT NULL, -- خيمة، مركز إيواء، منزل متضرر، لدى أقارب
    shelter_address TEXT,               -- تفاصيل مكان التواجد والخيمة
    aid_category VARCHAR(100) NOT NULL, -- طرد غذائي، سقيا ماء، خيام وإيواء، مستلزمات أطفال، دعم صحي، كفالة نقدية
    urgency_level VARCHAR(30) DEFAULT 'طبيعي', -- طبيعي، عاجل، حرج جداً
    notes TEXT,                         -- شرح الظرف الإنساني والاحتياج
    status VARCHAR(50) DEFAULT 'قيد المراجعة', -- قيد المراجعة، معتمد، قيد التجهيز، تم التسليم، مرفوض
    admin_notes TEXT,                   -- ملاحظات الباحث الميداني
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 5. جدول الحملات والمشاريع الإغاثية (Distribution Campaigns)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.distribution_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    donor VARCHAR(150), -- الجهة الداعمة / شريك الإغاثة
    execution_date DATE,
    target_count INT DEFAULT 0,
    delivered_count INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'نشطة', -- نشطة، مكتملة، قادمة
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 6. جدول سجلات تسليم الإغاثة الميدانية (Aid Dispatches)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.aid_dispatches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES public.distribution_campaigns(id) ON DELETE CASCADE,
    request_id UUID REFERENCES public.relief_requests(id) ON DELETE CASCADE,
    received_by_name VARCHAR(150),
    received_by_national_id VARCHAR(20),
    delivered_by VARCHAR(150), -- اسم المنسق الميداني
    proof_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 7. جدول الأخبار والتقارير الميدانية المصورة (News & Reports)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(250) NOT NULL,
    slug VARCHAR(250) UNIQUE,
    summary TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    category VARCHAR(100) DEFAULT 'ميداني', -- إغاثة عاجلة، مشاريع مياه، تنمية مجتمعية
    is_published BOOLEAN DEFAULT true,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 8. جدول رسائل اتصل بنا والمقترحات والشكاوى (Contact Messages)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name VARCHAR(150) NOT NULL,
    contact_info VARCHAR(100) NOT NULL, -- رقم جوال أو بريد
    message_type VARCHAR(50) DEFAULT 'استفسار', -- استفسار، شكوى، رغبة في التبرع، تطوع
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- 9. بيانات أولية استرشادية للمخيمات والمشاريع (Seed Data)
-- =====================================================================
INSERT INTO public.camps (name, governorate, focal_point_name, focal_point_phone) VALUES
('مخيم جباليا وتجمعات شمال غزة', 'شمال غزة', 'منسق الشمال - جمعية تطوير بيت لاهيا', '0599000001'),
('مواصي خانيونس والخيام الساحلية', 'خانيونس', 'لجنة إغاثة مواصي خانيونس', '0599000002'),
('مخيم دير البلح والمنطقة الوسطى', 'الوسطى', 'فريق التوزيع الميداني', '0599000003'),
('مخيم النصيرات والزهراء', 'الوسطى', 'نقطة إغاثة النصيرات', '0599000004'),
('مخيم الشاطئ وتجمعات مدينة غزة', 'غزة', 'منسق غرب غزة', '0599000005'),
('مواصي رفح وتل السلطان', 'رفح', 'فريق الإسناد الجنوبي', '0599000006')
ON CONFLICT DO NOTHING;

INSERT INTO public.distribution_campaigns (title, description, donor, execution_date, target_count, status) VALUES
('مشروع سقيا الماء الصالح للشرب للمخيمات', 'تسيير شاحنات مياه صالحة للشرب ونقاط توزيع يومية في مراكز النزوح والمخيمات', 'جمعية تطوير بيت لاهيا وشركاء الخير', CURRENT_DATE, 1500, 'نشطة'),
('توزيع السلال الغذائية الطازجة والطرود التموينية', 'توفير طرود المواد التموينية والخضروات الأساسية للأسر النازحة والأيتام', 'محسنون وداعمون دوليون', CURRENT_DATE, 800, 'نشطة'),
('تأمين شوادر وخيام الإيواء العاجل', 'توفير مستلزمات العزل ومقاومة الطقس للخيام المهترئة في تجمعات النزوح', 'حملة إسناد غزة', CURRENT_DATE + 3, 350, 'قادمة')
ON CONFLICT DO NOTHING;

INSERT INTO public.news_articles (title, slug, summary, content, category, image_url) VALUES
('جمعية تطوير بيت لاهيا تواصل حملات سقيا الماء وتوزيع الطرود الإغاثية', 'blda-water-and-food-campaign', 'ضمن جهودها الإغاثية المستمرة، سيرت فرق الجمعية شاحنات مياه صالحة للشرب ووزعت مئات الطرود التموينية على العائلات في مخيمات النزوح.', 'تواصل جمعية تطوير بيت لاهيا أداء واجبها الإنساني والوطني تجاه أهلنا في قطاع غزة، حيث نجحت طواقمنا الميدانية خلال هذا الأسبوع في إيصال آلاف اللترات من مياه الشرب وتوزيع السلال الغذائية الأساسية لمئات الأسر الأكثر هشاشة في مراكز وتجمعات الخيام.', 'إغاثة عاجلة', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200')
ON CONFLICT DO NOTHING;

-- =====================================================================
-- 10. إعدادات الأمان (Row Level Security - RLS)
-- =====================================================================
ALTER TABLE public.camps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relief_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distribution_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aid_dispatches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة للبيانات غير الحساسة
CREATE POLICY "Public Read Camps" ON public.camps FOR SELECT USING (true);
CREATE POLICY "Public Read News" ON public.news_articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Campaigns" ON public.distribution_campaigns FOR SELECT USING (true);

-- سياسات إدخال الطلبات والرسائل للجمهور
CREATE POLICY "Public Insert Relief Requests" ON public.relief_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Beneficiaries" ON public.beneficiaries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Contact Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- استعلام الجمهور عن حالة الطلب عبر مطابقة رقم التتبع
CREATE POLICY "Public Track Own Request" ON public.relief_requests FOR SELECT USING (true);
CREATE POLICY "Public Beneficiaries Match" ON public.beneficiaries FOR SELECT USING (true);

-- سياسات الإدارة (المستخدمون المسجلون - Authenticated Users)
CREATE POLICY "Admin Full Access Camps" ON public.camps FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Beneficiaries" ON public.beneficiaries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Requests" ON public.relief_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Campaigns" ON public.distribution_campaigns FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Dispatches" ON public.aid_dispatches FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access News" ON public.news_articles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Contact" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
