import { Link } from 'react-router-dom'
import { Avatar1, HomeIcon, Logo, Notification } from '../../constant/images'
import Logout from '../auth/Logout'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const {auth} = useAuth()
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img
            className="max-w-[100px] lg:max-w-[140px]"
            src={Logo}
            alt="logo"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button>

          <Logout />

          <Link to="/profile" className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">{auth?.user?.firstName}</span>
            <img
              className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={Avatar1}
              alt="avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}
