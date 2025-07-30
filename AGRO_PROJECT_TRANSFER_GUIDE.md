# Agro Project Transfer Package

This document outlines all the files and dependencies needed to create a standalone agro.gitech.africa project.

## Files to Transfer

### Core Agro Components
1. **src/pages/AgriTech.tsx** - Main agro page with dashboard and navigation
2. **src/components/agri/** - All agro-specific components:
   - AdvisoryBot.tsx
   - CropDiagnosis.tsx
   - KnowledgeBase.tsx
   - Marketplace.tsx
   - WeatherCalendar.tsx
   - YieldPredictor.tsx

### Shared UI Components (Required Dependencies)
All components in `src/components/ui/` are needed as the agro components depend on them:
- button.tsx
- card.tsx
- input.tsx
- select.tsx
- badge.tsx
- dialog.tsx
- alert.tsx
- tabs.tsx
- progress.tsx
- textarea.tsx
- label.tsx
- toast.tsx & toaster.tsx & use-toast.ts

### Configuration Files
- tailwind.config.ts
- src/index.css
- src/lib/utils.ts
- vite.config.ts
- tsconfig files
- package.json dependencies

### Package Dependencies
Key dependencies for agro functionality:
```json
{
  "@radix-ui/react-*": "Various versions for UI components",
  "lucide-react": "Icons",
  "class-variance-authority": "Component variants",
  "clsx": "Conditional classes",
  "tailwind-merge": "Tailwind utilities",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "tailwindcss-animate": "Animations"
}
```

## New Project Structure

```
agro.gitech.africa/
├── src/
│   ├── components/
│   │   ├── ui/           # All shadcn components
│   │   └── agri/         # Agro-specific components
│   ├── pages/
│   │   ├── Index.tsx     # Main dashboard (copy from AgriTech.tsx)
│   │   └── NotFound.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── hooks/
│   │   └── use-toast.ts
│   ├── index.css
│   └── main.tsx
├── public/
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Routing Configuration

Update the main App.tsx for the new agro project:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
```

## Domain Setup Steps

1. Create new Lovable project for agro.gitech.africa
2. Transfer all listed files
3. Update package.json with required dependencies
4. Test all agro components functionality
5. Deploy and connect custom domain
6. Configure DNS: 
   - A Record: agro.gitech.africa → 185.158.133.1
   - A Record: www.agro.gitech.africa → 185.158.133.1

## Database Considerations

If agro features need database functionality:
- Set up separate Supabase project
- Create agro-specific tables (crops, predictions, marketplace_items, etc.)
- Implement authentication if needed
- Add Supabase client configuration

## Features Included in Transfer

✅ **Advisory Bot** - Multi-language AI farming assistant
✅ **Crop Diagnosis** - AI-powered plant disease detection
✅ **Knowledge Base** - Farming guides and articles
✅ **Marketplace** - Buy/sell products and services
✅ **Weather Calendar** - Weather forecasts and farming calendar
✅ **Yield Predictor** - AI yield estimation tool

## Next Steps

1. Confirm transfer scope
2. Create new Lovable project
3. Systematic file transfer
4. Testing and validation
5. Domain configuration
6. Go live

## Notes

- All agro components are self-contained with mock data
- Real API integrations would need to be implemented
- Authentication system would need to be added if user accounts are required
- Database schema would need to be designed for production features