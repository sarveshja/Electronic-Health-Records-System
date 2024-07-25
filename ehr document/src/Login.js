import { useState, useEffect } from 'react';
import { firestore } from './firebase';
import {getDocs, collection, query,where} from '@firebase/firestore';
import './login.css';
import { fetchData } from './FetchData';

function Login(props) {


  
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([])

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
      const q = query(collection(firestore, 'Users'), where('user_id', '==', username), where('password', '==', password), where('designation', '==', props.des));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // User credentials exist, perform login logic here
        setIsOpen(false);
        props.onLoginState(true);
        localStorage.setItem('user_id',username);
        const getUsers = async () => {
          const usersData = await fetchData('Users');
          setData(usersData);
      
          const matchedUser = usersData.find(user => user.user_id === username);
          if (matchedUser) {
            localStorage.setItem('username', matchedUser.u_name);
          }
        };
      
        getUsers();
        console.log('Login successful');
      } else {
        // User credentials do not match or do not exist
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  return (
    <div>
    <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Login</h2>
            <form>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
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

      
      
    </div>
    
    </div>
    
  );
}

export default Login;
