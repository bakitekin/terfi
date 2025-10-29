import * as XLSX from 'xlsx';
import { Excel1Row, Excel2Row } from './excel';

export const sampleExcel1: Excel1Row[] = [
  { Ad: 'Mehmet', Soyad: 'YILMAZ', 'Rütbe': 'Uzman Çavuş', Sicil: '123456', TC: '12345678901', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', Derece: 7, Kademe: 2, 'İlerleme Tarihi': '10.10.2024' },
  { Ad: 'Ali', Soyad: 'KAYA', 'Rütbe': 'Uzman Çavuş', Sicil: '123457', TC: '12345678902', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', Derece: 9, Kademe: 3, 'İlerleme Tarihi': '05.10.2024' },
  { Ad: 'Osman', Soyad: 'DEMİR', 'Rütbe': 'Uzman Çavuş', Sicil: '123458', TC: '12345678903', Görev: 'Harekat Şb.Md.', PBIK: '10522', Derece: 5, Kademe: 3, 'İlerleme Tarihi': '30.10.2024' },
  { Ad: 'Ayşe', Soyad: 'YILDIRIM', 'Rütbe': 'Uzman Çavuş', Sicil: '123459', TC: '12345678904', Görev: 'Lojistik Şb.Md.', PBIK: '10523', Derece: 8, Kademe: 1, 'İlerleme Tarihi': '15.10.2024' },
  { Ad: 'Fatma', Soyad: 'ÇELİK', 'Rütbe': 'Uzman Çavuş', Sicil: '123460', TC: '12345678905', Görev: 'İnsan Kay. Şb.Md.', PBIK: '10521', Derece: 6, Kademe: 2, 'İlerleme Tarihi': '20.10.2024' },
  { Ad: 'Ahmet', Soyad: 'ARSLAN', 'Rütbe': 'Uzman Çavuş', Sicil: '123461', TC: '12345678906', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', Derece: 7, Kademe: 3, 'İlerleme Tarihi': '12.10.2024' },
  { Ad: 'Zeynep', Soyad: 'KARA', 'Rütbe': 'Uzman Çavuş', Sicil: '123462', TC: '12345678907', Görev: 'Harekat Şb.Md.', PBIK: '10522', Derece: 9, Kademe: 1, 'İlerleme Tarihi': '25.10.2024' },
  { Ad: 'Mustafa', Soyad: 'ÖZKAN', 'Rütbe': 'Uzman Çavuş', Sicil: '123463', TC: '12345678908', Görev: 'Lojistik Şb.Md.', PBIK: '10523', Derece: 5, Kademe: 2, 'İlerleme Tarihi': '08.10.2024' },
  { Ad: 'Elif', Soyad: 'AKIN', 'Rütbe': 'Uzman Çavuş', Sicil: '123464', TC: '12345678909', Görev: 'İnsan Kay. Şb.Md.', PBIK: '10521', Derece: 11, Kademe: 3, 'İlerleme Tarihi': '18.10.2024' },
  { Ad: 'Burak', Soyad: 'ŞAHIN', 'Rütbe': 'Uzman Çavuş', Sicil: '123465', TC: '12345678910', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', Derece: 4, Kademe: 1, 'İlerleme Tarihi': '22.10.2024' },
  { Ad: 'Seda', Soyad: 'GÜNEŞ', 'Rütbe': 'Uzman Çavuş', Sicil: '123466', TC: '12345678911', Görev: 'Harekat Şb.Md.', PBIK: '10522', Derece: 6, Kademe: 3, 'İlerleme Tarihi': '28.10.2024' },
  { Ad: 'Emre', Soyad: 'YILMAZ', 'Rütbe': 'Uzman Çavuş', Sicil: '123467', TC: '12345678912', Görev: 'Lojistik Şb.Md.', PBIK: '10523', Derece: 8, Kademe: 2, 'İlerleme Tarihi': '14.10.2024' },
  { Ad: 'Cansu', Soyad: 'DEMİR', 'Rütbe': 'Uzman Çavuş', Sicil: '123468', TC: '12345678913', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', Derece: 7, Kademe: 1, 'İlerleme Tarihi': '06.10.2024' },
  { Ad: 'Mert', Soyad: 'KOÇAK', 'Rütbe': 'Uzman Çavuş', Sicil: '123469', TC: '12345678914', Görev: 'Harekat Şb.Md.', PBIK: '10522', Derece: 9, Kademe: 2, 'İlerleme Tarihi': '11.10.2024' },
  { Ad: 'Deniz', Soyad: 'ÖZGÜR', 'Rütbe': 'Uzman Çavuş', Sicil: '123470', TC: '12345678915', Görev: 'İnsan Kay. Şb.Md.', PBIK: '10521', Derece: 5, Kademe: 1, 'İlerleme Tarihi': '19.10.2024' },
];

export const sampleExcel2: Excel2Row[] = [
  { Ad: 'Mehmet', Soyad: 'YILMAZ', 'Rütbe': 'Uzman Çavuş', Sicil: '123456', TC: '12345678901', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', 'Söz Başlama': '15.01.2018', 'Söz Bitiş': '15.01.2026' },
  { Ad: 'Ali', Soyad: 'KAYA', 'Rütbe': 'Uzman Çavuş', Sicil: '123457', TC: '12345678902', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', 'Söz Başlama': '20.03.2017', 'Söz Bitiş': '20.03.2025' },
  { Ad: 'Osman', Soyad: 'DEMİR', 'Rütbe': 'Uzman Çavuş', Sicil: '123458', TC: '12345678903', Görev: 'Harekat Şb.Md.', PBIK: '10522', 'Söz Başlama': '10.05.2019', 'Söz Bitiş': '10.05.2027' },
  { Ad: 'Ayşe', Soyad: 'YILDIRIM', 'Rütbe': 'Uzman Çavuş', Sicil: '123459', TC: '12345678904', Görev: 'Lojistik Şb.Md.', PBIK: '10523', 'Söz Başlama': '01.07.2020', 'Söz Bitiş': '01.07.2028' },
  { Ad: 'Fatma', Soyad: 'ÇELİK', 'Rütbe': 'Uzman Çavuş', Sicil: '123460', TC: '12345678905', Görev: 'İnsan Kay. Şb.Md.', PBIK: '10521', 'Söz Başlama': '10.12.2016', 'Söz Bitiş': '10.12.2024' },
  { Ad: 'Ahmet', Soyad: 'ARSLAN', 'Rütbe': 'Uzman Çavuş', Sicil: '123461', TC: '12345678906', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', 'Söz Başlama': '05.02.2018', 'Söz Bitiş': '05.02.2026' },
  { Ad: 'Zeynep', Soyad: 'KARA', 'Rütbe': 'Uzman Çavuş', Sicil: '123462', TC: '12345678907', Görev: 'Harekat Şb.Md.', PBIK: '10522', 'Söz Başlama': '25.08.2019', 'Söz Bitiş': '25.08.2027' },
  { Ad: 'Mustafa', Soyad: 'ÖZKAN', 'Rütbe': 'Uzman Çavuş', Sicil: '123463', TC: '12345678908', Görev: 'Lojistik Şb.Md.', PBIK: '10523', 'Söz Başlama': '08.09.2018', 'Söz Bitiş': '08.09.2026' },
  { Ad: 'Elif', Soyad: 'AKIN', 'Rütbe': 'Uzman Çavuş', Sicil: '123464', TC: '12345678909', Görev: 'İnsan Kay. Şb.Md.', PBIK: '10521', 'Söz Başlama': '18.04.2015', 'Söz Bitiş': '18.04.2023' },
  { Ad: 'Burak', Soyad: 'ŞAHIN', 'Rütbe': 'Uzman Çavuş', Sicil: '123465', TC: '12345678910', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', 'Söz Başlama': '22.10.2014', 'Söz Bitiş': '22.10.2022' },
  { Ad: 'Seda', Soyad: 'GÜNEŞ', 'Rütbe': 'Uzman Çavuş', Sicil: '123466', TC: '12345678911', Görev: 'Harekat Şb.Md.', PBIK: '10522', 'Söz Başlama': '28.02.2020', 'Söz Bitiş': '28.02.2028' },
  { Ad: 'Emre', Soyad: 'YILMAZ', 'Rütbe': 'Uzman Çavuş', Sicil: '123467', TC: '12345678912', Görev: 'Lojistik Şb.Md.', PBIK: '10523', 'Söz Başlama': '14.06.2017', 'Söz Bitiş': '14.06.2025' },
  { Ad: 'Cansu', Soyad: 'DEMİR', 'Rütbe': 'Uzman Çavuş', Sicil: '123468', TC: '12345678913', Görev: 'İstihbarat Şb.Md.', PBIK: '10521', 'Söz Başlama': '06.11.2016', 'Söz Bitiş': '06.11.2024' },
  { Ad: 'Mert', Soyad: 'KOÇAK', 'Rütbe': 'Uzman Çavuş', Sicil: '123469', TC: '12345678914', Görev: 'Harekat Şb.Md.', PBIK: '10522', 'Söz Başlama': '11.01.2019', 'Söz Bitiş': '11.01.2027' },
  { Ad: 'Deniz', Soyad: 'ÖZGÜR', 'Rütbe': 'Uzman Çavuş', Sicil: '123470', TC: '12345678915', Görev: 'İnsan Kay. Şb.Md.', PBIK: '10521', 'Söz Başlama': '19.03.2018', 'Söz Bitiş': '19.03.2026' },
];

export const downloadSampleExcel1 = () => {
  const ws = XLSX.utils.json_to_sheet(sampleExcel1);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Personel Durumu');
  XLSX.writeFile(wb, 'Excel1_Personel_Durumu_Ornek.xlsx');
};

export const downloadSampleExcel2 = () => {
  const ws = XLSX.utils.json_to_sheet(sampleExcel2);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sözleşme Bilgileri');
  XLSX.writeFile(wb, 'Excel2_Sozlesme_Bilgileri_Ornek.xlsx');
};


