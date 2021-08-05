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
      <h2>My Pack</h2>
        {user && !user.app_metadata.roles.includes('breeder') && <span>
            <p>You are not currently registered as an APKC Breeder. Please submit your request to become an APKC Breeder below, and
            we will follow up with you shortly.</p>
            <form name="apkc_breeder_request" method="post" data-netlify="true" onSubmit="submit">
                <input type="hidden" name="form-name" value="apkc_breeder_request"/>
                <p>
                    <label>Name <input type="text" name="name" value={user.user_metadata.full_name}/></label>
                </p>
                <p>
                    <label>Email <input type="text" name="email" value={user.email}/></label>
                </p>
                <p>
                    <label>Message (Optional) <input type="text" name="message"/></label>
                </p>
                <div data-netlify-recaptcha="true" className="form-row"></div>
                <p>
                    <button type="submit">Submit Request</button>
                </p>
            </form>
        </span>}
    </div>
  )
}
