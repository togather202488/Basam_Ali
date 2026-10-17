import { NextResponse } from 'next/server';
import { submitContactMessage } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.sender_name || !body.contact_info || !body.message) {
      return NextResponse.json(
        { success: false, error: 'يرجى إكمال جميع الحقول المطلوبة.' },
        { status: 400 }
      );
    }

    const result = await submitContactMessage(body);

    return NextResponse.json({
      success: true,
      message: 'تم إرسال رسالتكم بنجاح وسيتواصل معكم فريق الجمعية قريباً.',
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
