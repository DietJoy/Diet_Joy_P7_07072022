import React, { useEffect, useState } from 'react';
import axios from "axios";
import Post from './Post';


const Publications = () => {

const [posts, setPosts] = useState([]) //usetate initialise un tableau vide et la fonction setpost met à jour le state post

useEffect(() => { // Le useEffect se joue lorsque le composant est monté
const getPost = async() => {
    const res = await axios.get("http://localhost:3000/api/post/",   {
        headers: {
         Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ2YzFkYzMwNDcwNzE1NjZhN2VkM2MiLCJpYXQiOjE2NTg4Mjg2OTEsImV4cCI6MTY1ODg3MTg5MX0.xZtzh__r2VUUyUQ6z0PYnQqS-O8LaHfPCeqyAp9gHNI"
       } // ne pas oublier l espace entre bearer et "
     })
    console.log("🚀 ~ file: Publications.js ~ line 17 ~ getPost ~ res", res) 
    setPosts(res.data) // mise à jour du state posts avec les données reçues de l'api
}
 getPost()  // get post fait l appel APi et met à jour le state

}, [])

    return (
        <div className="publications">
            <h1>Bienvenue sur votre réseau social d'entreprise ! </h1>
            {posts.map((post)=> ( 
                <Post post={post}/> // passage des données du post en props du composant Post
                //Appel de post.js
                //props post = {post}
            ))}
        </div>
    );
};

export default Publications;