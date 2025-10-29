import React from 'react';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { exportToExcel, exportDegreeExcel, exportKademeExcel, TerfiItem } from '../lib/exportExcel';

type Props = {
  ayLabel: string;
  yil: number;
  items: TerfiItem[];
  warnings: string[];
  errors: string[];
  onBack: () => void;
};

export const ResultPage: React.FC<Props> = ({ ayLabel, yil, items, warnings, errors, onBack }) => {
  const stats = {
    terfi: items.length,
    uyarilar: warnings.length,
    hatalar: errors.length,
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/30">
          <div className="text-sm font-medium text-gray-600 mb-2">Terfi Edecek</div>
          <div className="text-4xl font-bold text-success">{stats.terfi}</div>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30">
          <div className="text-sm font-medium text-gray-600 mb-2">Uyarılar</div>
          <div className="text-4xl font-bold text-warning">{stats.uyarilar}</div>
        </Card>
        <Card className="bg-gradient-to-br from-error/10 to-error/5 border-error/30">
          <div className="text-sm font-medium text-gray-600 mb-2">Hatalar</div>
          <div className="text-4xl font-bold text-error">{stats.hatalar}</div>
        </Card>
      </div>

      {(warnings.length > 0 || errors.length > 0) && (
        <div className="space-y-3 mb-6">
          {warnings.length > 0 && (
            <Alert variant="warning" title="Uyarılar">
              <ul className="list-disc ml-5">
                {warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </Alert>
          )}
          {errors.length > 0 && (
            <Alert variant="error" title="Hatalar">
              <ul className="list-disc ml-5">
                {errors.map((er, i) => <li key={i}>{er}</li>)}
              </ul>
            </Alert>
          )}
        </div>
      )}

      <div className="mb-5">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          {yil} {ayLabel} Ayı Terfi Çizelgesi
        </h2>
      </div>
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
            <tr>
              {['No','Ad Soyad','Rütbe','Sicil','TC','PBIK','Söz Başlama','İlerleme Tar.','Mevcut D/K','Yeni D/K','Açıklama'].map(h => (
                <th key={h} className="px-3 py-2 text-left font-medium text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((i, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                <td className="px-3 py-2">{i.siraNo}</td>
                <td className="px-3 py-2">{i.adSoyad}</td>
                <td className="px-3 py-2">{i.rutbe}</td>
                <td className="px-3 py-2">{i.sicil}</td>
                <td className="px-3 py-2">{i.tc}</td>
                <td className="px-3 py-2">{i.pbik}</td>
                <td className="px-3 py-2">{i.sozBaslama}</td>
                <td className="px-3 py-2">{i.ilerlemeTarihi}</td>
                <td className="px-3 py-2">{i.mevcutDK}</td>
                <td className="px-3 py-2 font-medium">{i.yeniDK}</td>
                <td className="px-3 py-2">{i.aciklama}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 mt-6">
        <Button variant="ghost" onClick={onBack} className="border">Geri Dön</Button>
        <Button
          onClick={() => exportToExcel(items, ayLabel, yil)}
          className="bg-gradient-to-r from-success to-secondary text-white"
          disabled={items.length === 0}
        >
          Tüm Liste (Excel)
        </Button>
        <Button
          onClick={() => exportDegreeExcel(items, ayLabel, yil)}
          className="bg-primary text-white"
          disabled={items.length === 0}
        >
          Derece İlerleme (Excel)
        </Button>
        <Button
          onClick={() => exportKademeExcel(items, ayLabel, yil)}
          className="bg-secondary text-white"
          disabled={items.length === 0}
        >
          Kademe İlerleme (Excel)
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;


