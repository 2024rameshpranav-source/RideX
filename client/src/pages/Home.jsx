
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import RideBooking from "../components/RideBooking";
import MapSection from "../components/MapSection";
import RideConfirmation from "../components/RideConfirmation";

import reverseGeocode from "../services/geocoding";
import getRoute from "../services/routeService";
import calculateFare from "../services/fareService";

import vehicleOptions from "../utils/vehicleOptions";

function Home() {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);

  const [selectionMode, setSelectionMode] = useState("pickup");

  const [routeData, setRouteData] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(
    vehicleOptions[0]
  );

  // Ride confirmation states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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

    setBookingConfirmed(false);
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

    setSelectionMode("destination");
    setBookingConfirmed(false);
  };

  // Calculate route whenever locations change
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

  // Calculate fare for selected vehicle
  const fareEstimate = calculateFare(
    routeData,
    selectedVehicle.multiplier
  );

  // Open confirmation window
  const handleFindRide = () => {
    if (!pickup || !destination || !routeData || !fareEstimate) {
      alert("Please select your locations and wait for route calculation.");
      return;
    }

    setBookingConfirmed(false);
    setShowConfirmation(true);
  };

  // Confirm booking
  const handleConfirmBooking = () => {
    setShowConfirmation(false);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Section */}
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
                onFindRide={handleFindRide}
                bookingConfirmed={bookingConfirmed}
              />

            </div>

          </div>

          {/* Right Section */}
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

      {/* Ride confirmation modal */}
      {showConfirmation && (
        <RideConfirmation
          pickup={pickup}
          destination={destination}
          selectedVehicle={selectedVehicle}
          routeData={routeData}
          fareEstimate={fareEstimate}
          onConfirm={handleConfirmBooking}
          onClose={() => setShowConfirmation(false)}
        />
      )}

      {/* Booking success message */}
      {bookingConfirmed && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-5 rounded-xl shadow-xl max-w-sm">
          <h3 className="font-bold text-lg">
            Ride confirmed!
          </h3>

          <p className="text-sm mt-1">
            Your RideX booking has been confirmed successfully.
          </p>

          <button
            onClick={() => setBookingConfirmed(false)}
            className="mt-3 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}

    </div>
  );
}

export default Home;
