
const reverseGeocode = async (lat, lng) => {
  try {
    const params = new URLSearchParams({
      format: "jsonv2",
      lat: lat.toString(),
      lon: lng.toString(),
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?${params}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Address lookup failed");
    }

    const data = await response.json();

    return data.display_name || "Address unavailable";
  } catch (error) {
    console.error("Geocoding error:", error);

    return "Address unavailable";
  }
};

export default reverseGeocode;
