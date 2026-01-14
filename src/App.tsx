import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CheckupPage from './pages/CheckupPage';
import MetricDetailPage from './pages/MetricDetailPage';
import HospitalsPage from './pages/HospitalsPage';
import AlertsPage from './pages/AlertsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkup" element={<CheckupPage />} />
          <Route path="/checkup/:metricId" element={<MetricDetailPage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
