import React from "react";
import { Link } from 'gatsby';
import EditorsChoice from "../EditorsChoice";

import AuthorLinks from "../AuthorLinks";
import Aurebesh from '../Aurebesh';
import { header, content, headGroup, awards, ecLink } from "./missionheader.module.scss";

const MissionHeader = ({ node }) => {

    function getEditorsChoice(node) {
        let editorsChoice = null
        if(node.editorsChoice) {
          editorsChoice = (
            <Link to="/missions/editors-choice" className={ecLink}>
                <EditorsChoice />
            </Link>
          )
        }
        return editorsChoice
    }

    return (
        <header className={header}>
            <div className={`content ${content}`}>
                <div className={headGroup}>
                    <h1>
                        <Aurebesh text={node.title} />
                        { node.title }
                    </h1>
                    <AuthorLinks node={node} />
                </div>
                <div className={awards}>
                    {getEditorsChoice(node)}
                </div>
            </div>
        </header>
    )
}

export default MissionHeader;
