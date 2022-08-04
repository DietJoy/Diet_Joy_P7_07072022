import React, {useState, useRef} from 'react';
import {EosIconsContentModified} from '../assets/updateIcone';
import {getPost, updatePost} from '../apiCalls';
import { RiDeleteBin6Fill } from '../assets/deleteIcone';
import UpdatePost from './UpdatePost';
// Données des posts récupérées dans Publication.js

const Post = (props) => {
  const {post, handlePosts} = props;

  const [isUpdating, setIsUpdating] = useState(false);


  return (
    <div className="stylePost">
      <h3>Posté par : {post.author} </h3>
      {post.imageUrl 
        ? <img src={post.imageUrl} alt="image de la publication" />
        : null
        }
      {/* si le post contient une image on l'affiche sinon on montre rien */}
      {isUpdating === false && <p>{post.text}</p>}
      {isUpdating && (
        <UpdatePost 
            post={post}
            handlePosts={handlePosts}
            setIsUpdating={setIsUpdating}
        />
        // <div className="updatePost">
        //   <textarea
        //     value={textUpdate}
        //     onChange={(e) => setTextUpdate(e.target.value)}
        //   />
        //   <input type="file" onChange={handlePicture} ref={fileRef}/>
        //   <div onClick={resetPostInputs}>
        //     <RiDeleteBin6Fill />
        //   </div>
        //   <div className="buttonContainer">
        //     <button className="btn" onClick={updateItem}>
        //       Valider les modifications
        //     </button>
        //   </div>
        // </div>
      )}
      {post.userId === localStorage.getItem('userId') && (
        <div className="buttonContainer">
          <div
            onClick={() => setIsUpdating((previousIsUpdating) => !previousIsUpdating)}>
            {/* au clic on peut modifier( isUpdat à true )et au 2eme clic (on repasse isUpdate à false) ca annule la possibilité de modifier */}
            <EosIconsContentModified />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
