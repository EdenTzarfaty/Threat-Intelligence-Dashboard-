import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';

test('CLEAR_RESULTS resets all state fields', () => {
  const { result } = renderHook(() => useApp(), { wrapper: AppProvider });
  act(() => {
    result.current.dispatch.SET_LOADING(true);
    result.current.dispatch.SET_ERROR('error');
    result.current.dispatch.SET_RESULTS({ ip: '1.2.3.4' });
  });
  act(() => {
    result.current.dispatch.CLEAR_RESULTS();
  });
  expect(result.current.state.loading).toBe(false);
  expect(result.current.state.error).toBeNull();
  expect(result.current.state.results).toBeNull();
});

test('SET_RESULTS overwrites previous results', () => {
  const { result } = renderHook(() => useApp(), { wrapper: AppProvider });
  act(() => {
    result.current.dispatch.SET_RESULTS({ ip: '1.2.3.4' });
    result.current.dispatch.SET_RESULTS({ ip: '5.6.7.8' });
  });
  expect(result.current.state.results).toEqual({ ip: '5.6.7.8' });
});

test('SET_ERROR clears previous error and sets new one', () => {
  const { result } = renderHook(() => useApp(), { wrapper: AppProvider });
  act(() => {
    result.current.dispatch.SET_ERROR('First error');
    result.current.dispatch.SET_ERROR('Second error');
  });
  expect(result.current.state.error).toBe('Second error');
});


