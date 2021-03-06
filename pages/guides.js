import styles from '../styles/Guides.module.css'
import {useContext, useEffect} from "react";
import AuthContext from "../stores/authContext";

//https://www.youtube.com/watch?v=wizwky_4YTs

export default function Guides() {
    const { user, authReady } = useContext(AuthContext)

    useEffect(() => {
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


  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
    </div>
  )
}
