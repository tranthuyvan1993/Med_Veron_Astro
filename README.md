# MedNova Medical Device Shop (Astro)

Demo web bán thiết bị y tế bằng Astro, có:
- Home giới thiệu
- Trang sản phẩm riêng (`/products`)
- Trang giới thiệu công ty (`/about`)
- Trang chi tiết sản phẩm (`/products/[id]`)
- Admin mini chỉnh JSON sản phẩm (`/admin`)
- Song ngữ Anh - Việt

## Chạy local

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Cloudflare Pages (quan trọng)

Lỗi bạn gặp là do dùng sai lệnh deploy:
- Sai: `wrangler deploy` (dùng cho Workers)
- Đúng với Pages: `wrangler pages deploy`

### Cấu hình đúng trên Cloudflare dashboard

- Build command: `npm run build`
- Build output directory: `dist`
- Deploy command (nếu có field này): `npm run deploy`

`npm run deploy` trong repo này đã map sẵn tới:

```bash
wrangler pages deploy ./dist --project-name medical-device-shop-astro
```

Nếu bạn dùng Pages Git Integration thuần (không cần deploy command), có thể để trống Deploy command.

## Vercel

```bash
npm run deploy:vercel
```

## File chính

- `src/pages/index.astro`
- `src/pages/products/index.astro`
- `src/pages/products/[id].astro`
- `src/pages/about.astro`
- `src/pages/admin.astro`
- `public/site.js`
- `src/data/products.ts`
- `wrangler.toml`
