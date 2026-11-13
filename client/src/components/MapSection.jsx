
import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

const defaultCenter = [19.0760, 72.8777];

function MapClickHandler({ onMapSelect }) {
  useMapEvents({
    click(event) {
      onMapSelect({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
}

function MapRecenter({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 15);
    }
  }, [location, map]);

  return null;
}

function MapSection({
  pickup,
  destination,
  onMapSelect,
  onLocationFound,
}) {
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        onLocationFound(coordinates);
      },
      (error) => {
        alert("Unable to get your location. Please allow location access.");
        console.error("Location error:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const mapCenter = pickup || defaultCenter;

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={getCurrentLocation}
        className="mb-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        Use my current location
      </button>

      <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler onMapSelect={onMapSelect} />

          <MapRecenter location={pickup} />

          {pickup && (
            <Marker position={[pickup.lat, pickup.lng]}>
              <Popup>Pickup location</Popup>
            </Marker>
          )}

          {destination && (
            <Marker position={[destination.lat, destination.lng]}>
              <Popup>Destination</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Click anywhere on the map to select the active location.
      </p>
    </div>
  );
}

export default MapSection;
