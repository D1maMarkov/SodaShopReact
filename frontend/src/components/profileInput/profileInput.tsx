import { Dispatch, FC } from "react";
import styles from "./profileInput.module.scss";


type TypeProfileInput = {
    label: string,
    value: string,
    setValue: Dispatch<string>,
    error: string,
    setChanged: Dispatch<boolean>
}

export const ProfileInput:FC<TypeProfileInput> = ({label, value, setValue, error, setChanged}) => {
    return (
        <>
        <p>{ label }</p>
        <input className={styles.input + " " + (error.length > 0 ? styles.error__input : "")} value={ value } onChange={event => {setValue(event.target.value); setChanged(true)}} />
        <div className={styles.error} >{ error }</div>
        </>
    )
}
