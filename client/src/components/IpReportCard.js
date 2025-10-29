// Risk level
const riskLevelInfo = {
  Low:   { color: '#4caf50', label: 'Low Risk' },
  Medium:{ color: '#ff9800', label: 'Medium Risk' },
  High:  { color: '#f44336', label: 'High Risk' },
};

// Displays the main report card for a given IP lookup result
export const IpReportCard = ({ result, onClear }) => {
  if (!result) return null;

  const riskLevel = riskLevelInfo[result.overallRiskLevel] || riskLevelInfo.Low;

  return (
    <div className="results-content">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Display the overall risk level*/}
          <span style={{ fontWeight: 600, fontSize: 18 }}>
            Risk level: 
            <span style={{ color: riskLevel.color, marginLeft: '5px' }}>
              {riskLevel.label}
            </span>
          </span>
        </div>
      </div>

      <table className="data-table">
        <tbody>
          <tr>
            <td className="label">IP Address:</td>
            <td className="value">{result.ipAddress}</td>
          </tr>
          <tr>
            <td className="label">Hostname:</td>
            <td className="value">{result.hostname || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">ISP:</td>
            <td className="value">{result.isp || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Country:</td>
            <td className="value">{result.country || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Abuse Score:</td>
            <td className="value">{result.abuseScore !== null && result.abuseScore !== undefined ? result.abuseScore : 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Recent Reports:</td>
            <td className="value">{result.recentReports !== null && result.recentReports !== undefined ? result.recentReports : 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">VPN/Proxy Detected:</td>
            <td className="value">{result.vpnProxyDetected ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td className="label">Threat Score:</td>
            <td className="value">{result.threatScore !== null && result.threatScore !== undefined ? result.threatScore : 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      {/* Button to clear the current result */}
      <button onClick={onClear} className="clear-btn">Clear</button>
    </div>
  );
};

