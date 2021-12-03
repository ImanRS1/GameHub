import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="page-footer__github">
        <a href="https://github.com/MarianaPereira23">
          <img src="https://avatars.githubusercontent.com/u/56864465?v=4" alt="Mariana Pereira" />
        </a>
        <a href="https://github.com/LoukasPiloidis/">
          <img src="https://avatars.githubusercontent.com/u/51403687?v=4" alt="Loukas Piloidis" />
        </a>
        <a href="https://github.com/LetYourMindGo">
          <img src="https://avatars.githubusercontent.com/u/89615997?v=4" alt="Igot Puris" />
        </a>
        <a href="https://github.com/ImanRS1">
          <img src="https://avatars.githubusercontent.com/u/67381660?v=4" alt="Iman Reza Soltani" /></a>
      </div>
      <div className="page-footer__copyright">&#169; mobSters 2021</div>
      
    </footer>
  );
};

export default Footer;
