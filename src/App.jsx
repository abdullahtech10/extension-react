import { useEffect, useState } from 'react'
import sunLogo from './assets/icon-sun.svg'
import moonLogo from './assets/icon-moon.svg'
import plusLogo from './assets/logo-console-plus.svg'
import devlensLogo from './assets/logo-devlens.svg'
import snapLogo from './assets/logo-dom-snapshot.svg'
import guidesLogo from './assets/logo-grid-guides.svg'
import wizardLogo from './assets/logo-json-wizard.svg'
import linkLogo from './assets/logo-link-checker.svg'
import markLogo from './assets/logo-markup-notes.svg'
import pickerLogo from './assets/logo-palette-picker.svg'
import speedLogo from './assets/logo-speed-boost.svg'
import spyLogo from './assets/logo-style-spy.svg'
import masterLogo from './assets/logo-tab-master-pro.svg'
import viewLogo from './assets/logo-viewport-buddy.svg'
import extensionLogo from './assets/logo.svg'
import viteLogo from '/vite.svg'


function App() {
  const [darkmode, setDarkmode] = useState(() => {
    return localStorage.getItem('darkmode') === 'true'
  })
  const [filter, setFilter] = useState("All");
  
  
  const extensionsData = [
    { id: 1, name: "DevLens", description: "Quickly inspect page layouts and visualize element boundaries.", icon: devlensLogo, active: true },
    { id: 2, name: "StyleSpy", description: "Instantly analyze and copy CSS from any webpage element.", icon: spyLogo, active: true },
    { id: 3, name: "SpeedBoost", description: "Optimizes browser resource usage to accelerate page loading.", icon: speedLogo, active: false },
    { id: 4, name: "JSONWizard", description: "Formats, validates, and prettifies JSON responses in-browser.", icon: wizardLogo, active: true },
    { id: 5, name: "TabMaster Pro", description: "Organizes browser tabs into groups and sessions.", icon: masterLogo, active: true },
    { id: 6, name: "ViewportBuddy", description: "Simulates various screen resolutions directly within the browser.", icon: viewLogo, active: false },
    { id: 7, name: "Markup Notes", description: "Enables annotation and notes directly onto webpages for collaborative debugging.", icon: markLogo, active: true },
    { id: 8, name: "GridGuides", description: "Overlay customizable grids and alignment guides on any webpage.", icon: guidesLogo, active: false },
    { id: 9, name: "Palette Picker", description: "Instantly extracts color palettes from any webpage.", icon: pickerLogo, active: true },
    { id: 10, name: "LinkChecker", description: "Scans and highlights broken links on any page.", icon: linkLogo, active: true },
    { id: 11, name: "DOM Snapshot", description: "Capture and export DOM structures quickly.", icon: snapLogo, active: false },
    { id: 12, name: "ConsolePlus", description: "Enhanced developer console with advanced filtering and logging.", icon: plusLogo, active: true },
  ];
  
  const [extensions, setExtensions] = useState(extensionsData);

  const toggleExtension = (id) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.id === id ? { ...ext, active: !ext.active } : ext
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('darkmode', darkmode)
  }, [darkmode])


  const removeExtension = (id) => {
    setExtensions((prev) => prev.filter((ext) => ext.id !== id));
  };


  const filteredExtensions =
    filter === "All"
      ? extensions
      : filter === "Active"
        ? extensions.filter((ext) => ext.active)
        : extensions.filter((ext) => !ext.active);



  return (
    <>
      <div className={`body ${darkmode ? 'darkmode' : ''}`}>

        <div className="container">
          <nav>
            <div className="logo">
              <img src={extensionLogo} className="ext-logo" />
            </div>
            <button id="theme-btn" onClick={() => setDarkmode(!darkmode)}>
              <img src={moonLogo} className="moon" />
              <img src={sunLogo} className="sun" />
            </button>
          </nav>

          <main>
            <div className="extension-header">
              <h1>Extensions List</h1>
              <section className="filter-btns">
                <button onClick={() => setFilter("All")} className={`activ mar filter === "All" ? "active" : ""`}>All</button>
                <button onClick={() => setFilter("Active")} className={`mar filter === "Active" ? "active" : "" `}>Active</button>
                <button onClick={() => setFilter("Inactive")} className={filter === "Inactive" ? "active" : ""}>Inactive</button>
              </section>

            </div>

            <div id="extension-grid">
              {filteredExtensions.map((ext) => (
                <div className={`grid ${ext.active ? "active" : "inactive"}`} key={ext.id}>
                  <div id="top">
                    <img src={ext.icon} alt={ext.name}  />
                    <div>
                      <h4>{ext.name}</h4>
                      <p>{ext.description}</p>
                    </div>
                  </div>
                  <div className="bottom">
                    <button id="remove" onClick={() => removeExtension(ext.id)}>Remove</button>
                    <input
                      type="checkbox"
                      id={`toggle-${ext.id}`}
                      className="cardToggle"
                      checked={ext.active}
                      onChange={() => toggleExtension(ext.id)}
                    />
                    <label htmlFor={`toggle-${ext.id}`} className="toggle"></label>
                  </div>
                </div>
              ))}
            </div>

          </main>

        </div>
      </div>
    </>
  )
}

export default App
