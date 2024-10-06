import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import MapIcon from "../../icons/map";
import LinkIcon from "../../icons/link";
import * as styles from "./profile.module.scss";

const Profile = (props) => {
  const image = getImage(props.image.localFile);

  return (
    <div
      className={styles.profile}
      style={{
        "--profile-theme-color":
          props.hex === "#FFFFFF" ? "#000000" : props.hex,
      }}
    >
      <GatsbyImage
        image={image}
        alt={`${props.name}'s avatar.'`}
        fluid={props.fluid}
        backgroundColor
        className={styles.image}
      />
      <h2 className={styles.name}>{props.name}</h2>
      <p className={styles.location}>
        <MapIcon
          style={{ marginBottom: "-2px", marginRight: "2px" }}
          size={14}
        />
        {props.location}
      </p>
      <div className={styles.url}>
        <LinkIcon size={14} />

        {props.expandedUrl ? (
          <a href={props.expandedUrl} target="_blank" rel="noopener noreferrer">
            {props.displayUrl}
          </a>
        ) : (
          <span>N/A</span>
        )}
      </div>

      <p
        className={styles.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
    </div>
  );
};

export default Profile;
