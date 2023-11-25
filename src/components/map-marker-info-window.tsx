import React, {FC} from 'react';
import {InfoWindow} from "@react-google-maps/api";
import {Point} from "../models";

interface IMapMarkerInfoWindow {
    isOpen: boolean,
    handleOnClose: (bool: boolean) => void,
    point: Point
}

const MapMarkerInfoWindow: FC<IMapMarkerInfoWindow> = ({isOpen, handleOnClose, point}) => {
    return (
        <>
            {isOpen && (
                <InfoWindow
                    position={point.location}
                    onCloseClick={() => handleOnClose(false)}
                >
                    <div className="d-flex flex-column gap-2">
                        {point.fromRoute && (
                            <div>
                                <div>Відбуття: {point.fromRoute.address}</div>
                                <div>Прибуття: {point.formattedAddress}</div>
                                <div className="d-flex flex-row gap-3">
                                    <div>Відстань: {point.fromRoute.distanceString}</div>
                                    <div>Тривалість: {point.fromRoute.durationString}</div>
                                </div>
                            </div>
                        )}

                        {point.toRoute && (
                            <div>
                                <div>Відбуття: {point.formattedAddress}</div>
                                <div>Прибуття: {point.toRoute.address}</div>
                                <div className="d-flex flex-row gap-3">
                                    <div>Відстань: {point.toRoute.distanceString}</div>
                                    <div>Тривалість: {point.toRoute.durationString}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </InfoWindow>
            )}
        </>
    );
};

export default MapMarkerInfoWindow;
