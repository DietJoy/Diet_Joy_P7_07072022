import React from 'react';

// Données des posts récupérées dans Publication.js

const Post = (props) => {

    const post = props.post

    console.log(props)

    return (
        <div key={post._id} className="stylePost">
            <h3>Posté par : {post.author} </h3>
            <img src={post.imageUrl} alt="image de la publication"/>
            <p>{post.text}</p>
        </div>
    );
};

export default Post;



