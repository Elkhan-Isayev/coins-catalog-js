import './Pagination.scss';

export default function Pagination({ pageCount, currentPage, onChange }) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Pagination">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={page === currentPage ? 'active' : ''}
          onClick={() => onChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
