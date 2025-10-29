import { useState } from 'react';
import { isValidIP } from './utils/ipValidator.js';
import './App.css';
import { useApp } from './context/AppContext';
import { IpReportCard } from './components/IpReportCard';
import { SearchForm } from './components/SearchForm';
import { ErrorAlert } from './components/ErrorAlert';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { getIpInfo } from './services/IpInfoService';
import { SearchHistory } from './components/SearchHistory';

// Main application component
const AppContent = () => {
  const [ipInput, setIpInput] = useState(''); // State for the IP input 
  const { state, dispatch } = useApp(); // State management from context
  const [history, setHistory] = useState(() => { // State for search history, loaded from localStorage
    const saved = localStorage.getItem('ipSearchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Update search history with new IP and result
  const updateHistory = (ip, result) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.ip !== ip);
      const updated = [{ ip, result }, ...filtered].slice(0, 5); // Keep only latest 5 entries
      localStorage.setItem('ipSearchHistory', JSON.stringify(updated));
      return updated;
    });
  };

  // Handle form submission for IP lookup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittedIp = ipInput.trim();
    if (!isValidIP(submittedIp)) {
      dispatch.SET_ERROR(`Invalid IP: ${submittedIp}. Please enter a valid IP address.`);
      return;
    }
    // Check if IP exists in history and use cached result if available - for performance
    const found = history.find((item) => item.ip === submittedIp);
    if (found) {
      dispatch.SET_RESULTS(found.result);
      return;
    }

    dispatch.SET_LOADING(true);
    dispatch.SET_IP_ADDRESS(submittedIp);
    
    try {
      const data = await getIpInfo(submittedIp);
      dispatch.SET_RESULTS(data.data);
      if (data.data) updateHistory(submittedIp, data.data);
    } catch (error) {
      let errorMessage = 'Failed to fetch IP data';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      dispatch.SET_ERROR(errorMessage);
    }
  };

  // When a user selects an IP from history, show its result
  const handleHistorySelect = (item) => {
    setIpInput(item.ip);
    dispatch.SET_RESULTS(item.result);
  };

  // Clear the current results and input - from clear button
  const clearResults = () => {
    dispatch.CLEAR_RESULTS();
    setIpInput('');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Threat Intelligence Dashboard</h1>
      </header>

      <main className="main">
        <SearchForm
          value={ipInput}
          onChange={(e) => setIpInput(e.target.value)}
          onSubmit={handleSubmit}
          loading={state.loading}
        />
        
        <div className="results">
          {state.loading && (
            <LoadingSpinner />
          )}

          {state.error && (
            <ErrorAlert message={state.error} />
          )}

          {state.results && !state.error && (
            <IpReportCard result={state.results} onClear={clearResults} />
          )}

          {!state.loading && !state.error && !state.results && (
            <EmptyState />
          )}

          {history.length > 0 && (
          <SearchHistory history={history} onSelect={handleHistorySelect} />
          )}

        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AppContent />
  );
};

export default App;

