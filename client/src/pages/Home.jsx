
import { useState } from "react";

import Navbar from "../components/Navbar";
import RideBooking from "../components/RideBooking";
import MapSection from "../components/MapSection";

function Home() {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selectionMode, setSelectionMode] = useState("pickup");

  const handleMapSelect = (coordinates) => {
    if (selectionMode === "pickup") {
      setPickup(coordinates);
    } else {
      setDestination(coordinates);
    }
  };

  const handleLocationFound = (coordinates) => {
    setPickup(coordinates);
    setSelectionMode("destination");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

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
              />
            </div>
          </div>

          <div>
            <MapSection
              pickup={pickup}
              destination={destination}
              onMapSelect={handleMapSelect}
              onLocationFound={handleLocationFound}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;
