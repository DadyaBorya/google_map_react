import React, {FC} from 'react';
import {InfoWindow} from "@react-google-maps/api";
import {Point} from "../models";

interface IMapMarkerInfoWindow {
    isOpen: boolean,
    handleOnClose: (bool: boolean) => void,
    point: Point
}

function secondsToDhms(seconds: number): string {
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    const mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;

    const daysString = days !== 0 ? `${days} д ` : "";
    const hoursString = hrs !== 0 ? `${hrs} год ` : "";
    const minutesString = mnts !== 0 ? `${mnts} хв ` : "";
    const secondsString = seconds !== 0 ? `${seconds} с` : "";

    if (daysString || hoursString || minutesString) {
        return `${daysString}${hoursString}${minutesString}`;
    }
    return `${daysString}${hoursString}${minutesString}${secondsString}`;

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
                                <div>Прибуття: {point.address}</div>
                                <div className="d-flex flex-row gap-3">
                                    <div>Відстань: {point.fromRoute.distance} км.</div>
                                    <div>Тривалість: {secondsToDhms(point.fromRoute.duration)}</div>
                                </div>
                            </div>
                        )}

                        {point.toRoute && (
                            <div>
                                <div>Відбуття: {point.address}</div>
                                <div>Прибуття: {point.toRoute.address}</div>
                                <div className="d-flex flex-row gap-3">
                                    <div>Відстань: {point.toRoute.distance} км.</div>
                                    <div>Тривалість: {secondsToDhms(point.toRoute.duration)}</div>
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
