import React from "react"
import ratingStyles from "./rating.module.scss"

export default ({ score }) => (
    <div className={ratingStyles.rating}>
        <span>Final Rating</span>
        <strong className={ratingStyles.score}>{score}%</strong>
    </div>
)