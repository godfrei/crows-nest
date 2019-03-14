import React from "react"
import titleStyles from "./gradienttitle.module.scss"

export default ({ title }) => {
    return (
        <h1 className={titleStyles.title} data-text={title}><span>{title}</span></h1>
    )
}