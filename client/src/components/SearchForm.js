// SearchForm component for entering and submitting an IP address
export const SearchForm = ({ value, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="form" aria-label="IP address form">
      <div className="input-group">
        <label htmlFor="ip-input" className="sr-only">IP Address</label>
        {/* Input for IP address */}
        <input
          id="ip-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter IP address (e.g., 8.8.8.8)"
          className="ip-input"
          disabled={loading}
        />
        {/* Submit button, disabled while loading or if input is empty */}
        <button
          type="submit"
          className="submit-btn"
          disabled={loading || !value.trim()}
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </div>
    </form>
  );
};


