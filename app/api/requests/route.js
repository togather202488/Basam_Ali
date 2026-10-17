import { NextResponse } from 'next/server';
import { submitReliefRequest, getAllRequests } from '@/lib/supabase';
import { generateTrackingCode, isValidNationalId } from '@/lib/utils';

export async function GET() {
  try {
    const data = await getAllRequests();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // التحقق من صحة المدخلات الأساسية
    if (!body.full_name || !isValidNationalId(body.national_id) || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'بيانات غير مكتملة أو رقم هوية غير صحيح.' },
        { status: 400 }
      );
    }

    const tracking_code = body.tracking_code || generateTrackingCode();
    const result = await submitReliefRequest({
      ...body,
      tracking_code,
    });

    return NextResponse.json({
      success: true,
      tracking_code,
      message: 'تم تسجيل طلب الإغاثة بنجاح في قاعدة البيانات.',
      data: result.data,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
