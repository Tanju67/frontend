import React from "react";
import classes from "./Footer.module.css";

import PagesSection from "./PagesSection";
import ContactSection from "./ContactSection";
import SocialMedia from "./SocialMedia";

function Footer() {
  return (
    <div className={classes.footer}>
      <PagesSection />
      <ContactSection />
      <SocialMedia />
    </div>
  );
}

export default Footer;
