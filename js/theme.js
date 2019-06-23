function activateDarkMode() {
    const rootElement = document.querySelector(':root')
    const darkTheme = {
        '--text-color': '#ffffff',
        '--background-color': '#000000',
        '--vertical-nav': '#090909',
        '--vertical-splitline': 'rgba(255, 255, 255, 0.5)',
        '--right-arrow': 'url(\'../img/right-arrow-light.svg\')',
        '--down-arrow': 'url(\'../img/down-arrow-light.svg\')',
        '--left-arrow': 'url(\'../img/left-arrow-light.svg\')'
    }

    // window.darkMode = true;
    for(k in darkTheme) {
      rootElement.style.setProperty(k, darkTheme[k])
    }
  }
  
  function activateLightMode() {
    const rootElement = document.querySelector(':root')
    const lightTheme = {
        '--text-color': '#000000',
        '--background-color': '#ffffff',
        '--vertical-nav': '#f8f9fa',
        '--vertical-splitline': 'rgba(0, 0, 0, 0.5)',
        '--right-arrow': 'url(\'../img/right-arrow.svg\')',
        '--down-arrow': 'url(\'../img/down-arrow.svg\')',
        '--left-arrow': 'url(\'../img/left-arrow.svg\')'
    }

    // window.darkMode = false;
    for(k in lightTheme) {
      rootElement.style.setProperty(k, lightTheme[k])
    }
  }
  /**
   * Sets a color scheme for the website.
   * If browser supports "prefers-color-scheme" it will respect the setting for light or dark mode
   * otherwise it will set a dark theme during night time
   */
  function setColorScheme() {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
    const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
  
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode())
    window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode())
  
    if(isDarkMode) activateDarkMode()
    if(isLightMode) activateLightMode()
    if(isNotSpecified || hasNoSupport) {
      console.log('You specified no preference for a color scheme or your browser does not support it. I Schedule dark mode during night time.')
      // activateLightMode();
      // window.darkMode = false;

      now = new Date();
      hour = now.getHours();
      if (hour < 4 || hour >= 16) {
        activateDarkMode();
        window.darkMode = true;
      }else{
          activateLightMode();
          window.darkMode = false;
      }
    }
  }
