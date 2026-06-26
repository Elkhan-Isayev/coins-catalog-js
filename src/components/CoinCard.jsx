import { Link } from 'react-router-dom';
import CoinIcon from './CoinIcon.jsx';
import './CoinCard.scss';

export default function CoinCard({ coin }) {
  return (
    <Link to={`/coins/${coin.id}`} className="coin-card">
      <div className="coin-card-icon">
        <CoinIcon />
      </div>
      <div className="coin-card-body">
        <h3>{coin.coin_name}</h3>
        <p>{coin.short_description}</p>
        <span className="coin-card-price">${coin.price}</span>
      </div>
    </Link>
  );
}
