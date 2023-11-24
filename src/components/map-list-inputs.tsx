import React from 'react';
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";
import MapListInputsItem from "./map-list-inputs-item";

const MapListInputs = observer(() => {
    const ctx = useMapStore()
    return (
        <>
            <MapListInputsItem point={ctx.startPoint} index={0}/>

            {ctx.destinationPoints.map((p, index) => (
                <MapListInputsItem key={index + 1} point={p} index={index + 1}/>
            ))}
        </>
    );
});

export default MapListInputs;
