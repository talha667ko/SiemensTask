# SiemensTask 

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

### Backend Services

- **Supabase** - Authentication & Database

### Build & Dev Tools

- **pnpm 10.20.0** - Package Manager
- **ESLint** - Code Linting
- **TypeScript 5.9.3** - Type Checking
- **gh-pages** - Deployment

## Proje Yapısı

```
SiemensTask/
├── frontend/
│   ├── src/
│   │   ├── _components/        # Reusable components
│   │   │   └── ProtectedRoutes.tsx
│   │   ├── layouts/            # Layout components
│   │   │   ├── Layout.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Logout.tsx
│   │   │   ├── ClassifyMaterials.tsx
│   │   │   ├── ViewClassifications.tsx
│   │   │   └── ProjectDetails.tsx
│   │   ├── providers/          # Context providers
│   │   │   └── client-provider.tsx
│   │   ├── locales/            # i18n translations
│   │   │   ├── en. json
│   │   │   └── tr.json
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── i18n.ts
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig. json
├── Assignment_Siemens. pdf      # Proje gereksinimleri
└── package.json
```

## Routing Yapısı

Uygulama HashRouter kullanarak aşağıdaki rotaları sunar:

### Korumalı Rotalar (Protected Routes)

- `/` - Proje Detayları
- `/dashboard` - Ana Sayfa
- `/classifymaterials` - Malzeme Sınıflandırma
- `/viewclassifications` - Sınıflandırmaları Görüntüleme
-  `/?project=7048010000` - Proje detayları
- `/settings` - Çıkış Yapma

### Public Rotalar

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

## Live Demo

Proje GitHub Pages üzerinde yayında:
🔗 [https://talha667ko.github.io/SiemensTask](https://talha667ko.github.io/SiemensTask)

## UI/UX

Proje, Siemens'in resmi tasarım sistemi olan **Siemens IX** kullanılarak geliştirilmiştir:

- Tutarlı ve profesyonel görünüm
- Siemens marka kimliğine uygun
- Accessibility standartlarına uygun
- Dark/Light mode desteği

## Güvenlik

- Protected Routes ile rota koruması
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


## Geliştirici

**talha667ko**

- GitHub: [@talha667ko](https://github.com/talha667ko)

---
