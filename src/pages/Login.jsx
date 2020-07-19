import React, { useState } from 'react'
import './Login.css'
import twitterLogo from '../twitter.svg'
import {useHistory} from 'react-router-dom'

export default function Login () {

    const [userName, setUsername] = useState('')

    const history = useHistory()

    const handleInputChange = (e) =>{
        setUsername(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!userName) return

        localStorage.setItem('@goTwitter:username', userName)

        history.push('/timeline')
    }

    return (
     <div className="login-wrapper">
         <img src={twitterLogo} alt="twitter-logo" />
         <form onSubmit={handleSubmit}>
             <input
                placeholder="Nome de usuário"
                value={userName}
                onChange={handleInputChange}
            />
            <button type="submit">Entrar</button>
         </form>
     </div>
    )
}