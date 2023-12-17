import React from "react";
import classes from "./ContactSection.module.css";

function ContactSection() {
  return (
    <div className={classes.contact}>
      <h2>Contact</h2>
      <p>Tanju Özer</p>
      <p>tanju_ozer@web.de</p>
      <p>+49 401 53 600</p>
    </div>
  );
}

export default ContactSection;
