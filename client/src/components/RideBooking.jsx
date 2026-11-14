
import { Car, CarFront, Truck, Check } from "lucide-react";

import vehicleOptions from "../utils/vehicleOptions";

function RideBooking({
  pickup,
  destination,
  selectionMode,
  setSelectionMode,
  routeData,
  routeLoading,
  fareEstimate,
  selectedVehicle,
  setSelectedVehicle,
  onFindRide,
  bookingConfirmed,
}) {
  // Format location
  const formatLocation = (location) => {
    if (!location) return "";

    return (
      location.address ||
      `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
    );
  };

  // Format distance
  const formatDistance = (meters) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`;
    }

    return `${Math.round(meters)} m`;
  };

  // Format duration
  const formatDuration = (seconds) => {
    const minutes = Math.ceil(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return remainingMinutes
      ? `${hours} hr ${remainingMinutes} min`
      : `${hours} hr`;
  };

  // Vehicle icons
  const vehicleIcons = {
    mini: Car,
    sedan: CarFront,
    suv: Truck,
  };

  // Handle Find a ride
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickup || !destination) {
      alert("Please select both pickup and destination.");
      return;
    }

    if (routeLoading || !routeData || !fareEstimate) {
      alert("Please wait for route and fare calculation.");
      return;
    }

    if (!selectedVehicle) {
      alert("Please select a vehicle.");
      return;
    }

    if (typeof onFindRide !== "function") {
      alert("Booking confirmation is not configured.");
      return;
    }

    onFindRide();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md">

      {/* Booking heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Book a ride
      </h2>

      <p className="text-gray-500 mb-6">
        Select your pickup and destination.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Pickup location */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Pickup location
          </label>

          <input
            type="text"
            readOnly
            value={formatLocation(pickup)}
            placeholder="Choose pickup on the map"
            className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 text-sm"
          />

          <button
            type="button"
            onClick={() => setSelectionMode("pickup")}
            className={`mt-2 text-sm font-medium ${
              selectionMode === "pickup"
                ? "text-green-700"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Select pickup on map
          </button>
        </div>

        {/* Destination location */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Destination
          </label>

          <input
            type="text"
            readOnly
            value={formatLocation(destination)}
            placeholder="Choose destination on the map"
            className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 text-sm"
          />

          <button
            type="button"
            onClick={() => setSelectionMode("destination")}
            className={`mt-2 text-sm font-medium ${
              selectionMode === "destination"
                ? "text-green-700"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Select destination on map
          </button>
        </div>

        {/* Current selection mode */}
        <p className="text-sm text-gray-500">
          Currently selecting:{" "}
          <strong className="text-green-700 capitalize">
            {selectionMode}
          </strong>
        </p>

        {/* Route loading */}
        {routeLoading && (
          <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm">
            Calculating your route...
          </div>
        )}

        {/* Route details */}
        {routeData && !routeLoading && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 space-y-3">

            <h3 className="font-semibold text-gray-900">
              Your route details
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Distance</span>

              <strong>
                {formatDistance(routeData.distance)}
              </strong>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Estimated duration
              </span>

              <strong>
                {formatDuration(routeData.duration)}
              </strong>
            </div>

          </div>
        )}

        {/* Vehicle selection */}
        {routeData && !routeLoading && (
          <div>

            <h3 className="font-semibold text-gray-900 mb-3">
              Choose your ride
            </h3>

            <div className="space-y-3">

              {vehicleOptions.map((vehicle) => {
                const Icon = vehicleIcons[vehicle.id];

                const isSelected =
                  selectedVehicle?.id === vehicle.id;

                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => setSelectedVehicle(vehicle)}
                    aria-pressed={isSelected}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >

                    {/* Vehicle icon */}
                    {Icon && (
                      <Icon
                        size={30}
                        className="text-gray-700 shrink-0"
                      />
                    )}

                    {/* Vehicle information */}
                    <div className="flex-1 min-w-0">

                      <p className="font-semibold text-gray-900">
                        {vehicle.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {vehicle.description} · {vehicle.capacity} seats
                      </p>

                    </div>

                    {/* Multiplier and selected indicator */}
                    <div className="text-right shrink-0">

                      <span className="text-xs text-gray-500">
                        {vehicle.multiplier}×
                      </span>

                      {isSelected && (
                        <Check
                          size={20}
                          className="text-green-600 ml-auto mt-1"
                        />
                      )}

                    </div>

                  </button>
                );
              })}

            </div>
          </div>
        )}

        {/* Fare breakdown */}
        {fareEstimate && routeData && selectedVehicle && !routeLoading && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">

            <h3 className="font-semibold text-gray-900">
              Fare breakdown
            </h3>

            <p className="text-sm text-green-700 font-medium">
              {selectedVehicle.name} · {selectedVehicle.multiplier}× pricing
            </p>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base fare</span>
              <span>₹{fareEstimate.baseFare}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Distance charge</span>
              <span>₹{fareEstimate.distanceCharge}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time charge</span>
              <span>₹{fareEstimate.timeCharge}</span>
            </div>

            <div className="border-t pt-3 flex justify-between items-center">

              <span className="font-bold text-gray-900">
                Estimated total
              </span>

              <span className="text-2xl font-bold text-green-600">
                ₹{fareEstimate.totalFare}
              </span>

            </div>

            <p className="text-xs text-gray-500">
              This is a prototype fare estimate. Final pricing may vary
              depending on actual ride conditions.
            </p>

          </div>
        )}

        {/* Find a ride button */}
        <button
          type="submit"
          disabled={
            !pickup ||
            !destination ||
            !routeData ||
            !fareEstimate ||
            !selectedVehicle ||
            routeLoading ||
            bookingConfirmed
          }
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Find a ride
        </button>

      </form>
    </div>
  );
}

export default RideBooking;
