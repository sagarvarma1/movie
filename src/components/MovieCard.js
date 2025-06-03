import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getWatchProviders } from '../services/tmdbService';

const Card = styled.div`
  background: transparent;
  padding: 15px;
  text-align: center;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px 5px;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 15px;
  width: 100%;

  @media (max-width: 768px) {
    height: 250px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    height: 200px;
    margin-bottom: 10px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const PosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 15px;
  }
`;

const Title = styled.h3`
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: #333;
  line-height: 1.3;
  font-weight: 600;
  word-wrap: break-word;
  hyphens: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 0 12px 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 0 10px 0;
    line-height: 1.2;
  }
`;

const ProvidersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const ProviderButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background: #218838;
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.8rem;
    gap: 4px;
  }
`;

const LoadingProviders = styled.div`
  color: #666;
  font-style: italic;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const NoProviders = styled.div`
  color: #999;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

function MovieCard({ item }) {
  const [providers, setProviders] = useState(null);
  const [loadingProviders, setLoadingProviders] = useState(true);

  const posterUrl = item.poster_path 
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null;

  const releaseYear = item.release_date 
    ? new Date(item.release_date).getFullYear()
    : item.first_air_date 
    ? new Date(item.first_air_date).getFullYear()
    : null;

  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const watchProviders = await getWatchProviders(item.id, mediaType);
        setProviders(watchProviders);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setProviders(null);
      } finally {
        setLoadingProviders(false);
      }
    };

    fetchProviders();
  }, [item.id, mediaType]);

  const renderProviders = () => {
    if (loadingProviders) {
      return <LoadingProviders>Finding where to watch...</LoadingProviders>;
    }

    if (!providers || providers.length === 0) {
      return <NoProviders>Not on subscription services</NoProviders>;
    }

    return (
      <ProvidersList>
        {providers.map((provider) => (
          <ProviderButton
            key={provider.provider_id}
            href={provider.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            {provider.logo_path && (
              <img 
                src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                alt={provider.provider_name}
                style={{ width: '16px', height: '16px' }}
              />
            )}
            {provider.provider_name}
          </ProviderButton>
        ))}
      </ProvidersList>
    );
  };

  return (
    <Card>
      <PosterContainer>
        {posterUrl ? (
          <Poster src={posterUrl} alt={item.title || item.name} />
        ) : (
          <PosterPlaceholder>
            {item.title || item.name}
          </PosterPlaceholder>
        )}
      </PosterContainer>
      
      <Title>
        {item.title || item.name} {releaseYear && `(${releaseYear})`}
      </Title>
      
      {renderProviders()}
    </Card>
  );
}

export default MovieCard; 