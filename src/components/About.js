import React from 'react';
import '../About.css'; // Keep your custom styles if needed

const About = () => {
  return (
    <div className="container py-5 px-3 text-light" style={{ maxWidth: '900px' }}>
      <div className="bg-dark rounded-4 shadow p-4 p-md-5">
        <h1 className="mb-4 fw-bold text-center text-primary">About eNotebook</h1>

        <p className="mb-4 fs-5">
          Welcome to <strong>eNotebook</strong>, your go-to solution for creating, saving, and managing notes
          efficiently. Whether you're a student, professional, or someone who loves jotting down
          thoughts, eNotebook is crafted to serve your note-taking needs.
        </p>

        <h2 className="mt-5 mb-3 text-info">✨ Features</h2>
        <ul className="fs-5">
          <li>📝 Easy-to-use interface for creating and organizing notes</li>
          <li>🔒 Secure cloud-based storage for anytime access</li>
          <li>🔍 Powerful search to find notes instantly</li>
          <li>📱 Fully responsive across all devices</li>
        </ul>

        <h2 className="mt-5 mb-3 text-info">⚙️ How It Works</h2>
        <p className="fs-5">
          Sign up or log in to your account. Create, view, and organize notes effortlessly. All your notes are
          securely stored in our database and available whenever you need them.
        </p>

        <h2 className="mt-5 mb-3 text-info">🎯 Our Mission</h2>
        <p className="fs-5">
          We aim to provide a seamless and efficient note-taking experience. With eNotebook, never lose
          track of your thoughts or tasks. Focus on what matters—your ideas.
        </p>

        <h2 className="mt-5 mb-3 text-info">📬 Get in Touch</h2>
        <p className="fs-5 mb-4">
          We value your feedback. Contact us via the form below or email: <a href="mailto:officialaccjit@gmail.com" className="text-decoration-none text-white">officialaccjit@gmail.com</a>
        </p>

        {/* Contact Form */}
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="contact-form bg-secondary bg-opacity-25 rounded p-4"
        >
          <input type="hidden" name="access_key" value="fcd1603a-3c2d-418c-81d2-c1958e25403d" />

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" name="name" className="form-control" required placeholder="Your name" />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message:</label>
            <textarea name="message" className="form-control" rows="4" required placeholder="Your message..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default About;
