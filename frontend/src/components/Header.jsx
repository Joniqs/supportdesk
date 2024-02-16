import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo' data-testid='homepage'>
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button
              className='btn'
              onClick={onLogout}
              data-testid='logout-button'
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login' data-testid='login-button'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register' data-testid='register-button'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
