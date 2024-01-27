import {FC} from 'react'
import styles from './form.module.scss'


type TypeForm = {
    children: any,
    loading?: boolean,
}

export const Form: FC<TypeForm> = ({children, loading}) => {
    return (
        <div className={loading ? styles.form + " " + styles.loading : styles.form} >
            { children }
        </div>
    )
}