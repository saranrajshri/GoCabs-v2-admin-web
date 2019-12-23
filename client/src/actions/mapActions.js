// axios
import axios from "axios";

// Const
import Const from "../const/const";

// suggestions
export const getPlacesSuggestions = async query => {
  // replace empty space with %20
  query = query.replace(" ", "%20");
  const result = await axios.get(
    `https://places.ls.hereapi.com/places/v1/suggest?at=52.5159%2C13.3777&q=${query}&apiKey=${Const.HERE_MAPS_API_KEY}`
  );

  var suggestions = await result.data.suggestions;
  var data = { status: true, data: suggestions };
  return data;
};

// geocoder
export const geoCoder = async placeName => {
  placeName = placeName.replace(" ", "%20");
  const res = await axios.get(
    `https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=${placeName}&gen=9&apiKey=${Const.HERE_MAPS_API_KEY}`
  );

  var coordinates = await res.data.Response.View[0].Result[0].Location
    .DisplayPosition;
  var result = {
    status: true,
    data: {
      lat: coordinates.Latitude,
      lon: coordinates.Longitude
    }
  };
  return result;
};

// calculate trip details
export const calculateTripDetails = async data => {
  const res = await axios.get(
    `https://fleet.api.here.com/2/calculateroute.json?&waypoint0=geo!${data.fromCoordinates.lat},${data.fromCoordinates.lon}&waypoint1=geo!${data.toCoordinates.lat},${data.toCoordinates.lon}&currency=INR&tollVehicleType=3&mode=fastest;truck;traffic:enabled&rollup=none,country;tollsys&app_id=${Const.HERE_MAPS_APP_ID}&app_code=${Const.HERE_MAPS_APP_CODE}&driver_cost=${data.driverCost}&vechile_cost=${data.vechileCost}`
  );

  var result = {
    summary: res.data.response.route[0].summary,
    cost: res.data.response.route[0].cost
  };
  return result;
};
