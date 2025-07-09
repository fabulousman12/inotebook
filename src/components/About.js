
import React, {useContext, useEffect}from 'react'

import '../About.css'; // Assuming you have some CSS for styling

const About = () => {
 
  return (
   <div className="about-container container">
      <h1>About eNotebook</h1>
      <p>
        Welcome to eNotebook, your go-to solution for creating, saving, and managing your notes
        efficiently. Whether you're a student, professional, or just someone who loves to jot down
        thoughts, eNotebook is designed to cater to all your note-taking needs.
      </p>
      
      <h2>Features</h2>
      <ul>
        <li>Easy-to-use interface for creating and organizing notes</li>
        <li>Securely save notes in the database for access anytime, anywhere</li>
        <li>Search functionality to quickly find the notes you need</li>
        <li>Responsive design, making it accessible on all devices</li>
      </ul>
      
      <h2>How It Works</h2>
      <p>
        Using eNotebook is straightforward. Simply sign up or log in to your account, and you'll
        be able to create and manage your notes with ease. Your notes are securely stored in our
        database, ensuring that your data is safe and accessible whenever you need it.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        Our mission is to provide a seamless and efficient note-taking experience. We understand
        the importance of having a reliable place to store your thoughts, ideas, and information.
        With eNotebook, you can focus on what matters most without worrying about losing your notes.
      </p>
      
      <h2>Get in Touch</h2>
      <p>
        We value your feedback and are here to help with any questions or issues you may have.
        Feel free to reach out to us through our contact page or email us at officialaccjit@gmail.com.
      </p>
      <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="contact-form"
    >
      {/* Replace with your Access Key */}
      <input type="hidden" name="access_key" value="fcd1603a-3c2d-418c-81d2-c1958e25403d" />

      {/* Form Inputs. Each input must have a name="" attribute */}
      <label>
        Name:
        <input type="text" name="name" required />
      </label>

      <label>
        Message:
        <textarea name="message" required></textarea>
      </label>

      {/* Submit Button */}
      <button type="submit">Submit Form</button>
    </form>
    </div>
  );
};


export default About
