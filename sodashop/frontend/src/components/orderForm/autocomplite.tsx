import { FC, ChangeEvent, useCallback, useEffect, Dispatch } from "react"
import styles from "./orderForm.module.scss";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import {getGeocode, getLatLng } from "use-places-autocomplete";
import { TextField } from "@material-ui/core";
import { SetValue } from "use-places-autocomplete";


const libraries: Libraries = ["places"];

export type TypeCords = {
    lat: number,
    lng: number
}

type TypeAutocomplite = {
    value: string,
    setValue: SetValue,
    errorAdress: string,
    ready: boolean,
    clearSuggestions: () => void,
    init: () => void,
    data: any[],
    setCenter: Dispatch<TypeCords>,
    center: TypeCords,
}

export const Autocomplite:FC<TypeAutocomplite> = ({value, setValue, errorAdress, ready, clearSuggestions, init, data, setCenter, center}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDOd9Bx2sWmTLhVjR07Df89bmk4W2K-x5M",
        libraries
    })
  
    const onPlaceSelect = useCallback(
        (cords: TypeCords) => {
            setCenter(cords);
        },
        []
    );

    type TypeHandle = {
      description: string
    }
    
    const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li key={place_id} className={styles.li} onClick={handleSelect(suggestion)}>
                <svg
                  className={styles.svg}
                  viewBox="0 0 22 21"
                  fill="none">
                  <path
                    d="M2.15855 10.7706C1.25539 10.5015 1.26005 9.37172 1.93487 9.05089L18.9069 0.981837C19.6873 0.610843 20.5521 1.47573 20.1811 2.25606L12.1121 19.2281C11.7912 19.9029 10.6615 19.9076 10.3924 19.0044L9.0223 14.406C8.6989 13.3205 7.84246 12.4641 6.75699 12.1407L2.15855 10.7706Z"
                    stroke="#B7B7B7"
                    stroke-width="1.5"
                  />
				</svg>
              <span>{main_text}, {secondary_text}</span>
            </li>
          );
    });

    useEffect(() => {
      if (isLoaded){
          init();
      }
    }, [isLoaded, init]);

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSelect = ({ description } : TypeHandle) => () => {
        setValue(description, false);
        clearSuggestions();
        
        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            onPlaceSelect({ lat, lng });
        });
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            };

            onPlaceSelect(userLocation);
            reverseGeocode(userLocation);
            });
        } else {
            onPlaceSelect(center);
        }
    };
  
  
    function reverseGeocode(center: TypeCords){
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + center.lat + ',' + center.lng + '&key=' + "AIzaSyDOd9Bx2sWmTLhVjR07Df89bmk4W2K-x5M")
            .then((response) => response.json())
            .then((responseJson) => {
            const adress2 = responseJson;
            setValue(adress2.results[0].formatted_address);    
        })
    }

    useEffect(getUserLocation, []);

    return (
        <>
        <TextField 
            className={styles.login__input} 
            style={{ marginBottom: "0px!important" }}
            label="adress*" 
            variant="standard" 
            id="adress"
            value={value} 
            disabled={!ready}
            onChange={handleInput}
        />
        <div className={ styles.error__log }>{ errorAdress }</div>

        {status === "OK" && <ul className={styles.hint} >{renderSuggestions()}</ul>} 
        </>
    )
}