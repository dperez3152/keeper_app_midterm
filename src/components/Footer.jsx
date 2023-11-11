import React from "react";

const date = new Date();
var CURRENTYEAR = date.getFullYear();

function Footer(props) {
  return (
    <footer>
      <p>Copyright ⓒ {CURRENTYEAR}</p>
    </footer>
  );
}

export default Footer;
