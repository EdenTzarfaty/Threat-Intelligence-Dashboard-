# Threat Intelligence Dashboard Assignment

A web application that allows users to input an IP address and retrieve threat intelligence data about it.
Shows combines data from multiple security APIs to provide comprehensive IP reports.

## Features

- IP address validation
- Threat intelligence data from AbuseIPDB and IPQualityScore
- Risk level calculation (Low/Medium/High)
- Search history for quick access and avoiding redundant calls
- Support for IPv4 and IPv6 addresses
- Rate Limit Handling

**Frontend:** React, Context API, Axios, Jest  
**Backend:** Node.js, Express, Jest  
**APIs:** AbuseIPDB, IPQualityScore

## Setup

### Requirements
- Node.js
- API keys from AbuseIPDB and IPQualityScore

### Installation

1. Clone the repository
2. Install dependencies in diffrent terminal:
   ```bash
   1. cd server; npm install
   2. cd client; npm install
   ```

## API Keys

You need API keys from:
- AbuseIPDB(Free tier 1,000 requests/day): https://www.abuseipdb.com/
- IPQualityScore(Free tier 35 requests/day): https://www.ipqualityscore.com/

Create a `.env` file in the server directory:
```env
PORT=3001
ABUSEIPDB_API_KEY=<your_key_here>
IPQUALITYSCORE_API_KEY=<your_key_here>
```

## Running the App

Start the server in the first terminal:
```bash
cd server
npm run dev
```

Start the client (in another terminal):
```bash
cd client
npm start
```

## API

**GET** `/api/intel/<ip>`

Response:
```json
{
  "ipAddress": "8.8.8.8",
  "hostname": "dns.google",
  "isp": "Google LLC",
  "country": "US",
  "abuseScore": 0,
  "recentReports": 0,
  "vpnProxyDetected": false,
  "threatScore": 0,
  "overallRiskLevel": "Low"
}
```

## Project Structure

```
Project/
├── client/          # React frontend
├── server/          # Node.js backend
└── README.md
```

## Notes

- Make sure API keys are set in server/.env file
- Check that server runs on port 3001
- Check that client runs on port 3000
- Verify all dependencies are installed
- All API calls are made in parallel for better performance
- Risk calculation: abuseScore*0.4 + threatScore*0.4 + vpnProxy*20

## Testing

Run backend tests:
```bash
cd server
npm test
```

Run frontend tests:
```bash
cd client
npm test
```
