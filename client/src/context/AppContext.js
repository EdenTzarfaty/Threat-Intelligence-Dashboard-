import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

// AppProvider for the app
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    results: null,
    ipAddress: '',
  });

  const dispatch = {
    SET_LOADING: (value) => setState((s) => ({ ...s, loading: value })),
    SET_IP_ADDRESS: (value) => setState((s) => ({ ...s, ipAddress: value })),
    SET_RESULTS: (data) => setState((s) => ({ ...s, results: data, loading: false, error: null })),
    SET_ERROR: (message) => setState((s) => ({ ...s, error: message, loading: false })),
    CLEAR_RESULTS: () => setState((s) => ({ ...s, results: null, error: null, loading: false })),
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp have to be used within AppProvider!');
  return ctx;
};


