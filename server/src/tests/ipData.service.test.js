import { jest } from '@jest/globals';
import { getOverallRiskLevel } from '../utils/validations.js';

await jest.unstable_mockModule('axios', () => ({
  default: { get: jest.fn() }
}));

const axios = (await import('axios')).default;
const { getAggregatedIpData } = await import('../services/ipData.service.js');

describe('getAggregatedIpData', () => {
  test('returns aggregated data with correct structure', async () => {
    axios.get
      .mockResolvedValueOnce({ data: { data: {
        ipAddress: '1.2.3.4',
        hostnames: ['host1'],
        isp: 'ISP1',
        countryCode: 'US',
        abuseConfidenceScore: 42,
        totalReports: 3
      }}})
      .mockResolvedValueOnce({ data: {
        host: 'host2',
        ISP: 'ISP2',
        country_code: 'US',
        vpn: false,
        proxy: false,
        fraud_score: 7
      }});

    process.env.ABUSEIPDB_API_KEY = 'test';
    process.env.IPQUALITYSCORE_API_KEY = 'test';

    const result = await getAggregatedIpData('1.2.3.4');
    expect(result).toEqual({
      ipAddress: '1.2.3.4',
      hostname: 'host2',
      isp: 'ISP2',
      country: 'US',
      abuseScore: 42,
      recentReports: 3,
      vpnProxyDetected: false,
      threatScore: 7,
      overallRiskLevel: getOverallRiskLevel(42, 7, false)
    });
  });

  test('throws error if API keys are missing', async () => {
    process.env.ABUSEIPDB_API_KEY = '';
    process.env.IPQUALITYSCORE_API_KEY = '';
    await expect(getAggregatedIpData('1.2.3.4')).rejects.toThrow('API keys are not provided on the server.');
  });
});
