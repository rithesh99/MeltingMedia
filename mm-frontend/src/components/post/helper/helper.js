const API="http://localhost:8000/api"

export const createPost = (token,userId,post) => {
    return fetch(`${API}/post/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err)); 
};

export const getPost = (postId) => {
    return fetch(`${API}/post/${postId}`,{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
export const getPosts = () => {
    return fetch(`${API}/posts`,{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const updatePost = (token,postId,post) => {
    return fetch(`${API}/post/${postId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err)); 
};



export const updateUserPost = (token,userId,user) => {
    return fetch(`${API}/user/${userId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err)); 
};
