const API="http://localhost:8000/api"

export const getUser = (userId) => {
    return fetch(`${API}/user/${userId}`,{
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


export const deletePost = (token,postId) => {
    return fetch(`${API}/post/${postId}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

