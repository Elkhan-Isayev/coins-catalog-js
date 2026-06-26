import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { coins, CATEGORIES } from '../data/coins.js';
import CoinCard from './CoinCard.jsx';
import SearchBar from './SearchBar.jsx';
import Pagination from './Pagination.jsx';
import './CoinList.scss';

const PAGE_SIZE = 6;
const EMPTY_FILTERS = {
  query: '',
  country: '',
  composition: '',
  priceFrom: '',
  priceTo: '',
  yearFrom: '',
  yearTo: '',
};

function matches(coin, f) {
  const haystack = `${coin.coin_name} ${coin.short_description} ${coin.full_description}`.toLowerCase();
  if (f.query && !haystack.includes(f.query.toLowerCase())) return false;
  if (f.country && coin.issuing_country !== f.country) return false;
  if (f.composition && coin.composition !== f.composition) return false;
  if (f.priceFrom && coin.price < Number(f.priceFrom)) return false;
  if (f.priceTo && coin.price > Number(f.priceTo)) return false;
  if (f.yearFrom && coin.coin_year < Number(f.yearFrom)) return false;
  if (f.yearTo && coin.coin_year > Number(f.yearTo)) return false;
  return true;
}

export default function CoinList() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  const category = useMemo(
    () => CATEGORIES.find((c) => c.slug === searchParams.get('category')),
    [searchParams]
  );

  const filtered = useMemo(() => {
    return coins
      .filter((coin) => (category ? coin.coin_type === category.id : true))
      .filter((coin) => matches(coin, filters));
  }, [category, filters]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, pageCount || 1);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearch = (next) => {
    setFilters(next);
    setPage(1);
  };

  return (
    <div className="coin-list">
      <h1 className="page-title">{category ? category.name : 'All coins'}</h1>
      <p className="page-subtitle">
        {filtered.length} {filtered.length === 1 ? 'coin' : 'coins'} found
      </p>

      <SearchBar onSearch={handleSearch} />

      {visible.length > 0 ? (
        <div className="coin-grid">
          {visible.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      ) : (
        <p className="empty">No coins match your search.</p>
      )}

      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onChange={setPage}
      />
    </div>
  );
}
