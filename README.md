# Gitech Africa - ICT Innovation Group

A professional, modern, and mobile-responsive website for **Gitech Africa**, an ICT innovation group empowering Africa through smart infrastructure, AI-powered wellness, and AgriTech systems.

**Live Project**: https://lovable.dev/projects/58eba556-c18c-48c1-b12a-b3a6b175070e

## 🌍 Website Structure

### Main Domain: `www.gitech.africa`
Landing page and gateway introducing the unified vision of the group with links to three subsidiaries.

### Subsidiaries (Subdomains)

#### 🏥 `wellness.gitech.africa` - iTechnology Global Enterprises
*Empowering Wellness Through Intelligent Technology*
- QRMA health diagnostics & reporting
- Remote health monitoring via wearables  
- AI-powered preventive health insights
- Virtual consultation platforms
- Health tech SaaS for hospitals and wellness centers

#### 🏢 `smart.gitech.africa` - Ginno Technology Global Company Ltd.
*Innovating the Future with Smart Infrastructure*
- Smart estate design and development
- AI and automation systems for public and private sector
- Enterprise IT architecture and cybersecurity
- Custom-built apps and eGovernment platforms

#### 🌱 `agro.gitech.africa` - iAgroConstruct Tech Solutions Company
*Building Smart Farms and Sustainable Communities*
- AI and IoT-enabled precision farming
- Agro-processing and storage facilities
- Smart housing for low-income communities
- Renewable energy and rural infrastructure systems

## 🚀 Features

### ✅ Implemented Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, futuristic design with Pan-African brand feel
- **Analytics Integration**: Google Analytics ready for tracking
- **WhatsApp Integration**: Floating WhatsApp widget for lead generation
- **Routing System**: React Router with subdomain structure simulation
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards
- **Performance Optimized**: Fast loading with optimized images

### 🎨 Design System
- **Color Themes**:
  - iTechnology: Teal + Blue (`gradient-health`)
  - GinnoTech: Deep Navy + Grey (`gradient-smart`) 
  - iAgroConstruct: Green + Warm Earth tones (`gradient-agro`)
- **Typography**: Modern font hierarchy with semantic spacing
- **Components**: Reusable UI components with consistent styling

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── HeroSection.tsx  # Landing page hero
│   ├── SubsidiaryCards.tsx # Subsidiary showcase
│   ├── AboutSection.tsx # Company information
│   ├── ContactSection.tsx # Contact form
│   ├── Footer.tsx       # Site footer
│   ├── Analytics.tsx    # Google Analytics
│   └── WhatsAppWidget.tsx # WhatsApp integration
├── pages/
│   ├── Index.tsx        # Main landing page
│   ├── HealthTech.tsx   # Health subsidiary page
│   ├── SmartInfrastructure.tsx # Smart infra page
│   ├── AgriTech.tsx     # AgriTech subsidiary page
│   └── NotFound.tsx     # 404 page
├── assets/              # Images and media
├── lib/                 # Utility functions
└── hooks/               # Custom React hooks
```

## 🌐 Subdomain Configuration

### For Production Deployment:

1. **DNS Configuration**: Set up CNAME records for subdomains:
   ```
   wellness.gitech.africa → CNAME → www.gitech.africa
   smart.gitech.africa  → CNAME → www.gitech.africa
   agro.gitech.africa   → CNAME → www.gitech.africa
   ```

2. **Server Configuration**: Configure your web server to route subdomains:
   ```nginx
   # Nginx example
   server {
       server_name wellness.gitech.africa;
       return 301 https://www.gitech.africa/health;
   }
   ```

3. **Analytics Setup**: Replace `G-XXXXXXXXXX` in `Analytics.tsx` with your Google Analytics tracking ID.

4. **WhatsApp Setup**: Update the phone number in `WhatsAppWidget.tsx` with your business WhatsApp number.

## 📱 Technology Stack
- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router DOM
- **UI Components**: Shadcn/ui components
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4
- **Communication**: WhatsApp Business API integration

## 👥 Target Audience
- Governments and public institutions
- Health institutions and hospitals
- Investors and venture capital firms
- NGOs and development organizations
- SMEs and startups
- International partners seeking African ICT solutions

## 📊 Analytics & Tracking
- Google Analytics 4 integration
- Event tracking for subsidiary navigation
- Page view tracking
- Custom conversion goals ready

## 💬 Lead Generation
- WhatsApp Business integration
- Contact form with validation
- Newsletter signup
- CTA buttons with conversion tracking

## 🛡️ Security & SEO
- Content Security Policy ready
- Social media meta tags
- Structured data markup ready
- SSL/HTTPS enforced (when deployed)

## 📈 Performance
- Optimized images with proper alt tags
- Lazy loading for non-critical components
- Minimal bundle size with tree shaking
- Fast loading animations and transitions

## 🔧 Deployment

Simply open [Lovable](https://lovable.dev/projects/58eba556-c18c-48c1-b12a-b3a6b175070e) and click on Share -> Publish.

### Custom Domain Setup

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 👨‍💼 Leadership
**Dr. Afebuameh I. Ogbesor** - Founder & CEO
Visionary leader driving Africa's digital transformation through innovative ICT solutions.

---

For technical support or feature requests, please contact the development team.
