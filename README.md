# Simple Weather App

A modern, feature-rich weather application built with Next.js and Tailwind CSS. Get current weather conditions and 5-day forecasts for any city or your current location.

## Features

- **Search by City** - Look up weather for any city worldwide
- **Current Location** - Automatically detect and show weather for your location
- ️ **Current Weather** - Temperature, conditions, humidity, wind speed, and pressure
- **5-Day Forecast** - Extended weather predictions with daily highs and lows
- 📱 **Responsive Design** - Works perfectly on mobile and desktop
- ⚡ **Real-time Updates** - Instant weather data from OpenWeatherMap API
- 🎨 **Modern UI** - Clean, beautiful interface with gradient backgrounds

## Live Demo

🌐 **Available on Vercel**: https://weahter-app-front-end-ruilingtans-projects.vercel.app/

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- OpenWeatherMap API key (free)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Get a free API key from [OpenWeatherMap](https://openweathermap.org/api):

   - Sign up for a free account
   - Navigate to your API keys section
   - Copy your API key

   Create a `.env.local` file in the root directory:

   ```bash
   cp .env.example .env.local
   ```

   Add your API key to `.env.local`:

   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable                          | Description                 | Required |
| --------------------------------- | --------------------------- | -------- |
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes      |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Dependencies

### Core Dependencies

- **Next.js 15.4.6** - React framework
- **React 19.1.0** - UI library
- **React DOM 19.1.0** - React rendering

### Development Dependencies

- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing

## API Usage

This app uses the OpenWeatherMap API:

- **Current Weather**: `/data/2.5/weather`
- **5-Day Forecast**: `/data/2.5/forecast`
- **Geolocation**: Browser's built-in Geolocation API

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
2. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `NEXT_PUBLIC_OPENWEATHER_API_KEY`
   - Deploy!

3. **Your app will be live** at `https://your-app-name.vercel.app`

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

**Note**: Geolocation feature requires HTTPS in production.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vercel](https://vercel.com/) for hosting

---

Made with ❤️ using Next.js and Tailwind CSS
