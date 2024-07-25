import { useState, useEffect } from 'react';
import './App.css';
import MainPage from './components/Main'
import { firestore } from './firebase';
import {getDocs, collection, query,where} from '@firebase/firestore';

function App() {


  
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {

  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      // Create a query to check if the username and password exist in the collection
      const q = query(collection(firestore, 'Users'), where('user_id', '==', username), where('password', '==', password), where('designation', '==', 'admin'));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // User credentials exist, perform login logic here
        setIsOpen(false);
        localStorage.setItem('user_id', username);
        console.log('Login successful');
      } else {
        // User credentials do not match or do not exist
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Login</h2>
            <form>
              <label>
                UserID:
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  placeholder='Enter User ID'
                />
                
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder='Eneter password'
                />
              </label>
              <br />
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
      )}
      <div>{!isOpen &&(<MainPage></MainPage>)}</div>
    </div>
  );
}

export default App;
