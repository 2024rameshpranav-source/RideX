
import { MapPin, Car, Clock, IndianRupee, X } from "lucide-react";

function RideConfirmation({
  pickup,
  destination,
  selectedVehicle,
  routeData,
  fareEstimate,
  onConfirm,
  onClose,
}) {
  const formatDuration = (seconds) => {
    const minutes = Math.ceil(seconds / 60);

    if (minutes < 60) {
      return `${minutes} minutes`;
    }

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    return remaining
      ? `${hours} hr ${remaining} min`
      : `${hours} hr`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-900"
          aria-label="Close confirmation"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900">
          Confirm your ride
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Review your trip details before booking.
        </p>

        {/* Pickup and destination */}
        <div className="mt-6 space-y-4">

          <div className="flex gap-3 items-start">
            <MapPin className="text-green-600 mt-1" size={21} />

            <div>
              <p className="text-xs text-gray-500">Pickup location</p>
              <p className="font-medium text-gray-900">
                {pickup.address || "Selected pickup"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <MapPin className="text-red-500 mt-1" size={21} />

            <div>
              <p className="text-xs text-gray-500">Destination</p>
              <p className="font-medium text-gray-900">
                {destination.address || "Selected destination"}
              </p>
            </div>
          </div>

        </div>

        {/* Selected vehicle */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 flex items-center gap-4">

          <Car size={38} className="text-gray-700" />

          <div className="flex-1">
            <p className="font-semibold text-gray-900">
              {selectedVehicle.name}
            </p>

            <p className="text-sm text-gray-500">
              {selectedVehicle.capacity} seats
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Estimated fare</p>

            <p className="text-xl font-bold text-green-600">
              ₹{fareEstimate.totalFare}
            </p>
          </div>

        </div>

        {/* Trip information */}
        <div className="mt-4 flex justify-between border-t border-b py-4">

          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-500" />

            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-medium">
                {formatDuration(routeData.duration)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IndianRupee size={18} className="text-gray-500" />

            <div>
              <p className="text-xs text-gray-500">Distance</p>
              <p className="font-medium">
                {(routeData.distance / 1000).toFixed(2)} km
              </p>
            </div>
          </div>

        </div>

        <p className="text-xs text-gray-500 mt-4">
          This is an estimated fare. The final fare may vary.
        </p>

        {/* Confirmation buttons */}
        <div className="mt-6 space-y-3">

          <button
            onClick={onConfirm}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Confirm Booking · ₹{fareEstimate.totalFare}
          </button>

          <button
            onClick={onClose}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition"
          >
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
}

export default RideConfirmation;
