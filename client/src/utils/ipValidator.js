import { isIPv6, isIPv4 } from 'is-ip';

// Validate IP address is in the correct format
export const isValidIP = (ip) => {
  if (!ip || typeof ip !== 'string') {
    return false;
  }
  return isIPv6(ip) || isIPv4(ip);
};


