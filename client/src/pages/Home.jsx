
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import RideBooking from "../components/RideBooking";
import MapSection from "../components/MapSection";

import reverseGeocode from "../services/geocoding";
import getRoute from "../services/routeService";
import calculateFare from "../services/fareService";

import vehicleOptions from "../utils/vehicleOptions";

function Home() {
  // Pickup and destination states
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);

  // Controls which location the user is selecting
  const [selectionMode, setSelectionMode] = useState("pickup");

  // Route states
  const [routeData, setRouteData] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);

  // Selected vehicle (RideX Mini is selected by default)
  const [selectedVehicle, setSelectedVehicle] = useState(
    vehicleOptions[0]
  );

  // Handle map location selection
  const handleMapSelect = async (coordinates) => {
    const address = await reverseGeocode(
      coordinates.lat,
      coordinates.lng
    );

    const location = {
      ...coordinates,
      address,
    };

    if (selectionMode === "pickup") {
      setPickup(location);
    } else {
      setDestination(location);
    }
  };

  // Handle current GPS location
  const handleLocationFound = async (coordinates) => {
    const address = await reverseGeocode(
      coordinates.lat,
      coordinates.lng
    );

    setPickup({
      ...coordinates,
      address,
    });

    // Automatically switch to destination selection
    setSelectionMode("destination");
  };

  // Calculate route whenever pickup or destination changes
  useEffect(() => {
    if (!pickup || !destination) {
      setRouteData(null);
      setRouteLoading(false);
      return;
    }

    let cancelled = false;

    const calculateRoute = async () => {
      setRouteLoading(true);
      setRouteData(null);

      const result = await getRoute(pickup, destination);

      if (!cancelled) {
        setRouteData(result);
        setRouteLoading(false);
      }
    };

    calculateRoute();

    return () => {
      cancelled = true;
    };
  }, [pickup, destination]);

  // Calculate fare using the selected vehicle multiplier
  const fareEstimate = calculateFare(
    routeData,
    selectedVehicle.multiplier
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Section - Booking Panel */}
          <div>

            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Your journey,
              <span className="text-green-600"> your way.</span>
            </h1>

            <p className="mt-5 text-lg text-gray-600">
              Reliable rides, comfortable journeys, and seamless booking.
            </p>

            <div className="mt-8">

              <RideBooking
                pickup={pickup}
                destination={destination}
                selectionMode={selectionMode}
                setSelectionMode={setSelectionMode}
                routeData={routeData}
                routeLoading={routeLoading}
                fareEstimate={fareEstimate}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
              />

            </div>

          </div>

          {/* Right Section - Map */}
          <div>

            <MapSection
              pickup={pickup}
              destination={destination}
              onMapSelect={handleMapSelect}
              onLocationFound={handleLocationFound}
              routeData={routeData}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;
