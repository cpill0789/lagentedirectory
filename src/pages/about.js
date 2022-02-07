import React from "react";
import "reset-css";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import { sortBy } from "lodash";
import classnames from "classnames";
import Nav from "../components/nav";
import styles from "./about.module.scss";
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
import Button from "../components/button";

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

const App = () => (
  <Layout>
    <Helmet title="About | Women Who Design" />
    <Nav theme="light" />
    <div className={styles.container}>
      <h1 className={styles.h1}>About this project</h1>
      <p>La Gente: The Latinx Theatre Production Network is a collective of theatre designers, artists, technicians, and managers.  We believe in the transformative power of theatre and our collective dream of a performance industry that includes room for all.  We have a profound belief that theatre is more beautiful with more of us at the table.</p>

      <p>This dream is powerful.</p>

      <p>This dream is magical.</p>


      <p>It rises above our physical work and opens possibilities for new and bold explorations of what collaboration and creation could be with a true diversity of aesthetics and lived experiences.  Building this dream for ourselves, we celebrate the intergenerational membership of our network and welcome all Latinx theatre designers, technicians, and managers to be a part of it.</p>


      <p>We work and speak in solidarity with other BIPOC coalitions and historically marginalized communities .  We commit to continuing to strengthen our anti-racist and anti-oppression practices while actively dismantling oppressive practices in the field.</p>


      <p>We believe in an industry that supports the wholeness and wellness of all practitioners and work in solidarity with movements that advocate for radical inclusion in all production practices.  As such, we share our collective strength, knowledge, and resources with our community and aligned movements.</p>


      <p>We remain committed to our foundational values: visibility, engagement, and advocacy for Latinx designers, technicians, and managers in the live performance field.</p>


      <p><strong>Visibility:</strong> We want to showcase members of our amazing community, share events on the local and national levels, display the large diversity of work we do as a community, and highlight our work in education.</p>


      <p><strong>Engagement:</strong> We want to connect with theaters, directors, producers, collaborators, administrators, and audiences as we celebrate each other’s work and accomplishments.</p>


      <p><strong>Advocacy:</strong> We operate in solidarity with BIPOC movements, encouraging hiring at the local level, mentoring young theater artists, and sharing resources.</p>
      <div className={styles.backContainer}>
        <Link to="/" className={styles.backLink}>
          Back to directory
        </Link>
      </div>
    </div>
  </Layout>
);

export default App;
