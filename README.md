# NextAuth Authentication App

Next.js va NextAuth yordamida yaratilgan authentication tizimi.

## Xususiyatlar

- ✅ DummyJSON API bilan login (username/password)
- ✅ GitHub OAuth
- ✅ Netlify OAuth
- ✅ Yandex OAuth
- ✅ TypeScript
- ✅ Next.js 14 App Router

## O'rnatish

1. Paketlarni o'rnating:
```bash
npm install
```

2. `.env.local` faylini sozlang

## OAuth Sozlash

### AUTH_SECRET yaratish:
```bash
openssl rand -base64 32
```

### GitHub OAuth:
1. https://github.com/settings/developers ga kiring
2. "New OAuth App" tugmasini bosing
3. To'ldiring:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Client ID va Client Secret ni `.env.local` ga qo'shing

### Netlify OAuth:
1. https://app.netlify.com/user/applications ga kiring
2. "New OAuth application" tugmasini bosing
3. To'ldiring:
   - Application name: `NextAuth App`
   - Redirect URI: `http://localhost:3000/api/auth/callback/netlify`
4. Client ID va Client Secret ni `.env.local` ga qo'shing

### Yandex OAuth:
1. https://oauth.yandex.com/ ga kiring
2. "Зарегистрировать новое приложение" tugmasini bosing
3. To'ldiring:
   - Название: `NextAuth App`
   - Платформы: "Веб-сервисы" ni belgilang
   - Redirect URI: `http://localhost:3000/api/auth/callback/yandex`
   - Доступы: "Доступ к логину, имени, фамилии и полу" va "Доступ к адресу электронной почты" ni belgilang
4. ID va Пароль приложения ni `.env.local` ga qo'shing

## Ishga tushirish

```bash
npm run dev
```

Brauzerda http://localhost:3000 ni oching.

## Test uchun DummyJSON credentials:

- Username: `emilys`
- Password: `emilyspass`

Boshqa test userlar: https://dummyjson.com/users

## Providers

- **GitHub** - Ishlaydi ✅
- **Netlify** - OAuth sozlash kerak
- **Yandex** - OAuth sozlash kerak
- **DummyJSON** - Test uchun tayyor ✅
