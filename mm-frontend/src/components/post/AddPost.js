import React, { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Success from "./Success";
import { createPost, updateUserPost } from "./helper/helper";
import { isAuthenticated } from "../auth/helper/helper";
import Base from "../main/Base";
import "./helper/AddPost.css";

const AddArticle = () => {
  const { token, user } = isAuthenticated();
  const [forTags, setForTags] = useState({
    tagname: "",
    taglist: [],
  });
  const { tagname, taglist } = forTags;
  const [values, setValues] = useState({
    title: "",
    imageUrl: "",
    postedBy: user.name,
    postedByUrl: user.photo,
    tags: [],
    comments:[],
    error: "",
    success: "",
  });
  const { title, imageUrl, tags, error, success,comments } = values;

  const [src, selectedFile] = useState(null);

  const handleFileChange = (e) => {
    selectedFile(URL.createObjectURL(e.target.files[0]));
  };
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const [crop, setCrop] = useState({ aspect: 681 / 383 });

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
    setValues({ ...values, imageUrl: base64Image });
  }

  const updateTag = (tag) => {
    setForTags({
      ...forTags,
      tagname: tag,
    });
  };
  const addTag = (tag) => {
    if (tag !== "") {
      const taglist = [...forTags.taglist];
      taglist.push(tag);
      setForTags({
        ...forTags,
        taglist: taglist,
        tagname: "",
      });
    }
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    for (let index = 0; index < taglist.length; index++) {
      tags.push(taglist[index]);
    }

    setValues({ ...values, error: "" });

    console.log("values", values);
    createPost(token, user._id, values).then((data) => {
      console.log("data", data);
      if (data.err) {
        setValues({ ...values, error: data.err });
      } else {
        updateUserPost(token, user._id, {post: data})
        .then()
        .catch()
        setValues({
          ...values,
          title: "",
          imageUrl: "",
          tags: [],
          error: "",
          success: "true",
        });
      }
    });
  };

  const errorMessage = () => (
    <div className="message__error" style={{ display: error ? "" : "none" }}>
      <h4>{error}</h4>
    </div>
  );
  const createArticle = () => {
    return (
      <Base>
        <div className="addpost">
          {src ? (
            <div className="addpost__image">
              {src && (
                <div className="addpost__src">
                  <div className="addpost__pic">
                    <ReactCrop
                      src={src}
                      onImageLoaded={setImage}
                      crop={crop}
                      onChange={setCrop}
                      className="addpost__photo"
                    />
                  </div>
                  <div className="addpost__crop">
                    <button
                      className="addpost__crop__button"
                      onClick={getCroppedImg}
                    >
                      Crop Image
                    </button>
                  </div>
                </div>
              )}
              {result && (
                <div className="addpost__result">
                  <h1>Selected image</h1>
                  <img src={imageUrl} alt="" className="addpost__photo" />
                  {/* {console.log(imageUrl)} */}
                </div>
              )}
            </div>
          ) : (
            <div className="">
              <div className="">
                <div className="">
                  <input
                    type="file"
                    accept="/image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="addpost__title__section">
            <h2 className="addpost__title">Title</h2>
            <textarea
              onChange={handleChange("title")}
              className=""
              cols="50"
              rows="5"
            />
          </div>

          <div className="addpost__tag__section">
            <ul>
              {taglist &&
                taglist.map((item, i) => {
                  return (
                    // <li>
                    <span key={i} className="addpost__tag">
                      {item}
                    </span>
                    // </li>
                  );
                })}
            </ul>
          </div>
          <div className="addpost__tag__input__section">
            <input
              type="text"
              className="addpost__tag__input"
              placeholder=""
              value={tagname}
              onChange={(e) => updateTag(e.target.value)}
            />
            <a className="addpost__tag__btn" onClick={() => addTag(tagname)}>
              Add Tag
            </a>
          </div>
          {title && imageUrl && (
            <div className="addpost__submit">
              <button className="addpost__submit__btn" onClick={onSubmit}>
                Publish
              </button>
            </div>
          )}
        </div>
      </Base>
    );
  };

  if (!success) {
    return (
      <div>
        {errorMessage()}
        {createArticle()}
      </div>
    );
  } else {
    return <Success />;
  }
};
export default AddArticle;
