# Trackk Web Portal - Setup Guide

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- Code editor (VS Code recommended)

## Installation

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd "attachments 2"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=https://api.trackk.in
   NEXT_PUBLIC_WS_URL=wss://ws.trackk.in
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
trackk-web-portal/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── layout/          # Layout components
│   │   ├── ai/              # AI Co-Pilot
│   │   └── common/          # Shared components
│   ├── lib/                 # Utilities
│   │   ├── api.ts           # API client
│   │   └── utils.ts         # Helper functions
│   ├── store/               # Zustand stores
│   │   ├── dashboardStore.ts
│   │   ├── watchlistStore.ts
│   │   └── themeStore.ts
│   └── types/               # TypeScript types
│       └── index.ts
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Development Workflow

### Adding a New Widget

1. Create widget component in `src/components/dashboard/widgets/`
2. Add widget type to `src/types/index.ts`
3. Register in `src/components/dashboard/WidgetRenderer.tsx`
4. Add to widget palette in `src/components/dashboard/WidgetPalette.tsx`

### Adding a New Theme

1. Add theme definition to `src/store/themeStore.ts`
2. Update CSS variables in theme application
3. Test across all components

### Adding API Endpoints

1. Add endpoint function to `src/lib/api.ts`
2. Use in components with React Query
3. Handle loading and error states

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Key Features

### ✅ Implemented
- Infinite canvas workspace with drag & drop
- Multiple widget types (Chart, Watchlist, Portfolio, Trackk Score, News, Orders)
- Theme system (6 themes)
- AI Co-Pilot UI
- Keyboard shortcuts
- Responsive sidebar navigation
- Top bar with search

### 🚧 In Progress
- TradingView chart integration
- Real-time WebSocket updates
- Backend API integration
- User authentication

### 📋 Planned
- Collaborative watchlists
- Leaderboard system
- Portfolio showreel export
- Widget marketplace

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check TypeScript configuration
npm run type-check
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Next Steps

1. **Backend Integration**: Connect to Trackk API
2. **Real-time Data**: Implement WebSocket connections
3. **Authentication**: Add user login/signup
4. **Testing**: Set up Jest and Playwright
5. **Deployment**: Configure Vercel/Netlify

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout)
- [Design Guidelines](./DESIGN_GUIDELINES.md)
- [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md)

## Support

For issues or questions:
1. Check the [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md)
2. Review [Design Guidelines](./DESIGN_GUIDELINES.md)
3. Open an issue in the repository


