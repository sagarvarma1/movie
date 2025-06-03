import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import { searchMovies } from './services/tmdbService';

const AppContainer = styled.div`
  min-height: 100vh;
  background: white;
  padding: 20px;
  font-family: "EB Garamond", "Garamond", "Times New Roman", "Times", serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px 10px;
    justify-content: center;
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height for mobile browsers */
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
    justify-content: center;
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height for mobile browsers */
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  color: #333;
  font-size: 3rem;
  margin: 0;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin: 10px 0 0 0;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 8px 0 0 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 5px 0 0 0;
    padding: 0 10px;
  }
`;

const ResultsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    padding: 15px 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
    padding: 10px 0;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin: 40px 0;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 20px 0;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #dc3545;
  font-size: 1.1rem;
  margin: 40px 0;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 40px auto;
  border: 1px solid #dee2e6;
  width: 90%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 20px auto;
    padding: 15px;
    width: 95%;
  }
`;

const NoResults = styled.div`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin: 40px 0;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 20px 0;
  }
`;

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setHasSearched(true);
    
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHomeClick = () => {
    setSearchResults([]);
    setHasSearched(false);
    setError('');
    setLoading(false);
  };

  return (
    <AppContainer>
      <Header>
        <Title onClick={handleHomeClick}>FindMovies</Title>
        <Subtitle>🎬 Find where to watch any movie or TV show</Subtitle>
      </Header>
      
      <SearchBar onSearch={handleSearch} loading={loading} />
      
      {loading && <LoadingMessage>🔍 Searching...</LoadingMessage>}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {hasSearched && !loading && searchResults.length === 0 && !error && (
        <NoResults>No results found. Try a different search term.</NoResults>
      )}
      
      <ResultsContainer>
        {searchResults.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </ResultsContainer>
    </AppContainer>
  );
}

export default App;