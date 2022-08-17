import React, {useEffect, useState, useContext} from 'react';
import {EosIconsContentModified} from '../assets/updateIcone';
import  LikePost  from '../components/LikePost'
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import globalContext from '../context';

// Données des posts récupérées dans Publication.js

const Post = (props) => {
  const {post, handlePosts } = props;

  const {isAdmin } = useContext(globalContext)

  const [isUpdating, setIsUpdating] = useState(false);


  return (
    <div className="stylePost">

      <h3>Posté par : {post.author} 
      
      {(post.userId === localStorage.getItem('userId') || isAdmin === true) && (
          <>
          <div className='icone'
            onClick={() => setIsUpdating((previousIsUpdating) => !previousIsUpdating)}>
            {/* au clic on peut modifier( isUpdat à true )et au 2eme clic (on repasse isUpdate à false) ca annule la possibilité de modifier */}
            <EosIconsContentModified />
          </div>
           <DeletePost 
            id={post._id} 
            handlePosts={handlePosts}
            />
           </>
      )}
      
      </h3>
      <div className='imageEtTexte'>
      {post.imageUrl
        ? <img className='ImagePost' src={post.imageUrl} alt="image de la publication" />
        : null
        }
      {/* si le post contient une image on l'affiche sinon on montre rien */}
      {isUpdating === false && <p className='textPost'>{post.text}</p>}
      </div>
      {isUpdating && (
        <UpdatePost 
            post={post}
            handlePosts={handlePosts}
            setIsUpdating={setIsUpdating}
        />
       
      )}
      
      <div className='like'>
      <LikePost 
        handlePosts={handlePosts}
        post={post}
      />
    </div>
      
    
    </div>
  );
};

export default Post;
