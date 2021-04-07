import React from "react";
import Helmet from "react-helmet";
import config from "../../../data/SiteConfig";
import SEO from "../../components/SEO";
import Layout from "../../layout";
import DatabaseLayout from "../../layout/database";

const Cheats = () => (
  <Layout>
    <Helmet>
      <title>Cheat Codes | {config.siteTitle}</title>
    </Helmet>
    <SEO />

    <DatabaseLayout>
      <article>
        <h1>Cheat Codes</h1>

        <p>
          If you can't seem to make it past that really tough level, or keep
          getting laid to waste by the Empire's finest, then you have two
          options. One is to get in there and keep trying until you get it
          right(what's that saying about practice everyone keeps repeating?).
          The other is to cheat. For all of you who need that quick fix, here's
          a list of the codes you can use. Just type them in at any point during
          gameplay. These codes work in add-on levels as well as the originals
          on the CD.
        </p>

        <p>
          You'll notice that all the codes are preceeded by 'LA', standing for
          LucasArts of course.
        </p>

        <h2>General Codes</h2>

        <ul>
          <li>
            <code>LABRADY</code> - Contrary to the Dark Forces FAQListing, this
            code DOES work on the PC version. It fills up the ammo for the
            weapons you already have.
          </li>
          <li>
            <code>LABUG</code> - Makes you super small, so you can squeeze into
            small spaces.
          </li>
          <li>
            <code>LACDS</code> - Provides you with the entire map of the level,
            complete with item positions and a constantly updated location of
            all the enemies. You can also see when you shoot, and when something
            explodes.
          </li>
          <li>
            <code>LADATA</code> - Gives you your position on the map in
            coordinate style, and the percentage of the secrets you've found
            thus far.
          </li>
          <li>
            <code>LAIMLAME</code> - Invincibility. Lasers will bounce off you.
          </li>
          <li>
            <code>LAMAXOUT</code> - Gives you all the weapons, items, keys and
            full ammo along with full battery power, shields and health. In
            effect you "max out".
          </li>
          <li>
            <code>LANTFH</code> - Stands for "No Time For Hugs". It will
            transport you to the place where the red dot is positioned on the
            map. This only works for transfer between layers.
          </li>
          <li>
            <code>LAPOGO</code> - Gives you the ability to 'jump' up to a ledge
            as if it were at the same height as you.
          </li>
          <li>
            <code>LAPOSTAL</code> - Gives you all the weapons and full ammo,
            plus the items and full health, shields and battery power. No keys
            though.
          </li>
          <li>
            <code>LARANDY</code> - Gives you a weapon supercharge.
          </li>
          <li>
            <code>LAREDLITE</code> - Remember the game red-light/green-light?
            Well now you're making the calls. This stops enemies in their
            tracks, and they don't move until you type the code in again. Even
            if you kill them, they don't fall down until after you type in the
            code. Which can be rather amusing sometimes. :-)
          </li>
          <li>
            <code>LASKIP</code> - Lets you skip to the next level. You WILL get
            to view any cutscenes in between.
          </li>
          <li>
            <code>LAUNLOCK</code> - Gives you all the keys.
          </li>
        </ul>

        <h2>Level Codes</h2>

        <p>
          These codes will let you jump to a specific level from any point in
          the game.
        </p>

        <ul>
          <li>
            <code>LASECBASE</code> - Secret Base
          </li>
          <li>
            <code>LATALAY</code> - Tak Base
          </li>
          <li>
            <code>LASEWERS</code> - Anoat City
          </li>
          <li>
            <code>LATESTBASE</code> - Research Facility
          </li>
          <li>
            <code>LAGROMAS</code> - Gromas Mines
          </li>
          <li>
            <code>LADETENTION</code> - Detention Center
          </li>
          <li>
            <code>LARAMSHED</code> - Ramsees Hed
          </li>
          <li>
            <code>LAROBOTICS</code> - Robotics Facility
          </li>
          <li>
            <code>LANARSHADA</code> - Nar Shaddaa
          </li>
          <li>
            <code>LAJABSHIP</code> - Jabba's Ship
          </li>
          <li>
            <code>LAIMPCITY</code> - Imperial City Coruscant
          </li>
          <li>
            <code>LAFUELSTAT</code> - Fuel Station
          </li>
          <li>
            <code>LAEXECUTOR</code> - The SSD Executor
          </li>
          <li>
            <code>LAARC</code> - Arc Hammer
          </li>
        </ul>

        <h2>Mac Only Codes</h2>

        <ul>
          <li>
            <code>LAOZ</code> - Makes all the enemies smaller and speeds the
            music up. In effect, a transport to Munchkin Land. :-)
          </li>
          <li>
            <code>LATERMINATE</code> - Pretty much the same effect as LAIMLAME,
            LAMAXOUT, and LARANDY combined. But the lasers don't bounce off you.
            Most likely a reference to becoming akin to a Terminator.
          </li>
        </ul>
      </article>
    </DatabaseLayout>
  </Layout>
);

export default Cheats;
