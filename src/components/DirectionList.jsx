import React from 'react';

function DirectionsList() {
  const routesString = sessionStorage.getItem('directions');
  const routes = JSON.parse(routesString);

  return (
    <div>
      {routes.map((route, routeIndex) => (
        <div key={routeIndex}>
          <h3>Route {routeIndex + 1}</h3>
          {route.legs.map((leg, legIndex) => (
            <div key={legIndex}>
              <h4>Leg {legIndex + 1}</h4>
              <ol>
                {leg.steps.map((step, stepIndex) => (
                  <li key={stepIndex} dangerouslySetInnerHTML={{ __html: step.instructions }} />
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
