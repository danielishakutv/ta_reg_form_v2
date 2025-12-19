import React from 'react'
import './App.css'

function Terms() {
  return (
    <div className="page">
      <div className="bg-aurora" aria-hidden="true" />
      <div className="layout">
        <header className="header-section">
          <img src="https://tokoacademy.org/logo/ta_logo_png.png" alt="Toko Academy" className="brand-logo" />
        </header>

        <section className="card form-card">
          <header className="card-header">
            <div>
              <p className="badge">Toko Academy</p>
              <h2>Terms & Conditions</h2>
              <p className="lede">Last Updated: December 19, 2025</p>
            </div>
          </header>

          <div className="unified-section" style={{ padding: '1.5rem', lineHeight: '1.8' }}>
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using Toko Academy's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>

            <h3>2. Enrollment and Registration</h3>
            <p>
              To enroll in our programs, you must complete the registration process and provide accurate, complete, and current information as prompted. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>

            <h3>3. Payment and Refunds</h3>
            <p>
              Course fees are payable as specified during enrollment. All payments are to be made through authorized channels. Refund requests must be submitted within the first 7 days of course commencement and are subject to review and approval.
            </p>

            <h3>4. Course Access and Participation</h3>
            <p>
              Once enrolled, you will receive access to course materials and resources as specified in your program. Regular participation and adherence to class schedules are expected. Toko Academy reserves the right to suspend or terminate access for violation of these terms.
            </p>

            <h3>5. Intellectual Property</h3>
            <p>
              All course materials, content, and resources provided by Toko Academy are protected by intellectual property rights. You may not reproduce, distribute, or create derivative works from our materials without express written permission.
            </p>

            <h3>6. Code of Conduct</h3>
            <p>
              Students are expected to maintain professional conduct, respect fellow learners and instructors, and engage constructively in all learning activities. Harassment, plagiarism, or any form of academic dishonesty will not be tolerated.
            </p>

            <h3>7. Certification</h3>
            <p>
              Upon successful completion of a program and meeting all requirements, students will receive a certificate of completion. Certificates are issued digitally and may be verified through our official channels.
            </p>

            <h3>8. Limitation of Liability</h3>
            <p>
              Toko Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or inability to use our services.
            </p>

            <h3>9. Modifications to Terms</h3>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services following any changes constitutes acceptance of those changes.
            </p>

            <h3>10. Contact Information</h3>
            <p>
              For questions or concerns regarding these terms, please contact us at <a href="mailto:tokoacademyinstitute@gmail.com">tokoacademyinstitute@gmail.com</a>
            </p>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <a href="?" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Back to Home</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-col"><h4>Quick Links</h4><ul><li><a href="https://tokoacademy.org/">Home</a></li><li><a href="https://tokoacademy.org/about-us/">About Us</a></li><li><a href="https://tokoacademy.org/courses/">Programs</a></li><li><a href="https://tokoacademy.org/contact/">Contact</a></li></ul></div>
            <div className="footer-col"><h4>Location</h4><p>Nigeria</p><p><a href="mailto:tokoacademyinstitute@gmail.com">Email Us</a></p></div>
            <div className="footer-col"><h4>Legal</h4><ul><li><a href="?page=terms">Terms & Conditions</a></li><li><a href="?page=privacy">Privacy Policy</a></li></ul></div>
          </div>
          <div className="footer-bottom"><p>&copy; 2025 Toko Academy. All rights reserved.</p></div>
        </footer>
      </div>
    </div>
  )
}

export default Terms
