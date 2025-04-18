# qobuz-lib-check.js

![Version](https://img.shields.io/badge/version-1.0.1-blue) ![License](https://img.shields.io/badge/license-GPL--3.0--or--later-red)

<p align="center">
  <img src="https://tornadost.github.io/images/qobuz_logo.png"/>
</p>

_A Tampermonkey/Greasemonkey userscript to instantly check if the currently viewed artist on Qobuz is already in your personal music library._

---

> [!NOTE]
> This script was tested on play.qobuz.com as of April 2025. Ensure your userscript manager (Tampermonkey/Greasemonkey) is up to date.  
> - Browser with Tampermonkey or Greasemonkey installed  
> - Access to a plain-text library file  

---

## Table of Contents

- [Features](#features)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Customization](#customization)  
- [Troubleshooting](#troubleshooting)  

---

## Features

- **Async Library Loading:** Fetches and parses your `.txt` library file in the background.  
- **Fuzzy Matching:** Normalizes accents and case to find partial or full artist matches.  
- **One‑Click Check:** Instantly alerts you if the current artist is in your library.  
- **Quick Actions:** Refresh page or copy current URL with dedicated buttons.  
- **Auto‑Populate:** Automatically fills the artist name based on the page header.  

---

## Installation

1. Visit the [GitHub Releases page](https://github.com/rkeaves/qobuz-lib-check) and click **Install**.  
2. Confirm installation in your userscript manager.

Or manually add the script URL:

```bash
https://github.com/rkeaves/qobuz-lib-check/raw/main/qobuz-lib-check.js
```

---

## Configuration

By default, the script loads your library from:

```js
const localLibraryFile = 'https://tornadost.github.io/assets/music.txt';
```

To use a custom file:

1. Fork this repository.  
2. Edit the `localLibraryFile` constant at the top of `qobuz-lib-check.js`.  
3. Point your userscript manager to your fork’s raw URL.

---

## Usage

1. Open any artist page on [play.qobuz.com](https://play.qobuz.com/).  
2. Wait for the **Loading Library…** button to become **Check Artist**.  
3. Click **Check Artist** or press **Enter** after entering an artist’s name.  
4. You’ll see an alert:  
   - ✅ Artist(s) found: …  
   - ❌ Artist not found.  
5. Use **Refresh Page** to reload, or **Copy URL** to share the current link.

---

## Customization

Adjust the floating panel’s appearance in the `createSearchInterface()` function:

- Modify CSS in `container.style.cssText`.  
- Change button styles or position.  
- Add/remove UI elements as desired.

---

## Troubleshooting

| Issue                                  | Solution                                           |
|----------------------------------------|----------------------------------------------------|
| Library fails to load                  | Check CORS settings or verify the file URL.        |
| “Library data still loading…” persists | Ensure network connectivity; the file may be large.|
| UI overlaps page content               | Adjust `top`, `left`, or `transform` in CSS.       |
| Alerts blocked by popup blocker        | Enable popups for play.qobuz.com.                  |

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Please open an issue or PR on [GitHub](https://github.com/rkeaves/qobuz-lib-check).

---

## License

This project is licensed under **GPL‑3.0‑or‑later**. See the [LICENSE](https://github.com/rkeaves/qobuz-lib-check/blob/main/LICENSE) file for details.

---

## Author

**rkeaves**  
- GitHub: [@rkeaves](https://github.com/rkeaves)  
- Repo: [rkeaves/qobuz-lib-check](https://github.com/rkeaves/qobuz-lib-check)  
