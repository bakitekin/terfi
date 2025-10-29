import * as XLSX from 'xlsx';

export type TerfiItem = {
  siraNo: number;
  adSoyad: string;
  rutbe: string;
  sicil: string | number;
  tc: string;
  pbik: string;
  sozBaslama: string;
  ilerlemeTarihi: string;
  mevcutDK: string;
  yeniDK: string;
  aciklama: string;
};

export const exportToExcel = (items: TerfiItem[], ayLabel: string, yil: number) => {
  const wb = XLSX.utils.book_new();

  const headerBlocks = [
    ['T.C. İÇİŞLERİ BAKANLIĞI'],
    ['JANDARMA GENEL KOMUTANLIĞI'],
    [''],
    [`${yil} ${ayLabel.toUpperCase()} AYI TERFİ ÇİZELGESİ`],
    [''],
  ];

  const columnsHeader = [[
    'No','Ad Soyad','Rütbe','Sicil','TC Kimlik No','PBIK','Söz Başlama','İlerleme Tarihi','Mevcut D/K','Yeni D/K','Açıklama'
  ]];

  const dataRows = items.map(i => [
    i.siraNo, i.adSoyad, i.rutbe, i.sicil, i.tc, i.pbik, i.sozBaslama, i.ilerlemeTarihi, i.mevcutDK, i.yeniDK, i.aciklama
  ]);

  const footer = [
    [''],
    [''],
    ['Hazırlayan:', '   ', 'Kontrol Eden:', '   ', 'Onaylayan:'],
    ['___________', '   ', '___________', '   ', '___________'],
    ['(İmza)', '   ', '(İmza)', '   ', '(İmza)'],
    [''],
    ['Tarih: __/__/____', '   ', 'Tarih: __/__/____', '   ', 'Tarih: __/__/____']
  ];

  const sheetData = [...headerBlocks, ...columnsHeader, ...dataRows, ...footer];
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  XLSX.utils.book_append_sheet(wb, ws, 'Terfi Çizelgesi');
  XLSX.writeFile(wb, `Terfi_Cizelgesi_${ayLabel}_${yil}.xlsx`);
};

const splitDegreeKademe = (items: TerfiItem[]) => {
  const degree: TerfiItem[] = [];
  const kademe: TerfiItem[] = [];
  items.forEach(i => {
    const [md, mk] = i.mevcutDK.split('/').map(Number);
    const [yd, yk] = i.yeniDK.split('/').map(Number);
    if (!isNaN(md) && !isNaN(mk) && !isNaN(yd) && !isNaN(yk)) {
      if (yd !== md) degree.push(i);
      else if (yk !== mk) kademe.push(i);
    } else {
      // Sayısal ayrıştırılamazsa kademe listesine koy
      kademe.push(i);
    }
  });
  return { degree, kademe };
};

export const exportDegreeExcel = (items: TerfiItem[], ayLabel: string, yil: number) => {
  const { degree } = splitDegreeKademe(items);
  if (degree.length === 0) return;
  const wb = XLSX.utils.book_new();
  const header = [[`${yil} ${ayLabel.toUpperCase()} AYI DERECE İLERLEMESİ`], ['']];
  const cols = [[
    'No','Ad Soyad','Rütbe','Sicil','TC','PBIK','Söz Başlama','İlerleme Tarihi','Mevcut D/K','Yeni D/K','Açıklama'
  ]];
  const rows = degree.map(i => [i.siraNo,i.adSoyad,i.rutbe,i.sicil,i.tc,i.pbik,i.sozBaslama,i.ilerlemeTarihi,i.mevcutDK,i.yeniDK,i.aciklama]);
  const ws = XLSX.utils.aoa_to_sheet([...header, ...cols, ...rows]);
  XLSX.utils.book_append_sheet(wb, ws, 'Derece');
  XLSX.writeFile(wb, `Derece_Ilerleme_${ayLabel}_${yil}.xlsx`);
};

export const exportKademeExcel = (items: TerfiItem[], ayLabel: string, yil: number) => {
  const { kademe } = splitDegreeKademe(items);
  if (kademe.length === 0) return;
  const wb = XLSX.utils.book_new();
  const header = [[`${yil} ${ayLabel.toUpperCase()} AYI KADEME İLERLEMESİ`], ['']];
  const cols = [[
    'No','Ad Soyad','Rütbe','Sicil','TC','PBIK','Söz Başlama','İlerleme Tarihi','Mevcut D/K','Yeni D/K','Açıklama'
  ]];
  const rows = kademe.map(i => [i.siraNo,i.adSoyad,i.rutbe,i.sicil,i.tc,i.pbik,i.sozBaslama,i.ilerlemeTarihi,i.mevcutDK,i.yeniDK,i.aciklama]);
  const ws = XLSX.utils.aoa_to_sheet([...header, ...cols, ...rows]);
  XLSX.utils.book_append_sheet(wb, ws, 'Kademe');
  XLSX.writeFile(wb, `Kademe_Ilerleme_${ayLabel}_${yil}.xlsx`);
};


