import {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './formTitle.module.scss'


type TypeTitle = {
    type: string
}

export const Title: FC<TypeTitle> = ({type}) => {
    const navigate = useNavigate();

    return (
        <>
        <div className={styles.title}>
            <p onClick={() => navigate('/login') }>{type === "login" ? <b>Login</b> : <>Login</>}</p>
            <p onClick={() => navigate('/register')} >{type === "register" ? <b>Registration</b> : <>Registration</>}</p>
        </div>

        <hr />
        </>
    )
}