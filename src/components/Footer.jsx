import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; {new Date().getFullYear()} Event Management System. All rights reserved.</p>
        <div style={styles.links}>
          <a href="/privacy-policy" style={styles.link}>Privacy Policy</a>
          <a href="/terms-of-service" style={styles.link}>Terms of Service</a>
          <a href="/contact" style={styles.link}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  links: {
    marginTop: '10px',
  },
  link: {
    color: '#ff6f61',
    margin: '0 10px',
    textDecoration: 'none',
  },
};

export default Footer;
