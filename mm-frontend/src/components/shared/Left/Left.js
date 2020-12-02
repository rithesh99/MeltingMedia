import React from "react";
import "./Left.css";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import StoreIcon from '@material-ui/icons/Store';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FlagIcon from '@material-ui/icons/Flag';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

function Left() {
  return (
    <div style={{ flex: 1 , padding:"30px 40px 40px 40px"}}>
      <div className="left">
        <div className="left__section">
          <div className="left__item"><GroupAddIcon style={{marginRight:"10px"}}/>Find Friends</div>
          <div className="left__item"><PeopleIcon style={{marginRight:"10px"}} />Groups</div>
          <div className="left__item"><StoreIcon style={{marginRight:"10px"}}/>Marketplace</div>
          <div className="left__item"><OndemandVideoIcon style={{marginRight:"10px"}}/>Videos</div>
          <div className="left__item"><DateRangeIcon style={{marginRight:"10px"}}/>Events</div>
          <div className="left__item"><AccessAlarmIcon style={{marginRight:"10px"}}/>Memories</div>
          <div className="left__item"><BookmarkIcon style={{marginRight:"10px"}}/>Saved</div>
          <div className="left__item"><FlagIcon style={{marginRight:"10px"}}/>Pages</div>
          <div className="left__item"><LocalHospitalIcon style={{marginRight:"10px"}}/>Covid-19</div>
        </div>
      </div>
    </div>
  );
}

export default Left;
