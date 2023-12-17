import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import classes from "./SocialMedia.module.css";

function SocialMedia() {
  return (
    <div className={classes.social}>
      <h2>Social Media</h2>
      <div>
        <FaSquareFacebook />
        <FaInstagramSquare />
        <FaTwitterSquare />
        <FaLinkedin />
        <FaGithub />
        <FaYoutube />
      </div>
    </div>
  );
}

export default SocialMedia;
