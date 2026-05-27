# CODEX.md

## Project Overview

This is Thirunavukarasan's portfolio and blog app built with Next.js App Router, React, Tailwind CSS, and Next.js API route handlers. The old Express backend has been ported into this project under `app/api`.

The app has two main surfaces:

- Public portfolio: homepage sections, blogs list, and dynamic blog detail pages.
- Authenticated blog admin: login/register, dashboard, Editor.js story editor, publish controls, and metadata/OG tag editor.
- Backend API: MongoDB/Mongoose models, encrypted payload handling, JWT auth, contact form, blog CRUD, publish toggles, metadata, and upload support.

Use `@/*` imports for project-root aliases. The project is JavaScript/JSX, not TypeScript.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

The local development URL is usually `http://localhost:3000`.

## Important Environment Variables

Do not commit real secret values. Frontend/public keys are:

- `NEXT_PUBLIC_HOST`: this Next app's API base URL, such as `http://localhost:3000/api`.
- `NEXT_PUBLIC_SECRET_KEY`: AES key source used by `utils/encryptdecrypt.js`.
- `NEXT_PUBLIC_GA_ID`: Google Analytics tracking id.

These are public-prefixed variables and are exposed to the browser bundle.

Server-only backend keys are:

- `MONGO_URI`: MongoDB connection string.
- `SECRET_KEY`: AES key source used by `lib/server-encryptdecrypt.js`.
- `SECRET`: JWT signing/verification secret.

For the merged Next.js app, `NEXT_PUBLIC_HOST` must point at this app's own API base, not the old standalone Node backend. Locally it is configured as `http://localhost:3000/api`. In production, set it to the deployed Next app API base, for example `https://thirunavukarasan.dev/api`.

`NEXT_PUBLIC_SECRET_KEY` and `SECRET_KEY` must stay identical because the browser uses CryptoJS and the route handlers use Node `crypto` for the same encrypted payloads.

## Directory Map

- `app/layout.jsx`: root HTML shell, Google site verification, Google Analytics scripts, Vercel Analytics.
- `app/page.jsx`: public homepage metadata, Person JSON-LD, renders `app/homepage.jsx`.
- `app/homepage.jsx`: client homepage composition using components from `components/`.
- `app/blogs/page.jsx`: blogs listing metadata and wrapper.
- `app/blogs/blogs.jsx`: client blogs list screen.
- `app/blogs/[blogId]/page.jsx`: dynamic blog detail metadata, API fetch, BlogPosting JSON-LD.
- `app/blogs/[blogId]/blogs.jsx`: client-side blog detail renderer for Editor.js blocks.
- `app/(auth)/login` and `app/(auth)/register`: auth forms.
- `app/(auth)/dashboard`: protected admin dashboard, blog list, publish/delete/edit controls.
- `app/(auth)/dashboard/newstory`: Editor.js story creation/editing flow.
- `app/(auth)/dashboard/meta`: metadata and Open Graph editor.
- `app/api/`: backend route handlers ported from the old Express app.
- `components/`: public portfolio components and blog navigation/footer.
- `models/`: Mongoose models for users, blog contents, and contact enquiries.
- `lib/db.js`: cached Mongoose connection for route handlers.
- `lib/auth.js`: JWT `Authorization: Bearer <token>` verification helper.
- `lib/server-encryptdecrypt.js`: Node `crypto` AES-CBC helper compatible with the frontend CryptoJS helper.
- `lib/api-utils.js`: shared route-handler helpers for encrypted bodies and text responses.
- `lib/blog-content.js`: shared server-side blog metadata lookup used by dynamic blog pages and API routes.
- `utils/blogapis.js`: client hook-like helper that fetches and decrypts blog list data.
- `utils/encryptdecrypt.js`: CryptoJS AES-CBC encrypt/decrypt helpers.
- `lib/gtag.js`: GA pageview helper.
- `styles/styles.css`: custom global styles, font imports, backgrounds, animations.
- `app/globals.css`: Tailwind entrypoint and base globals.
- `public/`: static assets.

## Routing Notes

Public routes:

- `/`
- `/blogs`
- `/blogs/[blogId]`

Auth/admin routes:

- `/login`
- `/register`
- `/dashboard`
- `/dashboard/newstory`
- `/dashboard/newstory?edit=<encrypted-id>`
- `/dashboard/meta?addmeta=<blog-id>`
- `/dashboard/meta?editmeta=<blog-id>`
- `/dashboard/[checkblog]`

