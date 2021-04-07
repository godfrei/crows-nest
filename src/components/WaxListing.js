import React from "react";
import { Link } from "gatsby";

const WaxListing = ({ waxEdges }) => {
  const getWaxList = () => {
    const waxList = [];
    waxEdges.forEach((edge) => {
      waxList.push({
        path: edge.node.fields.slug,
        cover: edge.node.frontmatter.cover,
        title: edge.node.frontmatter.title,
        date: edge.node.fields.date,
      });
    });
    return waxList;
  };

  const waxList = getWaxList();
  return (
    <div>
      <ul>
        {waxList.map((wax) => (
          <li>
            <Link to={wax.path} key={wax.title}>
              <article>
                <div>
                  <h3>{wax.title}</h3>
                  <div>{wax.date}</div>
                  <p>{wax.excerpt}</p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaxListing;
