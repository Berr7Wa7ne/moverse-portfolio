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

Required environment variables for the application:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (usually `production`) | Yes |
| `SANITY_API_TOKEN` | Sanity API token for write access | Yes |
| `RESEND_API_KEY` | Resend API key for email functionality | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for production) | Optional |

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
