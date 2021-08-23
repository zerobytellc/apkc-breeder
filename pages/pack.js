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
            return () => {
            };
        }
    }, [user, authReady]);

    console.log("YO! " + user);

  return (
    <div className={styles.guides}>
      <h2>My Pack</h2>
        <p>This is where you will come to see registered members of your pack, as well as add, remove, or modify registrations for pack members.</p>
    </div>
  )
}
