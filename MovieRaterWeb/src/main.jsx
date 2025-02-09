import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from './components/Auth.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

// export const TokenContext = createContext();

const router = createBrowserRouter([
  { path: "/", element: <Auth />, },
  { path: "/movies", element: <App />, },
]);

// function Router() {
//   const [token, setToken] = useState(null);

//   return (
//     <CookiesProvider>
//       <RouterProvider router={router} />
//     </CookiesProvider>
//   )
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Router /> */}
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </StrictMode>,
)
