import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import { isValidIP } from '../utils/ipValidator';
import * as IpInfoService from '../services/IpInfoService';

jest.mock('../services/IpInfoService');

// wrap App in AppProvider for tests
const renderWithProvider = (ui) => render(
  <AppProvider>{ui}</AppProvider>
);

describe('Threat Intelligence Dashboard', () => {
  test('renders dashboard title', () => {
    renderWithProvider(<App />);
    expect(screen.getByRole('heading', { name: /Threat Intelligence Dashboard/i })).toBeInTheDocument();
  });
});

describe('isValidIP', () => {
  test('returns true for valid IPv4', () => {
    expect(isValidIP('8.8.8.8')).toBe(true);
  });

  test('returns false for invalid IP', () => {
    expect(isValidIP('12223.1222.25555.10')).toBe(false);
  });
});

describe('App full flow', () => {
  test('submits valid IP and displays aggregated response data', async () => {
    // Mock backend response to match aggregatedData structure
    IpInfoService.getIpInfo.mockResolvedValue({
      data: {
        ipAddress: '8.8.8.8',
        hostname: 'mock-host',
        isp: 'mock-ISP',
        country: 'US',
        abuseScore: 10,
        recentReports: 2,
        vpnProxyDetected: false,
        threatScore: 5,
        overallRiskLevel: 'Low'
      },
      error: null
    });

    renderWithProvider(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /check/i });

    // Enter valid IP and submit
    await userEvent.type(input, '8.8.8.8');
    await userEvent.click(button);

    // Check for all expected fields in the UI using className matcher
    expect(await screen.findByText((content, element) => element.className === 'value' && content === '8.8.8.8')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.className === 'value' && content === 'mock-host')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.className === 'value' && content === 'mock-ISP')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.className === 'value' && content === 'US')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.className === 'value' && content === '10')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.className === 'value' && content === '2')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.className === 'value' && content === 'No')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.className === 'value' && content === '5')).toBeInTheDocument();
    expect(screen.getByText(/Low Risk/i)).toBeInTheDocument();
  });
});
