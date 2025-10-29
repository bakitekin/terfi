import * as XLSX from 'xlsx';

export type Excel1Row = {
  Ad: string;
  Soyad: string;
  'Rütbe': string;
  Sicil: string | number;
  TC: string;
  Görev: string;
  PBIK: string;
  Derece: number;
  Kademe: number;
  'İlerleme Tarihi': string; // gg.aa.yyyy
};

export type Excel2Row = {
  Ad: string;
  Soyad: string;
  'Rütbe': string;
  Sicil: string | number;
  TC: string;
  Görev: string;
  PBIK: string;
  'Söz Başlama': string; // gg.aa.yyyy
  'Söz Bitiş': string; // gg.aa.yyyy
};

export const readExcel = async (file: File): Promise<any[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(sheet, { defval: '' });
};


