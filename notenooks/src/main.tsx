import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { Auth0Provider } from '@auth0/auth0-react';
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-2jlocga8biu2s0wz.us.auth0.com"
    clientId="QmkuM4I8UxZQFjVCF6gNql6obFUj4v2g"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/dashboard"
    }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
