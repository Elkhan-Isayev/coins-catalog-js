import { Link, useParams } from 'react-router-dom';
import { coins, CATEGORIES } from '../data/coins.js';
import CoinIcon from './CoinIcon.jsx';
import './CoinDetails.scss';

export default function CoinDetails() {
  const { id } = useParams();
  const coin = coins.find((c) => c.id === Number(id));

  if (!coin) {
    return (
      <div className="coin-details">
        <p className="empty">Coin not found.</p>
        <Link to="/coins" className="btn">
          Back to catalog
        </Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === coin.coin_type);
  const specs = [
    ['Issuing country', coin.issuing_country],
    ['Composition', coin.composition],
    ['Quality', coin.quality],
    ['Denomination', coin.denomination],
    ['Year', coin.coin_year],
    ['Weight', `${coin.weight} g`],
    ['Category', category?.name],
    ['Price', `$${coin.price}`],
  ];

  return (
    <article className="coin-details">
      <div className="coin-details-media">
        <CoinIcon coin={coin} />
      </div>

      <div className="coin-details-info">
        <h1>{coin.coin_name}</h1>
        <p className="lead">{coin.short_description}</p>
        <p>{coin.full_description}</p>

        <table>
          <tbody>
            {specs.map(([label, value]) => (
              <tr key={label}>
                <td>{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/coins" className="btn">
          &#10094; Back to catalog
        </Link>
      </div>
    </article>
  );
}
