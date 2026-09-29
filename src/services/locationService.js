export const DEFAULT_USER_LOCATION = {
  lat: 17.4325,
  lng: 78.4071,
  city: "Jubilee Hills, Hyderabad",
  formattedAddress: "Road No 36, Jubilee Hills, Hyderabad, Telangana",
  hasPermission: false
};

/**
 * Haversine formula to compute distance between 2 coordinates in kilometers
 */
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return parseFloat(distance.toFixed(1));
};

export const locationService = {
  requestLocation: () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({
          ...DEFAULT_USER_LOCATION,
          hasPermission: true,
          statusMessage: "Geolocation API not supported. Using default city location."
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: "Detected Location",
            formattedAddress: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`,
            hasPermission: true,
            statusMessage: "Location granted successfully."
          });
        },
        (error) => {
          // Fallback if user denies or browser blocks
          resolve({
            ...DEFAULT_USER_LOCATION,
            hasPermission: true,
            statusMessage: "Location permission denied. Using selected default city."
          });
        },
        { timeout: 5000 }
      );
    });
  }
};
