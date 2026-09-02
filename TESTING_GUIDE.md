# Testing Guide - GEODRILL Fixes

## Quick Route Testing Checklist

### ✅ Routing Tests (Verify all links now have `/geotechnical/` prefix)

Run `npm run dev` and test these URLs in your browser:

**English Routes:**

- [ ] http://localhost:3000/geotechnical/en (Homepage)
- [ ] http://localhost:3000/geotechnical/en/about (About page)
- [ ] http://localhost:3000/geotechnical/en/services (Services list)
- [ ] http://localhost:3000/geotechnical/en/services/geotechnical-investigation (Service detail)
- [ ] http://localhost:3000/geotechnical/en/projects (Projects page)
- [ ] http://localhost:3000/geotechnical/en/qhse (QHSE page)
- [ ] http://localhost:3000/geotechnical/en/contact (Contact page)

**Arabic Routes:**

- [ ] http://localhost:3000/geotechnical/ar (Homepage)
- [ ] http://localhost:3000/geotechnical/ar/services (Services list)
- [ ] http://localhost:3000/geotechnical/ar/services/geotechnical-investigation (Service detail)

### ✅ Navigation Testing (Click navbar links)

- [ ] Click "About" link → navigates to `/geotechnical/[locale]/about`
- [ ] Click "Services" link → navigates to `/geotechnical/[locale]/services`
- [ ] Click "Projects" link → navigates to `/geotechnical/[locale]/projects`
- [ ] Click "QHSE" link → navigates to `/geotechnical/[locale]/qhse`
- [ ] Click "Contact" link → navigates to `/geotechnical/[locale]/contact`

### ✅ Hero Section Testing (Colors in Light/Dark Theme)

**Dark Theme:**

- [ ] Hero text is white and readable
- [ ] Dark overlay looks good behind headline
- [ ] CTA buttons visible and clickable

**Light Theme:**

- [ ] Hero text is dark gray (not white)
- [ ] Light overlay doesn't obscure text
- [ ] CTA buttons stand out and are clickable
- [ ] No text is washed out

### ✅ Borders & Visual Design (Light/Dark Theme)

**Light Theme - Border Visibility:**

- [ ] "What Sets Us Apart" section cards have visible borders (not faint)
- [ ] Navigation bar has visible border
- [ ] Service page gallery images have visible borders
- [ ] All section dividers (top/bottom borders) are clearly visible

**Light Theme - Hover Effects:**

- [ ] "What Sets Us Apart" cards show stronger border on hover
- [ ] Cards show subtle shadow on hover
- [ ] Card icons scale up slightly on hover
- [ ] Navigation buttons show hover border

**Dark Theme - Consistency:**

- [ ] All borders still visible in dark mode
- [ ] Hover effects work smoothly
- [ ] Text contrast is good throughout

### ✅ Theme Toggle Testing

- [ ] Click theme toggle (sun/moon icon)
- [ ] All pages respond to theme change
- [ ] Borders remain visible in both themes
- [ ] Text remains readable in both themes
- [ ] No layout shifts on theme change

### ✅ Language Toggle Testing

- [ ] Switch between English/Arabic
- [ ] Layout flips to RTL for Arabic
- [ ] All content loads correctly
- [ ] Routes update to `/ar` or `/en` correctly
- [ ] Navigation items are in correct language

### ✅ Contact Button Testing

- [ ] Geotechnical site shows contact button (phone icon in yellow/gold)
- [ ] Contracting site (at `/`) shows WhatsApp button (teal)
- [ ] Contact button appears in bottom-right corner on geotech pages
- [ ] Button doesn't overlap content
- [ ] Button disappears on contracting site pages

### ✅ Services Pages Testing

- [ ] All 14 services have working detail pages:
  - [ ] geotechnical-investigation
  - [ ] material-testing-quality-control
  - [ ] topographical-survey
  - [ ] geophysical-survey
  - [ ] hydrology-studies
  - [ ] hydrogeological-studies
  - [ ] cavity-probing-grouting-micro-piling
  - [ ] geological-survey-rock-slope-stability
  - [ ] structural-assessment
  - [ ] environmental-survey
  - [ ] anchoring-shoring-design-execution
  - [ ] dewatering-design-execution
  - [ ] soil-improvement-concrete-repair
  - [ ] mining-exploration
- [ ] Each service shows:
  - [ ] Correct hero image with dark overlay
  - [ ] Service title and description
  - [ ] Process steps with numbered badges
  - [ ] Capabilities list
  - [ ] Gallery (if populated)
  - [ ] Related services links
- [ ] Related service links navigate to correct pages

### ✅ Contracting Site (Verify no regression)

- [ ] Contracting site at `/` works normally
- [ ] WhatsApp button appears in teal
- [ ] All contracting routes working
- [ ] No geotechnical elements appear

## Known Next Steps

### 1. Update Contact Button Phone Number

File: `geotech/components/geotech-contact-button.tsx`

- Find: `const phoneNumber = "+966";`
- Replace with actual phone number
- Button will then link to `tel:` with that number

### 2. Download & Organize Service Photos

Current: All service gallery arrays are empty `[]`

- Download photos from provided URLs
- Store in: `geotech/public/images/services/[slug]/`
- Update: `geotech/lib/services-data.ts` gallery arrays
- Add captions for each image

### 3. Verify Arabic Content

- [ ] All service pages have Arabic translations
- [ ] RTL layout works on service pages
- [ ] Process steps display correctly in RTL

## Build & Performance

```bash
# Final build time: 8.0 seconds (Turbopack)
# Static pages generated: 28 (14 services × 2 languages)
# TypeScript errors: 0
# Console warnings: Check browser console for any issues
```

## Files Modified

Total: 20 files

### Core Routing Fixes (3 files)

- navigation.tsx
- hero.tsx
- service-page-template.tsx

### Border Improvements (12 files)

- what-sets-apart.tsx
- introduction.tsx
- service-explorer.tsx
- approach.tsx
- contact.tsx
- geophysical-technology.tsx
- geotechnical-investigation.tsx
- ground-engineering.tsx
- hydrology.tsx
- mining-exploration.tsx
- organizations.tsx
- footer.tsx

### New Components (1 file)

- geotech-contact-button.tsx

### Layout Updates (1 file)

- geotech/app/layout.tsx

### Documentation (1 file)

- FIXES_APPLIED.md

### Other (2 files)

- src/FIXES_APPLIED.md
- TESTING_GUIDE.md (this file)

## Quick Debug Tips

If something isn't working:

1. **Routes still show 404:**
   - Clear `.next` folder: `rm -r .next`
   - Rebuild: `npm run build`
   - Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

2. **Borders still faint:**
   - Check CSS variables are correct in `globals.css`
   - Verify Tailwind is processing all component files
   - Check browser DevTools computed styles

3. **Contact button not appearing:**
   - Verify `geotech/app/layout.tsx` has the import
   - Check that `GeotechContactButton` is rendered
   - Not appearing on contracting site is correct behavior

4. **Text contrast issues:**
   - Verify `useTheme` hook is working
   - Check CSS variables resolve correctly
   - Test in both light and dark modes

## Success Criteria

✅ All routing paths include `/geotechnical/` prefix
✅ Hero text readable in both light and dark themes
✅ All borders visible and stronger in light theme
✅ Hover effects working smoothly
✅ Contact button appears on geotech pages only
✅ No TypeScript errors
✅ Build completes in <10 seconds
✅ All 28 service pages pre-generated
✅ No console errors in browser
