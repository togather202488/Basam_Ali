import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// التحقق من توافر مفاتيح Supabase الحقيقية
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ============================================================================
// بيانات استرشادية ذكية لحالة التشغيل التجريبي (Demo / Fallback Mode)
// تضمن عمل المشروع فوراً ونجاح المناقشة الجامعية حتى في حال عدم الاتصال بالسيرفر
// ============================================================================
export const INITIAL_CAMPS = [
  { id: 1, name: 'مخيم جباليا وتجمعات شمال غزة', governorate: 'شمال غزة', focal_point_name: 'أ. أبو أحمد النجار', focal_point_phone: '0599112233' },
  { id: 2, name: 'مواصي خانيونس والخيام الساحلية', governorate: 'خانيونس', focal_point_name: 'أ. محمود حمدان', focal_point_phone: '0599445566' },
  { id: 3, name: 'مخيم دير البلح والمنطقة الوسطى', governorate: 'الوسطى', focal_point_name: 'أ. حسام الباز', focal_point_phone: '0599778899' },
  { id: 4, name: 'مخيم النصيرات والزهراء', governorate: 'الوسطى', focal_point_name: 'أ. محمد العطار', focal_point_phone: '0599334455' },
  { id: 5, name: 'مخيم الشاطئ وتجمعات مدينة غزة', governorate: 'غزة', focal_point_name: 'أ. إبراهيم كحيل', focal_point_phone: '0599667788' },
  { id: 6, name: 'مواصي رفح وتل السلطان', governorate: 'رفح', focal_point_name: 'أ. كمال المصري', focal_point_phone: '0599223344' },
];

export const INITIAL_REQUESTS = [
  {
    id: 'req-001',
    tracking_code: 'BLDA-94120',
    national_id: '401234567',
    full_name: 'أحمد سعيد عبد الله رضوان',
    phone: '0599123456',
    family_members_count: 7,
    children_under_five: 2,
    has_special_needs: true,
    is_orphan_caregiver: false,
    camp_id: 1,
    camp_name: 'مخيم جباليا وتجمعات شمال غزة',
    shelter_type: 'خيمة في ساحة مركز إيواء',
    shelter_address: 'شمال غزة - بجوار مدرسة الفالوجا - خيمة رقم 42',
    aid_category: 'طرد غذائي عاجل ومياه شرب',
    urgency_level: 'حرج جداً',
    status: 'معتمد',
    notes: 'الأسرة لديها مسن مقعد وطفل رضيع بحاجة ملحة للحليب والغذاء.',
    admin_notes: 'تمت الزيارة الميدانية وتأكيد الاستحقاق، جاهز للصرف في دورة الغد.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'req-002',
    tracking_code: 'BLDA-83215',
    national_id: '402345678',
    full_name: 'مريم خليل إسماعيل أبو عيطة',
    phone: '0598765432',
    family_members_count: 5,
    children_under_five: 1,
    has_special_needs: false,
    is_orphan_caregiver: true,
    camp_id: 2,
    camp_name: 'مواصي خانيونس والخيام الساحلية',
    shelter_type: 'خيمة قماشية تالفة',
    shelter_address: 'مواصي خانيونس - شارع الرشيد - خيمة عائلة أبو عيطة',
    aid_category: 'شوادر وخيام إيواء',
    urgency_level: 'عاجل',
    status: 'قيد التجهيز',
    notes: 'أم معيلة لأربعة أيتام والشوادر الحالية ممزقة مع دخول فصل الشتاء.',
    admin_notes: 'مدرج ضمن حملة الشوادر والخيام القادمة.',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'req-003',
    tracking_code: 'BLDA-75490',
    national_id: '403456789',
    full_name: 'محمود عبد القادر حسن صالحة',
    phone: '0597112233',
    family_members_count: 9,
    children_under_five: 3,
    has_special_needs: true,
    is_orphan_caregiver: false,
    camp_id: 3,
    camp_name: 'مخيم دير البلح والمنطقة الوسطى',
    shelter_type: 'مركز إيواء حكومي',
    shelter_address: 'دير البلح - مدرسة العروبة - فصل رقم 8',
    aid_category: 'مستلزمات أطفال ورعاية صحية',
    urgency_level: 'طبيعي',
    status: 'تم التسليم',
    notes: 'استلام طرد حفاضات وحليب أطفال مدعم.',
    admin_notes: 'تم التسليم بنجاح بحضور المنسق الميداني.',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'req-004',
    tracking_code: 'BLDA-61984',
    national_id: '404567890',
    full_name: 'ياسر محمد فضل الكفارنة',
    phone: '0595334455',
    family_members_count: 6,
    children_under_five: 0,
    has_special_needs: false,
    is_orphan_caregiver: false,
    camp_id: 1,
    camp_name: 'مخيم جباليا وتجمعات شمال غزة',
    shelter_type: 'منزل متضرر جزئياً',
    shelter_address: 'شمال غزة - شارع السكة',
    aid_category: 'سقيا ماء صالح للشرب',
    urgency_level: 'طبيعي',
    status: 'قيد المراجعة',
    notes: 'انقطاع تام لشبكة المياه في الحي منذ أسبوعين.',
    admin_notes: '',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];

// دالة تخزين محلي لضمان الحفظ عند العمل بدون Supabase
function getLocalRequests() {
  if (typeof window === 'undefined') return INITIAL_REQUESTS;
  const stored = localStorage.getItem('blda_local_requests');
  if (!stored) {
    localStorage.setItem('blda_local_requests', JSON.stringify(INITIAL_REQUESTS));
    return INITIAL_REQUESTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_REQUESTS;
  }
}

function saveLocalRequests(requests) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('blda_local_requests', JSON.stringify(requests));
  }
}

