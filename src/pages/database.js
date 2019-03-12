import React from "react"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import database from "../images/database.png"
import AnimatedSprite from "../components/AnimatedSprite"

export default () => (
  <BodyClassName className="database">
    <Layout>
      <img src={database} alt="" className="section_icon" />
      <h1 className="gradient-glow" data-text="Database">Database</h1>
      <p>Dark Forces info to come.</p>

      <AnimatedSprite spritePath="/images/GREYOF_sprite.png" width={52} height={76} scale={5} />
    </Layout>
  </BodyClassName>
)
