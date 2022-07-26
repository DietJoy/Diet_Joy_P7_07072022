import React from 'react';

// Création de mon modèle de Post pour qu'il soit récupéré dans Publication.js


const Post = (props) => {

    const post = props.post

    console.log(props)

    return (
        <div key={post._id}>
            <p>Posté par : {post.author}</p>
            <p>{post.text}</p>
            <img src={post.imageUrl} />
        </div>
    );
};

export default Post;