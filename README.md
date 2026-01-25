# SiemensTask 
## Mimari kararlar

- İstenildiği gibi HashRouter kaldırıldı; BrowserRouter kullanmak adına, GitHub Pages bu yapıyı engellediği için projeyi Netlify üzerinde canlı ortama almış bulunmaktayım.
- Backend (Supabase) tamamen kaldırıldı ve tüm işlemler localStorage üzerinden yapılıyor. İlk veriler ise mevcut verilerin JSON formatından gelen halinden oluşuyor.
- useSearchParams hook’u sayesinde URL’ye girilen proje numarası, filtre ve sıralama işlemleri dinamik olarak alınıp UI’a işleniyor.
- UI’da yapılan bu işlemler de aynı şekilde URL’de görünüyor.
- Geçersiz parametreler (örneğin yanlış veya var olmayan proje numarası), TanStack tarafınca gönderilen hata dinlenerek classifyMaterials sayfasına yönlendiriliyor.
- Her materyalin sınıflandırılma sırasında seçilmiş olması gerekiyor, aksi halde sistem kabul etmiyor. Ayrıca yeni bir özellik olarak, doldurulmayan slotlar kırmızı renkle boyanıyor; bu da kullanıcıya hata oluşumunu önleme ve UX açısından hatayı görüp düzeltme noktasında iyileştirme sağladı.
- Submit Confirmation Modal ile karar değiştirme veya vazgeçme ihtimaline karşı "çift onay" mekanizması eklendi.
- Yükseklik artık tamamen dinamik; header'ın yüksekliğine göre kendini ayarlaması için vh (ekran büyüklüğü) birimi kullanılarak ayarlandı (cross-device).
- Filtreleme kısmında UX kolaylığı için her sütuna ayrı filtre girmek yerine AG Grid’in QuickFilter özelliği kullanıldı. Böylelikle tüm sütunları etkileyen tek bir filtre ile kullanıcının istediği veriye ulaşması sağlandı. URL’de qf=5 girilmesi AG Grid’i etkiliyor; aynı şekilde filtre input’una veri girilip uygulandığında bu değer URL’de görünüyor.
- Sıralama (Sort) için sütun başlığına basarak veya URL üzerinden giriş yaparak kullanılabilen iki seçenek bulunuyor. Bu iki yöntem senkron çalışarak AG Grid’i etkiliyor. Sıralama URL'de s_0:(column_ismi):(asc/desc) formatında işleniyor. useParams ve JSON formatındaki dönüşümden kaynaklanan özel karakter kullanımlarına rağmen, el ile girilen formatlar da yorumlanarak AG Grid’e yansıtılıyor.
- Dil desteği menüye taşındı; ayrıca localStorage üzerinde tutulan state, URL’de dinamik olarak görünüyor. URL’de yapılan değişiklik ise UI dilini dinamik olarak değiştiriyor. Menüde dropdown yerine, dokümantasyonda belirtilen subMenuItem kullanıldı ve hover menüdeki genişleme özellikleri ile daha kullanışlı bir UX sağlandı.
- Sayfa yenilendiğinde filtre, sıralama, dil ve proje değerleri korunur.
- Boş proje veya bulunmayan proje durumunda useQuery (TanStack) hata döndürür; UI bunu dinleyerek /classifyMaterials URL’sine yönlendirme yapar.
- Yanlış URL girişlerinde UI, 404 sayfasına yönlendirir; böylelikle beyaz ekran sorunu giderildi ve menü üzerinden mevcut sayfalara geçiş imkânı sağlandı.
- Sınıflandırma sırasında geri/ileri gitme veya sayfayı kapatma durumlarında tarayıcı modalı açılarak yarım kalmış state'in korunması sağlanır; kullanıcıya işlemi bitirme veya iptal edip çıkma seçenekleri sunulur.
-Radio Group kullanarak sınıflandırma sırasında karışık ve çakışan değerlerin kabul edilmemesi sağlandı.
- Sayfa bileşenlerinin (.tsx dosyalarının) temiz bir yapıda olması için tüm hook’lar ve mümkün mertebe taşınabilen işlevsel fonksiyonlar (job functions), sayfaların kendi useXXXController dosyalarına taşındı.
- TanStack seçiminin bir diğer sebebi, Data Context kullanımı (client-provider / auth-provider) ve prop drilling’in önlenmesidir.

## Özellikler

- **Malzeme Sınıflandırma**: Malzemeleri kategorize etme ve yönetme
- **Sınıflandırmaları Görüntüleme**: Mevcut sınıflandırmaları listeleme ve filtreleme
- **Proje Detayları**: Proje bilgilerini görüntüleme ve yönetme
- **Çoklu Dil Desteği**: i18next ile Türkçe ve İngilizce dil desteği
- **Responsive Tasarım**: Tüm cihazlarda uyumlu kullanıcı arayüzü
- **Excel Export**: ExcelJS ile veri dışa aktarma

## Teknoloji Stack'i

### Frontend

- **React 19. 2.0** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **React Router DOM 7. 11.0** - Routing
- **Siemens IX 4.2.0** - Design System & UI Components
- **AG Grid 35.0.0** - Advanced Data Grid
- **TanStack Query 5.90.17** - Data Fetching & State Management
- **React Hook Form 7.70.0** - Form Management
- **Yup 1.7.1** - Form Validation
- **i18next** - Internationalization
- **ExcelJS** - Excel Export
- **DayJS** - Date Management


### Build & Dev Tools

- **pnpm 10.20.0** - Package Manager
- **ESLint** - Code Linting
- **TypeScript 5.9.3** - Type Checking
- **netlify.toml** - Deployment

## Routing Yapısı

Uygulama HashRouter kullanarak aşağıdaki rotaları sunar:

###  Rotalar

- `/` - Proje Detayları
- `/dashboard` - Ana Sayfa
- `/classifymaterials` - Malzeme Sınıflandırma
- `/viewclassifications` - Sınıflandırmaları Görüntüleme
-  `/?project=7048010000` - Proje detayları
- `/settings` - Çıkış Yapma
- `/login` - Giriş Sayfası

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v18 veya üzeri)
- pnpm 10.20.0

### Kurulum Adımları

1. **Projeyi klonlayın**

```bash
git clone https://github.com/talha667ko/SiemensTask. git
cd SiemensTask
```

2. **Bağımlılıkları yükleyin**

```bash
pnpm install
cd frontend
pnpm install
```

3. **Geliştirme sunucusunu başlatın**

```bash
cd frontend
pnpm run dev
```

4. **Tarayıcıda açın**

```
http://localhost:5173
```

## Build ve Deploy

### Production Build

```bash
cd frontend
pnpm run build
```

### GitHub Pages'e Deploy

```bash
cd frontend
pnpm deploy
```
## UI/UX

Proje, Siemens'in resmi tasarım sistemi olan **Siemens IX** kullanılarak geliştirilmiştir:

- Tutarlı ve profesyonel görünüm
- Siemens marka kimliğine uygun
- Accessibility standartlarına uygun
- Dark/Light mode desteği

## Güvenlik
- Form validasyonu ile veri doğrulama
- TypeScript ile tip güvenliği

## Veri Yönetimi

- **TanStack Query**: Server state management
- **React Hook Form**: Form state management
- **Yup**: Schema validation
- **AG Grid**: Advanced table & data grid

## Çoklu Dil Desteği

Uygulama i18next kullanarak şu dilleri destekler:

- 🇬🇧 English (en)
- 🇹🇷 Türkçe (tr)

Dil otomatik olarak tarayıcı ayarlarına göre seçilir.

---
