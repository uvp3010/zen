// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Assessment from './Assessment';
import ProgressTracking from './ProgressTracking';
import SupportResources from './SupportResources';
import SignUp from './SignUp';
import Login from './Login';
import Landing from './Landing';
import Task from './task'
import Sentiment from './sentiment'
import Profile from './Profile'
import ChatAvatar from './ChatAvatar';
import NotFound from './NotFound'; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/support-resources" element={<SupportResources />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Task" element={<Task/>} />
        <Route path="/sentiment" element={<Sentiment/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/ChatAvatar" element={<ChatAvatar/>} />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
