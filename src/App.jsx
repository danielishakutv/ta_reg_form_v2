import { useRef, useState, useEffect } from 'react'
import './App.css'

const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSftMCHrr_ouZu8nQ_eL0Oe1OpJ8so4iBgN0Xf4Xfsrb7tU-jQ/formResponse'

const FORM_ACTION_ENROLL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeK112lf9ejRixOsTcNwQH6jUJ16IobXBI08rKhJ-TwJ_jANg/formResponse'

const hearOptions = [
  'Family, Friend or Colleague',
  'WhatsApp Status, Group, Message, Share',
  'Social Media (Facebook, Instagram, LinkedIn, X, etc)',
  'Google Search',
  'CDS Visit / NYSC Program',
  'Flyer / Banner / Billboard',
  'Event / Program / Workshop, etc',
  'Other',
]

const learnOptions = ['Yes', 'No']

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
  'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos',
  'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
  'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
]

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
  'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
]

const citiesByState = {
  'Abia': ['Aba', 'Ohafia', 'Arochukwu', 'Isuikwuato', 'Umunneochi', 'Other'],
  'Adamawa': ['Yola', 'Mubi', 'Girei', 'Ganye', 'Karim Lamido', 'Other'],
  'Akwa Ibom': ['Uyo', 'Ikot Ekpene', 'Oron', 'Etim Ekpo', 'Ibeno', 'Other'],
  'Anambra': ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Agulu', 'Other'],
  'Bauchi': ['Bauchi', 'Zaria', 'Misau', 'Dass', 'Lere', 'Other'],
  'Bayelsa': ['Yenagoa', 'Brass', 'Sangana', 'Ekeremor', 'Nembe', 'Other'],
  'Benue': ['Makurdi', 'Gboko', 'Otukpo', 'Enugu', 'Katsina-Ala', 'Other'],
  'Borno': ['Maiduguri', 'Biu', 'Damaturu', 'Monguno', 'Gwoza', 'Other'],
  'Cross River': ['Calabar', 'Ogoja', 'Ikom', 'Akamkpa', 'Buea', 'Other'],
  'Delta': ['Asaba', 'Warri', 'Sapele', 'Ughelli', 'Burutu', 'Other'],
  'Ebonyi': ['Abakaliki', 'Afikpo', 'Onueke', 'Ezza', 'Uburu', 'Other'],
  'Edo': ['Benin City', 'Auchi', 'Uromi', 'Irrua', 'Ekpoma', 'Other'],
  'Ekiti': ['Ado-Ekiti', 'Ikere-Ekiti', 'Ijero-Ekiti', 'Akure', 'Moba', 'Other'],
  'Enugu': ['Enugu', 'Nsukka', 'Agbani', 'Coal Camp', 'Udi', 'Other'],
  'FCT Abuja': ['Abuja', 'Gwagwalada', 'Kuje', 'Bwari', 'Karshi', 'Other'],
  'Gombe': ['Gombe', 'Bajoga', 'Deba', 'Potiskum', 'Nafada', 'Other'],
  'Imo': ['Owerri', 'Aba', 'Ohafia', 'Mbaise', 'Okigwe', 'Other'],
  'Jigawa': ['Dutse', 'Kazaure', 'Hadejia', 'Birnin Kudu', 'Jahun', 'Other'],
  'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan', 'Kudan', 'Kachia', 'Other'],
  'Kano': ['Kano', 'Kumbotso', 'Bichi', 'Dawakin Kudu', 'Gwarzo', 'Other'],
  'Katsina': ['Katsina', 'Kankia', 'Daura', 'Rimi', 'Matazun', 'Other'],
  'Kebbi': ['Birnin Kebbi', 'Bunza', 'Argungu', 'Suru', 'Kamba', 'Other'],
  'Kogi': ['Lokoja', 'Okene', 'Idah', 'Kabba', 'Ankpa', 'Other'],
  'Kwara': ['Ilorin', 'Offa', 'Jebba', 'Omu-Aran', 'Lafiagi', 'Other'],
  'Lagos': ['Lagos', 'Ikeja', 'Lekki', 'VI', 'Surulere', 'Yaba', 'Ikorodu', 'Badagry', 'Other'],
  'Nasarawa': ['Lafia', 'Keffi', 'Akwanga', 'Obi', 'Nasarawa Eggon', 'Other'],
  'Niger': ['Minna', 'Suleja', 'Bida', 'Zaria', 'Lapai', 'Other'],
  'Ogun': ['Abeokuta', 'Ijebu-Ode', 'Sagamu', 'Ilaro', 'Ota', 'Other'],
  'Ondo': ['Akure', 'Owo', 'Ikare', 'Ondo', 'Ore', 'Other'],
  'Osun': ['Osogbo', 'Ilesha', 'Iwo', 'Ibadan', 'Ikire', 'Other'],
  'Oyo': ['Ibadan', 'Oyo', 'Ogbomosho', 'Ijebu', 'Sepeteri', 'Other'],
  'Plateau': ['Jos', 'Bukuru', 'Pankshin', 'Vom', 'Bokkos', 'Other'],
  'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Ikeja', 'Bonny', 'Opobo', 'Other'],
  'Sokoto': ['Sokoto', 'Gusau', 'Wurno', 'Gwadabawa', 'Goronyo', 'Other'],
  'Taraba': ['Jalingo', 'Wukari', 'Zing', 'Gembu', 'Sardauna', 'Other'],
  'Yobe': ['Damaturu', 'Potiskum', 'Katagum', 'Gashua', 'Nguru', 'Other'],
  'Zamfara': ['Gusau', 'Kaura Namoda', 'Talka', 'Maradun', 'Shinkafi', 'Other']
}

