# NextAuth Login Tizimi - To'liq Sozlash

## Hozirgi holat

✅ **Ishlayotgan provider'lar:**
- GitHub OAuth
- DummyJSON Credentials (username/password)

⚙️ **Sozlangan provider'lar:**
- Netlify OAuth (kalitlar kiritilgan)
- Yandex OAuth (kalitlar kiritilgan)

## Serverni ishga tushirish

```bash
npm run dev
```

Browser'da: http://localhost:3000

## Test uchun

**DummyJSON login:**
- Username: `emilys`
- Password: `emilyspass`

**GitHub:** O'z GitHub akkauntingiz bilan

**Netlify va Yandex:** Agar ishlamasa, quyidagi redirect URI'larni tekshiring

## Netlify OAuth sozlamalari

Agar Netlify ishlamasa:

1. https://app.netlify.com/user/applications ga kiring
2. OAuth application'ingizni oching
3. **Redirect URI** aynan shunday bo'lishi kerak:
   ```
   http://localhost:3000/api/auth/callback/netlify
   ```
4. Agar boshqacha bo'lsa, to'g'rilang va "Save" bosing
5. Serverni qayta ishga tushiring

## Yandex OAuth sozlamalari

Agar Yandex ishlamasa:

1. https://oauth.yandex.com/ ga kiring
2. Приложение'ingizni oching
3. **Redirect URI** aynan shunday bo'lishi kerak:
   ```
   http://localhost:3000/api/auth/callback/yandex
   ```
4. **Доступы** (Permissions) bo'limida quyidagilar belgilangan bo'lishi kerak:
   - ✅ Доступ к логину, имени, фамилии и полу
   - ✅ Доступ к адресу электронной почты
   - ✅ Доступ к аватару пользователя
5. Agar yo'q bo'lsa, belgilang va "Сохранить" bosing
6. Serverni qayta ishga tushiring

## Muammolarni hal qilish

**Agar provider ishlamasa:**

1. `.env.local` faylida kalitlar to'g'ri yozilganligini tekshiring
2. Serverni to'liq to'xtatib qayta ishga tushiring (Ctrl+C, keyin `npm run dev`)
3. Browser cache'ni tozalang (Ctrl+Shift+R)
4. OAuth provider'da redirect URI to'g'ri ekanligini tekshiring

**Agar hali ham ishlamasa:**

CMD/terminal'da xatolarni o'qing va qaysi provider'da muammo borligini aniqlang.

## Fayl strukturasi

```
n-auth/
├── app/
│   ├── components/
│   │   ├── LoginForm.tsx      # Login sahifasi (3 ta OAuth + credentials)
│   │   └── SignOutButton.tsx  # Chiqish tugmasi
│   ├── login/
│   │   └── page.tsx           # Login sahifasi
│   ├── page.tsx               # Asosiy sahifa (protected)
│   ├── layout.tsx             # Root layout
│   ├── providers.tsx          # SessionProvider
│   └── globals.css            # Stillar
├── pages/
│   └── api/
│       └── auth/
│           └── [...nextauth].ts  # NextAuth konfiguratsiya
├── .env.local                 # Environment variables (GIT'ga qo'shilmaydi!)
├── package.json
└── README.md
```

## Xavfsizlik

⚠️ **MUHIM:** `.env.local` faylini hech qachon GitHub'ga push qilmang!

`.gitignore` faylida `.env*.local` bor, lekin har doim tekshiring.

## Keyingi qadamlar

Agar Netlify yoki Yandex ishlamasa:
1. OAuth provider'da redirect URI'ni tekshiring
2. Permissions/Scopes to'g'ri belgilanganligini tekshiring
3. Application "Active" yoki "Published" holatda ekanligini tekshiring

Hammasi ishlashi kerak! 🎉
