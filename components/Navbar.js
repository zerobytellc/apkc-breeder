import Link from 'next/link'
import Image from 'next/image'
import AuthContext from '../stores/authContext'
import {useContext} from "react";

export default function Navbar() {
    const {user,login,logout} = useContext(AuthContext);
    console.log(user);

  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} />
        <h1>APKC Breeder</h1>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/guides"><a>Guides</a></Link></li>
            {!user && <li onClick={login} className="btn">Login/Signup</li>}
            {user && <li>{user.email}</li>}
            {user && <li onClick={logout} className="btn">Logout</li>}
        </ul>
      </nav>
      <div className="banner">
        <Image src="/puppy-banner.jpg" width={966} height={505} />
      </div>
    </div>
  )
}