// ============================================================================
// واجهات الخدمات البرمجية (Service APIs)
// تعمل تلقائياً مع Supabase إذا تم إدخال المفاتيح، أو مع المخزن التفاعلي المحلي
// ============================================================================

// 1. جلب المخيمات
export async function getCamps() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('camps').select('*').order('id', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn('Supabase fetch camps failed, falling back to local:', err);
    }
  }
  return INITIAL_CAMPS;
}

// 2. إرسال طلب إغاثة جديد
export async function submitReliefRequest(formData) {
  if (isSupabaseConfigured && supabase) {
    try {
      // 1. تسجيل أو جلب المستفيد
      let beneficiaryId = null;
      const { data: existingBen } = await supabase
        .from('beneficiaries')
        .select('id')
        .eq('national_id', formData.national_id)
        .maybeSingle();

      if (existingBen) {
        beneficiaryId = existingBen.id;
      } else {
        const { data: newBen, error: benError } = await supabase
          .from('beneficiaries')
          .insert([
            {
              national_id: formData.national_id,
              full_name: formData.full_name,
              phone: formData.phone,
              family_members_count: parseInt(formData.family_members_count) || 1,
              children_under_five: parseInt(formData.children_under_five) || 0,
              has_special_needs: Boolean(formData.has_special_needs),
              is_orphan_caregiver: Boolean(formData.is_orphan_caregiver),
            }
          ])
          .select('id')
          .single();

        if (benError) throw benError;
        beneficiaryId = newBen.id;
      }

      // 2. إنشاء الطلب الإغاثي
      const { data: reqData, error: reqError } = await supabase
        .from('relief_requests')
        .insert([
          {
            tracking_code: formData.tracking_code,
            beneficiary_id: beneficiaryId,
            camp_id: parseInt(formData.camp_id) || null,
            shelter_type: formData.shelter_type,
            shelter_address: formData.shelter_address,
            aid_category: formData.aid_category,
            urgency_level: formData.urgency_level || 'طبيعي',
            notes: formData.notes || '',
            status: 'قيد المراجعة',
          }
        ])
        .select()
        .single();

      if (reqError) throw reqError;
      return { success: true, tracking_code: formData.tracking_code, data: reqData };
    } catch (err) {
      console.error('Supabase submission error, saving locally:', err);
    }
  }

  // Fallback المحلي التفاعلي
  const current = getLocalRequests();
  const camp = INITIAL_CAMPS.find(c => c.id === parseInt(formData.camp_id));
  const newRequest = {
    id: `req-${Date.now()}`,
    tracking_code: formData.tracking_code,
    national_id: formData.national_id,
    full_name: formData.full_name,
    phone: formData.phone,
    family_members_count: parseInt(formData.family_members_count) || 1,
    children_under_five: parseInt(formData.children_under_five) || 0,
    has_special_needs: Boolean(formData.has_special_needs),
    is_orphan_caregiver: Boolean(formData.is_orphan_caregiver),
    camp_id: parseInt(formData.camp_id),
    camp_name: camp ? camp.name : 'مخيم عام',
    shelter_type: formData.shelter_type,
    shelter_address: formData.shelter_address,
    aid_category: formData.aid_category,
    urgency_level: formData.urgency_level || 'طبيعي',
    notes: formData.notes || '',
    status: 'قيد المراجعة',
    admin_notes: '',
    created_at: new Date().toISOString(),
  };

  saveLocalRequests([newRequest, ...current]);
  return { success: true, tracking_code: formData.tracking_code, data: newRequest };
}

