# 💍 Ylber & Suzana - Ftesa Digjitale e Dasmës

Një faqe interneti elegante dhe moderne për dasmën tonë të 21 Korrikut 2026.

## ✨ Karakteristikat

- 🎬 Hero section me animacione kinematike
- 💑 Prezantimi i çiftit
- ⏰ Timeline e detajuar e eventit
- 📍 Lokacioni me hartë Google Maps
- 📝 Formular RSVP me integrimin e Brevo për email
- 🎵 Music player
- 📱 Plotësisht responsive (mobile-first)

## 🚀 Si të filloni

### Parakushtet

- Node.js dhe npm të instaluara - [instalo me nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Hapat e instalimit

```bash
# 1. Klono repository-n
git clone <YOUR_GIT_URL>

# 2. Hyr në dosje
cd ylbersuzana

# 3. Instalo dependencat
npm install

# 4. Krijo .env file (shiko më poshtë)
cp .env.example .env

# 5. Fillo development server
npm run dev
```

## 📧 Konfigurimi i RSVP Email (Brevo)

Formulari RSVP dërgon emaila profesionale përmes Brevo (ish-Sendinblue).

### Shih udhëzimet e plota në: [BREVO_SETUP.md](./BREVO_SETUP.md)

Hapat kryesorë:
1. Krijo llogari falas në [Brevo](https://www.brevo.com)
2. Merr API key nga Settings > SMTP & API
3. Verifiko sender email-in tënd
4. Plotëso `.env` file-in me kredencialet

```env
VITE_BREVO_API_KEY=your_api_key_here
VITE_BREVO_SENDER_EMAIL=your-email@example.com
VITE_BREVO_SENDER_NAME="Ylber & Suzana Wedding"
VITE_BREVO_RECIPIENT_EMAIL=where-rsvps-go@example.com
VITE_BREVO_RECIPIENT_NAME="Ylber & Suzana"
```

## 🛠️ Teknologjitë e përdorura

- **Vite** - Build tool i shpejtë
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Komponentë të përdorshme UI
- **Framer Motion** - Animacione të bukura
- **Lucide React** - Ikona moderne
- **Brevo API** - Email delivery service

## 📦 Scripts të disponueshme

```bash
npm run dev          # Fillo development server
npm run build        # Build për production
npm run preview      # Preview production build
npm run lint         # Kontrollo për gabime
npm run test         # Ekzekuto testet
```

## 📁 Struktura e projektit

```
src/
├── components/
│   ├── ui/              # Komponente të përgjithshme UI
│   └── wedding/         # Komponente specifike për dasmë
│       ├── HeroSection.tsx
│       ├── CoupleIntro.tsx
│       ├── Timeline.tsx
│       ├── Location.tsx
│       ├── RSVP.tsx
│       ├── Closing.tsx
│       └── MusicPlayer.tsx
├── lib/
│   ├── utils.ts         # Funksione ndihmëse
│   └── brevo.ts         # Integrimi me Brevo
├── pages/
│   └── Index.tsx        # Faqja kryesore
└── assets/              # Imazhe dhe media
```

## 🎨 Personalizimi

- **Ngjyrat**: Edito `tailwind.config.ts` për të ndryshuar skemën e ngjyrave
- **Përmbajtja**: Edito komponentët në `src/components/wedding/`
- **Stili**: Modifiko klasat Tailwind CSS sipas preferencave

## 🚀 Deployment

Projekti mund të deployohet në:
- Vercel
- Netlify
- GitHub Pages
- Çdo hosting që suporton static sites

```bash
npm run build
# Upload dosjen 'dist' në hosting
```

## 📞 Support

Për pyetje ose probleme, kontaktoni:
- Email: ylber.suzana.dasma@gmail.com

---

**Krijuar me ❤️ për Ylber & Suzana** • 21.07.2026 • Hill Premium, Gjakovë
