import { Dispatch, FC } from "react";
import TextField from '@mui/material/TextField';
import styles from "./formInput.module.scss";


type TypeFormInput = {
    label: string,
    value: string,
    setValue: Dispatch<string>,
    error?: string,
    type?: string
}

export const FormInput:FC<TypeFormInput> = ({label, value, setValue, error, type}) => {
    return(
        <>
        <TextField 
            type={type ? type : ""} 
            className={styles.input} 
            label={label} 
            variant="standard" 
            value={value} 
            onChange={event => setValue(event.target.value)}
        />
        <div className={styles.error} >{ error }</div>
        </>
    )
}