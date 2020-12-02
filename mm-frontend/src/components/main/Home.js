import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "../post/Card";
import { getPosts } from "../post/helper/helper";
import { isAuthenticated } from "../auth/helper/helper";
import { Redirect } from "react-router-dom";

function Home() {
  const { token, user } = isAuthenticated();
  const [data, setData] = useState([]);

  const getAllposts = () => {
    getPosts()
      .then((res) => setData(res.reverse()))
      .then(console.log("datA", data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllposts();
    console.log("DAta", data);
  }, []);

  const HomePage = () => {
    return (
      <Base>
        <div>
          {data.map((post, i) => (
            <Card
              key={i}
              id={post._id}
              userName={post.postedBy}
              userPic={post.postedByUrl}
              time={post.createdAt}
              imageUrl={post.imageUrl}
              tags={post.tags}
              title={post.title}
              likes={post.likes}
              likedUsers={post.likedUsers}
              comments={post.comments}
            />
          ))}
        </div>
      </Base>
    );
  };

  const Redir = () => {
    if(!isAuthenticated())
    return <Redirect to="/signin" />;
  };

  return (
    <div>
      {Redir()}
      {HomePage()}
    </div>
  );
}

export default Home;