`ProtectedRoute` checks for both the `BLOG_ACTIVE` cookie and `BLOG_LOG` localStorage value before rendering dashboard content.

## Backend/API Conventions

Most frontend API calls use `axios` and `NEXT_PUBLIC_HOST`. Several request/response bodies are encrypted with `encryptdecrypt`. The backend equivalents now live inside this Next.js project under `app/api`.

Server-rendered pages should not call this same app through `axios` and `NEXT_PUBLIC_HOST`. Use shared server helpers such as `lib/blog-content.js` directly from server components, metadata functions, and route handlers. This avoids self-HTTP failures during SSR and keeps dynamic metadata independent from the public host setting.

Common endpoints used by the client:

- `GET /api/getblogs`
- `GET /api/blogcontent/:encryptedBlogSlug`
- `POST /api/login`
- `POST /api/create`
- `POST /api/contact`
- `GET /api/getusercontent/:encryptedUserId`
- `GET /api/getpublish/:encryptedUserId`
- `PUT /api/setpublish/:encryptedBlogId`
- `DELETE /api/delete/:encryptedBlogId`
- `GET /api/editid/:encryptedId`
- `POST /api/blogcontent`
- `PUT /api/edit/:encryptedId`
- `POST /api/createmeta`
- `POST /api/uploadFile`

Authenticated calls usually read the JWT from the `BLOG_ACTIVE` cookie and send `Authorization: Bearer <token>`.

## Separate Backend Source

The original backend source lives outside this Next.js app at `../portfolio-backend`. It was used as the source for the merged Next.js backend now implemented in `app/api`.

The backend is an Express app:

- `index.js`: Express entrypoint, CORS/cookie/body parsers, MongoDB connection, `/uploads` static files, and `/api` router mount.
- `Config/db.js`: Mongoose connection using `MONGO_URI`.
- `Router/Router.js`: all API route definitions.
- `Middleware/authMiddleware.js`: JWT `Authorization: Bearer <token>` guard using `SECRET`.
- `Utils/EncryptDecrypt.js`: Node `crypto` AES-CBC helper compatible with the frontend `utils/encryptdecrypt.js`.
- `Models/CreateAccount.js`: `users` collection with email, name, phone, password.
- `Models/BlogContent.js`: `blogcontents` collection for blog content, publish state, meta fields, OG fields, timestamps, and IP.
- `Models/ContactForm.js`: `contactEnquiry` collection for contact form submissions.
- `Controller/CreateAccount.js`: register/login with bcrypt and JWT.
- `Controller/BlogContent.js`: create/edit/delete blog, fetch public blogs, fetch user blogs, publish toggles, metadata, and optional multer/sharp upload compression.
- `Controller/ContactForm.js`: contact form submission with duplicate email check.

Backend env keys are:

- `MONGO_URI`
- `SECRET_KEY`
- `SECRET`
- `PORT`
- `HOST`

Do not copy backend secret values into docs or logs.

## Implemented Backend Flow In Next.js

Next.js route handlers under `app/api` replace the Express router. Keep the public endpoint paths compatible where possible so the frontend only needs `NEXT_PUBLIC_HOST` pointed at the Next app's `/api` base URL.

Implemented structure:

- `lib/db.js`: cached Mongoose connection for serverless-safe reuse.
- `lib/server-encryptdecrypt.js`: Node `crypto` version of backend AES-CBC encrypt/decrypt.
- `lib/auth.js`: JWT verify helper that reads `Authorization` headers.
- `lib/blog-content.js`: direct DB helper for blog metadata by slug.
- `models/User.js`, `models/BlogContent.js`, `models/ContactEnquiry.js`: Mongoose models ported from `../portfolio-backend/Models`.
- `app/api/getblogs/route.js`: public published blogs.
- `app/api/blogcontent/route.js`: authenticated blog create.
- `app/api/blogcontent/[blogId]/route.js`: public metadata lookup by encrypted slug.
- `app/api/login/route.js`: login and return JWT plus encrypted user payload.
- `app/api/create/route.js`: account creation.
- `app/api/contact/route.js`: contact form.
- `app/api/getusercontent/[userid]/route.js`: authenticated user blogs.
- `app/api/editid/[editId]/route.js`: authenticated blog/meta edit fetch.
- `app/api/edit/[editedId]/route.js`: authenticated blog update.
- `app/api/getpublish/[getid]/route.js`: authenticated publish status list.
- `app/api/setpublish/[statusId]/route.js`: authenticated publish toggle.
- `app/api/delete/[id]/route.js`: authenticated delete.
- `app/api/createmeta/route.js`: authenticated meta/OG update.
- `app/api/uploadFile/route.js`: file upload replacement using `request.formData()` and `sharp`, writing to `public/uploads/compressed`.

