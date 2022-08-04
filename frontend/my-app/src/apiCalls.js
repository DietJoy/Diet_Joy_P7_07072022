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