import React, {FC} from 'react';
import {Map} from "react-bootstrap-icons";

interface IMapInfoItem {
    labels: string[]
    to?: string,
    from?: string,
    duration?: string,
    distance?: string
}

const MapInfoItem:FC<IMapInfoItem> = ({labels, distance, duration, to, from}) => {
    return (
        <div className="d-flex w-100 flex-column gap-1 mb-3 pb-3 border-bottom border-secondary">
            <div className="d-flex gap-1 align-items-center">
                <Map size={32}/>
                <div className="h4 mb-0">Маршрут {labels[0]} - {labels[1]}</div>
            </div>
            <div className="fs-5"><strong>Відбуття:</strong> {from}</div>
            <div className="fs-5"><strong>Прибуття:</strong> {to}</div>
            <div className="d-flex gap-5">
                <div><strong>Відстань:</strong> {distance}</div>
                <div><strong>Час: ~</strong>{duration}</div>
            </div>
        </div>
    );
};

export default MapInfoItem;
