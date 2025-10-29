import React from 'react';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { readExcel, Excel1Row, Excel2Row } from '../lib/excel';
import { downloadSampleExcel1, downloadSampleExcel2 } from '../lib/samples';
import { isValidDerece, isValidKademe, isValidPBIK, isValidTC, parseDDMMYYYY, ValidationIssue } from '../lib/validation';

type Props = {
  onProceed: (args: {
    ay: number; yil: number; ayLabel: string;
    excel1: Excel1Row[]; excel2: Excel2Row[];
    warnings: string[]; errors: string[];
  }) => void;
};

const aylar = [
  { label: 'Ocak', value: 1 }, { label: 'Şubat', value: 2 }, { label: 'Mart', value: 3 },
  { label: 'Nisan', value: 4 }, { label: 'Mayıs', value: 5 }, { label: 'Haziran', value: 6 },
  { label: 'Temmuz', value: 7 }, { label: 'Ağustos', value: 8 }, { label: 'Eylül', value: 9 },
  { label: 'Ekim', value: 10 }, { label: 'Kasım', value: 11 }, { label: 'Aralık', value: 12 },
];

const yillar = [2024, 2025, 2026, 2027, 2028].map(y => ({ label: String(y), value: y }));

export const UploadPage: React.FC<Props> = ({ onProceed }) => {
  const [excel1, setExcel1] = React.useState<Excel1Row[] | null>(null);
  const [excel2, setExcel2] = React.useState<Excel2Row[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [warnings, setWarnings] = React.useState<string[]>([]);
  const [ay, setAy] = React.useState(10);
  const [yil, setYil] = React.useState(2025);
  const [dragE1, setDragE1] = React.useState(false);
  const [dragE2, setDragE2] = React.useState(false);

  const handleFile = async (file: File, type: 'e1' | 'e2') => {
    setLoading(true);
    try {
      const rows = await readExcel(file);
      if (!Array.isArray(rows) || rows.length === 0) {
        setErrors(prev => [...prev, 'Dosya boş veya okunamıyor']);
        return;
      }
      if (type === 'e1') setExcel1(rows as Excel1Row[]);
      else setExcel2(rows as Excel2Row[]);
    } catch (e) {
      setErrors(prev => [...prev, 'Excel okuma hatası: Geçersiz dosya formatı']);
    } finally {
      setLoading(false);
    }
  };

  const validateExcel1 = (rows: Excel1Row[]): ValidationIssue[] => {
    const issues: ValidationIssue[] = [];
    rows.forEach((r, idx) => {
      if (!isValidTC(String(r.TC))) issues.push({ type: 'error', message: `${idx + 2}. satır: TC kimlik numarası 11 haneli olmalı` });
      if (!isValidPBIK(String(r.PBIK))) issues.push({ type: 'error', message: `${idx + 2}. satır: PBIK 5 haneli olmalı` });
      if (!isValidDerece(Number(r.Derece))) issues.push({ type: 'error', message: `${idx + 2}. satır: derece 1-11 aralığında olmalı` });
      if (!isValidKademe(Number(r.Kademe))) issues.push({ type: 'error', message: `${idx + 2}. satır: kademe 1-3 aralığında olmalı` });
      if (!parseDDMMYYYY(String(r['İlerleme Tarihi']))) issues.push({ type: 'error', message: `${idx + 2}. satır: tarih formatı geçersiz (gg.aa.yyyy olmalı)` });
    });
    return issues;
  };

  const validateExcel2 = (rows: Excel2Row[]): ValidationIssue[] => {
    const issues: ValidationIssue[] = [];
    rows.forEach((r, idx) => {
      if (!isValidTC(String(r.TC))) issues.push({ type: 'error', message: `${idx + 2}. satır: TC kimlik numarası 11 haneli olmalı` });
      if (!isValidPBIK(String(r.PBIK))) issues.push({ type: 'error', message: `${idx + 2}. satır: PBIK 5 haneli olmalı` });
      if (!parseDDMMYYYY(String(r['Söz Başlama']))) issues.push({ type: 'error', message: `${idx + 2}. satır: Söz Başlama tarihi geçersiz` });
      if (!parseDDMMYYYY(String(r['Söz Bitiş']))) issues.push({ type: 'error', message: `${idx + 2}. satır: Söz Bitiş tarihi geçersiz` });
    });
    return issues;
  };

  const onCreate = () => {
    if (!excel1 || !excel2) return;
    const i1 = validateExcel1(excel1);
    const i2 = validateExcel2(excel2);
    const allErrors = [...i1, ...i2].filter(i => i.type === 'error').map(i => i.message);
    const allWarnings = [...i1, ...i2].filter(i => i.type === 'warning').map(i => i.message);
    setErrors(allErrors);
    setWarnings(allWarnings);
    if (allErrors.length > 0) return;
    const ayLabel = aylar.find(a => a.value === ay)?.label || '';
    onProceed({ ay, yil, ayLabel, excel1, excel2, warnings: allWarnings, errors: allErrors });
  };

  const disabled = !excel1 || !excel2 || loading;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/5 via-secondary/10 to-primary/5 backdrop-blur-sm shadow-lg shadow-secondary/10 p-5 mb-8">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-5 w-5" />
          <div>
            <div className="font-medium">Örnek Excel Dosyalarını İndirin</div>
            <div className="text-sm opacity-90">15 personellik örnek veriler içerir</div>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <Button variant="secondary" onClick={downloadSampleExcel1}><Download className="h-4 w-4 mr-2" /> Excel 1: Personel Durumu</Button>
          <Button variant="secondary" onClick={downloadSampleExcel2}><Download className="h-4 w-4 mr-2" /> Excel 2: Sözleşme Bilgileri</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Excel 1: Mevcut Personel Durumu" subtitle=".xlsx veya .xls yükleyin">
          <div
            className={["border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-all duration-300 cursor-pointer", dragE1 ? "bg-gradient-to-br from-secondary/20 to-primary/20 border-secondary text-secondary scale-[1.02] shadow-lg" : "text-gray-600 hover:border-gray-400 hover:bg-gray-50/50"].join(' ')}
            onDragOver={(e) => { e.preventDefault(); setDragE1(true); }}
            onDragEnter={(e) => { e.preventDefault(); setDragE1(true); }}
            onDragLeave={() => setDragE1(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragE1(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file, 'e1');
            }}
          >
            <Upload className="mx-auto mb-2" />
            Dosyayı sürükleyip bırakın veya aşağıdan seçin
          </div>
          <Input type="file" accept=".xlsx,.xls" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f, 'e1');
          }} />
          {excel1 && <p className="text-sm text-success mt-2">✓ {excel1.length} kayıt yüklendi</p>}
        </Card>

        <Card title="Excel 2: Sözleşme Bilgileri" subtitle=".xlsx veya .xls yükleyin">
          <div
            className={["border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-all duration-300 cursor-pointer", dragE2 ? "bg-gradient-to-br from-secondary/20 to-primary/20 border-secondary text-secondary scale-[1.02] shadow-lg" : "text-gray-600 hover:border-gray-400 hover:bg-gray-50/50"].join(' ')}
            onDragOver={(e) => { e.preventDefault(); setDragE2(true); }}
            onDragEnter={(e) => { e.preventDefault(); setDragE2(true); }}
            onDragLeave={() => setDragE2(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragE2(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file, 'e2');
            }}
          >
            <Upload className="mx-auto mb-2" />
            Dosyayı sürükleyip bırakın veya aşağıdan seçin
          </div>
          <Input type="file" accept=".xlsx,.xls" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f, 'e2');
          }} />
          {excel2 && <p className="text-sm text-success mt-2">✓ {excel2.length} kayıt yüklendi</p>}
        </Card>
      </div>

      <Card className="mt-6" title="Terfi Dönemi Seçimi">
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Ay" value={ay} onChange={(e) => setAy(Number(e.target.value))} options={aylar} />
          <Select label="Yıl" value={yil} onChange={(e) => setYil(Number(e.target.value))} options={yillar} />
        </div>
      </Card>

      {(errors.length > 0 || warnings.length > 0) && (
        <div className="mt-6 space-y-3">
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

      <Button
        className="group mt-6 w-full bg-gradient-to-r from-success to-secondary text-white shadow-md hover:shadow-lg relative overflow-hidden"
        onClick={onCreate}
        disabled={disabled}
      >
        <span className="relative z-10 inline-flex items-center">
          <span className="mr-2 inline-block h-4 w-4 rounded-full bg-white/70 group-hover:scale-110 transition" />
          {loading ? 'Oluşturuluyor...' : 'Terfi Çizelgesi Oluştur'}
        </span>
        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-white" />
      </Button>
    </div>
  );
};

export default UploadPage;


