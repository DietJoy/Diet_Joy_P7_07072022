import axios from 'axios';

export const getPost = async() => {
  const res = await axios.get("http://localhost:3000/api/post/",   {
      headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
     } // ne pas oublier l espace entre bearer et "
   })

   return res.data
}

export const postPublication = async (data) => {
  await axios.post ('http://localhost:3000/api/post', data , {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
  });
}

export const updatePost = async (data, postId) => {
  await axios.put(`http://localhost:3000/api/post/${postId}`, data, { 
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data"
    },
  })
}

export const deleteImagePost = async(postId) => {
  await axios.put(`http://localhost:3000/api/post/${postId}`, {
    deleteImage: true
  }, 
  { 
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  })
}

export const deletePost = async (postId) => {
  await axios.delete(`http://localhost:3000/api/post/${postId}`, { 
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  })
}

export const like = async (postId, likeValue) => {
  await axios.post(`http://localhost:3000/api/post/${postId}/like`, 
  {
    like: likeValue
  },
   { 
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  })
}

export const verifToken = async () => {

  const tokenStorage = localStorage.getItem("token"); // on regarde dans le storage

  if(tokenStorage === null){ //si il n y pas de token dans le storage
    throw new Error("Non Authentifié") // on renvoi une erreur sans faire la requete
  }

  await axios.get('http://localhost:3000/api/user/verifytoken', {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  })
}