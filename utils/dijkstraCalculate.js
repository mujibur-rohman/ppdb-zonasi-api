const dijkstraCalculate = (coord, dataLocation) => {
  let dataDistance = [];
  dataLocation.forEach((location) => {
    const earthRadius = 6371; // Radius Bumi dalam kilometer

    function toRadians(angle) {
      return (angle * Math.PI) / 180;
    }

    const lat1 = toRadians(coord.latitude);
    const lon1 = toRadians(coord.longitude);
    const lat2 = toRadians(location.latitude);
    const lon2 = toRadians(location.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    dataDistance.push(distance);
  });
};

export default dijkstraCalculate;
