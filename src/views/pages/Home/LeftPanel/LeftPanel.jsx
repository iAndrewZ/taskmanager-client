import React, {useState, useEffect} from 'react'
import classes from "./LeftPanel.module.scss";
import { useNavigate } from 'react-router-dom';
import { BiBell } from "react-icons/bi";
import { useCheckUserNotificationsQuery, useLazyCheckUserNotificationsQuery } from '../../../../state/checkIfUserHasNotifications/api';

const LeftPanel = ({user}) => {
  const navigate = useNavigate();
  const [checkUserNotifications, {data: getUserNotifications}] = useLazyCheckUserNotificationsQuery();

  const logOut = () => {
    sessionStorage.removeItem("token");
    return window.location.replace("/login");
  }
  function _handleBellClick(){
    return navigate("/user-notifications");
  }
  useEffect(() => {
    checkUserNotifications();
      const getNotifications = setInterval(() => {
         checkUserNotifications();
      }, 5000);
      return () => clearInterval(getNotifications);
  }, []);
  return (
    <div className={classes.mainPanel}>
      <div className={classes.notificationBellContainer} onClick={_handleBellClick}>
          <div className={classes.notify}>
            {getUserNotifications && getUserNotifications.data.data ? 
             <span className={classes.bellNotification}/> : null
            }
            <BiBell/>
          </div>
      </div>  
        <div className={classes.userSection}>
            <div className={classes.Usershape}>
                <p>{user.name[0].toUpperCase()}</p>
            </div>
            <div>
               <p>{user.name}</p>
            </div>
        </div>
        <div className={classes.navSection}>

        <div className={classes.navListContainer} onClick={() => navigate("/")}>
             <div className={classes.shape}/>
             <div>
                <p>Home</p>
             </div>
           </div>
          <div className={classes.navListContainer} onClick={() => navigate("/create-board")}>
             <div className={classes.shape}/>
             <div>
                <p>Create Board</p>
             </div>
           </div>

           <div className={classes.navListContainer} onClick={() => navigate("/join-board")}>
             <div className={classes.shape}/>
             <div>
                <p>Join board</p>
             </div>
           </div>

           <div className={classes.navListContainer} onClick={() => navigate("/archive")}>
             <div className={classes.shape}/>
             <div>
                <p>Archive</p>
             </div>
           </div>

           <div className={classes.navListContainer} onClick={logOut}>
             <div className={classes.shape}/>
             <div>
                <p>Log out</p>
             </div>
           </div>
        </div>
    </div>
  )
}

export default LeftPanel;
