import React, { useRef, useState, useEffect } from 'react'
import './App.css'

const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSftMCHrr_ouZu8nQ_eL0Oe1OpJ8so4iBgN0Xf4Xfsrb7tU-jQ/formResponse'

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

const countries = [
  'Nigeria',
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Côte d\'Ivoire',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]

const citiesByState = {
  'Abia': ['Aba', 'Umuahia', 'Ohafia', 'Arochukwu', 'Bende', 'Ikot Ekpene', 'Orogu', 'Umunneochi', 'Isuikwuato', 'Isiala Ngwa', 'Other'],
  'Adamawa': ['Yola', 'Mubi', 'Girei', 'Ganye', 'Numan', 'Hong', 'Demsa', 'Madagali', 'Maiha', 'Lamurde', 'Fufore', 'Jada', 'Toungo', 'Gombi', 'Song', 'Yamaltu-Deba', 'Michika', 'Mararaba', 'Gulak', 'Wuro-Birji', 'Gurin', 'Other'],
  'Akwa Ibom': ['Uyo', 'Eket', 'Ikot Abasi', 'Oron', 'Ikot Ekpene', 'Abak', 'Etim Ekpo', 'Onna', 'Nsit Ibom', 'Other'],
  'Anambra': ['Awka', 'Onitsha', 'Nnewi', 'Agulu', 'Ekwulobia', 'Ogidi', 'Idemili', 'Onitsha North', 'Nnewi South', 'Other'],
  'Bauchi': ['Bauchi', 'Azare', 'Dass', 'Jada', 'Tafawa Balewa', 'Giade', 'Ningi', 'Katagum', 'Zaki', 'Other'],
  'Bayelsa': ['Yenagoa', 'Sagbama', 'Brass', 'Nembe', 'Ekeremor', 'Ogbia', 'Southern Ijaw', 'Kolokuma-Opokuma', 'Other'],
  'Benue': ['Makurdi', 'Otukpo', 'Gboko', 'Vandeikya', 'Katsina-Ala', 'Ukum', 'Oju', 'Ogbadibo', 'Tarka', 'Other'],
  'Borno': ['Maiduguri', 'Biu', 'Damaturu', 'Gashua', 'Potiskum', 'Gujba', 'Jere', 'Chibok', 'Konduga', 'Other'],
  'Cross River': ['Calabar', 'Ogoja', 'Ikom', 'Obudu', 'Bekwarra', 'Yala', 'Mamfe', 'Obubra', 'Akamkpa', 'Other'],
  'Delta': ['Asaba', 'Warri', 'Sapele', 'Effurun', 'Agbor', 'Oleh', 'Uvwie', 'Isoko', 'Okpe', 'Other'],
  'Ebonyi': ['Abakaliki', 'Onueke', 'Izzi', 'Afikpo', 'Ebonyi', 'Ohaozara', 'Ezza', 'Ishielu', 'Other'],
  'Edo': ['Benin City', 'Auchi', 'Ekpoma', 'Ubiaja', 'Uromi', 'Irrua', 'Edo', 'Sapele', 'Uzebba', 'Other'],
  'Ekiti': ['Ado Ekiti', 'Ikere', 'Ijero', 'Irepodun', 'Oye', 'Gbonyin', 'Ise-Orun', 'Moba', 'Emure', 'Other'],
  'Enugu': ['Enugu', 'Nsukka', 'Agbani', 'Awgu', 'Oji River', 'Enugu Ezike', 'Udi', 'Ezeagu', 'Igbo-Eze', 'Other'],
  'FCT Abuja': ['Abuja', 'Gwagwalada', 'Kuje', 'Kwali', 'Bwari', 'Abaji', 'Bwari', 'Kubwa', 'Other'],
  'Gombe': ['Gombe', 'Bajoga', 'Balanga', 'Dukku', 'Funakaye', 'Kaltungo', 'Kwami', 'Yamaltu', 'Other'],
  'Imo': ['Owerri', 'Mbaise', 'Orlu', 'Okigwe', 'Oguta', 'Isiala Mbano', 'Ikeduru', 'Ohaji-Egbema', 'Other'],
  'Jigawa': ['Dutse', 'Kazaure', 'Gumel', 'Hadejia', 'Kafin Hausa', 'Babbar', 'Guri', 'Ringim', 'Sule Tankarkar', 'Other'],
  'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan', 'Samaru', 'Kachia', 'Ikeja', 'Kagarko', 'Kachia', 'Jaba', 'Other'],
  'Kano': ['Kano', 'Kano City', 'Wudil', 'Karaye', 'Nassarawa', 'Gezawa', 'Gaya', 'Rano', 'Takai', 'Other'],
  'Katsina': ['Katsina', 'Kankara', 'Daura', 'Funtua', 'Malumfashi', 'Rimi', 'Jibia', 'Batagarawa', 'Sabuwa', 'Other'],
  'Kebbi': ['Birnin Kebbi', 'Argungu', 'Bunza', 'Jega', 'Yauri', 'Zuru', 'Maiyama', 'Bagudo', 'Suru', 'Other'],
  'Lagos': ['Lagos', 'Ikeja', 'Lekki', 'Victoria Island', 'Surulere', 'Ajah', 'Ikorodu', 'Epe', 'Badagry', 'Ibeju-Lekki', 'Other'],
  'Nasarawa': ['Lafia', 'Keffi', 'Nasarawa', 'Akwanga', 'Obi', 'Kagarko', 'Gwagwalada', 'Toto', 'Other'],
  'Niger': ['Minna', 'Suleja', 'Bida', 'Kontagora', 'Lapai', 'Tegina', 'Paikoro', 'Rijau', 'Other'],
  'Ogun': ['Abeokuta', 'Ijebu-Ode', 'Sagamu', 'Ifo', 'Ijebu-Igbo', 'Owu', 'Ado-Odo', 'Egbado', 'Other'],
  'Ondo': ['Akure', 'Owo', 'Ose', 'Ondo City', 'Ijare', 'Ijebu-Owo', 'Oka', 'Ile-Oluji', 'Other'],
  'Osun': ['Osogbo', 'Ilesha', 'Iwo', 'Ilesa', 'Ede', 'Ipetu-Ijesa', 'Ila', 'Ibokun', 'Other'],
  'Oyo': ['Ibadan', 'Oyo', 'Ogbomoso', 'Iseyin', 'Saki', 'Ibarapa', 'Ajaawa', 'Orelope', 'Other'],
  'Plateau': ['Jos', 'Bukuru', 'Pankshin', 'Mangu', 'Barkin Ladi', 'Bokkos', 'Shendam', 'Mikang', 'Other'],
  'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Bonny', 'Okrika', 'Port Harcourt City', 'Opobo', 'Andoni', 'Other'],
  'Sokoto': ['Sokoto', 'Gusau', 'Tambuwal', 'Gudu', 'Rabah', 'Wurno', 'Binji', 'Bodinga', 'Other'],
  'Taraba': ['Jalingo', 'Takum', 'Gembu', 'Wukari', 'Zing', 'Gassol', 'Bali', 'Sardauna', 'Other'],
  'Yobe': ['Damaturu', 'Potiskum', 'Gashua', 'Gujba', 'Karasuwa', 'Yunusari', 'Bade', 'Geidam', 'Other'],
  'Zamfara': ['Gusau', 'Kaura Namoda', 'Maru', 'Bakura', 'Talata-Mafara', 'Anka', 'Tsafe', 'Bungudu', 'Other'],
}

