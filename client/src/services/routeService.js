
const getRoute = async (pickup, destination) => {
  try {
    // OSRM expects longitude first, then latitude.
    const coordinates = `${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}`;

    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
    );

    if (!response.ok) {
      throw new Error("Route request failed");
    }

    const data = await response.json();

    if (data.code !== "Ok" || !data.routes?.length) {
      throw new Error("No route found");
    }

    const route = data.routes[0];

    return {
      distance: route.distance,
      duration: route.duration,
      coordinates: route.geometry.coordinates,
    };
  } catch (error) {
    console.error("Route calculation error:", error);
    return null;
  }
};

export default getRoute;
