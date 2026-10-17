import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'جمعية تطوير بيت لاهيا | بوابة الإغاثة والتنمية - قطاع غزة',
  description: 'المنصة الرقمية الرسمية لجمعية تطوير بيت لاهيا (BLDA) لإدارة العمل الإغاثي، تسجيل طلبات المساعدات للمستفيدين والنازحين في مخيمات قطاع غزة، ومتابعة حملات التوزيع الميداني.',
  keywords: 'جمعية تطوير بيت لاهيا, إغاثة غزة, مساعدات غزة, مخيمات النزوح, طرود غذائية, سقيا ماء, BLDA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
