
function RideBooking({
  pickup,
  destination,
  selectionMode,
  setSelectionMode,
}) {
  const formatLocation = (location) => {
    if (!location) return "";

    return `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickup || !destination) {
      alert("Please select both pickup and destination on the map.");
      return;
    }

    alert(
      `Pickup: ${formatLocation(pickup)}\nDestination: ${formatLocation(destination)}`
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Book a ride
      </h2>

      <p className="text-gray-500 mb-6">
        Select your locations using the map.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">
            Pickup location
          </label>

          <input
            type="text"
            readOnly
            value={formatLocation(pickup)}
            placeholder="Choose pickup on the map"
            className="w-full border rounded-lg p-3 bg-gray-50"
          />

          <button
            type="button"
            onClick={() => setSelectionMode("pickup")}
            className={`mt-2 text-sm font-medium ${
              selectionMode === "pickup"
                ? "text-green-700"
                : "text-gray-600"
            }`}
          >
            Select pickup on map
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Destination
          </label>

          <input
            type="text"
            readOnly
            value={formatLocation(destination)}
            placeholder="Choose destination on the map"
            className="w-full border rounded-lg p-3 bg-gray-50"
          />

          <button
            type="button"
            onClick={() => setSelectionMode("destination")}
            className={`mt-2 text-sm font-medium ${
              selectionMode === "destination"
                ? "text-green-700"
                : "text-gray-600"
            }`}
          >
            Select destination on map
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Currently selecting:{" "}
          <strong className="text-green-700">
            {selectionMode}
          </strong>
        </p>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
        >
          Find a ride
        </button>
      </form>
    </div>
  );
}

export default RideBooking;
