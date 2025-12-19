import React from 'react'
import './App.css'

function Privacy() {
  return (
    <div className="page">
      <div className="bg-aurora" aria-hidden="true" />
      <div className="layout">
        <header className="header-section">
          <img src="/toko-logo.png" alt="Toko Academy" className="brand-logo" />
        </header>

        <section className="card form-card">
          <header className="card-header">
            <div>
              <p className="badge">Toko Academy</p>
              <h2>Privacy Policy</h2>
              <p className="lede">Last Updated: December 19, 2025</p>
            </div>
          </header>

          <div className="unified-section" style={{ padding: '1.5rem', lineHeight: '1.8' }}>
            <h3>1. Introduction</h3>
            <p>
              At Toko Academy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>

            <h3>2. Information We Collect</h3>
            <p>
              <strong>Personal Information:</strong> When you register with Toko Academy, we collect information including your name, email address, phone number, location, and other details necessary for enrollment and communication.
            </p>
            <p>
              <strong>Usage Data:</strong> We may collect information about how you access and use our services, including course progress, attendance records, and interaction with learning materials.
            </p>
            <p>
              <strong>Technical Data:</strong> We collect information such as IP addresses, browser types, device information, and cookies to improve our services and user experience.
            </p>

            <h3>3. How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Process your enrollment and manage your account</li>
              <li>Deliver course content and educational services</li>
              <li>Communicate with you about programs, updates, and opportunities</li>
              <li>Improve our services and develop new offerings</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>

            <h3>4. Information Sharing and Disclosure</h3>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Service providers who assist in delivering our programs</li>
              <li>Partners and instructors involved in course delivery</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h3>5. Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h3>6. Your Rights</h3>
            <p>You have the right to:</p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h3>7. Cookies and Tracking</h3>
            <p>
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie preferences through your browser settings.
            </p>

            <h3>8. Children's Privacy</h3>
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected such information, we will take steps to delete it.
            </p>

            <h3>9. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last Updated" date.
            </p>

            <h3>10. Contact Us</h3>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:tokoacademyinstitute@gmail.com">tokoacademyinstitute@gmail.com</a>
            </p>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <a href="/" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Back to Home</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-col"><h4>Quick Links</h4><ul><li><a href="https://tokoacademy.org/">Home</a></li><li><a href="https://tokoacademy.org/about-us/">About Us</a></li><li><a href="https://tokoacademy.org/courses/">Programs</a></li><li><a href="https://tokoacademy.org/contact/">Contact</a></li></ul></div>
            <div className="footer-col"><h4>Location</h4><p>Nigeria</p><p><a href="mailto:tokoacademyinstitute@gmail.com">Email Us</a></p></div>
            <div className="footer-col"><h4>Legal</h4><ul><li><a href="/terms">Terms & Conditions</a></li><li><a href="/privacy">Privacy Policy</a></li></ul></div>
          </div>
          <div className="footer-bottom"><p>&copy; 2025 Toko Academy. All rights reserved.</p></div>
        </footer>
      </div>
    </div>
  )
}

export default Privacy
