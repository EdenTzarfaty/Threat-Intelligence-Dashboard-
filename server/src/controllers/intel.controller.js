import { isValidIP } from '../utils/validations.js';
import { getAggregatedIpData } from '../services/ipData.service.js';

// Check Ip Address and return the aggregated data from the API call
export const getIpData = async (req, res, next) => {
  try {
    const { ipAddress } = req.params;

    // Validate IP address is in the correct format
    if (!isValidIP(ipAddress)) {
      return res.status(400).json({ message: 'Invalid IP address format provided.' });
    }

    const aggregatedData = await getAggregatedIpData(ipAddress);
    res.status(200).json(aggregatedData);

  } catch (err) {
    // Handle rate limiting errors specifically
    if (err.response?.status === 429) {
      return res.status(429).json({ 
        message: 'Rate limit reached, try again later.',
        error: 'RATE_LIMIT_EXCEEDED'
      });
    }
    
    // Handle other API errors
    if (err.response?.status >= 400 && err.response?.status < 500) {
      return res.status(502).json({ 
        message: 'External service temporarily unavailable, please try again later.',
        error: 'EXTERNAL_SERVICE_ERROR'
      });
    }
    
    // Handle server errors
    if (err.response?.status >= 500) {
      return res.status(503).json({ 
        message: 'External service is currently down, please try again later.',
        error: 'EXTERNAL_SERVICE_DOWN'
      });
    }
    
    // Generic error handling
    next(err);
  }
};

