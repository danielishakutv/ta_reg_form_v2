import React, { useRef, useState, useEffect } from 'react'
import './App.css'

const FORM_ACTION_ENROLL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeK112lf9ejRixOsTcNwQH6jUJ16IobXBI08rKhJ-TwJ_jANg/formResponse'

const MONTH_ABBR = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']

function formatNiceDate(input) {
  const str = String(input || '').trim()
  if (!str) return ''
  let d = new Date(str)
  if (isNaN(d.getTime())) {
    const parts = str.split(/[-/.\s]+/).filter(Boolean)
    if (parts.length >= 3) {
      let y, m, day
      if (parts[0].length === 4) {
        y = parseInt(parts[0], 10)
        m = parseInt(parts[1], 10) - 1
        day = parseInt(parts[2], 10)
      } else if (parts[2].length === 4) {
        y = parseInt(parts[2], 10)
        const p0 = parseInt(parts[0], 10)
        const p1 = parseInt(parts[1], 10)
        if (p0 > 12) {
          day = p0
          m = p1 - 1
        } else {
          m = p0 - 1
          day = p1
        }
      }
      if (y && !isNaN(y) && m >= 0 && m <= 11 && day && !isNaN(day)) {
        d = new Date(y, m, day)
      }
    }
  }
  if (isNaN(d.getTime())) return str
  const day = d.getDate()
  const year = d.getFullYear()
  const month = MONTH_ABBR[d.getMonth()]
  const j = day % 10
  const k = day % 100
  let suffix = 'th'
  if (j === 1 && k !== 11) suffix = 'st'
  else if (j === 2 && k !== 12) suffix = 'nd'
  else if (j === 3 && k !== 13) suffix = 'rd'
  return `${day}${suffix} ${month}, ${year}`
}

