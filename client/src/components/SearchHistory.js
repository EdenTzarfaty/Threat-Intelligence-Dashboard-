// Displays the last 5 IP lookups
export const SearchHistory = ({ history, onSelect }) => {
  // Don't render if there is no history
  if (!history.length) return null;
  return (
    <div className="search-history">
      <h3>5 Recent Lookups</h3>
      <ul>
        {history.map((item, idx) => (
          <li key={item.ip + idx}>
            <button onClick={() => onSelect(item)}>{item.ip}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
