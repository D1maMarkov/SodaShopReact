import {FC, ReactNode, FormEvent} from 'react'
import styles from './form.module.scss'


type TypeForm = {
    children: ReactNode,
    loading?: boolean,
}

export const Form: FC<TypeForm> = ({children, loading}) => {
    const afterSubmission = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={afterSubmission} className={loading ? styles.form + " " + styles.loading : styles.form} >
            { children }
        </form>
    )
}