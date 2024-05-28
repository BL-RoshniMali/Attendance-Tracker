
let apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
let apiKey = "cf55f4234f214d01a6b4fa2d7bd9a057";

const getUserCurrentAddress = async (latitude, longitude) => {
  // console.log(latitude, longitude);
  let query = `${latitude}, ${longitude}`;
  let apiUrl = `${apiEndPoint}?key=${apiKey}&q=${query}&pretty=1`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data.results[0]);
    return data.results[0].components;
    // const { city, state, postcode, country } = data.results[0].components;
    // fullAddress.textContent = `User full Address: ${data.results[0].formatted}`;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const fetchLocation = async () => {
console.log("Hello", navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
         console.log(`latitude = ${latitude} and longitude = ${longitude}`);
        // latitude = 12.9030736 and longitude = 77.6425133

        return await getUserCurrentAddress(latitude, longitude);
      },
    );
  }
}

module.exports = fetchLocation;