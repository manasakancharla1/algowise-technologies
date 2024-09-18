import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Jobs from './components/Jobs';
import Courses from './components/Courses';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* Route for user-specific home page */}
      <Route path="/home/:username" element={<Home />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
