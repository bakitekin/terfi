import React from 'react';
import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import { Excel1Row, Excel2Row } from './lib/excel';
import { checkContractValidity, checkPromotionEligibility, calculatePromotion } from './lib/promotion';
import { TerfiItem } from './lib/exportExcel';
import { parseDDMMYYYY } from './lib/validation';

function App() {
  const [view, setView] = React.useState<'upload' | 'result'>('upload');
  const [result, setResult] = React.useState<{
    ayLabel: string;
    yil: number;
    items: TerfiItem[];
    warnings: string[];
    errors: string[];
  } | null>(null);

  const proceed = (args: { ay: number; yil: number; ayLabel: string; excel1: Excel1Row[]; excel2: Excel2Row[]; warnings: string[]; errors: string[]; }) => {
    const warnings: string[] = [...args.warnings];
    const errors: string[] = [...args.errors];

    const sozByTc = new Map<string, Excel2Row>();
    args.excel2.forEach(r => { sozByTc.set(String(r.TC), r); });

    const items: TerfiItem[] = [];
    args.excel1.forEach((p) => {
      const soz = sozByTc.get(String(p.TC));
      if (!soz) {
        warnings.push(`${p.Ad} ${p.Soyad} için sözleşme bilgisi bulunamadı`);
        return;
      }

      if (!checkContractValidity(String(soz['Söz Bitiş']))) {
        warnings.push(`${p.Ad} ${p.Soyad} sözleşmesi sona ermiş`);
        return;
      }

      if (!checkPromotionEligibility(String(p['İlerleme Tarihi']), args.ay, args.yil)) {
        return; // bu ay terfi yok
      }

      const { yeniDerece, yeniKademe, aciklama } = calculatePromotion(Number(p.Derece), Number(p.Kademe));

      // İlerleme tarihini seçilen yıl ile güncelle
      const orijinalIlerlemeTarihi = parseDDMMYYYY(String(p['İlerleme Tarihi']));
      let guncellenmisIlerlemeTarihi: string;
      if (orijinalIlerlemeTarihi) {
        // Orijinal tarihin gün ve ayını al, yılını seçilen yıl ile değiştir
        const gun = String(orijinalIlerlemeTarihi.getDate()).padStart(2, '0');
        const ay = String(orijinalIlerlemeTarihi.getMonth() + 1).padStart(2, '0');
        guncellenmisIlerlemeTarihi = `${gun}.${ay}.${args.yil}`;
      } else {
        // Parse edilemezse orijinal değeri kullan
        guncellenmisIlerlemeTarihi = String(p['İlerleme Tarihi']);
      }

      items.push({
        siraNo: items.length + 1,
        adSoyad: `${p.Ad} ${p.Soyad}`,
        rutbe: String(p['Rütbe']),
        sicil: p.Sicil,
        tc: String(p.TC),
        pbik: String(p.PBIK),
        sozBaslama: String(soz['Söz Başlama']),
        ilerlemeTarihi: guncellenmisIlerlemeTarihi,
        mevcutDK: `${p.Derece}/${p.Kademe}`,
        yeniDK: `${yeniDerece}/${yeniKademe}`,
        aciklama,
      });
    });

    if (items.length === 0) {
      warnings.push('Bu ay terfi hakkı olan personel bulunamadı');
    }

    setResult({ ayLabel: args.ayLabel, yil: args.yil, items, warnings, errors });
    setView('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted-light via-white to-muted-light">
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-secondary/10 text-secondary font-bold text-lg">
            JU
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">Jandarma Uzman Çavuş Terfi Sistemi</h1>
            <p className="text-sm text-gray-600 mt-0.5">3269 sayılı Uzman Erbaş Kanunu - Derece/Kademe İlerleme Otomasyonu</p>
          </div>
        </div>
      </header>

      {view === 'upload' && (
        <UploadPage onProceed={proceed} />
      )}
      {view === 'result' && result && (
        <ResultPage
          ayLabel={result.ayLabel}
          yil={result.yil}
          items={result.items}
          warnings={result.warnings}
          errors={result.errors}
          onBack={() => setView('upload')}
        />
      )}
    </div>
  );
}

export default App;