Route handler behavior should preserve the existing frontend contract:

- Encrypted request bodies use `req.body.data` or `req.body.enData` depending on the existing endpoint.
- Several successful list/detail responses are encrypted hex strings, not plain JSON.
- Login returns `{ message, token, enData }`.
- Protected routes require `Authorization: Bearer <token>`.
- Blog publish values are `"Published"` and `"Unpublished"`.
- Meta publish values are `"meta"` and `"notmeta"`.
- Blog slugs are stored in `url`.

Upload support does not use Express `multer`. It uses `request.formData()` plus `sharp`. Current Editor.js image handling still uses base64 by default, so `/api/uploadFile` is available for future file-storage use.

## Editor.js Content

The story editor is initialized in `app/(auth)/dashboard/newstory/editor.jsx`.

Supported tools are configured in `app/(auth)/dashboard/newstory/tools.jsx`:

- header, paragraph, image, checklist, list, code, quote, delimiter, table, marker, raw, warning, embed, inlineCode.

Images uploaded through Editor.js are currently converted to base64 in the browser. Banner and OG images are resized/compressed client-side to about 100 KB before being stored/sent.

Public blog rendering maps Editor.js blocks in `app/blogs/[blogId]/blogs.jsx`. If adding a new Editor.js tool, also add a corresponding public renderer there.

## Styling Conventions

Tailwind is configured in `tailwind.config.js` with project colors and custom font-size names. The main brand color is `primary: #E54B4B`.

Responsive screens are custom:

- `sm` is max-width `640px`.
- `mdsm` starts at `641px`.
- `md`, `lg`, `xl`, and `2xl` follow normal min-width breakpoints.

Global CSS imports Montserrat and Roboto in `styles/styles.css`. Components often combine Tailwind utility classes with custom classes such as `herobg`, `servicebg`, `dashbg`, and `roboto-regular`.

## SEO/Analytics

Metadata is defined route-by-route using App Router exports. The public homepage includes Person JSON-LD. Blog detail pages fetch backend data in `generateMetadata` and emit BlogPosting JSON-LD.

The sitemap route is `app/sitemap.xml/route.js`; it currently contains hardcoded dynamic blog slugs. Update it when public blog URLs change unless the sitemap is later made API-driven.

Google Analytics is loaded in `app/layout.jsx` from `NEXT_PUBLIC_GA_ID`; Vercel Analytics is also enabled.

## Local Gotchas

- `node_modules` is present in the repo/workspace and can make broad file crawls slow. Prefer targeted reads or `rg --glob '!node_modules/**'`.
- Git may report dubious ownership for this workspace. Avoid changing global git config without user approval.
- Some components use browser-only APIs (`window`, `document.cookie`, `localStorage`, `FileReader`, `canvas`) and must remain client components.
- `next.config.mjs` currently enables `turbopack: {}`.
- Backend dependencies added to this project include `mongoose`, `bcrypt`, and `jsonwebtoken`.
- The local `next-portfolio/.env` now includes `MONGO_URI`, `SECRET_KEY`, and `SECRET`, copied from the old backend env without changing secret values.
- The package versions are unusual together: `next` is `^16.2.6`, while `eslint-config-next` is `14.2.14`. Be cautious when changing lint/build tooling.
- The old backend folder is a sibling at `../portfolio-backend`; keep new backend code inside this Next.js project.

## Change Guidance For Future Codex Runs

- Preserve the existing App Router layout and route-specific metadata pattern.
- Keep client-only code behind `"use client"` when it touches browser APIs.
- When changing blog data contracts, update create/edit dashboard code and public blog rendering together.
- When adding Editor.js block types, update both `tools.jsx` and the renderer map in `app/blogs/[blogId]/blogs.jsx`.
- The merged backend is implemented with `app/api` route handlers; do not embed Express inside Next.js.
- Keep the encryption format compatible between frontend CryptoJS and server Node `crypto`; changing IV/key derivation will break existing encrypted payloads.
- Keep `NEXT_PUBLIC_HOST` pointed at the full `/api` base URL for this same Next.js app. Do not point it at the old live Node backend unless intentionally reverting to split frontend/backend deployment.
- Do not expose or print `.env` values; only mention variable names.
- Prefer scoped edits. The codebase has many commented experiments; avoid broad cleanup unless the task specifically asks for it.
