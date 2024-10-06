import React from "react";
import "reset-css";
import { Link, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { sortBy } from "lodash";
import Nav from "../components/nav";
import * as styles from "./about.module.scss";
import Layout from "../components/layout";
import BlacksWhoDesign from "../friends/blackswhodesign.svg";
import LatinxsWhoDesign from "../friends/latinxswhodesign.png";
import PeopleOfCraft from "../friends/peopleofcraft.png";
import QueerDesignClub from "../friends/queerdesignclub.svg";
import IndiansWhoDesign from "../friends/indianswhodesign.svg";
import FilipinosWhoDesign from "../friends/filipinoswhodesign.png";
import APIWhoDesign from "../friends/apiwhodesign.svg";
import BraziliansWhoDesign from "../friends/brazilianswhodesign.svg";
import Rememory from "../friends/rememory.svg";

const friends = [
  {
    title: "API Who Design",
    link: "https://apiwho.design/",
    image: APIWhoDesign,
    invert: true,
  },
  {
    title: "Blacks Who Design",
    link: "https://blackswho.design/",
    image: BlacksWhoDesign,
  },
  {
    title: "Latinxs Who Design",
    link: "https://latinxswhodesign.com",
    image: LatinxsWhoDesign,
    invert: true,
  },
  {
    title: "People of Craft",
    link: "https://peopleofcraft.com/",
    image: PeopleOfCraft,
  },
  {
    title: "Queer Design Club",
    link: "https://queerdesign.club/",
    image: QueerDesignClub,
    invert: true,
  },
  {
    title: "Filipinos Who Design",
    link: "http://filipinoswhodesign.club/",
    image: FilipinosWhoDesign,
    invert: true,
    contrast: true,
  },
  {
    title: "Indians Who Design",
    link: "https://indianswhodesign.in/",
    image: IndiansWhoDesign,
  },
  {
    title: "Brazilians Who Design",
    link: "https://brazilianswho.design/",
    image: BraziliansWhoDesign,
  },
  {
    title: "Rememory",
    link: "https://www.rememory.directory/",
    image: Rememory,
  },
];

const sortedFriends = sortBy(friends, (friend) => friend.title);

const App = ({ data }) => (
  <Layout>
    <Helmet title="About | LA GENTE: The Latinx/e Theatre Production Network" />
    <Nav theme="light" />
    <div className={styles.container}>
      <h1 className={styles.h1}>About this project</h1>
      <div
        dangerouslySetInnerHTML={{
          __html:
            data.allStrapiAbout.nodes[0].content.data.childMarkdownRemark.html,
        }}
      ></div>

      <div className={styles.backContainer}>
        <Link to="/" className={styles.backLink}>
          Back to directory
        </Link>
      </div>
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query Index {
    allStrapiAbout {
      nodes {
        content {
          data {
            content
            childMarkdownRemark {
              html
              rawMarkdownBody
            }
          }
        }
      }
    }
  }
`;

export default App;
