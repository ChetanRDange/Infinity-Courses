import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { appStore } from './app/store';
import { Toaster } from 'sonner';
import { useLoadUserQuery } from './features/api/authApi.js';
import LoadingSpinner from './components/LoadingSpinner';

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner   ></LoadingSpinner> : <> {children}</>}</>;
};

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <Custom>
      <App />
    </Custom>
    <Toaster />
  </Provider>
); 