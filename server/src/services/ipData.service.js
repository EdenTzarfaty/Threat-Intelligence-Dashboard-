import axios from 'axios';
import dotenv from 'dotenv';
import { getOverallRiskLevel } from '../utils/validations.js';

dotenv.config();

// Aggregated data from the external APIs
export async function getAggregatedIpData(ipAddress) {
  // Get API keys
  const ABUSEIPDB_API_KEY = process.env.ABUSEIPDB_API_KEY;
  const IPQUALITYSCORE_API_KEY = process.env.IPQUALITYSCORE_API_KEY;

  // API calls url
  const abuseIpDbUrl = 'https://api.abuseipdb.com/api/v2/check';
  const ipQualityScoreUrl = `https://ipqualityscore.com/api/json/ip/${IPQUALITYSCORE_API_KEY}/${ipAddress}`;

  if (!ABUSEIPDB_API_KEY || !IPQUALITYSCORE_API_KEY) {
    throw new Error('API keys are not provided on the server.');
  }

  try {
    // Execute API calls in parallel
    const [abuseResponse, ipqsResponse] = await Promise.all([
      // Call AbuseIPDB API
      axios.get(abuseIpDbUrl, {
        headers: {
          'Key': ABUSEIPDB_API_KEY,
          'Accept': 'application/json'
        },
        params: {
          ipAddress: ipAddress,
          maxAgeInDays: 90
        }
      }),
      // Call IPQualityScore API
      axios.get(ipQualityScoreUrl)
    ]);

    // Get the data from the API calls and aggregate the data as needed
    const abuseData = abuseResponse.data.data;
    const ipqsData = ipqsResponse.data;

    // Calculate overall risk level
    const overallRiskLevel = getOverallRiskLevel(abuseData.abuseConfidenceScore, ipqsData.fraud_score, ipqsData.vpn || ipqsData.proxy);

    const aggregatedData = {
      ipAddress: abuseData.ipAddress,
      hostname: ipqsData.host || abuseData.hostnames?.[0] || 'N/A',
      isp: ipqsData.ISP || abuseData.isp || 'N/A',
      country: ipqsData.country_code || abuseData.countryCode || 'N/A',
      abuseScore: abuseData.abuseConfidenceScore,
      recentReports: abuseData.totalReports,
      vpnProxyDetected: ipqsData.vpn || ipqsData.proxy,
      threatScore: ipqsData.fraud_score,
      overallRiskLevel
    };

    return aggregatedData;

  } catch (err) {
    throw err;
  }
}


