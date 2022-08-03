export default {
    Authorize_url: "https://test.api.amadeus.com/v1/security/oauth2/token",
    Flight_Offers: "https://test.api.amadeus.com/v2/shopping/flight-offers",  // Example params::  ?originLocationCode=MAD&destinationLocationCode=PAR&departureDate=2022-08-01&adults=2
    Get_IataCode: "https://test.api.amadeus.com/v1/reference-data/locations", // Example params::  ?subType=AIRPORT,CITY&keyword=madrid
    Get_hotels_from_city:'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city' // Example params::  ?cityCode=PAR&radius=1

}