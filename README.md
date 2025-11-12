# 💻 Moverse Portfolio - Tech Agency Platform

A modern, feature-rich portfolio platform for Moverse Technologies showcasing digital services, team expertise, and client success stories. Built with Next.js and powered by Sanity CMS for seamless content management.

---

## 📌 Project Scope

### 🏠 Homepage
- Hero section with compelling call-to-action
- Service showcase with detailed descriptions
- Work process visualization
- Client testimonials and trust indicators
- Project portfolio highlights
- Team member profiles
- Blog preview section
- FAQ section
- Newsletter subscription
- Quote request form

### 📖 About Page
- Company mission and philosophy
- Team expertise showcase
- Work process breakdown
- Client testimonials
- Trust indicators and achievements

### 🛠️ Services Page
- Comprehensive service listings including:
  - 🌐 Website Development
  - 🎨 UI/UX Design
  - 📱 Application Development
  - 🏷️ Brand Identity
  - 🛒 E-commerce Solutions
  - 🔍 SEO Optimization
  - 📢 Digital Marketing
  - ✏️ Graphic Design
- Individual service detail pages with:
  - Service overview and benefits
  - Expertise breakdown
  - Feature highlights
  - Visual showcases

### 🎯 Projects Page
- Portfolio showcase of client projects
- Project detail pages with:
  - Project overview
  - Challenges and solutions
  - Services provided
  - Results and impact
  - Visual gallery

### 👥 Team Page
- Team member profiles
- Individual member detail pages
- Expertise and background information

### 📝 Blog Page
- Blog post listings with categories
- Individual blog post pages
- Content management via Sanity CMS
- SEO-optimized blog structure

### 📬 Contact Page
- Contact form for inquiries
- Service booking functionality
- Newsletter subscription

### 🎬 Special Features
- **Splash Screen**: Animated logo splash screen on first visit
- **Smooth Animations**: Scroll-reveal animations and transitions
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Performance Optimized**: Fast loading times and optimized images
- **SEO Ready**: Built-in SEO optimization

---

## 🧰 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Icons**: Lucide React
- **Animations**: Custom CSS animations and transitions

### Backend & CMS
- **CMS**: Sanity.io (Headless CMS)
- **API Routes**: Next.js API routes
- **Email Service**: Resend API
- **Content Management**: Sanity Studio (accessible at `/studio`)

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm
- **Version Control**: Git

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Sanity account (for CMS setup)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/moverse-portfolio.git
   cd moverse-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   
   # Email Service (Resend)
   RESEND_API_KEY=your_resend_api_key
   
   # Optional: Custom configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

6. **Access Sanity Studio:**
   Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to manage content

---

## 📁 Project Structure

```
moverse-portfolio/
├── public/                 # Static assets (images, logos)
├── src/
│   ├── app/               # Next.js app router pages
│   │   ├── about/        # About page
│   │   ├── blog/         # Blog pages
│   │   ├── contact/      # Contact page
│   │   ├── projects/     # Projects pages
│   │   ├── services/     # Services pages
│   │   ├── team/         # Team pages
│   │   ├── studio/       # Sanity Studio
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── home/         # Homepage sections
│   │   ├── layout/       # Layout components
│   │   ├── ui/           # UI components
│   │   └── ...
│   ├── lib/              # Utilities and helpers
│   │   ├── cms/          # Sanity client
│   │   └── content/      # Content definitions
│   ├── sanity/           # Sanity configuration
│   │   ├── schemaTypes/  # Content schemas
│   │   └── lib/          # Sanity utilities
│   └── types/            # TypeScript types
└── ...
```

---

## 🎨 Key Features

### Content Management
- **Sanity CMS Integration**: Manage blog posts, projects, and team members through Sanity Studio
- **Real-time Updates**: Content changes reflect immediately
- **Media Management**: Upload and manage images through Sanity

### User Experience
- **Splash Screen**: Engaging animated splash on first visit
- **Smooth Scrolling**: Animated scroll-to-section functionality
- **Progress Indicators**: Reading progress and scroll progress bars
- **Loading States**: Skeleton loaders and loading spinners
- **Responsive Navigation**: Mobile-friendly header and navigation

### Performance
- **Image Optimization**: Next.js Image component for optimized images
- **Code Splitting**: Automatic code splitting for optimal performance
- **SEO Optimization**: Meta tags, structured data, and semantic HTML

