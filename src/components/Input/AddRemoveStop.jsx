



import React, { useState, createContext, useContext } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import {getRouteTime} from "../../scripts/compareRoutes"
// import GetDirectionMapOver from "../geolocation/GetDirectionsMapOver";

// const ResponsesContext = createContext(null)

const AddRemoveStop = () => {
  const [fields, setFields] = useState([{ label: "Stop", type: "text" }]);
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false)
  
  // const ResponsesContext = createContext(null)
  // const [responses, setResponses] = useState(null)

  //                   const [showButton, setShowButton] = useState(false);
  //                   const [currentIndex, setCurrentIndex] = useState(null);
  //                             const handleMouseEnter = (index) => {
  //                               setCurrentIndex(index);
  //                               setShowButton(true);
  //                             };

  //                             const handleMouseLeave = () => {
  //                               setShowButton(false);
  //                             };


  const navigate = useNavigate()
  const addField = () => {
    setFields([...fields, { label: "Stop", type: "text" }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    console.log('UPDATING STOPS', updatedFields)
    setFields(updatedFields);
  };
// Saves Start and Stop  Variables




const handleFormSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  let startingLocation = start;
  const stops = fields.map((field) => field.value);

  const directionsService = new google.maps.DirectionsService();
  
  // Need to permute times
  // feed permute routes into google maps instead of stretches?
  
  const permutations = permute(stops)
  let fastestTime = Infinity
  let fastestRoute = []

  // The fastest route function works, but had to be wrapped in a promise
new Promise((resolve, reject)=>{
    permutations.forEach(async (perm,index, array) => {

      console.log("Perumutation: "+perm);
      const totalTime = await calculateRouteTime(startingLocation, perm, startingLocation,directionsService)
      console.log("total time: "+totalTime)
        if (totalTime < fastestTime) {
          fastestTime = totalTime
          fastestRoute = perm
          console.log("Fastest Route is "+fastestRoute)
        }

        if(index=array.length-1){
          resolve();
        }
    }
    
    )
  }).then(
    ()=>{
      console.log('fastest overall route is...', fastestRoute)
      sessionStorage.setItem("waypoints",JSON.stringify(fastestRoute));
      navigate('/MapSpaceOld')
    }

  )


};


  return (
    <div style={{borderRadius: '10%'}}>
    <FloatingLabel className="pt-3" controlId="start" label="Starting Point">
      <Form.Control
        className="w-90"
        type="text"
        placeholder="Starting Point"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
    </FloatingLabel>
    {fields.map((field, index) => (
      <div key={index} className="d-flex align-items-center">
        <FloatingLabel controlId={`stop${index}`} label="Add Stop" className="flex-grow-1">
          <Form.Control
            className="w-100"
            type="text"
            placeholder="Add Stop"
            value={field.value || ""}
            onChange={(e) => handleChange(index, e)}
          />
        </FloatingLabel>
        <Button variant="outline-danger" onClick={() => removeField(index)}>
          X
        </Button>
      </div>
    ))}
    <div className="d-flex justify-content-end">
      <Button variant="primary" onClick={addField}>
        +
      </Button>
    </div>
    <div className="pb-3 d-flex justify-content-center">
      <Button variant="success" onClick={handleFormSubmit}>Generate your Route</Button>
    </div>
  </div>
);
};

export default AddRemoveStop;


//MOVE TO OWN JSX ELEMENT
//needs to record time - but should if input aligns. 
                function permute(arr) {
                  const result = [];

                  function permuteHelper(arr, start) {
                      if (start === arr.length - 1) {
                          result.push([...arr]);
                          return;
                      }

                      for (let i = start; i < arr.length; i++) {
                          [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap elements
                          permuteHelper(arr, start + 1);
                          [arr[start], arr[i]] = [arr[i], arr[start]]; // Restore original array
                      }
                  }

                  permuteHelper(arr, 0);
                  console.log('permutations', result)
                  return result;
                }

                // Function to calculate the total time for a route
                async function calculateRouteTime(origin, stops, destination, directionsService) {
                  let totalTime = 0;
                
                  for (let i = 0; i < stops.length; i++) {
                    totalTime += await getRouteTime(origin, stops[i],directionsService);
                    origin = stops[i];
                  }
                
                  totalTime += await getRouteTime(origin, destination,directionsService);
                  return totalTime;
                }
                