function App() {
  const formRef = useRef(null)
  const enrollmentFormRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [countrySearch, setCountrySearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('Nigeria')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  const [stateSearch, setStateSearch] = useState('')
  const [selectedState, setSelectedState] = useState('Adamawa')
  const [showStateDropdown, setShowStateDropdown] = useState(false)

  const [citySearch, setCitySearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('Yola')
  const [showCityDropdown, setShowCityDropdown] = useState(false)

  const [hearSearch, setHearSearch] = useState('')
  const [selectedHear, setSelectedHear] = useState('')
  const [showHearDropdown, setShowHearDropdown] = useState(false)
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [enrollmentFullName, setEnrollmentFullName] = useState('')
  const [enrollmentEmail, setEnrollmentEmail] = useState('')
  const [enrollmentPrefills, setEnrollmentPrefills] = useState({})
  const [utms, setUtms] = useState({})
  const [registrationPrefills, setRegistrationPrefills] = useState({})

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  )

  const filteredStates = nigerianStates.filter((state) =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  )

  const availableCities = selectedState ? citiesByState[selectedState] || [] : []
  const filteredCities = availableCities.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  )

  const filteredHearOptions = hearOptions.filter((option) =>
    option.toLowerCase().includes(hearSearch.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-select-wrapper')) {
        setShowCountryDropdown(false)
        setCountrySearch('')
        setShowStateDropdown(false)
        setStateSearch('')
        setShowCityDropdown(false)
        setCitySearch('')
        setShowHearDropdown(false)
        setHearSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Load saved prefills/UTM from localStorage and parse URL query params
  useEffect(() => {
    try {
      const savedEnrollPrefills = JSON.parse(localStorage.getItem('ta_enrollment_prefills') || '{}') || {}
      const savedUtms = JSON.parse(localStorage.getItem('ta_enrollment_utms') || '{}') || {}
      // Do not load registration prefills from localStorage — registration defaults remain empty

      if (Object.keys(savedEnrollPrefills).length > 0) {
        setEnrollmentPrefills(savedEnrollPrefills)
        if (savedEnrollPrefills['entry.1876164443']) setEnrollmentFullName(savedEnrollPrefills['entry.1876164443'])
        if (savedEnrollPrefills['entry.1501237888']) setEnrollmentEmail(savedEnrollPrefills['entry.1501237888'])
        // Do not auto-open enrollment here; opening is controlled by `form` param only
      }

      if (Object.keys(savedUtms).length > 0) {
        setUtms(savedUtms)
        // Do not auto-open enrollment just because UTMs exist; opening is driven
        // by explicit enrollment prefills or an explicit form flag (`form=ta_enr`).
      }

      // registrationPrefills are intentionally NOT loaded from storage here

      const params = new URLSearchParams(window.location.search)
      if (!params || Array.from(params).length === 0) return
      const formFlag = (params.get('form') || '').toLowerCase()

      const enrollmentFields = [
        { label: 'Full Name', id: 'entry.1876164443' },
        { label: 'Email', id: 'entry.1501237888' },
        { label: 'Select Course', id: 'entry.516252671' },
        { label: 'Start Date', id: 'entry.1793515843' },
        { label: 'Study Mode', id: 'entry.1961262730' },
        { label: 'Employment Status', id: 'entry.1506501811' }
      ]

      const registrationFields = [
        { label: 'First Name', id: 'entry.938403932' },
        { label: 'Middle Name', id: 'entry.1886087831' },
        { label: 'Last Name', id: 'entry.1177775265' },
        { label: 'Email', id: 'entry.1176471856' },
        { label: 'Phone', id: 'entry.1993772028' },
        { label: 'Country', id: 'entry.1837299617' },
        { label: 'State', id: 'entry.1870628818' },
        { label: 'City', id: 'entry.1603432109' },
        { label: 'Referral Code', id: 'entry.1455106736' },
        { label: 'How did you hear about us', id: 'entry.2027430660' },
        { label: 'Age Range', id: 'entry.1239723871' },
        { label: 'Gender', id: 'entry.937345206' },
        { label: 'Comments', id: 'entry.1329859687' }
      ]

      const normalize = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9]/g, '')

      const newPrefills = { ...savedEnrollPrefills }
      const newUtms = { ...savedUtms }
      const newRegPrefills = { ...savedRegPrefills }

      for (const [rawKey, rawVal] of params.entries()) {
        const key = rawKey || ''
        const val = rawVal || ''
        const nkey = normalize(key)

        // capture utm params explicitly
        if (nkey.startsWith('utm')) {
          // normalize keys to utmsource, utmmedium, etc
          newUtms[nkey.replace(/[^a-z0-9]/g, '')] = val
          continue
        }

        // try to match by enrollment field label or by entry.* id
        const matchedEnroll = enrollmentFields.find((f) => {
          return normalize(f.label) === nkey || normalize(f.id) === nkey || normalize(f.id.replace('entry', '')) === nkey
        })

        if (matchedEnroll) {
          // only apply enrollment prefills when URL explicitly targets enrollment or when no explicit form flag
          if (!formFlag || formFlag === 'ta_enr') {
            newPrefills[matchedEnroll.id] = val
            if (matchedEnroll.id === 'entry.1876164443') setEnrollmentFullName(val)
            if (matchedEnroll.id === 'entry.1501237888') setEnrollmentEmail(val)
            continue
          }
        }

        // try to match registration fields
        const matchedReg = registrationFields.find((f) => {
          return normalize(f.label) === nkey || normalize(f.id) === nkey || normalize(f.id.replace('entry', '')) === nkey
        })

        if (matchedReg) {
          // only apply registration prefills when URL explicitly targets registration or when no explicit form flag
          if (!formFlag || formFlag === 'ta_reg') {
            newRegPrefills[matchedReg.id] = val
            // set some controlled fields immediately
            if (matchedReg.id === 'entry.1837299617') setSelectedCountry(val)
            if (matchedReg.id === 'entry.1870628818') setSelectedState(val)
            if (matchedReg.id === 'entry.1603432109') setSelectedCity(val)
            if (matchedReg.id === 'entry.2027430660') setSelectedHear(val)
            continue
          }
        }

        // Fuzzy match for enrollment
        const fuzzyEnroll = enrollmentFields.find((f) => normalize(f.label).includes(nkey) || nkey.includes(normalize(f.label)))
        if (fuzzyEnroll) {
          if (!formFlag || formFlag === 'ta_enr') {
            newPrefills[fuzzyEnroll.id] = val
            if (fuzzyEnroll.id === 'entry.1876164443') setEnrollmentFullName(val)
            if (fuzzyEnroll.id === 'entry.1501237888') setEnrollmentEmail(val)
            continue
          }
        }

        // Fuzzy match for registration
        const fuzzyReg = registrationFields.find((f) => normalize(f.label).includes(nkey) || nkey.includes(normalize(f.label)))
        if (fuzzyReg) {
          if (!formFlag || formFlag === 'ta_reg') {
            newRegPrefills[fuzzyReg.id] = val
            if (fuzzyReg.id === 'entry.1837299617') setSelectedCountry(val)
            if (fuzzyReg.id === 'entry.1870628818') setSelectedState(val)
            if (fuzzyReg.id === 'entry.1603432109') setSelectedCity(val)
            if (fuzzyReg.id === 'entry.2027430660') setSelectedHear(val)
          }
        }
      }

      if (Object.keys(newPrefills).length > 0) {
        setEnrollmentPrefills(newPrefills)
        localStorage.setItem('ta_enrollment_prefills', JSON.stringify(newPrefills))
        // Do not auto-open enrollment here; opening is controlled by `form` param only
      }

      if (Object.keys(newRegPrefills).length > 0) {
        // apply registration prefills only for this session (do not persist)
        setRegistrationPrefills(newRegPrefills)
      }

      // Ensure we have sensible UTM defaults when none are present
      const defaultUtms = {
        utmsource: 'direct',
        utmmedium: 'direct',
        utmcampaign: 'direct',
        utmterm: '',
        utmcontent: '',
      }

      if (Object.keys(newUtms).length > 0) {
        setUtms(newUtms)
        localStorage.setItem('ta_enrollment_utms', JSON.stringify(newUtms))
      } else if (Object.keys(savedUtms).length > 0) {
        // savedUtms already handled by newUtms init, but keep safety; do not auto-open
        setUtms(savedUtms)
      } else {
        // No UTM info found anywhere — default to 'direct'
        setUtms(defaultUtms)
        localStorage.setItem('ta_enrollment_utms', JSON.stringify(defaultUtms))
      }

      // Only decide which form to show based on `form` query parameter.
      // - form=ta_enr => show enrollment
      // - form=ta_reg or absent => show registration
      if (formFlag === 'ta_enr') {
        setShowEnrollmentForm(true)
      } else {
        setShowEnrollmentForm(false)
      }
    } catch (err) {
      // silent
    }
  }, [])

  // Persist prefills and utm values to localStorage whenever they change
  useEffect(() => {
    try {
      if (enrollmentPrefills && Object.keys(enrollmentPrefills).length > 0) {
        localStorage.setItem('ta_enrollment_prefills', JSON.stringify(enrollmentPrefills))
      }
      if (utms && Object.keys(utms).length > 0) {
        localStorage.setItem('ta_enrollment_utms', JSON.stringify(utms))
      }
      if (registrationPrefills && Object.keys(registrationPrefills).length > 0) {
        localStorage.setItem('ta_registration_prefills', JSON.stringify(registrationPrefills))
      }
    } catch (err) {
      // ignore storage errors
    }
  }, [enrollmentPrefills, utms, registrationPrefills])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    setIsSubmitting(true)
    setSubmitError('')

    try {
      await fetch(FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
      // collect name + email to prefill enrollment
      const first = formData.get('entry.938403932') || ''
      const middle = formData.get('entry.1886087831') || ''
      const last = formData.get('entry.1177775265') || ''
      const email = formData.get('entry.1176471856') || ''
      const fullName = [first, middle, last].map(s => s.trim()).filter(Boolean).join(' ')
      setEnrollmentFullName(fullName)
      setEnrollmentEmail(email)
      formRef.current.reset()
      // After successful registration submission, show the enrollment (course selection) page
      setShowEnrollmentForm(true)
    } catch (error) {
      setSubmitError('Something went wrong. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEnrollmentSubmit = async (event) => {
    event.preventDefault()
    if (!enrollmentFormRef.current) return

    const formData = new FormData(enrollmentFormRef.current)
    setIsSubmitting(true)
    setSubmitError('')

    try {
      await fetch(FORM_ACTION_ENROLL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
      enrollmentFormRef.current.reset()
      setEnrollmentFullName('')
      setEnrollmentEmail('')
      setShowModal(true)
      setShowEnrollmentForm(false)
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
        {/* Header with Logo */}
        <header className="header-section">
          <img src="/toko-logo.png" alt="Toko Academy" className="brand-logo" />
        </header>

        {/* Registration Form / Enrollment flow */}
        {!showEnrollmentForm ? (
          <section className="card form-card">
            <header className="card-header">
              <div>
                <p className="badge">Toko Academy Registration Form</p>
                <h2>Join us today</h2>
                <p className="lede">Quick, simple, and secure registration.</p>
              </div>
            </header>

            <form
              ref={formRef}
              action={FORM_ACTION}
              method="POST"
              target="_self"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="fvv" value="1" />
              <input type="hidden" name="fbzx" value="-1271932783757056429" />
              <input type="hidden" name="pageHistory" value="0,1,2" />
              {/* Map UTM values into registration Google Form entry fields (if present) */}
              <input type="hidden" name="entry.1725703216" value={utms.utmsource || enrollmentPrefills['entry.1725703216'] || ''} />
              <input type="hidden" name="entry.51282846" value={utms.utmmedium || enrollmentPrefills['entry.51282846'] || ''} />
              <input type="hidden" name="entry.1778952006" value={utms.utmcampaign || enrollmentPrefills['entry.1778952006'] || ''} />
              <input type="hidden" name="entry.2120095781" value={utms.utmterm || enrollmentPrefills['entry.2120095781'] || ''} />
              <input type="hidden" name="entry.797613698" value={utms.utmcontent || enrollmentPrefills['entry.797613698'] || ''} />

              {/* All fields in one section */}
              <div className="unified-section">
              <div className="field-grid-two">
                <label className="field">
                  <span>First Name</span>
                  <input
                    id="938403932"
                    name="entry.938403932"
                    type="text"
                    placeholder="First name"
                    defaultValue={registrationPrefills['entry.938403932'] || ''}
                    required
                  />
                </label>
                <label className="field">
                  <span>Middle Name</span>
                  <input
                    id="1886087831"
                    name="entry.1886087831"
                    type="text"
                    placeholder="Middle name (optional)"
                    defaultValue={registrationPrefills['entry.1886087831'] || ''}
                  />
                </label>
              </div>

              <div className="field-grid-two">
                <label className="field">
                  <span>Last Name</span>
                  <input
                    id="1177775265"
                    name="entry.1177775265"
                    type="text"
                    placeholder="Last name"
                    defaultValue={registrationPrefills['entry.1177775265'] || ''}
                    required
                  />
                </label>
                <label className="field">
                  <span>Age Range</span>
                  <select
                    id="1239723871"
                    name="entry.1239723871"
                    className="select-field"
                    defaultValue={registrationPrefills['entry.1239723871'] || ''}
                  >
                    <option value="">Select age range</option>
                    <option value="5 - 12">5 - 12</option>
                    <option value="13 - 17">13 - 17</option>
                    <option value="18 - 24">18 - 24</option>
                    <option value="25 - 31">25 - 31</option>
                    <option value="32 Above">32 Above</option>
                  </select>
                </label>
              </div>

              <div className="field">
                <span className="label">Gender</span>
                <div className="pill-group">
                  {['Male', 'Female'].map((option) => (
                    <label key={option} className="pill-option">        
                      <input
                        type="radio"
                        name="entry.937345206"
                        value={option}
                        required
                        defaultChecked={registrationPrefills['entry.937345206'] === option}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="field">
                <span className="label">Email</span>
                <input
                  id="1176471856"
                  name="entry.1176471856"
                  type="email"
                    placeholder="you@email.com"
                    defaultValue={registrationPrefills['entry.1176471856'] || ''}
                />
              </div>

              <div className="field-grid-two">
                <label className="field">
                  <span>Phone</span>
                  <input
                    id="1993772028"
                    name="entry.1993772028"
                    type="tel"
                    placeholder="0800 000 0000"
                    defaultValue={registrationPrefills['entry.1993772028'] || ''}
                  />
                </label>
                <div className="field">
                  <span>Country</span>
                  <div className="custom-select-wrapper">
                    <input
                      type="text"
                      value={countrySearch || selectedCountry}
                      onChange={(e) => {
                        setCountrySearch(e.target.value)
                        if (e.target.value && selectedCountry) {        
                          setSelectedCountry('')
                        }
                        setShowCountryDropdown(true)
                      }}
                      onFocus={() => {
                        setCountrySearch('')
                        setShowCountryDropdown(true)
                      }}
                      placeholder="Type to search countries... (e.g., Ni
geria)"                                                                                       className="country-search-input"
                    />
                    <input
                      type="hidden"
                      id="1837299617"
                      name="entry.1837299617"
                      value={selectedCountry}
                    />
                    {showCountryDropdown && (
                      <div className="country-dropdown">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <div
                              key={country}
                              className="country-option"
                              onClick={() => {
                                setSelectedCountry(country)
                                setCountrySearch('')
                                setShowCountryDropdown(false)
                              }}
                            >
                              {country}
                            </div>
                          ))
                        ) : (
                          <div className="country-option no-results">No 
countries found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="field-row">
                {selectedCountry === 'Nigeria' ? (
                  <div className="field">
                    <span>State</span>
                    <div className="custom-select-wrapper">
                      <input
                        type="text"
                        value={stateSearch || selectedState}
                        onChange={(e) => {
                          setStateSearch(e.target.value)
                          setShowStateDropdown(true)
                          if (e.target.value) {
                            setSelectedState('')
                          }
                        }}
                        onFocus={() => setShowStateDropdown(true)}      
                        className="country-search-input"
                        placeholder="Type to search states... (e.g., Lag
os)"                                                                                          />
                      <input
                        type="hidden"
                        id="1870628818"
                        name="entry.1870628818"
                        value={selectedState}
                      />
                      {showStateDropdown && (
                        <div className="country-dropdown">
                          {filteredStates.length > 0 ? (
                            filteredStates.map((state) => (
                              <div
                                key={state}
                                className="country-option"
                                onClick={() => {
                                  setSelectedState(state)
                                  setStateSearch('')
                                  setShowStateDropdown(false)
                                }}
                              >
                                {state}
                              </div>
                            ))
                          ) : (
                            <div className="country-option no-results">No 
states found</div>                                                                              )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <label className="field">
                    <span>State</span>
                    <input
                      id="1870628818"
                      name="entry.1870628818"
                      type="text"
                      placeholder="State"
                      defaultValue={registrationPrefills['entry.1870628818'] || ''}
                    />
                  </label>
                )}
                {selectedCountry === 'Nigeria' && selectedState ? (     
                  <div className="field">
                    <span>City</span>
                    <div className="custom-select-wrapper">
                      <input
                        type="text"
                        value={citySearch || selectedCity}
                        onChange={(e) => {
                          setCitySearch(e.target.value)
                          setShowCityDropdown(true)
                          if (e.target.value) {
                            setSelectedCity('')
                          }
                        }}
                        onFocus={() => setShowCityDropdown(true)}       
                        className="country-search-input"
                        placeholder="Type to search cities..."
                      />
                      <input
                        type="hidden"
                        id="1603432109"
                        name="entry.1603432109"
                        value={selectedCity}
                      />
                      {showCityDropdown && (
                        <div className="country-dropdown">
                          {filteredCities.length > 0 ? (
                            filteredCities.map((city) => (
                              <div
                                key={city}
                                className="country-option"
                                onClick={() => {
                                  setSelectedCity(city)
                                  setCitySearch('')
                                  setShowCityDropdown(false)
                                }}
                              >
                                {city}
                              </div>
                            ))
                          ) : (
                            <div className="country-option no-results">N
o cities found</div>                                                                              )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <label className="field">
                    <span>City</span>
                    <input id="1603432109" name="entry.1603432109" type=
  "text" placeholder="Lagos" defaultValue={registrationPrefills['entry.1603432109'] || ''} />                                                             </label>
                )}
              </div>

              <label className="field">
                <span>Referral Code (optional)</span>
                <input
                  id="1455106736"
                  name="entry.1455106736"
                  type="text"
                  placeholder="Got one? Drop it here"
                  defaultValue={registrationPrefills['entry.1455106736'] || ''}
                />
              </label>

                <div className="field">
                <span className="label">How did you hear about us?</span>
                                                                                       <div className="custom-select-wrapper">
                  <input
                    type="text"
                    value={hearSearch || selectedHear || registrationPrefills['entry.2027430660'] || ''}
                    onChange={(e) => {
                      setHearSearch(e.target.value)
                      setShowHearDropdown(true)
                      if (e.target.value) {
                        setSelectedHear('')
                      }
                    }}
                    onFocus={() => setShowHearDropdown(true)}
                    className="country-search-input"
                    placeholder="Type to search options..."
                  />
                  <input
                    type="hidden"
                    name="entry.2027430660"
                    value={selectedHear || registrationPrefills['entry.2027430660'] || ''}
                  />
                  {showHearDropdown && (
                    <div className="country-dropdown">
                      {filteredHearOptions.length > 0 ? (
                        filteredHearOptions.map((option) => (
                          <div
                            key={option}
                            className="country-option"
                            onClick={() => {
                              setSelectedHear(option)
                              setHearSearch('')
                              setShowHearDropdown(false)
                            }}
                          >
                            {option}
                          </div>
                        ))
                      ) : (
                        <div className="country-option no-results">No op
tions found</div>                                                                             )}
                    </div>
                  )}
                </div>
              </div>

              <div className="field">
                <span className="label">Learn2Earn - Referral program</span>
                <div className="pill-group">
                  {learnOptions.map((option) => (
                    <label key={option} className="pill-option">
                      <input type="radio" name="entry.2147449936" value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="field">
                <span>Comments (optional)</span>
                <textarea
                  id="1329859687"
                  name="entry.1329859687"
                  rows="3"
                  placeholder="Share anything we should know"
                  defaultValue={registrationPrefills['entry.1329859687'] || ''}
                />
              </label>
            </div>

              {submitError ? <p className="error">{submitError}</p> : null}

              <button type="submit" className="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Select Course'}
              </button>
              <p className="footnote">By submitting, you agree to hear from Toko Academy about programs.</p>
            </form>
          </section>
        ) : (
          <section className="card form-card">
            <header className="card-header">
              <div>
                <p className="badge">Toko Academy Enrollment</p>
                <h2>TA ENROLLMENT</h2>
                <p className="lede">Select your course of interest</p>
              </div>
            </header>

            <form
              ref={enrollmentFormRef}
              action={FORM_ACTION_ENROLL}
              method="POST"
              target="_self"
              onSubmit={handleEnrollmentSubmit}
            >
              <input type="hidden" name="fvv" value="1" />
              <input type="hidden" name="fbzx" value="-4650414733647033103" />
              <input type="hidden" name="pageHistory" value="0" />
              {/* UTM hidden inputs (readable names) */}
              <input type="hidden" name="utm_source" value={utms.utmsource || ''} />
              <input type="hidden" name="utm_medium" value={utms.utmmedium || ''} />
              <input type="hidden" name="utm_campaign" value={utms.utmcampaign || ''} />
              <input type="hidden" name="utm_term" value={utms.utmterm || ''} />
              <input type="hidden" name="utm_content" value={utms.utmcontent || ''} />

              {/* Map UTM values to Google Form entry.* fields (IDs provided) */}
              <input type="hidden" name="entry.1725703216" value={utms.utmsource || enrollmentPrefills['entry.1725703216'] || ''} />
              <input type="hidden" name="entry.51282846" value={utms.utmmedium || enrollmentPrefills['entry.51282846'] || ''} />
              <input type="hidden" name="entry.1778952006" value={utms.utmcampaign || enrollmentPrefills['entry.1778952006'] || ''} />
              <input type="hidden" name="entry.2120095781" value={utms.utmterm || enrollmentPrefills['entry.2120095781'] || ''} />
              <input type="hidden" name="entry.797613698" value={utms.utmcontent || enrollmentPrefills['entry.797613698'] || ''} />

              <div className="unified-section">
                <label className="field">
                  <span>Full Name</span>
                  <input id="1876164443" name="entry.1876164443" type="text" defaultValue={enrollmentFullName || enrollmentPrefills['entry.1876164443'] || ''} />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input id="1501237888" name="entry.1501237888" type="text" defaultValue={enrollmentEmail || enrollmentPrefills['entry.1501237888'] || ''} />
                </label>

                <label className="field">
                  <span>Select Course</span>
                  <input id="516252671" name="entry.516252671" type="text" defaultValue={enrollmentPrefills['entry.516252671'] || ''} />
                </label>

                <label className="field">
                  <span>Start Date</span>
                  <input id="1793515843" name="entry.1793515843" type="text" defaultValue={enrollmentPrefills['entry.1793515843'] || ''} />
                </label>

                <div className="field">
                  <span className="label">Study Mode</span>
                  <div className="option-list">
                    <label className="option">
                        <input type="radio" name="entry.1961262730" value="Online" defaultChecked={enrollmentPrefills['entry.1961262730'] === 'Online'} />
                      <span>Online</span>
                    </label>
                    <label className="option">
                        <input type="radio" name="entry.1961262730" value="In-Person" defaultChecked={enrollmentPrefills['entry.1961262730'] === 'In-Person'} />
                      <span>In-Person</span>
                    </label>
                  </div>
                </div>

                <div className="field">
                  <span className="label">Employment Status</span>
                  <div className="option-list">
                    {['Employed','Unemployed','Business','Corp Member','Student'].map((s) => (
                      <label key={s} className="option">
                        <input type="radio" name="entry.1506501811" value={s} defaultChecked={enrollmentPrefills['entry.1506501811'] === s} />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button type="submit" className="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </section>
        )}

        {/* Quote Card */}
        <section className="quote-card">
          <blockquote className="quote-content">
            "Learning a digital skill today is a passport to every opportunity tomorrow."
            <cite>— Toko Academy</cite>
          </blockquote>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#programs">Programs</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Location</h4>
              <p>Nigeria</p>
              <p><a href="mailto:hello@tokoacademy.com">hello@tokoacademy.com</a></p>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Toko Academy. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-badge">Success</div>
            <h3>Registration successful</h3>
            <p>
              Your registration was successful. Please check your email or SMS for further information.
            </p>
            <button className="submit" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
