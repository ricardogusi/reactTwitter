import React from 'react'
import './Tweet.css'
import like from '../like.svg'
import api from '../services/api'


export default function Tweet (props) {

    const handleLike = async () =>{
        const { _id } = props.tweet

        await api.post(`likes/${_id}`)
    }

    const {tweet} = props

    return (
    
        <li className="tweet" >
            <strong>{tweet.author}</strong>
            <p>{tweet.content}</p>
            <button type="button" onClick={handleLike}>
                <img src={like} alt="like" />
                {tweet.likes}
            </button>
        </li>
    )
}