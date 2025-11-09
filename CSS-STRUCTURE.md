# CSS Structure Guide

This project uses modular CSS files instead of a single monolithic stylesheet.

## Base Styles

**base.css** (941 lines) - Always included on every page
- CSS Variables & Design System
- Reset & Base Styles
- Layout Utilities (container, grid, flexbox)
- Navigation
- Footer
- Common Components (buttons, cards, hero sections)
- Animations
- Base responsive styles

## Page-Specific Stylesheets

### Core Pages
- **index.html** → `base.css` only
- **404.html** → `base.css` only

### Jobs
- **jobs.html** → `base.css` + `jobs.css` (599 lines)
  - Job listings, filters, pagination, modals

### Hive
- **hive.html** → `base.css` + `hive.css` (485 lines)
  - Hive hero, leaderboard preview, modules grid

- **hive-leaderboards.html** → `base.css` + `leaderboards.css` (542 lines)
  - Full leaderboard table, filters, rankings

- **hive-module-detail.html** → `base.css` + `module-detail.css` (582 lines)
  - Module information, related modules, top performers

- **hive-module-practice.html** → `base.css` + `practice.css` (723 lines)
  - Three-column annotation interface, tools, canvas, progress

### Authentication
- **auth.html** → `base.css` + `auth.css` (713 lines)
  - Sign in/up forms, password strength, role selection

### Account Pages (All 4)
- **account-overview.html** → `base.css` + `account.css` (874 lines)
- **account-hive.html** → `base.css` + `account.css`
- **account-jobs.html** → `base.css` + `account.css`
- **account-settings.html** → `base.css` + `account.css`
  - Profile header, tabs, stats, settings with toggle switches

### Company Portal (All 11)
- **company-overview.html** → `base.css` + `company.css` (891 lines)
- **company-jobs.html** → `base.css` + `company.css`
- **company-job-detail.html** → `base.css` + `company.css`
- **company-applicants.html** → `base.css` + `company.css`
- **company-applicant-detail.html** → `base.css` + `company.css`
- **company-messages.html** → `base.css` + `company.css`
- **company-modules.html** → `base.css` + `company.css`
- **company-module-detail.html** → `base.css` + `company.css`
- **company-billing.html** → `base.css` + `company.css`
- **company-team.html** → `base.css` + `company.css`
- **company-settings.html** → `base.css` + `company.css`
  - Sidebar navigation, KPIs, tables, modals, tabs, filters

## Total
- **9 CSS files** totaling **6,350 lines**
- Average: ~705 lines per file (much more manageable than a single 6,351 line file!)

## Benefits
- ✅ Faster page loads (only load CSS needed for that page)
- ✅ Easier maintenance (find styles quickly)
- ✅ Better organization (logical separation)
- ✅ Reduced conflicts (isolated namespaces)
- ✅ Cleaner git diffs (changes in specific files)
