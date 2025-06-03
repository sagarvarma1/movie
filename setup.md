# Quick Setup Guide 🚀

## Step 1: Get Your Free TMDB API Key

1. **Go to TMDB**: Visit [themoviedb.org](https://www.themoviedb.org/)
2. **Sign up**: Create a free account
3. **Get API Key**: 
   - Go to your account settings
   - Click "API" in the left sidebar
   - Click "Create" and choose "Developer"
   - Fill out the form (you can put anything reasonable)
   - Copy your API key

## Step 2: Add Your API Key

Create a `.env` file in this folder and add:

```
REACT_APP_TMDB_API_KEY=paste_your_actual_key_here
```

## Step 3: Run the App

```bash
npm start
```

The app will open at `http://localhost:3000`

## Test It Out

Try searching for:
- "Breaking Bad"
- "Inception" 
- "The Office"
- "Stranger Things"

You should see results with streaming platform buttons that work!

---

**That's it!** You now have a working movie/show finder with reliable search. 🎬 