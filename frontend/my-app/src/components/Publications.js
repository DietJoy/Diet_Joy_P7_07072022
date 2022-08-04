import React, { useEffect, useState } from 'react';
import Post from './Post';
import CreatPost from '../components/CreatPost';
import { getPost } from '../apiCalls';

const Publications = () => {

const [posts, setPosts] = useState([]) //usetate initialise un tableau vide et la fonction setpost met à jour le state post
const [rangeValue, setRangeValue] = useState(24);

const handlePosts = async () => { // fonction qui récupère le post et le met à jour
    const posts = await getPost()
    console.log({posts})
    setPosts(posts)
}

useEffect(() => { // Le useEffect se joue lorsque le composant est monté
    handlePosts()
}, [])

    return (
        <div className="publications">
            <h1>Bienvenue sur votre réseau social d'entreprise ! </h1>
            <CreatPost setPosts={setPosts} />
            <ul className='post-List'><input type="range" min="1" max="100" defaultValue={rangeValue} onChange={(e)=> setRangeValue(e.target.value)}  /></ul>
                <ul className='containerPost'> {posts.slice(0, rangeValue).map((post)=> ( 
                <Post post={post} key={post._id} handlePosts={handlePosts}/> // passage des données du post en props du composant Post
                //Appel de post.js
                //props post = {post}
                ))}
                </ul>
        </div>
    );
};

export default Publications;