import { useState } from 'react';
import { countries, compositions } from '../data/coins.js';
import './SearchBar.scss';

const INITIAL = {
  query: '',
  country: '',
  composition: '',
  priceFrom: '',
  priceTo: '',
  yearFrom: '',
  yearTo: '',
};

export default function SearchBar({ onSearch }) {
  const [form, setForm] = useState(INITIAL);
  const [showFilters, setShowFilters] = useState(false);

  const update = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (Number(form.priceFrom) > Number(form.priceTo) && form.priceTo) {
      alert('Invalid price range.');
      return;
    }
    if (Number(form.yearFrom) > Number(form.yearTo) && form.yearTo) {
      alert('Invalid year range.');
      return;
    }
    onSearch(form);
  };

  const reset = () => {
    setForm(INITIAL);
    onSearch(INITIAL);
  };

  return (
    <form className="search-bar" onSubmit={submit}>
      <div className="search-bar-main">
        <input
          type="text"
          name="query"
          value={form.query}
          onChange={update}
          placeholder="Search by name or description…"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </div>

      <div className="search-bar-toggle">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="link-button"
        >
          {showFilters ? 'Hide filters' : 'Advanced filters'} &#8693;
        </button>
      </div>

      {showFilters && (
        <div className="search-bar-filters">
          <label>
            Issuing country
            <select name="country" value={form.country} onChange={update}>
              <option value="">Any</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Metal
            <select
              name="composition"
              value={form.composition}
              onChange={update}
            >
              <option value="">Any</option>
              {compositions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>Price ($)</legend>
            <input
              type="number"
              name="priceFrom"
              value={form.priceFrom}
              onChange={update}
              placeholder="from"
              min="0"
            />
            <input
              type="number"
              name="priceTo"
              value={form.priceTo}
              onChange={update}
              placeholder="to"
              min="0"
            />
          </fieldset>

          <fieldset>
            <legend>Year</legend>
            <input
              type="number"
              name="yearFrom"
              value={form.yearFrom}
              onChange={update}
              placeholder="from"
            />
            <input
              type="number"
              name="yearTo"
              value={form.yearTo}
              onChange={update}
              placeholder="to"
            />
          </fieldset>

          <button type="button" className="btn btn-ghost" onClick={reset}>
            Reset
          </button>
        </div>
      )}
    </form>
  );
}
