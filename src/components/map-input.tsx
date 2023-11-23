import React, {FC, useState} from 'react';
import {Autocomplete} from "@react-google-maps/api";

interface IMapInput {
    value: string,
    onChange: (value: string) => void,
    onSubmit: (address: string) => void
}

const MapInput:FC<IMapInput> = ({value, onChange, onSubmit}) => {
    const [searchResult, setSearchResult] = useState<google.maps.places.Autocomplete | null>(null)

    const handleOnLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        setSearchResult(autocomplete)
    }

    const handleOnPlaceChangedAutocomplete = () => {
       if(searchResult) {
           let address = searchResult.getPlace().formatted_address;
           if(address) {
               onSubmit(address)
           } else {
               console.log("Can't get address from autocomplete")
           }
       }
    }

    return (
        <Autocomplete
            onLoad={handleOnLoadAutocomplete}
            onPlaceChanged={handleOnPlaceChangedAutocomplete}
        >
            <div className="d-flex flex-row py-2 gap-2 justify-content-center align-items-center">
                <div>::</div>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    className="w-100"
                    placeholder="Звідки/Куди"
                />
                <div>X</div>
            </div>
        </Autocomplete>
    );
};

export default MapInput;