function Enrollment() {
  const enrollmentFormRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [enrollmentPrefills, setEnrollmentPrefills] = useState({})
  const [utms, setUtms] = useState({})
  const [courses, setCourses] = useState([])
  const [coursesLoaded, setCoursesLoaded] = useState(false)
  const courseInputRef = useRef(null)
  const startDateRef = useRef(null)
  const courseWrapperRef = useRef(null)
  const startWrapperRef = useRef(null)
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [batches, setBatches] = useState([])
  const [batchesLoaded, setBatchesLoaded] = useState(false)
  const [startSearch, setStartSearch] = useState('')
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [selectedStartLabel, setSelectedStartLabel] = useState('')
  const [showStartDropdown, setShowStartDropdown] = useState(false)
  const [courseSearch, setCourseSearch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [showCourseDropdown, setShowCourseDropdown] = useState(false)
  const [selectedStudyMode, setSelectedStudyMode] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params || Array.from(params).length === 0) return

    const enrollmentFields = [
      { label: 'Full Name', id: 'entry.1876164443' },
      { label: 'Email', id: 'entry.1501237888' },
      { label: 'Select Course', id: 'entry.516252671' },
      { label: 'Start Date', id: 'entry.1793515843' },
      { label: 'Study Mode', id: 'entry.1961262730' },
      { label: 'Employment Status', id: 'entry.1506501811' }
    ]

    const normalize = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9]/g, '')

    const newPrefills = {}
    const newUtms = {}

    for (const [rawKey, rawVal] of params.entries()) {
      const key = rawKey || ''
      const val = rawVal || ''
      const nkey = normalize(key)

      if (nkey.startsWith('utm')) {
        newUtms[nkey.replace(/[^a-z0-9]/g, '')] = val
        continue
      }

      const matched = enrollmentFields.find((f) => {
        return normalize(f.label) === nkey || normalize(f.id) === nkey || normalize(f.id.replace('entry', '')) === nkey
      })

      if (matched) {
        newPrefills[matched.id] = val
      }

      // support explicit keys like Full%20Name or Email
      if (!matched) {
        const lower = key.toLowerCase()
        if (lower === 'full name' || lower === 'fullname' || lower === 'full_name') {
          newPrefills['entry.1876164443'] = val
        }
        if (lower === 'email') {
          newPrefills['entry.1501237888'] = val
        }
      }
    }

    setEnrollmentPrefills(newPrefills)

    const defaultUtms = {
      utmsource: 'direct',
      utmmedium: 'direct',
      utmcampaign: 'direct',
      utmterm: '',
      utmcontent: '',
    }
    setUtms({ ...defaultUtms, ...newUtms })
  }, [])

  // fetch available courses for the Select Course dropdown
  useEffect(() => {
    let mounted = true
    const fetchCourses = async () => {
      try {
        const res = await fetch('https://app.tokoacademy.org/register/courses.php')
        const json = await res.json()
        if (!mounted) return
        if (json && Array.isArray(json.courses)) {
          setCourses(json.courses)
          setCoursesLoaded(true)
        }
      } catch (err) {
        console.error('Failed to load courses', err)
        setCourses([])
        setCoursesLoaded(true)
      }
    }

    fetchCourses()
    return () => { mounted = false }
  }, [])

  // sync selectedCourse when prefill provides a course
  useEffect(() => {
    if (enrollmentPrefills['entry.516252671']) {
      setSelectedCourse(enrollmentPrefills['entry.516252671'])
    }
    if (enrollmentPrefills['entry.1793515843']) {
      setSelectedStartDate(enrollmentPrefills['entry.1793515843'])
      setSelectedStartLabel(formatNiceDate(enrollmentPrefills['entry.1793515843']))
    }
    if (enrollmentPrefills['entry.1961262730']) {
      setSelectedStudyMode(enrollmentPrefills['entry.1961262730'])
    }
  }, [enrollmentPrefills])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCourseDropdown && courseWrapperRef.current && !courseWrapperRef.current.contains(event.target)) {
        setShowCourseDropdown(false)
      }
      if (showStartDropdown && startWrapperRef.current && !startWrapperRef.current.contains(event.target)) {
        setShowStartDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCourseDropdown, showStartDropdown])

  // fetch batches whenever selectedCourseId changes
  useEffect(() => {
    if (!selectedCourseId) {
      setBatches([])
      setBatchesLoaded(false)
      return
    }
    let mounted = true
    setBatchesLoaded(false)
    const fetchBatches = async () => {
      try {
        const res = await fetch(`https://app.tokoacademy.org/register/batches.php?course_id=${selectedCourseId}`)
        const json = await res.json()
        if (!mounted) return
        if (json && Array.isArray(json.batches)) {
          setBatches(json.batches)
        } else {
          setBatches([])
        }
      } catch (err) {
        console.error('Failed to load batches', err)
        setBatches([])
      } finally {
        setBatchesLoaded(true)
      }
    }
    fetchBatches()
    return () => { mounted = false }
  }, [selectedCourseId])

  const handleEnrollmentSubmit = async (event) => {
    event.preventDefault()
    if (!enrollmentFormRef.current) return

    const formData = new FormData(enrollmentFormRef.current)
    setIsSubmitting(true)
    setSubmitError('')

    try {
      await fetch(FORM_ACTION_ENROLL, { method: 'POST', mode: 'no-cors', body: formData })
      enrollmentFormRef.current.reset()
      setShowModal(true)
    } catch (error) {
      setSubmitError('Something went wrong submitting enrollment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <p className="badge">Toko Academy Enrollment</p>
              <h2>TA ENROLLMENT</h2>
              <p className="lede">Select your course of interest</p>
            </div>
          </header>

          <form ref={enrollmentFormRef} action={FORM_ACTION_ENROLL} method="POST" target="_self" onSubmit={handleEnrollmentSubmit}>
            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="fbzx" value="-4650414733647033103" />
            <input type="hidden" name="pageHistory" value="0" />

            {/* UTM readable */}
            <input type="hidden" name="utm_source" value={utms.utmsource || ''} />
            <input type="hidden" name="utm_medium" value={utms.utmmedium || ''} />
            <input type="hidden" name="utm_campaign" value={utms.utmcampaign || ''} />
            <input type="hidden" name="utm_term" value={utms.utmterm || ''} />
            <input type="hidden" name="utm_content" value={utms.utmcontent || ''} />

            {/* Map UTM to entry.* */}
            <input type="hidden" name="entry.1725703216" value={utms.utmsource || ''} />
            <input type="hidden" name="entry.51282846" value={utms.utmmedium || ''} />
            <input type="hidden" name="entry.1778952006" value={utms.utmcampaign || ''} />
            <input type="hidden" name="entry.2120095781" value={utms.utmterm || ''} />
            <input type="hidden" name="entry.797613698" value={utms.utmcontent || ''} />

            <div className="unified-section">
              <label className="field">
                <span>Full Name</span>
                <input id="1876164443" name="entry.1876164443" type="text" defaultValue={enrollmentPrefills['entry.1876164443'] || ''} />
              </label>

              <label className="field">
                <span>Email</span>
                <input id="1501237888" name="entry.1501237888" type="text" defaultValue={enrollmentPrefills['entry.1501237888'] || ''} />
              </label>

              <label className="field">
                <span>Select Course</span>
                <div className="custom-select-wrapper" ref={courseWrapperRef}>
                  <input
                    ref={courseInputRef}
                    type="text"
                    value={courseSearch || selectedCourse}
                    onChange={(e) => { setCourseSearch(e.target.value); if (e.target.value) setSelectedCourse(''); setShowCourseDropdown(true) }}
                    onFocus={() => { setCourseSearch(''); setShowCourseDropdown(true) }}
                    placeholder="Type to search courses... (e.g., DA101)"
                    className="country-search-input"
                  />
                  <input type="hidden" id="516252671" name="entry.516252671" value={selectedCourse} />
                  {showCourseDropdown && (
                    <div className="country-dropdown">
                      {!coursesLoaded ? (
                        <div className="country-option">Loading courses...</div>
                      ) : courses.length === 0 ? (
                        <div className="country-option">No courses found</div>
                      ) : (
                        courses
                          .filter(c => {
                            const s = (courseSearch || '').toLowerCase()
                            return (
                              !s ||
                              (c.course_name && c.course_name.toLowerCase().includes(s)) ||
                              (c.course_code && c.course_code.toLowerCase().includes(s))
                            )
                          })
                          .map((c) => (
                            <div
                              key={c.course_id}
                              className="country-option"
                              onMouseDown={(e) => { e.preventDefault() }}
                              onClick={() => {
                                const value = `${c.course_name} (${c.course_code})`
                                setSelectedCourse(value)
                                setSelectedCourseId(c.course_id)
                                setSelectedStartDate('')
                                setStartSearch('')
                                setCourseSearch('')
                                // close dropdown then move focus to Start Date
                                setShowCourseDropdown(false)
                                setTimeout(() => {
                                  if (startDateRef && startDateRef.current) startDateRef.current.focus()
                                }, 0)
                              }}
                            >
                              {c.course_name} ({c.course_code})
                            </div>
                          ))
                      )}
                    </div>
                  )}
                </div>
              </label>

              <label className="field">
                <span>Start Date</span>
                <div className="custom-select-wrapper" ref={startWrapperRef}>
                  <input
                    ref={startDateRef}
                    type="text"
                    value={startSearch || selectedStartLabel || selectedStartDate}
                    onChange={(e) => { setStartSearch(e.target.value); if (e.target.value) { setSelectedStartDate(''); setSelectedStartLabel('') }; setShowStartDropdown(true) }}
                    onFocus={() => { setStartSearch(''); setShowStartDropdown(true) }}
                    placeholder="Select a start date..."
                    className="country-search-input"
                    disabled={!selectedCourseId}
                  />
                  <input type="hidden" id="1793515843" name="entry.1793515843" value={selectedStartDate} />
                  {showStartDropdown && (
                    <div className="country-dropdown">
                      {!batchesLoaded ? (
                        <div className="country-option">Loading batches...</div>
                      ) : batches.length === 0 ? (
                        <div className="country-option">No batches available</div>
                      ) : (
                        batches
                          .filter(b => {
                            const s = (startSearch || '').toLowerCase()
                            return (
                              !s ||
                              (b.batch_name && b.batch_name.toLowerCase().includes(s)) ||
                              (b.start_date && b.start_date.includes(s))
                            )
                          })
                          .map((b) => (
                            <div
                              key={b.batch_id}
                              className="country-option"
                              onMouseDown={(e) => { e.preventDefault() }}
                              onClick={() => {
                                const label = `${formatNiceDate(b.start_date)}${b.study_mode ? ` • ${b.study_mode}` : ''}${b.location ? ` • ${b.location}` : ''}`
                                setSelectedStartDate(b.start_date)
                                setSelectedStartLabel(label)
                                setSelectedStudyMode(b.study_mode || '')
                                setStartSearch('')
                                setShowStartDropdown(false)
                              }}
                            >
                              {formatNiceDate(b.start_date)}{b.study_mode ? ` • ${b.study_mode}` : ''}{b.location ? ` • ${b.location}` : ''}
                            </div>
                          ))
                      )}
                    </div>
                  )}
                </div>
              </label>
              <input type="hidden" name="entry.1961262730" value={selectedStudyMode || ''} />

              <div className="field">
                <span className="label">Employment Status</span>
                <div className="option-list">
                  {['Employed','Unemployed','Business','Corp Member','Student'].map((s) => (
                    <label key={s} className="option"><input type="radio" name="entry.1506501811" value={s} defaultChecked={enrollmentPrefills['entry.1506501811'] === s} /> <span>{s}</span></label>
                  ))}
                </div>
              </div>
            </div>

            {submitError ? <p className="error">{submitError}</p> : null}

            <button type="submit" className="submit cta-large" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
          </form>
        </section>

        <section className="quote-card">
          <blockquote className="quote-content">"Your next skill can unlock your next paycheck—start today and stay unstoppable."<cite>— Toko Academy</cite></blockquote>
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

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-badge">Success</div>
            <h3>Enrollment successful</h3>
            <p>Your enrollment was recorded. Please check your email/SMS for details.</p>
            <button className="submit" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Enrollment
