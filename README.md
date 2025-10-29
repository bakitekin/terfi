# Terfi Sistemi

Jandarma Uzman Çavuş Derece/Kademe İlerleme Otomasyonu - 3269 sayılı Uzman Erbaş Kanunu'na göre hazırlanmış modern bir terfi çizelgesi oluşturma sistemi.

## 🎯 Özellikler

### ✨ Ana Özellikler
- **Otomatik Terfi Hesaplama**: Derece ve kademe ilerlemelerini otomatik olarak hesaplar
- **Excel Entegrasyonu**: Excel dosyalarından veri okuma ve Excel formatında çıktı oluşturma
- **Akıllı Doğrulama**: TC, PBIK, derece, kademe ve tarih formatlarını otomatik kontrol eder
- **Sürükle-Bırak Desteği**: Dosya yükleme için kullanıcı dostu drag & drop arayüzü
- **Ayrı Listeler**: Derece ilerlemesi ve kademe ilerlemesi için ayrı Excel dosyaları oluşturur
- **Güncel Tarih Güncellemesi**: İlerleme tarihlerini seçilen döneme göre otomatik günceller

### 📊 İstatistikler
- Terfi edecek personel sayısı
- Uyarı ve hata mesajları
- Detaylı terfi çizelgesi tablosu

## 🚀 Kurulum

### Gereksinimler
- Node.js 14.0.0 veya üzeri
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/bakitekin/terfi.git
cd terfi-sistemi
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm start
```

4. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 📖 Kullanım

### 1. Excel Dosyalarını Hazırlayın

Sistem iki adet Excel dosyası gerektirir:

#### Excel 1: Mevcut Personel Durumu
Gerekli sütunlar:
- **Ad**: Personelin adı
- **Soyad**: Personelin soyadı
- **Rütbe**: Personelin rütbesi
- **Sicil**: Sicil numarası
- **TC**: TC kimlik numarası (11 haneli)
- **PBIK**: PBIK numarası (5 haneli)
- **Derece**: Mevcut derece (1-11)
- **Kademe**: Mevcut kademe (1-3)
- **İlerleme Tarihi**: Son ilerleme tarihi (gg.aa.yyyy formatında, örn: 10.10.2024)

#### Excel 2: Sözleşme Bilgileri
Gerekli sütunlar:
- **TC**: TC kimlik numarası (11 haneli)
- **PBIK**: PBIK numarası (5 haneli)
- **Söz Başlama**: Sözleşme başlama tarihi (gg.aa.yyyy)
- **Söz Bitiş**: Sözleşme bitiş tarihi (gg.aa.yyyy)

### 2. Dosyaları Yükleyin

1. Ana sayfada örnek Excel dosyalarını indirebilirsiniz
2. Excel dosyalarını sürükleyip bırakarak veya dosya seçerek yükleyin
3. Her iki dosya da başarıyla yüklendiğinde onay mesajı görünecektir

### 3. Terfi Dönemini Seçin

- **Ay**: Terfi çizelgesinin oluşturulacağı ayı seçin (Ocak, Şubat, ..., Aralık)
- **Yıl**: Terfi çizelgesinin oluşturulacağı yılı seçin (2024-2028)

### 4. Terfi Çizelgesi Oluşturun

- "Terfi Çizelgesi Oluştur" butonuna tıklayın
- Sistem otomatik olarak:
  - Sözleşme geçerliliğini kontrol eder
  - İlerleme tarihlerini doğrular
  - Terfi hesaplamalarını yapar
  - Tarihleri seçilen döneme göre günceller

### 5. Sonuçları Görüntüleyin ve İndirin

- **İstatistikler**: Terfi edecek personel, uyarı ve hata sayıları
- **Detaylı Tablo**: Tüm terfi bilgileri
- **Excel İndirme Seçenekleri**:
  - **Tüm Liste**: Tüm terfi edecek personelleri içeren Excel dosyası
  - **Derece İlerleme**: Sadece derece ilerlemesi olan personeller
  - **Kademe İlerleme**: Sadece kademe ilerlemesi olan personeller

## 🔧 Teknik Detaylar

### Terfi Hesaplama Kuralları

1. **Kademe İlerlemesi**: Kademe < 3 ise kademe 1 artar, derece aynı kalır
2. **Derece Yükselmesi**: Kademe = 3 ve Derece > 1 ise derece 1 azalır, kademe 1 olur
3. **Maksimum**: Derece 1, Kademe 3 ise terfi yoktur

### Doğrulama Kuralları

- **TC Kimlik**: Tam 11 haneli olmalı
- **PBIK**: Tam 5 haneli olmalı
- **Derece**: 1 ile 11 arasında olmalı
- **Kademe**: 1 ile 3 arasında olmalı
- **Tarih Formatı**: gg.aa.yyyy formatında olmalı (örn: 10.10.2024)
- **Sözleşme Geçerliliği**: Sözleşme bitiş tarihi bugünden sonra olmalı

### İlerleme Tarihi Kontrolü

- Personelin ilerleme tarihi ile seçilen dönem arasında en az 1 yıl fark olmalı
- Ay, ilerleme tarihi ile seçilen ay aynı olmalı
- **Otomatik Güncelleme**: Liste oluşturulurken ilerleme tarihleri seçilen yıla göre güncellenir

**Örnek:**
- Excel'de ilerleme tarihi: 10.10.2024
- Seçilen dönem: 2025 Ekim
- Sistemde gösterilen: 10.10.2025 ✅

## 🛠️ Teknoloji Yığını

- **Frontend Framework**: React 19.2.0
- **Stil**: TailwindCSS 4.1.16
- **Build Tool**: Create React App + CRACO
- **Excel İşleme**: XLSX (SheetJS)
- **İkonlar**: Lucide React
- **Dil**: TypeScript

## 📁 Proje Yapısı

```
terfi-sistemi/
├── src/
│   ├── components/
│   │   └── ui/          # UI bileşenleri (Button, Card, Input, Select, Alert)
│   ├── pages/           # Sayfa bileşenleri (UploadPage, ResultPage)
│   ├── lib/             # İş mantığı
│   │   ├── excel.ts     # Excel okuma
│   │   ├── exportExcel.ts # Excel oluşturma
│   │   ├── promotion.ts # Terfi hesaplama
│   │   ├── validation.ts # Doğrulama fonksiyonları
│   │   └── samples.ts   # Örnek Excel dosyaları
│   └── App.tsx          # Ana uygulama
├── public/              # Statik dosyalar
└── package.json
```

## 🚀 Production Build

Üretim için derleme:

```bash
npm run build
```

Derlenmiş dosyalar `build/` klasöründe oluşturulur. Statik bir sunucu ile servis edebilirsiniz:

```bash
npm install -g serve
serve -s build
```

## 📝 Notlar

- Excel dosyaları `.xlsx` veya `.xls` formatında olmalıdır
- Tüm tarihler gg.aa.yyyy formatında olmalıdır
- Sadece sözleşmesi devam eden personeller listeye dahil edilir
- İlerleme tarihleri otomatik olarak seçilen döneme göre güncellenir

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje özel kullanım için geliştirilmiştir.

## 👤 Geliştirici

**Bakitekin**
- GitHub: [@bakitekin](https://github.com/bakitekin)

## 🙏 Teşekkürler

- Jandarma Genel Komutanlığı için geliştirilmiştir
- 3269 sayılı Uzman Erbaş Kanunu'na uygun olarak tasarlanmıştır

