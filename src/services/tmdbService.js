import axios from 'axios';

// You'll need to get a free API key from https://www.themoviedb.org/settings/api
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Helper function to calculate relevance score
const calculateRelevanceScore = (item, searchQuery) => {
  const title = (item.title || item.name || '').toLowerCase();
  const query = searchQuery.toLowerCase().trim();
  
  // Exact match gets highest score
  if (title === query) return 100;
  
  // Starts with query gets high score
  if (title.startsWith(query)) return 90;
  
  // Contains all words from query
  const queryWords = query.split(' ').filter(word => word.length > 0);
  const titleWords = title.split(' ');
  
  let matchingWords = 0;
  let exactWordMatches = 0;
  
  for (const queryWord of queryWords) {
    let wordFound = false;
    for (const titleWord of titleWords) {
      if (titleWord === queryWord) {
        exactWordMatches++;
        wordFound = true;
        break;
      } else if (titleWord.includes(queryWord) || queryWord.includes(titleWord)) {
        matchingWords++;
        wordFound = true;
        break;
      }
    }
    if (!wordFound) {
      // If any query word is completely missing, heavily penalize
      return 0;
    }
  }
  
  // Calculate score based on word matches
  const totalQueryWords = queryWords.length;
  const exactMatchRatio = exactWordMatches / totalQueryWords;
  const partialMatchRatio = matchingWords / totalQueryWords;
  
  // Require at least 60% word match to be considered relevant
  if ((exactMatchRatio + partialMatchRatio) < 0.6) {
    return 0;
  }
  
  // Score based on exact matches, partial matches, and popularity
  let score = (exactMatchRatio * 60) + (partialMatchRatio * 30);
  
  // Boost score based on popularity (normalized)
  const popularityBoost = Math.min(item.popularity / 100, 1) * 10;
  score += popularityBoost;
  
  return Math.round(score);
};

// Search for movies and TV shows
export const searchMovies = async (query) => {
  try {
    if (!query || query.trim().length < 2) {
      return [];
    }

    // Search both movies and TV shows
    const [moviesResponse, tvResponse] = await Promise.all([
      tmdbApi.get('/search/movie', { params: { query: query.trim(), page: 1 } }),
      tmdbApi.get('/search/tv', { params: { query: query.trim(), page: 1 } }),
    ]);

    // Combine and mark results with media_type
    const movies = moviesResponse.data.results.map(item => ({
      ...item,
      media_type: 'movie'
    }));
    
    const tvShows = tvResponse.data.results.map(item => ({
      ...item,
      media_type: 'tv'
    }));

    // Combine all results
    const allResults = [...movies, ...tvShows]
      .filter(item => item.poster_path) // Only show items with posters
      .map(item => ({
        ...item,
        relevanceScore: calculateRelevanceScore(item, query)
      }))
      .filter(item => item.relevanceScore > 0) // Only show relevant results
      .sort((a, b) => {
        // Sort by relevance score first, then by popularity
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        return b.popularity - a.popularity;
      })
      .slice(0, 12); // Limit to top 12 most relevant results

    return allResults;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies and TV shows');
  }
};

// Get streaming providers for a specific movie or TV show
export const getWatchProviders = async (id, mediaType) => {
  try {
    const response = await tmdbApi.get(`/${mediaType}/${id}/watch/providers`);
    const usProviders = response.data.results?.US;
    
    if (!usProviders) {
      return [];
    }

    // ONLY show subscription services (flatrate) - no rental or purchase options
    const providers = [];
    
    // Only add subscription services where content is "free" with subscription
    if (usProviders.flatrate) {
      providers.push(...usProviders.flatrate.map(provider => ({
        ...provider,
        type: 'subscription'
      })));
    }

    // Deduplicate providers by base name (e.g., Netflix, Peacock, etc.)
    const deduplicatedProviders = [];
    const seenProviders = new Set();
    
    // Define base names for common providers to avoid duplicates
    const getBaseName = (providerName) => {
      const name = providerName.toLowerCase();
      if (name.includes('netflix')) return 'netflix';
      if (name.includes('peacock')) return 'peacock';
      if (name.includes('hulu')) return 'hulu';
      if (name.includes('disney')) return 'disney';
      if (name.includes('amazon')) return 'amazon';
      if (name.includes('hbo')) return 'hbo';
      if (name.includes('paramount')) return 'paramount';
      if (name.includes('apple')) return 'apple';
      if (name.includes('showtime')) return 'showtime';
      if (name.includes('starz')) return 'starz';
      if (name.includes('cinemax')) return 'cinemax';
      return name;
    };

    // Prioritize main versions over variations (e.g., "Netflix" over "Netflix Standard with Ads")
    const sortedProviders = providers.sort((a, b) => {
      // Prefer shorter names (main versions) over longer ones (variations)
      return a.provider_name.length - b.provider_name.length;
    });

    for (const provider of sortedProviders) {
      const baseName = getBaseName(provider.provider_name);
      
      if (!seenProviders.has(baseName)) {
        seenProviders.add(baseName);
        deduplicatedProviders.push(provider);
      }
    }

    // Add TMDB link as fallback
    if (usProviders.link && deduplicatedProviders.length > 0) {
      deduplicatedProviders.forEach(provider => {
        provider.link = usProviders.link;
      });
    }

    return deduplicatedProviders.slice(0, 6); // Limit to 6 providers max
  } catch (error) {
    console.error('Error fetching watch providers:', error);
    return [];
  }
};

// Get trending content for the homepage (optional)
export const getTrending = async (timeWindow = 'day') => {
  try {
    const response = await tmdbApi.get(`/trending/all/${timeWindow}`);
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Error fetching trending content:', error);
    return [];
  }
};

// Get detailed info about a movie or TV show (optional)
export const getDetails = async (id, mediaType) => {
  try {
    const response = await tmdbApi.get(`/${mediaType}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching details:', error);
    throw new Error('Failed to get details');
  }
}; 