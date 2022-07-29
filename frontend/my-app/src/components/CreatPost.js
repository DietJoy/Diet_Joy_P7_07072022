import React, { useState } from 'react';


const CreatPost = () => {
const [postPicture, setPostPicture]= useState("");
const [postText, setPostText]= useState("");
 
const handlePost = () => {}; //fonction qui enverra le post dans la bdd au clic du bouton 
const cancelPost = () => { //fonction qui annulera la rédaction du post
    setPostPicture("")
    setPostText("")
};
    return (
        <div className='CreatPostContainer'>
            <div className='PostForm'>
               <textarea 
               name="text"
               id="text"
               placeholder='votre texte'
               onChange={(e) => setPostText (e.target.value) }
               value= {postText}
               />  
            </div>
            <div className='PostImage'>
                <i class="fa-solid fa-image"></i>
                <input type="file" 
                id="file-upload" 
                name="imageUrl" 
                accept='.jpg, .jpeg, .png '
                onChange={(e) => setPostPicture(e)} 
                value={postPicture} 
                />
            </div>
            <div className='btnSend'>
                { postText || postPicture ? ( <button className='cancel' onClick={cancelPost}>Annuler</button>) : null} // si il y a une image et un text on permet d annuler la saisi via un bouton
            <button className='send' onClick={handlePost}>Envoyer</button>
            </div>
        </div>
    );
};

export default CreatPost;