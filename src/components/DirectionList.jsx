import React from 'react';
import './main.css'
function DirectionsList() {
  const routesString = sessionStorage.getItem('directions');
  const routes = JSON.parse(routesString);

  return (
    <div className="ms-3">
      {routes.map((route, routeIndex) => (
        <div key={routeIndex}>
          <h3>Your SmartRoute {routeIndex + 1}</h3>
          {route.legs.map((leg, legIndex) => (
            <div className="txtclr py-4 my-2" key={legIndex}>
              <h4>Stretch {legIndex + 1}</h4>
              <ol>
                {leg.steps.map((step, stepIndex) => (
                  <li className="py-3" key={stepIndex} dangerouslySetInnerHTML={{ __html: step.instructions }} />
                ))}
              </ol>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DirectionsList;
