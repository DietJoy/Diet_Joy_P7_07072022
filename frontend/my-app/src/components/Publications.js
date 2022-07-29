import React, { useEffect, useState } from 'react';
import axios from "axios";
import Post from './Post';
import CreatPost from '../components/CreatPost';


const Publications = () => {

const [posts, setPosts] = useState([]) //usetate initialise un tableau vide et la fonction setpost met à jour le state post
const [rangeValue, setRangeValue] = useState(24);

useEffect(() => { // Le useEffect se joue lorsque le composant est monté
const getPost = async() => {
    const res = await axios.get("http://localhost:3000/api/post/",   {
        headers: {
         Authorization: "Bearer " + localStorage.getItem("token")
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
            <CreatPost />
            <ul className='post-List'><input type="range" min="1" max="100" defaultValue={rangeValue} onChange={(e)=> setRangeValue(e.target.value)}  /></ul>
                <ul> {posts.slice(0, rangeValue).map((post)=> ( 
                <Post post={post}/> // passage des données du post en props du composant Post
                //Appel de post.js
                //props post = {post}
                ))}
                </ul>
        </div>
    );
};

export default Publications;