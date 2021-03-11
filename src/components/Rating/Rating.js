import React from "react"
import { ratingScore, rating } from "./rating.module.scss"

export default ({ score }) => {
    if (!score) return null

    return (
        <div className={rating}>
            <span>Final Rating</span>
            <strong className={ratingScore}>{score}%</strong>
        </div>
    )
}