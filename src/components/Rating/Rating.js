import React from "react"
import ratingStyles from "./rating.module.scss"

export default ({ score }) => {
    if (!score) return null

    return (
        <div className={ratingStyles.rating}>
            <span>Final Rating</span>
            <strong className={ratingStyles.score}>{score}%</strong>
        </div>
    )
}