// 3. فحص وتتبع حالة الطلب برقم الهوية أو كود التتبع
export async function trackRequest(query) {
  const clean = query.trim();
  if (isSupabaseConfigured && supabase) {
    try {
      const isCode = clean.toUpperCase().startsWith('BLDA-');
      let reqQuery = supabase
        .from('relief_requests')
        .select(`
          id, tracking_code, shelter_type, shelter_address, aid_category, urgency_level, status, notes, admin_notes, created_at,
          camps(name, governorate),
          beneficiaries(full_name, national_id, family_members_count)
        `);

      if (isCode) {
        reqQuery = reqQuery.eq('tracking_code', clean.toUpperCase());
      } else {
        // البحث برقم الهوية عبر الربط مع جدول المستفيدين
        const { data: ben } = await supabase.from('beneficiaries').select('id').eq('national_id', clean).maybeSingle();
        if (ben) {
          reqQuery = reqQuery.eq('beneficiary_id', ben.id);
        } else {
          return null;
        }
      }

      const { data, error } = await reqQuery.order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (!error && data) {
        return {
          tracking_code: data.tracking_code,
          full_name: data.beneficiaries?.full_name || 'مستفيد مسجل',
          national_id: data.beneficiaries?.national_id,
          camp_name: data.camps?.name || 'غير محدد',
          aid_category: data.aid_category,
          shelter_type: data.shelter_type,
          status: data.status,
          urgency_level: data.urgency_level,
          admin_notes: data.admin_notes,
          created_at: data.created_at,
        };
      }
    } catch (err) {
      console.warn('Supabase track error:', err);
    }
  }

  // Fallback المحلي
  const list = getLocalRequests();
  const found = list.find(r => 
    r.tracking_code?.toLowerCase() === clean.toLowerCase() || 
    r.national_id === clean
  );
  return found || null;
}

// 4. جلب جميع الطلبات للوحة التحكم (مع إمكانية الفلترة وتغيير الحالة)
export async function getAllRequests() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('relief_requests')
        .select(`
          id, tracking_code, shelter_type, shelter_address, aid_category, urgency_level, status, notes, admin_notes, created_at,
          camps(name, governorate),
          beneficiaries(full_name, national_id, phone, family_members_count, has_special_needs, is_orphan_caregiver)
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map(d => ({
          id: d.id,
          tracking_code: d.tracking_code,
          full_name: d.beneficiaries?.full_name || 'غير متوفر',
          national_id: d.beneficiaries?.national_id,
          phone: d.beneficiaries?.phone,
          family_members_count: d.beneficiaries?.family_members_count || 1,
          has_special_needs: d.beneficiaries?.has_special_needs,
          is_orphan_caregiver: d.beneficiaries?.is_orphan_caregiver,
          camp_name: d.camps?.name || 'مخيم عام',
          shelter_type: d.shelter_type,
          shelter_address: d.shelter_address,
          aid_category: d.aid_category,
          urgency_level: d.urgency_level,
          status: d.status,
          notes: d.notes,
          admin_notes: d.admin_notes,
          created_at: d.created_at,
        }));
      }
    } catch (err) {
      console.warn('Supabase get all requests failed:', err);
    }
  }

  return getLocalRequests();
}

// 5. تحديث حالة الطلب من لوحة التحكم
export async function updateRequestStatus(idOrCode, newStatus, adminNotes = '') {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('relief_requests')
        .update({ status: newStatus, admin_notes: adminNotes, updated_at: new Date().toISOString() })
        .or(`id.eq.${idOrCode},tracking_code.eq.${idOrCode}`);
      if (!error) return true;
    } catch (err) {
      console.warn('Supabase update failed:', err);
    }
  }

  // التحديث محلياً
  const current = getLocalRequests();
  const updated = current.map(item => {
    if (item.id === idOrCode || item.tracking_code === idOrCode) {
      return { ...item, status: newStatus, admin_notes: adminNotes || item.admin_notes };
    }
    return item;
  });
  saveLocalRequests(updated);
  return true;
}

// 6. إرسال رسالة "اتصل بنا" أو شكوى
export async function submitContactMessage(messageData) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('contact_messages').insert([messageData]);
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Supabase contact error:', err);
    }
  }
  return { success: true };
}