---

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sanity:dev` - Start Sanity Studio in development mode

---

## 📝 Content Management

### Accessing Sanity Studio
1. Navigate to `/studio` in your browser
2. Log in with your Sanity credentials
3. Manage content through the intuitive interface

### Content Types
- **Blog Posts**: Create and manage blog articles
- **Projects**: Showcase client projects and case studies
- **Team Members**: Add and update team profiles
- **Categories**: Organize blog posts and projects

---

## 🔐 Environment Variables

Copy `env.example` to `.env.local` and provide values for the variables listed below:

| Variable | Description | Required | Notes |
|----------|-------------|----------|-------|
| `SUPABASE_URL` | Supabase project URL | Yes | Available in Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Yes | Used by both client and server routes |
| `WHATSAPP_TOKEN` | WhatsApp Cloud API access token | Yes | Refresh every 24h unless you have a permanent token |
| `WHATSAPP_PHONE_NUMBER_ID` | Phone number ID used for API calls | Yes | From Meta Developer Console |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | WhatsApp Business Account ID | Optional | Useful for Meta portal configuration |
| `WHATSAPP_VERIFY_TOKEN` | Shared secret for webhook verification | Yes | Ensure this matches the Meta subscription |
| `WHATSAPP_TEST_PHONE_NUMBER` | Test phone number provided by Meta | Optional | Used for local testing helpers |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | Yes | Existing Sanity configuration |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Yes | Typically `production` |
| `SANITY_API_TOKEN` | Sanity API token for write access | Yes | Required for Sanity Studio mutations |
| `RESEND_API_KEY` | Resend API key for email functionality | Yes | Existing email automation |
| `NEXT_PUBLIC_SITE_URL` | The deployed site URL | Optional | Used in SEO and canonical tags |

---

## 💬 WhatsApp Cloud API Integration

### Installed Packages

- [`@supabase/supabase-js`](https://supabase.com/docs/reference/javascript/installing) – required for persisting contacts, conversations, and messages.

### API Routes

- `POST /api/sendMessage` – Sends outbound messages via the WhatsApp Cloud API and logs them in Supabase.  
- `GET/POST /api/webhook` – Handles Meta verification and ingests inbound WhatsApp events into Supabase.

Both routes include structured logging and guard clauses for common failure states.

### Supabase Storage Model

- `contacts`: Upserts contacts by `wa_id` (phone number) and stores display names when available.  
- `conversations`: Ensures a single open WhatsApp conversation per contact (`channel = 'whatsapp'`).  
- `messages`: Persists inbound/outbound message bodies, types, timestamps, and raw payloads for auditing.

Adjust column names if your schema differs; the current implementation expects `wa_id`, `phone_number`, `profile_name`, `channel`, `status`, `last_message_at`, `conversation_id`, `direction`, `wa_message_id`, `message_type`, `sent_at`, and `raw_payload`.

### WhatsApp Widget Usage

```tsx
// src/app/layout.tsx (example usage)
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <WhatsAppWidget
          phoneNumber="+15551853677"
          defaultMessage="Hi Moverse! I'm interested in your services."
        />
      </body>
    </html>
  );
}
```

### Deployment Checklist (Meta Developer Portal)

1. Deploy to Vercel and obtain the production URL.  
2. In Meta Developer Portal → `WhatsApp > Configuration`, set the webhook callback URL to `https://<your-domain>/api/webhook`.  
3. Enter the same `WHATSAPP_VERIFY_TOKEN` configured in `.env`.  
4. Subscribe to the `messages` and `message_template_status_update` events.  
5. Replace the temporary access token with a permanent system user token when ready for production.

### Local Testing

1. Install and run `ngrok http 3000` (or equivalent tunneling tool).  
2. Add the forwarded HTTPS URL as the webhook callback in Meta (append `/api/webhook`).  
3. Start the Next.js dev server locally (`npm run dev`).  
4. Trigger test messages from the Meta “Send Message” sandbox to confirm ingestion.  
5. Use `curl` or Thunder Client to hit `POST http://localhost:3000/api/sendMessage` with:
   ```json
   { "to": "+15551853677", "message": "Test message from local dev 🌐" }
   ```
6. Monitor server logs in the terminal; Supabase entries should appear immediately.

### Verification & Troubleshooting

- Check the Vercel function logs or local terminal for `[webhook]` and `[sendMessage]` log prefixes.  
- Validate Supabase inserts using the SQL editor or dashboard.  
- Verify that the WhatsApp Cloud API responds with HTTP 200; failures include an `error` payload for debugging.  
- Rotate the access token before it expires to avoid 401 errors during demos.

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with Node.js

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## 📄 License

This project is proprietary and confidential. All rights reserved © 2025 Moverse Hasta Limited.

---

## 👥 Contributing

This is a private project for Moverse Technologies. For internal contributions, please follow the established coding standards and submit pull requests for review.

---

## 📞 Support

For questions or support regarding this project, please contact the Moverse Technologies development team.
