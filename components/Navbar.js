import Link from 'next/link'
import Image from 'next/image'
import AuthContext from '../stores/authContext'
import {useContext} from "react";

export default function Navbar() {
    const {user,login,logout,authReady} = useContext(AuthContext);
    console.log("User: " + user);
    if (user)
        console.log(user.app_metadata.roles);

  return (
    <div className="container">
      <nav>
        <Image src="/logo.png" width={50} height={48} objectFit="scale" />
        <h1>APKC Breeder</h1>
          {authReady &&
          (<ul>
              <li><Link href="/"><a>Home</a></Link></li>
              {!user && <li onClick={login} className="btn">Login/Signup</li>}
              {user && user.app_metadata.roles && user.app_metadata.roles.includes('admin') && <li><Link href="/admin">Administration</Link></li>}
              {user && user.app_metadata.roles && user.app_metadata.roles.includes('breeder') && <li><Link href="/pack">My Pack</Link></li>}
              {user && (!user.app_metadata.roles || !user.app_metadata.roles.includes('breeder')) && <li><Link href="/pack_request">Become a Breeder</Link></li>}
              {user && <li>{user.email}</li>}
              {user && <li onClick={logout} className="btn">Logout</li>}
          </ul>)
          }
      </nav>
      <div className="banner">
        <Image src="/puppy-banner.jpg" width={966} height={270} />
      </div>
    </div>
  )
}
