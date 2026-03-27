# MedNova Medical Device Shop (Astro)

Project demo bán thiết bị y tế bằng Astro, hỗ trợ:
- Catalog sản phẩm mẫu có thông số kỹ thuật và giá tham khảo
- Trang chi tiết cho từng sản phẩm (`/products/[id]`)
- Giỏ hàng client-side (localStorage)
- Chuyển ngôn ngữ Anh - Việt (UTF-8)
- Sẵn cấu hình deploy cho Cloudflare Pages và Vercel

## Yêu cầu

- Node.js `>=22.12.0`
- npm

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

## Deploy Cloudflare Pages

1. Đăng nhập Cloudflare:
   ```bash
   npx wrangler login
   ```
2. Build và deploy:
   ```bash
   npm run deploy:cloudflare
   ```

Lệnh deploy hiện dùng project name `medical-device-shop-astro`.
Nếu bạn dùng tên project khác trên Cloudflare Pages, sửa trong `package.json`.

## Deploy Vercel

1. Đăng nhập Vercel:
   ```bash
   npx vercel login
   ```
2. Build và deploy production:
   ```bash
   npm run deploy:vercel
   ```

## File chính

- `src/pages/index.astro`: trang catalog chính
- `src/pages/products/[id].astro`: trang chi tiết sản phẩm
- `src/components/SiteHeader.astro`: header + language switch + cart trigger
- `src/components/CartPanel.astro`: panel giỏ hàng
- `public/site.js`: logic giỏ hàng + chuyển ngôn ngữ
- `src/data/products.ts`: dữ liệu sản phẩm demo
- `wrangler.toml`: cấu hình Cloudflare Pages
- `vercel.json`: cấu hình Vercel
