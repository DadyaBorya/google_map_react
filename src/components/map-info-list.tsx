import React from 'react';
import MapInfoItem from "./map-info-item";
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";

const MapInfoList = observer(() => {
    const ctx = useMapStore()

    return (
        <div style={{overflowY: "auto", maxHeight: "80vh"}}>
            {ctx.destinationPoints.map((p, index) => (
                <MapInfoItem
                    labels={[String.fromCharCode(65 + index), String.fromCharCode(66 + index)]}
                    distance={p.fromRoute?.distanceString}
                    duration={p.fromRoute?.durationString}
                    to={p.formattedAddress}
                    from={p.fromRoute?.address}
                    key={index + p.formattedAddress}
                />
            ))}

            {ctx.isBackDirection && (
                <MapInfoItem
                    labels={[String.fromCharCode(66 + ctx.destinationPoints.length - 1), String.fromCharCode(65)]}
                    distance={ctx.startPoint.fromRoute?.distanceString}
                    duration={ctx.startPoint.fromRoute?.durationString}
                    to={ctx.startPoint.formattedAddress}
                    from={ctx.destinationPoints[ctx.destinationPoints.length - 1].formattedAddress}
                />
            )}
        </div>
    );
});

export default MapInfoList;
