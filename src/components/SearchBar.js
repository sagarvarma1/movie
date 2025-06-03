import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  max-width: 1000px;
  width: 90%;
  margin: 0 auto 20px auto;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto 20px auto;
  }

  @media (max-width: 480px) {
    width: 85%;
    margin: 0 auto 15px auto;
    padding: 0;
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px 18px;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
  min-width: 0;
  box-sizing: border-box;
  width: 100%;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.15);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 16px; /* Prevents zoom on iOS */
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: 15px 25px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
  box-sizing: border-box;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 1rem;
    width: 100%;
    margin: 0;
  }
`;

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search for any movie or TV show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <SearchButton type="submit" disabled={loading || !query.trim()}>
          {loading ? '🔍' : 'Search'}
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  );
}

export default SearchBar; 