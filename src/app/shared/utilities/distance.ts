import stops from '../data/stopsLatLon'
import { NearbyStop } from '../types/listing';

//Source: https://stackoverflow.com/q/18883601
function getDistanceFromLatLonInKm(lat1: number,lon1: number,lat2: number,lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

function deg2rad(deg: number): number {
    return deg * (Math.PI/180)
}

function rad2deg(rad: number): number {
    return rad * 180 / Math.PI;
}

//Source: https://stackoverflow.com/a/52079217
function bearing(startLat: number, startLng: number, destLat: number, destLng: number): number {
  startLat = deg2rad(startLat);
  startLng = deg2rad(startLng);
  destLat = deg2rad(destLat);
  destLng = deg2rad(destLng);

  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  const brng = Math.atan2(y, x);
  const brngDegrees = rad2deg(brng);
  return (brngDegrees + 360) % 360;
}

type Stop = {
  stop_suburb: string;
  stop_name: string;
  stop_latitude: number;
  stop_longitude: number;
}

function findClosestStops(lat: number, lon: number): NearbyStop[] {
  let nearbyStops: Stop[] = [];
  const offset: number = 0.02;
  for (const stop of stops) {
    const lonDiff = stop.stop_longitude - lon;
    const latDiff = stop.stop_latitude - lat;

    if (lonDiff > -offset && lonDiff < offset
      && latDiff > -offset && latDiff < offset) {
      nearbyStops.push(stop);
    }
  }

  const results = nearbyStops.map(x => {
      return {
        stop_name: x.stop_name,
        distance: getDistanceFromLatLonInKm(lat, lon, x.stop_latitude, x.stop_longitude),
        latitude: x.stop_latitude,
        longitude: x.stop_longitude,
        bearing: Math.round(bearing(lat, lon, x.stop_latitude, x.stop_longitude))
      }
    })
    .sort((a, b) => a.distance - b.distance);

  return results;
}

export default findClosestStops;