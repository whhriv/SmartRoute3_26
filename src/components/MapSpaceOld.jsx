// CONNORS CODE FOR INPUTS 3/13

import { useState, useEffect } from 'react'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import 'react-router-dom'
// import ControlPanel from './control/ControlPanel'
// import DirectionsList from './DirectionList'
// import AddRemoveStop from '../AddRemoveStopOutside'
// import { Button } from 'react-bootstrap'
// import { NavBar } from '../components/navbar'


import { stringArraytoWaypoint } from '../scripts/waypointFromString'
// import ErrorBoundary from './ErrorBoundary'

export default function DirectionMapSpace( {routes} ) {

    // let apiKey = process.env.GOOGLE_MAPS_API_KEY1

    // AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'

    return (
      <div style={{height: "100vh", width: "100%"}}>
        <APIProvider apiKey='AIzaSyAR-r8GJmwcm-9s2gqKkKHa3K4Km145a7Q'
        >
         
         {/* <DirectionsList routes={routes} /> */}
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
  const [steps, setSteps] = useState()

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
      // origin: 'san diego, ca',
      waypoints: testArray,
      destination:sessionStorage.getItem("startPoint"),
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    })
    .then((res) => {
      directionsRenderer.setDirections(res);
      console.log('RESULTS:', res);
      const routes = res.routes
      sessionStorage.setItem('directions', JSON.stringify(routes))
    
    
      res.routes.forEach((route, routeIndex) => {
        sessionStorage.setItem(`route${routeIndex}`, JSON.stringify(route));
        console.log(`Route ${routeIndex + 1}:`, route);
      
  
        route.legs.forEach((leg, legIndex) => {
          console.log(`  Leg ${legIndex + 1}:`);
          
      
          leg.steps.forEach((step, stepIndex) => {
            console.log(`    Step ${stepIndex + 1}:`, step);
          });
        });
      });
    
      setRoutes(res.routes);
    })
    .catch((error) => {
        console.log("error fetching directions:", error)
    })
  }, [directionsService, directionsRenderer]);

 let stretches = sessionStorage.getItem("waypoints")
 console.log('STRETCHES from MapSpace',stretches)




}
