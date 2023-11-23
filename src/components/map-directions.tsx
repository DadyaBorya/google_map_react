import React from 'react';
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";
import {DirectionsRenderer} from "@react-google-maps/api";

const MapDirections = observer(() => {
    const ctx = useMapStore()
    return (
      <>
          {ctx.directions && (
              <DirectionsRenderer
                directions={ctx.directions}
                options={{
                    suppressMarkers: true,
                }}
              />
          )}
      </>
    );
});

export default MapDirections;
