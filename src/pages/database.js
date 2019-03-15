import React from "react"
import Layout from "../components/layout"
import database from "../images/database.png"
import AnimatedSprite from "../components/AnimatedSprite"
import GradientTitle from "../components/GradientTitle";

export default () => (
  <Layout>
    <img src={database} alt="" className="section_icon" />
    <GradientTitle title="Database" />
    <p>Dark Forces info to come.</p>

    <AnimatedSprite spritePath="/images/GREYOF_sprite.png" width={52} height={76} scale={5} />
  </Layout>
)
