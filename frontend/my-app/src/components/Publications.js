import React, { useEffect, useState } from 'react';
import axios from "axios";
import Post from './Post';
import CreatPost from '../components/CreatPost';
import { getPost } from '../apiCalls';

const Publications = () => {

const [posts, setPosts] = useState([]) //usetate initialise un tableau vide et la fonction setpost met à jour le state post
const [rangeValue, setRangeValue] = useState(24);

useEffect(() => { // Le useEffect se joue lorsque le composant est monté
    const handlePosts = async () => {
        const posts = await getPost()
        setPosts(posts)
    }
    handlePosts()
}, [])

    return (
        <div className="publications">
            <h1>Bienvenue sur votre réseau social d'entreprise ! </h1>
            <CreatPost setPosts={setPosts} />
            <ul className='post-List'><input type="range" min="1" max="100" defaultValue={rangeValue} onChange={(e)=> setRangeValue(e.target.value)}  /></ul>
                <ul> {posts.slice(0, rangeValue).map((post)=> ( 
                <Post post={post} key={post._id}/> // passage des données du post en props du composant Post
                //Appel de post.js
                //props post = {post}
                ))}
                </ul>
        </div>
    );
};

export default Publications;