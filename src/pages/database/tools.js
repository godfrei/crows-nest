import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import config from "../../../data/SiteConfig";
import SEO from "../../components/SEO";
import Layout from "../../layout";

const EditingTools = () => (
  <Layout>
    <Helmet>
      <title>Editing Tools | {config.siteTitle}</title>
    </Helmet>
    <SEO />
    <div className="text">
      <article>
        <h1>Editing Tools</h1>

        <p>Want to create your own content for Dark Forces? You'll probably want some tools to help you out. Some of the items here are vintage editors used to create the majority of the missions and files, powerful but a bit obtuse compared to what you might be used to today. Others are more modern.</p>

        <h2>Classics</h2>

        <ul>
            <li><strong>DFUSE</strong> - "Dark Forces Utilities and Editor", the original DOS-based editor for creating custom missions.</li>
            <li><strong>WDFUSE</strong> - The sequel to DFUSE, now Windows-based and even more powerful.</li>
            <li><strong>WEDIT</strong> - This Windows-based editor had its proponents and some powerful features, but never quite got the traction of WDFUSE.</li>
            <li><strong>Dark Forge</strong> - The editor for Mac users of the day. It's a Mac Classic app, so you might have difficulty trying to run it today.</li>
        </ul>

        <h2>Modern</h2>

        <ul>
            <li><strong><a href="https://github.com/njankowski/dftools">dftools</a></strong> - Tools for extracting and building asset files for Dark Forces (and Outlaws). Can handle GOB, BM, FME, FNT, PAL, and WAX files. Written in python by Nicholas Jankowski, they'll run on most platforms nowadays.</li>
            <li><strong>Convertio</strong> - Can convert a number of files into more common formats, such as <a href="https://convertio.co/voc-mp3/">VOC to MP3</a>.</li>
        </ul>

      </article>
    </div>
  </Layout>
);

export default EditingTools;
