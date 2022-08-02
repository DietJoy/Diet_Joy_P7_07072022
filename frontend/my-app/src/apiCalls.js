import axios from 'axios';

export const getPost = async() => {
  const res = await axios.get("http://localhost:3000/api/post/",   {
      headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
     } // ne pas oublier l espace entre bearer et "
   })

   return res.data
}