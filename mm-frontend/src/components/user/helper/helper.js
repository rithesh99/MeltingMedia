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