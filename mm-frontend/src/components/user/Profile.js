import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper/helper";
import Base from "../main/Base";
import { deletePost, getUser } from "./helper/helper";
import "./helper/Profile.css";
import DeleteIcon from '@material-ui/icons/Delete';

function Profile() {
  const {token,user}  = isAuthenticated()
  const [data, setData] = useState({});

  useEffect(() => {
    getUser(user._id)
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteP = (id) => {
    // console.log("Post ID fe",id);
    if (window.confirm("Do you want delete this post") === true) {
      deletePost(token,id)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    } 
  }
    
  

  return (
    <Base>
      <div className="profile">
        <div className="profile__details">
          <div className="profile__image">
            <img src={data.photo} alt="" className="profile__image__pic" />
          </div>
          <div className="profile__info">
            <h2><span className="profile__info__span">Name:  </span>  {data.name}</h2>
            <h3><span className="profile__info__span">Email:  </span>  {data.email}</h3>
            <p><span className="profile__info__span">Phone:  </span>  +91 {data.number}</p>
          </div>
        </div>

        <div className="profile__posts">
          <h1>Posts</h1>
          <div className="profile__posts__images">
            {data.post?.map((p, i) => (
              <div key={i}>
              <img
                src={p.imageUrl}
                alt=""
                className="profile__posts__image"
              />
              <DeleteIcon onClick={() => deleteP(p._id)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Profile;
