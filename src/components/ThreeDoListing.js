import React from "react";
import { Link } from "gatsby";

const ThreeDoListing = ({ threeDoEdges }) => {
  const getThreeDoList = () => {
    const threeDoList = [];
    threeDoEdges.forEach((edge) => {
      threeDoList.push({
        path: edge.node.fields.slug,
        cover: edge.node.frontmatter.cover,
        title: edge.node.frontmatter.title,
        date: edge.node.fields.date,
      });
    });
    return threeDoList;
  };

  const threeDoList = getThreeDoList();
  return (
    <div>
      <ul>
        {threeDoList.map((post) => (
          <li>
            <Link to={post.path} key={post.title}>
              <article>
                <div>
                  <h3>{post.title}</h3>
                  <div>{post.date}</div>
                  <p>{post.excerpt}</p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreeDoListing;
