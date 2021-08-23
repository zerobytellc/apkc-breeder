import styles from '../styles/Guides.module.css'
import {useContext, useEffect} from "react";
import AuthContext from "../stores/authContext";

//https://www.youtube.com/watch?v=wizwky_4YTs

export default function Pack() {
    const { user, login, logout, authReady } = useContext(AuthContext)

    useEffect(() => {
        console.log( "useEffect");
        if ( authReady ) {
            fetch('/.netlify/functions/apkcauthcheck', user && {
                headers: {
                    Authorization: 'Bearer ' + user.token.access_token,
                }
            })
                .then(res => res.json())
                .then(data => console.log(data));
            console.log("YO! " + user);

            return () => {
            };


        }
    }, [user, authReady]);



  return (
    <div className={styles.guides}>
      {authReady && user && <h2>{user.user_metadata.full_name}'s Pack</h2>}
      {authReady && user && <p>This is where you will come to see registered members of your pack, as well as add, remove, or modify registrations for pack members... {user.email}</p>}

      // If there's no user...
      {authReady && !user && <p>You must be logged in to view this content.</p>}
    </div>
  )
}
