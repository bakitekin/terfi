import { parseDDMMYYYY } from './validation';

export const calculatePromotion = (derece: number, kademe: number) => {
  if (kademe < 3) {
    return { yeniDerece: derece, yeniKademe: kademe + 1, aciklama: 'Kademe ilerlemesi' };
  }
  if (kademe === 3 && derece > 1) {
    return { yeniDerece: derece - 1, yeniKademe: 1, aciklama: 'Derece yükselmesi' };
  }
  return { yeniDerece: 1, yeniKademe: 3, aciklama: 'En üst kademe (terfi yok)' };
};

export const checkPromotionEligibility = (ilerlemeTarihi: string, secilenAy: number, secilenYil: number) => {
  const dt = parseDDMMYYYY(ilerlemeTarihi);
  if (!dt) return false;
  
  // Excel'deki ilerleme tarihinin yılını al (örn: 2024)
  const ilerlemeTarihiYili = dt.getFullYear();
  const ilerlemeTarihiAyi = dt.getMonth() + 1; // 1-12
  
  // Seçilen yıl ile ilerleme tarihinin yılı arasındaki farkı hesapla
  const yilFarki = secilenYil - ilerlemeTarihiYili;
  
  // İlerleme tarihi ayı ile seçilen ay aynı mı kontrol et
  // Ve yıl farkı 1 veya daha fazla olmalı (en az 1 yıl geçmiş olmalı)
  // Ayrıca seçilen yıl, ilerleme tarihinin yılından en az 1 yıl sonra olmalı
  return ilerlemeTarihiAyi === secilenAy && yilFarki >= 1;
};

export const checkContractValidity = (sozBitisTarihi: string) => {
  const now = new Date();
  const dt = parseDDMMYYYY(sozBitisTarihi);
  if (!dt) return false;
  return dt.getTime() >= now.setHours(0, 0, 0, 0);
};


