import React from 'react';

// Données des posts récupérées dans Publication.js

const Post = (props) => {

    const post = props.post

    return (
        <div className="stylePost">
            <h3>Posté par : {post.author} </h3>
            {post.imageUrl 
                ? <img src={post.imageUrl} alt="image de la publication"/> 
                : null} {/* si le post contient une image on l'affiche sinon on montre rien */}
            <p>{post.text}</p>
        </div>
    );
};

export default Post;



