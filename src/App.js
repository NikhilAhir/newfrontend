import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './pages/authentication/Register';
import { ToastContainer, toast } from 'react-toastify';
import HomePage from './pages/homepage/HomePage';
import MainPage from './pages/main/MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminDetails, getUser, getUserDetails } from './redux/authentication/auth.action';
import { useEffect } from 'react';
import UserProfile from './components/profile/UserProfile';
import ApartmentsPage from './pages/apartments/ApartmentsPage';
import EventFeedback from './pages/events/EventFeedback';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const isLogged = useSelector((store) => store.auth.isLogged);
  const user = useSelector((store) => store.auth.user);
  const userDetails = useSelector((store) => store.auth.userDetails);
  useEffect(() => {
    if (jwt != null) {
      dispatch(getUser(jwt));
    }
  }, [jwt, isLogged]);

  useEffect(() => {
    if (jwt != null && user?.role) {
      if (user.role === 'Resident') {
        dispatch(getUserDetails(jwt));
      } else if (user.role === 'Admin') {
        dispatch(getAdminDetails(jwt));
      }
    }
  }, [jwt, isLogged, user]);
  return (
    <div className="">
      {jwt ? ( 
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/auth/*" element={<Register />} />
          <Route path="/community/*" element={<MainPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/apartment" element={<ApartmentsPage />} />
          <Route path="/event-feedback/:eventId" element={<EventFeedback/>}/>
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/auth/*" element={<Register />} />
        </Routes>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;