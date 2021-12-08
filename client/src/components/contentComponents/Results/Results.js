import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GameCard from '../GameCard/GameCard';
import './Results.css';

const Results = () => {
  const searchResults = useSelector(state => state.search.searchResults);

  const { query } = useParams();

  const renderResults = (result) => {
    if (typeof result === "string") {
      return <h3 className="results__none">{result}</h3>;
    }
    if (searchResults.length > 0) {
      return searchResults.map(game => <GameCard key={game.name} game={game} />);
    }
  }

  return (
    <div className="page-content__results">
      <h2 className="results__search">Search for: {query}</h2>
      {renderResults(searchResults)}
    </div>
  );
};

export default Results;
