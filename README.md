# 🌍 Country Quiz Game

An interactive and visually stunning country quiz game built with Next.js 14, featuring multiple quiz modes, smooth animations, and an impressive UI/UX design.

## ✨ Features

- **🚩 Flag Master**: Identify countries by their flags
- **🏛️ Capital Cities**: Match countries with their capitals
- **👥 Population Quiz**: Compare countries by population
- **Stunning Animations**: Powered by Framer Motion
- **Responsive Design**: Works perfectly on all devices
- **Real-time Data**: Fetches country information from REST Countries API
- **Score Tracking**: Track your performance with detailed results
- **Modern UI**: Glassmorphism effects and gradient backgrounds

## 🚀 Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **REST Countries API**: Real country data

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd country_quiz_game
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

## 🎮 How to Play

1. Choose a quiz mode from the homepage
2. Answer 10 questions per quiz
3. Get instant feedback on each answer
4. View your final score and accuracy
5. Try again or switch to a different mode

## 📁 Project Structure

```
country_quiz_game/
├── app/                    # Next.js app directory
│   ├── quiz/              # Quiz mode pages
│   │   ├── flags/
│   │   ├── capitals/
│   │   └── population/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   └── QuizContainer.tsx  # Reusable quiz component
├── lib/                   # Utilities and services
│   └── countries.ts       # Country data service
├── types/                 # TypeScript types
│   └── country.ts         # Country and quiz types
└── public/               # Static assets
```

## 🎨 Customization

### Changing Quiz Settings

Edit `/lib/countries.ts` to modify:
- Number of questions per quiz
- Number of answer options
- Question generation logic

### Styling

Modify `tailwind.config.ts` and `app/globals.css` to customize:
- Color schemes
- Animations
- Gradients
- Responsive breakpoints

## 📝 Environment Variables

No environment variables required! The app uses the public REST Countries API.

## 🔧 Build for Production

```bash
npm run build
npm start
```

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Acknowledgments

- [REST Countries API](https://restcountries.com/) for country data
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Next.js](https://nextjs.org/) for the amazing framework

---

Made with ❤️ and Next.js
