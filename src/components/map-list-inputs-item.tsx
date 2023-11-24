import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";
import {Point} from "../models";
import MapInput from "./map-input";

interface IMapListInputsItem {
    point: Point
    index: number
}

const MapListInputsItem: FC<IMapListInputsItem> = observer(({point, index}) => {
    const ctx = useMapStore()

    const handleOnChange = (address: string) => {
        if (index === 0) {
            ctx.handleChangeStartPointName(address)
        } else {
            ctx.handleChangeDestinationPointName(address, index - 1)
        }
    }

    const handleOnSubmit = (address: string) => {
        if (index === 0) {
            ctx.handleSubmitStartPointName(address)
        } else {
            ctx.handleSubmitDestinationPointName(address, index - 1)
        }
    }

    function handleOnDelete() {
        if (index === 0) {
            ctx.deleteStartPoint()
        } else {
            ctx.deleteDestinationPoint(index - 1)
        }
    }

    return (
        <MapInput
            value={point.address}
            onChange={(address) => handleOnChange(address)}
            onSubmit={(address) => handleOnSubmit(address)}
            onDelete={() => handleOnDelete()}
            placeholder={index === 0 ? "Звідки" : "Куди"}
        />
    );
});

export default MapListInputsItem;
