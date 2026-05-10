import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        <ToastContainer
          containerId="authToast"
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: "20px",
            background: "#ffffff",
            color: "#0f172a",
            fontWeight: 600,
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        />
        <ToastContainer
          containerId="productToast"
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: "20px",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            border: "none",
            boxShadow:
              "0 10px 30px rgba(37,99,235,0.25)",
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
