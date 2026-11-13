const FARE_CONFIG = {
  baseFare: 30,
  perKm: 12,
  perMinute: 1,
  minimumFare: 50,
};

const calculateFare = (routeData, vehicleMultiplier = 1) => {
  if (!routeData) {
    return null;
  }

  const distanceKm = routeData.distance / 1000;
  const durationMinutes = routeData.duration / 60;

  const distanceCharge = distanceKm * FARE_CONFIG.perKm;
  const timeCharge = durationMinutes * FARE_CONFIG.perMinute;

  const subtotal =
    FARE_CONFIG.baseFare +
    distanceCharge +
    timeCharge;

  // Apply the selected vehicle's multiplier
  const adjustedFare = subtotal * vehicleMultiplier;

  const totalFare = Math.max(
    FARE_CONFIG.minimumFare,
    Math.ceil(adjustedFare)
  );

  return {
    baseFare: FARE_CONFIG.baseFare,
    distanceCharge: Math.ceil(distanceCharge),
    timeCharge: Math.ceil(timeCharge),
    distanceKm: Number(distanceKm.toFixed(2)),
    durationMinutes: Math.ceil(durationMinutes),
    vehicleMultiplier,
    totalFare,
    currency: "INR",
  };
};

export default calculateFare;