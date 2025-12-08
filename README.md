# 🌍 Country Quiz Game

An interactive and visually stunning country quiz game built with Next.js 14, featuring multiple quiz modes, smooth animations, PWA support, and gamification features.

## ✨ Features

### Quiz Modes
- **🚩 Flag Master**: Identify countries by their flags
- **🏛️ Capital Cities**: Match countries with their capitals
- **👥 Population Quiz**: Compare countries by population size

### Engagement Features
- **🔥 Streak System**: Track consecutive correct answers with live indicators
- **🏆 Achievements**: Unlock 8 different achievements (Perfect Score, Veteran, Expert, etc.)
- **📊 Statistics Dashboard**: View your high scores, total games, and best streaks
- **💾 Local Storage**: All progress saved automatically
- **📱 Haptic Feedback**: Vibration feedback for correct/incorrect answers

### Progressive Web App
- **📲 Installable**: Install as a native app on any device
- **⚡ Offline Support**: Play even without internet connection
- **🎯 App Shortcuts**: Quick access to all quiz modes
- **🌐 Service Worker**: Fast loading with intelligent caching

### UI/UX
- **Stunning Animations**: Powered by Framer Motion
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Glassmorphism effects and gradient backgrounds
- **Micro-interactions**: Smooth transitions and visual feedback

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
3. Build streaks by getting consecutive correct answers 🔥
4. Unlock achievements as you play 🏆
5. View your statistics and high scores 📊
6. Install as PWA for offline play 📱

## 🏆 Achievements

- **First Steps**: Complete your first quiz
- **Perfect Score**: Get 100% in a quiz
- **Veteran**: Complete 10 quizzes
- **Expert**: Complete 50 quizzes
- **On Fire**: Get 5 correct answers in a row
- **Unstoppable**: Get 10 correct answers in a row
- **Scholar**: Score 8 or more in a quiz
- **Genius**: Score 9 or more in a quiz

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
