import { Link } from 'react-router-dom';
import { CATEGORIES, coins } from '../data/coins.js';
import CoinIcon from './CoinIcon.jsx';
import './Home.scss';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="page-title">Discover collectible coins</h1>
        <p className="page-subtitle">
          Browse a curated catalog of {coins.length} coins from around the world.
          Search by name, country, metal, year or price.
        </p>
        <Link to="/coins" className="btn">
          Explore the catalog &#10095;
        </Link>
      </section>

      <section className="categories">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            to={`/coins?category=${category.slug}`}
            className="category-card"
          >
            <CoinIcon className="category-icon" />
            <h2>{category.name}</h2>
            <span className="category-link">Show all &#10095;</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
