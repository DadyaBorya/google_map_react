import React, {FC, useState} from 'react';
import {Autocomplete} from "@react-google-maps/api";
import {observer} from "mobx-react-lite";
import {ArrowsMove} from "react-bootstrap-icons";

interface IMapInput {
    value: string,
    onChange: (value: string) => void,
    onSubmit: (address: string) => void,
    onDelete: () => void,
    placeholder: string
}

const MapInput: FC<IMapInput> = observer(({value, onChange, onSubmit, onDelete, placeholder}) => {
    const [searchResult, setSearchResult] = useState<google.maps.places.Autocomplete | null>(null)

    const handleOnLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        setSearchResult(autocomplete)
    }

    const handleOnPlaceChangedAutocomplete = () => {
        if (searchResult) {
            let address = searchResult.getPlace().formatted_address;
            if (address) {
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
               <div
                   className="d-flex flex-row py-2 gap-2 justify-content-center align-items-center position-relative"
               >
                   <div
                       style={{cursor: "grab"}}
                   >
                       <ArrowsMove size={24}/>
                   </div>
                   <input
                       value={value}
                       onChange={(e) => onChange(e.target.value)}
                       type="text"
                       className="w-100 py-2 ps-2 pe-5 rounded-2 border-0"
                       placeholder={placeholder}
                   />
                   <div
                        onClick={() => onDelete()}
                       className="position-absolute end-0 pe-3" style={{cursor: "pointer"}}
                   >
                       X
                   </div>
               </div>
           </Autocomplete>
    );
});

export default MapInput;
