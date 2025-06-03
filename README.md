# FindMovies 🎬

**A fast, reliable movie and TV show finder that actually works.**

Tired of broken search on other platforms? FindMovies focuses on **one thing and does it well**: finding where you can watch movies and TV shows in the US market.

## 🔥 Key Features

- **⚡ Fast Search**: Search movies and TV shows instantly
- **🎯 US-Focused**: Accurate streaming availability for US market
- **📱 Clean UI**: Simple, responsive design that works on all devices
- **🔗 Direct Links**: Click to go straight to streaming platforms
- **🆓 Free**: No accounts, no fees, just search

## 🚀 Quick Start

### 1. Get a TMDB API Key (Free)

1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API → Create new API key
4. Choose "Developer" and fill out the form

### 2. Set Up the Project

```bash
# Clone or download this project
cd findMovies

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_TMDB_API_KEY=your_actual_api_key_here" > .env

# Start the app
npm start
```

Visit `http://localhost:3000` and start searching!

## 🎯 How It Works

1. **Search**: Type any movie or TV show name
2. **Results**: See movies and shows with ratings and descriptions  
3. **Watch**: Click streaming service buttons to go directly to content

## 📱 What You Can Search

- **Movies**: "Inception", "The Dark Knight", "Dune"
- **TV Shows**: "Breaking Bad", "The Office", "Stranger Things"
- **Any Title**: Current releases, classics, international content

## 🔧 Technology

- **React 18**: Modern, fast frontend
- **TMDB API**: Reliable movie/TV data and streaming providers
- **Styled Components**: Clean, responsive design
- **Axios**: Efficient API calls

## 🆔 Streaming Services Supported

The app shows where content is available on:

- Netflix
- Amazon Prime Video  
- Hulu
- Disney+
- HBO Max
- Apple TV+
- Paramount+
- Peacock
- And many more...

## 🔍 Why This App?

Other streaming finders have broken search, are slow, or don't work reliably. This app:

- ✅ **Actually works** - Uses reliable TMDB data
- ✅ **Fast search** - No waiting, instant results
- ✅ **Clean interface** - No clutter, just what you need
- ✅ **Mobile friendly** - Works great on phones and tablets
- ✅ **No tracking** - No accounts required, privacy-focused

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📄 API Key Setup

Create a `.env` file in the root directory:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

**Important**: Keep your API key secure and never commit it to public repositories.

## 🤝 Contributing

Found a bug or want to improve search? Feel free to open issues or submit pull requests.

## 📝 License

MIT License - feel free to use this for your own projects.

---

**Built because existing streaming finders don't work reliably. This one does.** 🎯 