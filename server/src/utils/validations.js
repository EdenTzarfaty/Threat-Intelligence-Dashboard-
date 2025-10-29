import net from 'net';

// Validate IP address is in the correct format
export function isValidIP(ip) {
    if (!ip || typeof(ip) !== 'string') {
        return false;
    }
    return net.isIP(ip.trim()) === 4 || net.isIP(ip.trim()) === 6;
}

// Calculate overall risk level
export function getOverallRiskLevel(abuseScore, threatScore, vpnProxyDetected) {
    let score = abuseScore*0.4 + threatScore*0.4 + (vpnProxyDetected ? 20 : 0);
    if (score > 70) {
        return 'High';
    } else if (abuseScore > 30) {
        return 'Medium';
    }
    return 'Low';
}
