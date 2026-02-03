import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

// This will inject the font-face into your document
polyfillCountryFlagEmojis();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
