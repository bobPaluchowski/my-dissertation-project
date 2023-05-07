import React from "react";
import s from "./Footer.module.scss";


const Footer = () => {
  return (
    <div className={s.footer}>
      <a href="https://github.com/bobPaluchowski" >
      <span className={s.footerLabel}>
    {new Date().getFullYear()+' '} 
       &copy; Copyleft Robert Paluchowski</span>

 </a>

    </div>
  )
}

export default Footer;
