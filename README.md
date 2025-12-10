## Toko Academy Registration

Mobile-first, glassy React/Vite form that posts directly to the provided Google Form endpoint while preserving the required field IDs and names.

### Quick start
- `npm install`
- `npm run dev` (or `npm run build` then `npm run preview`)
- App runs at `http://localhost:5173/`

### What’s included
- Exact Google Form bindings: all IDs/names match the provided form, posted to the same endpoint via `fetch` (`no-cors`).
- Mobile-first UX with a desktop quote panel, glassmorphism, and brand-inspired colors.
- Success modal after submission plus inline error fallback.
- No extra dependencies beyond Vite/React.

### Notes
- Hidden Google Form fields (`fvv`, `fbzx`, `pageHistory`) are included so submissions land correctly.
- Update branding assets by replacing the placeholder brand mark if you add the official logo.
