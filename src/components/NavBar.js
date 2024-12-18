import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon4 from '../assets/img/nav-icon4.png'
import leftTag from '../assets/img/1.png';
import rightTag from '../assets/img/2.png';
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {

  const [textIndex, setTextIndex] = useState(0);
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const text = "Welcome to my Universe";

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (textIndex < text.length) {
        setTextIndex(textIndex + 10);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [textIndex]);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <div className="logo-container">
        <motion.img
          src={leftTag}
          alt="Left Logo"
          className="logo-image"
          initial={{ x: 0 }}
          animate={{ x: -20 }}
          transition={{ delay: 2.3, duration: 2 }}
        />
        {text.slice(0, textIndex).split('').map((letter, index) => (
        <motion.span
          className="logo-text"
          initial={{ opacity: 0, x: -10, width: 0 }}
          animate={{ opacity: 1, x: 0, width: 'auto' }}
          transition={{
            delay: index * 0.1,
            duration: 0.05,
            ease: "easeOut",
          }}
          style={{ display: 'inline-block' }}
        >
          {letter}
        </motion.span>
      ))}
        <motion.img
          src={rightTag}
          alt="Right Logo"
          className="logo-image"
          initial={{ x: 0 }}
          animate={{ x: 20 }}
          transition={{ delay: 2.3, duration: 2 }}
          style={{width: '33px', height: '27px'}}
        />
      </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/rusmir-%C4%8Domor-29b5a71b9/" target="_blank"><img src={navIcon1} alt="" /></a>
                <a href="https://www.facebook.com/rusmir.comor.5/" target="_blank"><img src={navIcon2} alt="" /></a>
                <a href="https://github.com/RusCom-ba" target="_blank"><img src={navIcon4} alt="" /></a>
              </div>
              <HashLink to='#connect'>
                <button className="vvd"><span>Let’s Connect</span></button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
