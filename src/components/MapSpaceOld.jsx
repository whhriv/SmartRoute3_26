// CONNORS CODE FOR INPUTS 3/13

import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import 'react-router-dom'
// import AddRemoveStop from '../AddRemoveStopOutside'
// import { Button } from 'react-bootstrap'

import { stringArraytoWaypoint } from '../scripts/waypointFromString'
// import ErrorBoundary from './ErrorBoundary'

export default function DirectionMapSpace() {

    // let apiKey = process.env.GOOGLE_MAPS_API_KEY1

    // AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'

    return (
      <div style={{height: "100vh", width: "100%"}}>
        <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'
        >
         
          
          {/* <AddRemoveStop /> */}
          <Map  >
             
            <Directions />
           
            </Map>
        </APIProvider>  
      </div>
    )

}

function Directions( {start, stops }){
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes')
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([])
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex]
  // const leg = selected?.legs[0];


  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    let testArray=JSON.parse(sessionStorage.getItem("waypoints"));

    console.log(testArray);
    testArray= stringArraytoWaypoint(testArray);

    console.log(testArray);

    // getRouteTime("82 Eucalyptus Rd, Berkeley, CA 94705","Fisherman's Wharf, San Francisco, CA",directionsService);

    directionsService.route({
      origin: sessionStorage.getItem("startPoint"),
      waypoints: testArray,
      destination:sessionStorage.getItem("startPoint"),
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {
      directionsRenderer.setDirections(res);
      setRoutes(res.routes);
      console.log(routes)

    })
    .catch((error) => {
        console.log("error fetching directions:", error)
    })
  }, [directionsService, directionsRenderer]);

 let stretches = sessionStorage.getItem("waypoints")
 console.log('STRETCHES from MapSpace',stretches)




}
