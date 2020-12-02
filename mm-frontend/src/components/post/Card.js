import React, { useState, useEffect } from "react";
import "./helper/Card.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CommentIcon from "@material-ui/icons/Comment";
import { isAuthenticated } from "../auth/helper/helper";
import { updatePost } from "./helper/helper";
import moment from 'moment';

function Card({
  id,
  userName,
  userPic,
  time,
  imageUrl,
  title,
  tags,
  likedUsers,
  comments,
}) {
  const { token, user } = isAuthenticated();

  const [commentSection, setCommentSection] = useState(false);

  const [contents, setContents] = useState({
    user: user.name,
    userImageUrl: user.photo,
    message: "",
  });
  const [card, setCard] = useState(false);

  const handleChangeAct = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setContents({ ...contents, [name]: value });
  };

  const addCard = (event) => {
    event.preventDefault();
    comments.push(contents);
    setContents({ ...contents, message: "" });
    setCard(false);
    updatePost(token, id, { comments: comments })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // const [usersLiked, setUsersLiked] = useState(likedUsers);
  // const [usersLiked, setUsersLiked] = useState(likedUsers);

  const [count, setCount] = useState(likedUsers.length);

  const addLike = (event) => {
    event.preventDefault();
    if (likedUsers.length == 0) {
      console.log("User liked");
      likedUsers.push(user._id)
      setCount(count + 1)
      updatePost(token, id, { likedUsers: likedUsers }) 
        .then((res) =>
          // setUsersLiked(""),
          console.log(res)
        )
        .catch((err) => console.log(err));
    } else {
      likedUsers.forEach((usr) => {
        console.log("usr", usr);
        if (usr == user._id) {
          alert("User already liked");
        } else {
          setCount(count + 1)
          console.log("User liked");
          // setUsersLiked(...likedUsers, user._id);
          likedUsers.push(user._id)
          updatePost(token, id, { likedUsers: likedUsers })
            .then((res) =>
              // setUsersLiked(""),
              console.log(res)
            )
            .catch((err) => console.log(err));
        }
      });
    }
  };

  const CardSection = () => {
    return (
      <div className="card">
        <div className="card__user__info">
          <img className="card__user__pic" src={userPic} alt="" />
          <div className="card__user__info__name">
            <h3>{userName}</h3>
            {/* <span style={{ fontSize: "11px" }}>{moment(time).format("D MMM YYYY")}</span> */}
            <span style={{ fontSize: "11px" }}>{moment(time).fromNow()}</span>
          </div>
        </div>

        <div className="card__image">
          <img src={imageUrl} alt="" />
        </div>
        <div className="card__title">
          <h3>{title}</h3>
        </div>
        <div className="card__tags">
          {tags &&
            tags.map((tag, i) => {
              return <p index={i}>{tag}</p>;
            })}
        </div>
        <div className="card__info">
          <a onClick={addLike}>
            <ThumbUpIcon className="card__info__up" className="card__like__btn" />
          </a>
          <CommentIcon className="card__info__comment" className="card__comment__btn" onClick={() => setCard(true)}/>
        </div>
        <div className="card__info__likes">
          <p>{count} likes</p>
          <p style={{ position: "absolute", right: "10px" }}>
            {comments.length} comments
          </p>
        </div>

        {commentSection ? (
          <div>
            <a
              onClick={() => setCommentSection(false)}
              className="card__showComment__true"
            >
              Hide comments
            </a>

            {comments &&
              comments.map((comment, i) => (
                <div className="card__comment" key={i}>
                  <div className="card__comment__user">
                    <img
                      className="card__comment__pic"
                      src={comment.userImageUrl}
                      alt=""
                    />
                    <h4>{comment.user}</h4>
                  </div>
                  <p style={{ marginTop: "8px" }}>{comment.message}</p>
                </div>
              ))}
          </div>
        ) : (
          <a
            onClick={() => setCommentSection(true)}
            className="card__showComment__false"
          >
            Show comments
          </a>
        )}

        {card ? (
          <div className="card__comment">
            <div className="card__comment__user">
              <img className="card__comment__pic" src={user.photo} alt="" />
              <h4>{user.name}</h4>
            </div>
            <div className="card__addComment__section">
              <input
                style={{ marginTop: "8px" }}
                onChange={handleChangeAct("message")}
                className="card__addComment__input"
              />
              <a onClick={addCard} className="card__addComment__btn">
                Add
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="card__addComment" onClick={() => setCard(true)}>
          <p className="">Add comment</p>
        </div>
      </div>
    );
  };

  return <div>{CardSection()}</div>;
}

export default Card;
