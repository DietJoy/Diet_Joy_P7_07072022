import React from 'react';

// Création de mon modèle de Post pour qu'il soit récupéré dans Publication.js


const Post = (props) => {

    const post = props.post

    console.log(props)

    return (
        <div key={post._id} className="stylePost">
            <p> <h3>Posté par : {post.author} </h3>  </p>
            <img src={post.imageUrl} />
            <p>{post.text}</p>
        </div>
    );
};

export default Post;