function Registration() {
  const formRef = useRef(null)
  const countryWrapperRef = useRef(null)
  const stateWrapperRef = useRef(null)
  const cityWrapperRef = useRef(null)
  const hearWrapperRef = useRef(null)
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

  const [registrationPrefills, setRegistrationPrefills] = useState({})
  const [utms, setUtms] = useState({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params || Array.from(params).length === 0) return

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
    ]

    const normalize = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9]/g, '')

    const newReg = {}
    const newUtms = {}

    for (const [rawKey, rawVal] of params.entries()) {
      const key = rawKey || ''
      const val = rawVal || ''
      const nkey = normalize(key)

      if (nkey.startsWith('utm')) {
        newUtms[nkey.replace(/[^a-z0-9]/g, '')] = val
        continue
      }

      const matched = registrationFields.find((f) => {
        return normalize(f.label) === nkey || normalize(f.id) === nkey || normalize(f.id.replace('entry', '')) === nkey
      })

      if (matched) {
        newReg[matched.id] = val
        if (matched.id === 'entry.1837299617') setSelectedCountry(val)
        if (matched.id === 'entry.1870628818') setSelectedState(val)
        if (matched.id === 'entry.1603432109') setSelectedCity(val)
        if (matched.id === 'entry.2027430660') setSelectedHear(val)
      }

      // also allow common label keys
      if (!matched) {
        // Full Name → try split? skip
      }
    }

    setRegistrationPrefills(newReg)

    // UTMs default to 'direct' if none supplied
    const defaultUtms = {
      utmsource: 'direct',
      utmmedium: 'direct',
      utmcampaign: 'direct',
      utmterm: '',
      utmcontent: '',
    }
    setUtms({ ...defaultUtms, ...newUtms })
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCountryDropdown && countryWrapperRef.current && !countryWrapperRef.current.contains(event.target)) {
        setShowCountryDropdown(false)
      }
      if (showStateDropdown && stateWrapperRef.current && !stateWrapperRef.current.contains(event.target)) {
        setShowStateDropdown(false)
      }
      if (showCityDropdown && cityWrapperRef.current && !cityWrapperRef.current.contains(event.target)) {
        setShowCityDropdown(false)
      }
      if (showHearDropdown && hearWrapperRef.current && !hearWrapperRef.current.contains(event.target)) {
        setShowHearDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCountryDropdown, showStateDropdown, showCityDropdown, showHearDropdown])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    setIsSubmitting(true)
    setSubmitError('')

    try {
      await fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body: formData })
      // redirect to enrollment with prefill of full name + email and carry utms
      const first = formData.get('entry.938403932') || ''
      const middle = formData.get('entry.1886087831') || ''
      const last = formData.get('entry.1177775265') || ''
      const email = formData.get('entry.1176471856') || ''
      const fullName = [first, middle, last].map(s => s.trim()).filter(Boolean).join(' ')
      const url = new URL(window.location.origin + window.location.pathname)
      url.searchParams.set('page', 'enroll')
      if (fullName) url.searchParams.set('Full Name', fullName)
      if (email) url.searchParams.set('Email', email)
      if (utms.utmsource) url.searchParams.set('utm_source', utms.utmsource)
      if (utms.utmmedium) url.searchParams.set('utm_medium', utms.utmmedium)
      if (utms.utmcampaign) url.searchParams.set('utm_campaign', utms.utmcampaign)
      window.location.href = url.toString()
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <p className="badge">Toko Academy Registration Form</p>
              <h2>Join us today</h2>
              <p className="lede">Quick, simple, and secure registration.</p>
            </div>
          </header>

          <form ref={formRef} action={FORM_ACTION} method="POST" target="_self" onSubmit={handleSubmit}>
            <input type="hidden" name="fvv" value="1" />
            <input type="hidden" name="fbzx" value="-1271932783757056429" />
            <input type="hidden" name="pageHistory" value="0,1,2" />

            {/* UTM mapping to registration entry fields */}
            <input type="hidden" name="entry.1725703216" value={utms.utmsource || 'direct'} />
            <input type="hidden" name="entry.51282846" value={utms.utmmedium || 'direct'} />
            <input type="hidden" name="entry.1778952006" value={utms.utmcampaign || 'direct'} />
            <input type="hidden" name="entry.2120095781" value={utms.utmterm || ''} />
            <input type="hidden" name="entry.797613698" value={utms.utmcontent || ''} />

            <div className="unified-section">
              <div className="field-grid-two">
                <label className="field">
                  <span>First Name</span>
                  <input id="938403932" name="entry.938403932" type="text" placeholder="First name" required defaultValue={registrationPrefills['entry.938403932'] || ''} />
                </label>
                <label className="field">
                  <span>Middle Name</span>
                  <input id="1886087831" name="entry.1886087831" type="text" placeholder="Middle name" required defaultValue={registrationPrefills['entry.1886087831'] || ''} />
                </label>
              </div>

              <div className="field-grid-two">
                <label className="field">
                  <span>Last Name</span>
                  <input id="1177775265" name="entry.1177775265" type="text" placeholder="Last name" required defaultValue={registrationPrefills['entry.1177775265'] || ''} />
                </label>
                <label className="field">
                  <span>Age Range</span>
                  <select id="1239723871" name="entry.1239723871" className="select-field" required defaultValue={registrationPrefills['entry.1239723871'] || ''}>
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
                      <input type="radio" name="entry.937345206" value={option} required defaultChecked={registrationPrefills['entry.937345206'] === option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="field">
                <span className="label">Email</span>
                <input id="1176471856" name="entry.1176471856" type="email" placeholder="you@email.com" required defaultValue={registrationPrefills['entry.1176471856'] || ''} />
              </div>

              <div className="field-grid-two">
                <label className="field">
                  <span>Phone</span>
                  <input
                    id="1993772028"
                    name="entry.1993772028"
                    type="tel"
                    placeholder="0800 000 0000"
                    required
                    pattern="^(234\d{10}|0\d{10})$"
                    title="Enter 11 digits (e.g., 08088256055) or 13 digits with country code (e.g., 2348088256055)."
                    defaultValue={registrationPrefills['entry.1993772028'] || ''}
                  />
                </label>
                <div className="field">
                  <span>Country</span>
                  <div className="custom-select-wrapper" ref={countryWrapperRef}>
                    <input type="text" value={countrySearch || selectedCountry} onChange={(e) => { setCountrySearch(e.target.value); if (e.target.value && selectedCountry) { setSelectedCountry('') } setShowCountryDropdown(true) }} onFocus={() => { setCountrySearch(''); setShowCountryDropdown(true) }} placeholder="Type to search countries... (e.g., Nigeria)" className="country-search-input" required />
                    <input type="hidden" id="1837299617" name="entry.1837299617" value={selectedCountry} />
                    {showCountryDropdown && (
                      <div className="country-dropdown">
                        {countries.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())).map(country => (
                          <div key={country} className="country-option" onClick={() => { 
                            setSelectedCountry(country); 
                            setCountrySearch(''); 
                            setShowCountryDropdown(false);
                            if (country !== 'Nigeria') {
                              setSelectedState('');
                              setSelectedCity('');
                              setStateSearch('');
                              setCitySearch('');
                            }
                          }}>{country}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="field-row">
                {selectedCountry === 'Nigeria' ? (
                  <div className="field">
                    <span>State / Region</span>
                    <div className="custom-select-wrapper" ref={stateWrapperRef}>
                      <input type="text" value={stateSearch || selectedState} onChange={(e) => { setStateSearch(e.target.value); setShowStateDropdown(true); if (e.target.value) setSelectedState('') }} onFocus={() => setShowStateDropdown(true)} className="country-search-input" placeholder="Type to search states... (e.g., Lagos)" required />
                      <input type="hidden" id="1870628818" name="entry.1870628818" value={selectedState} />
                      {showStateDropdown && (
                        <div className="country-dropdown">
                          {nigerianStates.filter(s => s.toLowerCase().includes(stateSearch.toLowerCase())).map(state => (
                            <div key={state} className="country-option" onClick={() => { setSelectedState(state); setStateSearch(''); setShowStateDropdown(false) }}>{state}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <label className="field">
                    <span>State / Region</span>
                    <input id="1870628818" name="entry.1870628818" type="text" placeholder="State / Region" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required />
                  </label>
                )}

                {selectedCountry === 'Nigeria' && selectedState ? (
                  <div className="field">
                    <span>City</span>
                    <div className="custom-select-wrapper" ref={cityWrapperRef}>
                      <input type="text" value={citySearch || selectedCity} onChange={(e) => { setCitySearch(e.target.value); setShowCityDropdown(true); if (e.target.value) setSelectedCity('') }} onFocus={() => setShowCityDropdown(true)} className="country-search-input" placeholder="Type to search cities..." required />
                      <input type="hidden" id="1603432109" name="entry.1603432109" value={selectedCity} />
                      {showCityDropdown && (
                        <div className="country-dropdown">
                          {(citiesByState[selectedState] || []).filter(c => c.toLowerCase().includes(citySearch.toLowerCase())).map(city => (
                            <div key={city} className="country-option" onClick={() => { setSelectedCity(city); setCitySearch(''); setShowCityDropdown(false) }}>{city}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <label className="field">
                    <span>City</span>
                    <input id="1603432109" name="entry.1603432109" type="text" placeholder="City" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required />
                  </label>
                )}
              </div>

              <label className="field">
                <span>Referral Code (optional)</span>
                <input id="1455106736" name="entry.1455106736" type="text" placeholder="Got one? Drop it here" defaultValue={registrationPrefills['entry.1455106736'] || ''} />
              </label>

              <div className="field">
                <span className="label">How did you hear about us?</span>
                <div className="custom-select-wrapper" ref={hearWrapperRef}>
                  <input type="text" value={hearSearch || selectedHear || registrationPrefills['entry.2027430660'] || ''} onChange={(e) => { setHearSearch(e.target.value); setSelectedHear(e.target.value); setShowHearDropdown(true) }} onFocus={() => setShowHearDropdown(true)} className="country-search-input" placeholder="Type to search options..." required />
                  <input type="hidden" name="entry.2027430660" value={selectedHear || registrationPrefills['entry.2027430660'] || ''} />
                  {showHearDropdown && (
                    <div className="country-dropdown">
                      {hearOptions.filter(opt => opt.toLowerCase().includes((hearSearch || '').toLowerCase())).map(opt => (
                        <div key={opt} className="country-option" onClick={() => { setSelectedHear(opt); setHearSearch(''); setShowHearDropdown(false) }}>{opt}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="field">
                <span className="label">Learn2Earn - Referral program</span>
                <p style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '1rem', lineHeight: '1.6' }}>
                  Join our Learn2Earn program and earn rewards by referring friends and colleagues to our courses. 
                  Plus, become eligible for real rewards by participating in our online games. It's a win-win way to 
                  grow your network while earning!
                </p>
                <div className="pill-group">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="pill-option">
                      <input
                        type="radio"
                        name="entry.2147449936"
                        value={option}
                        required
                        defaultChecked={(registrationPrefills['entry.2147449936'] || 'Yes') === option}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="field">
                <span>Comments (optional)</span>
                <textarea id="1329859687" name="entry.1329859687" rows="3" placeholder="Share anything we should know" defaultValue={registrationPrefills['entry.1329859687'] || ''} />
              </label>
            </div>

            {submitError ? <p className="error">{submitError}</p> : null}

            <button type="submit" className="submit cta-large" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Select Course'}</button>
            <p className="footnote">By submitting, you agree to hear from Toko Academy about programs.</p>
          </form>
        </section>

        <section className="quote-card">
          <blockquote className="quote-content">"Learning a digital skill today is a passport to every opportunity tomorrow."<cite>— Toko Academy</cite></blockquote>
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

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-badge">Success</div>
            <h3>Registration successful</h3>
            <p>Your registration was successful. You'll be redirected to enrollment.</p>
            <button className="submit" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Registration
