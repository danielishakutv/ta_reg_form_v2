import React from 'react'
import './App.css'

function Success() {
  const ctaStyle = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.95rem 1rem',
    marginBottom: '1.75rem',
    background: 'linear-gradient(135deg, var(--blue), var(--green))',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: '14px',
    fontWeight: 800,
    fontSize: '1.05rem',
    boxShadow: '0 12px 32px rgba(0, 150, 230, 0.25)',
    lineHeight: 1.3,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  }

  return (
    <div className="page">
      <div className="bg-aurora" aria-hidden="true" />
      <div className="layout">
        <header className="header-section">
          <img src="https://tokoacademy.org/logo/ta_logo_png.png" alt="Toko Academy" className="brand-logo" />
        </header>

        <section className="card form-card">
          <header className="card-header" style={{ textAlign: 'center' }}>
            <div>
              <p className="badge">Enrollment Confirmed</p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.4rem)', marginBottom: '0.5rem' }}>Congratulations!</h2>
              <p className="lede" style={{ fontSize: 'clamp(1rem, 3.4vw, 1.15rem)' }}>You've successfully enrolled. Your journey to growth begins now.</p>
            </div>
          </header>

          <div className="unified-section" style={{ padding: '1.5rem clamp(1rem, 3vw, 1.75rem)' }}>
            {/* Next Steps Section */}
            <div style={{ marginBottom: '2.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.9rem', color: '#fff', fontWeight: 800 }}>What's Next</h3>
              <div style={{ backgroundColor: 'rgba(8, 24, 20, 0.58)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '1.25rem', borderRadius: '12px', lineHeight: 1.7 }}>
                <ol style={{ margin: 0, paddingLeft: '1.1rem', display: 'grid', gap: '0.75rem', color: '#f6fffb' }}>
                  <li><strong>Check your email</strong> for course details and access instructions.</li>
                  <li><strong>Watch for SMS</strong> with payment steps and materials.</li>
                  <li><strong>Complete payment</strong> to unlock live sessions and resources.</li>
                </ol>
              </div>
            </div>

            {/* Discount Urgency Section */}
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
              <div style={{ backgroundColor: 'rgba(93, 164, 25, 0.2)', border: '1px solid var(--green)', padding: '1.25rem', borderRadius: '12px', color: '#f7fff8' }}>
                <p style={{ fontSize: '0.85rem', color: '#e3f6e7', marginBottom: '0.35rem' }}>LIMITED TIME OFFER</p>
                <h3 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', color: '#fff', margin: '0.35rem 0', fontWeight: 800 }}>15% Discount</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '0.35rem' }}>Pay within the next 24 hours</p>
                <p style={{ fontSize: '0.85rem', color: '#d8e9dd' }}>After 24 hours: 5% discount for 3 days, then regular pricing</p>
              </div>
            </div>

            {/* Why Act Now Section */}
            <div style={{ marginBottom: '2.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.9rem', color: 'var(--green)' }}>Why Skills Matter Now</h3>
              <div style={{ display: 'grid', gap: '0.9rem' }}>
                <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: '0.85rem', lineHeight: 1.6, color: '#f4fbf7', backgroundColor: 'rgba(8, 24, 20, 0.52)', borderRadius: '10px', paddingTop: '0.35rem', paddingBottom: '0.35rem' }}>
                  <p><strong>Earn More</strong><br />Gain in-demand digital skills that increase your earning potential across employment, freelancing, and business opportunities.</p>
                </div>
                <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: '0.85rem', lineHeight: 1.6, color: '#f4fbf7', backgroundColor: 'rgba(8, 24, 20, 0.52)', borderRadius: '10px', paddingTop: '0.35rem', paddingBottom: '0.35rem' }}>
                  <p><strong>Optimize Your Business</strong><br />Apply practical knowledge to streamline operations, reduce costs, and improve efficiency.</p>
                </div>
                <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: '0.85rem', lineHeight: 1.6, color: '#f4fbf7', backgroundColor: 'rgba(8, 24, 20, 0.52)', borderRadius: '10px', paddingTop: '0.35rem', paddingBottom: '0.35rem' }}>
                  <p><strong>Freelance & Scale</strong><br />Open new income streams by offering services based on the skills you'll master.</p>
                </div>
                <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: '0.85rem', lineHeight: 1.6, color: '#f4fbf7', backgroundColor: 'rgba(8, 24, 20, 0.52)', borderRadius: '10px', paddingTop: '0.35rem', paddingBottom: '0.35rem' }}>
                  <p><strong>Hands-On Learning</strong><br />Mentor-led sessions with real-world projects mean you learn by doing.</p>
                </div>
              </div>
            </div>

            {/* CTA Button 1 */}
            <a
              href="https://app.tokoacademy.org/payment_info.html"
              target="_blank"
              rel="noopener noreferrer"
              style={ctaStyle}
            >
              Complete Your Payment Now
            </a>

            {/* Course Details Section */}
            <div style={{ marginBottom: '2.25rem', backgroundColor: 'rgba(12, 30, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.9rem', color: '#f7fffb' }}>What You'll Get</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.65rem', margin: 0, color: '#f4fbf7' }}>
                <li style={{ paddingLeft: '1.4rem', position: 'relative', lineHeight: 1.55 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green)' }}>✓</span>
                  Live mentor-led training sessions with industry experts
                </li>
                <li style={{ paddingLeft: '1.4rem', position: 'relative', lineHeight: 1.55 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green)' }}>✓</span>
                  Practical projects you can apply immediately
                </li>
                <li style={{ paddingLeft: '1.4rem', position: 'relative', lineHeight: 1.55 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green)' }}>✓</span>
                  Certificate of completion after finishing the course
                </li>
                <li style={{ paddingLeft: '1.4rem', position: 'relative', lineHeight: 1.55 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green)' }}>✓</span>
                  Lifetime access to course materials and updates
                </li>
                <li style={{ paddingLeft: '1.4rem', position: 'relative', lineHeight: 1.55 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--green)' }}>✓</span>
                  Community support from fellow learners
                </li>
              </ul>
            </div>

            {/* CTA Button 2 */}
            <a
              href="https://app.tokoacademy.org/payment_info.html"
              target="_blank"
              rel="noopener noreferrer"
              style={ctaStyle}
            >
              Secure Your 15% Discount Today
            </a>

            {/* Payment Info Section */}
            <div style={{ marginBottom: '2.25rem', backgroundColor: 'rgba(93, 164, 25, 0.16)', padding: '1.25rem', borderRadius: '12px', lineHeight: 1.6, border: '1px solid rgba(255, 255, 255, 0.12)', color: '#f7fff8' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Payment Options</h3>
              <p style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                Visit our secure payment page to choose your preferred payment method. You can also visit our office in person for assistance.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#e9f7ef' }}>
                Questions? Check your email for complete payment details and office location information.
              </p>
            </div>

            {/* Final CTA Button 3 */}
            <a
              href="https://app.tokoacademy.org/payment_info.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...ctaStyle, marginBottom: '1rem' }}
            >
              Go to Payment Page
            </a>

            {/* Closing Message */}
            <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p style={{ fontSize: '0.95rem', color: '#aaa', marginBottom: '0.5rem' }}>
                We're excited to have you on board. Your success is our mission.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#e1f4ec' }}>
                See you in your first live session!
              </p>
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

export default Success
