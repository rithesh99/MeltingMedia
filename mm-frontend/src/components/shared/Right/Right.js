import React from "react";
import "./Right.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import StorageIcon from "@material-ui/icons/Storage";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";

import HomeIcon from '@material-ui/icons/Home';

function Right() {
  return (
    <div style={{ flex: 1, padding: "30px 40px 40px 40px" }}>
      <div className="right">
        <div className="right__section">
          <a href="/profile" style={{textDecoration: "none"}}>
            <div className="right__item">
              <AccountCircleIcon style={{ marginRight: "10px" }} />
              Account
            </div>
          </a>
          <a href="/" style={{textDecoration: "none"}}>
            <div className="right__item">
              <HomeIcon style={{ marginRight: "10px" }} />
              Home
            </div>
          </a>
          <div className="right__item">
            <NotificationsIcon style={{ marginRight: "10px" }} />
            Notifications
          </div>
          <div className="right__item">
            <StorageIcon style={{ marginRight: "10px" }} />
            Data & storage usage
          </div>
          <div className="right__item">
            <SettingsIcon style={{ marginRight: "10px" }} />
            Settings
          </div>
          <div className="right__item">
            <HelpIcon style={{ marginRight: "10px" }} />
            Help
          </div>
        </div>
      </div>
    </div>
  );
}

export default Right;
