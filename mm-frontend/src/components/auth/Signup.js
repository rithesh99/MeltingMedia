import React, { useState } from "react";
import Base from "../main/Base";
import { Link } from "react-router-dom";
import { signup } from "./helper/helper";
import "./helper/styles.css";
import logo from "../../assets/logo.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Header from "../shared/Header/Header";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    number: "",
    error: "",
    success: "",
  });

  const [src, selectedFile] = useState(null);

  const handleFileChange = (e) => {
    selectedFile(URL.createObjectURL(e.target.files[0]));
  };
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const [crop, setCrop] = useState({ aspect: 1 / 1 });

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
    setValues({ ...values, photo: base64Image });
  }

  const { name, email, password, number, photo, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, photo, number })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            photo: "",
            error: "",
            number: "",
            success: true,
          });
          selectedFile("")
        }
      })
      .catch(() => {
        console.log("error in signup");
      });
  };

  const signUpForm = () => {
    return (
      <div className="login">
        <Link to="/">
          <img className="login__logo" src={logo} />
        </Link> 

        <div className="login__container">
          <h1>Create Account</h1>
          <div className="signup__profile__pic">
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
                    <img src={photo} alt="" className="addpost__photo" />
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
          </div>

          <form>
            <h5>Your name</h5>
            <input type="text" value={name} onChange={handleChange("name")} />
            <h5>Mobile number</h5>
            <input
              type="tel"
              value={number}
              onChange={handleChange("number")}
            />
            <h5>E-mail</h5>
            <input type="text" value={email} onChange={handleChange("email")} />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={handleChange("password")}
            />

            <button
              type="submit"
              onClick={onSubmit}
              className="login__signInButton"
            >
              Register
            </button>
          </form>

          <p style={{ "text-align": "center" }}>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="">
        <div className="">
          <div
            className="message__error"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div className="">
        <div className="">
          <div
            className="message__success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Header/>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className="text-light text-center">{JSON.stringify(values)}</p> */}
    </div>
  );
};

export default Signup;
