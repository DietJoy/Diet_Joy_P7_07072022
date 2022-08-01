import React, { useState } from 'react';
import axios from 'axios';


const CreatPost = () => {
const [postPicture, setPostPicture]= useState(""); // affichage de l image dans le front
const [postText, setPostText]= useState("");
const [file, setFile] = useState(); // à utliser pour l envoi de l image dans la bdd ??
const [error, setError] = useState('');


const handlePost = async (data)=> {
   
try{
    if ( postText || postPicture){ 
        const data = new FormData();
        data.append('userId', data._id);
        data.append('text', postText);
        if (file) data.append("imageUrl", file);
    };
    const res = await axios.post ('http://localhost:3000/api/post',{ 
        data

});
console.log(res);   

} catch (err) {
    setError(err.response.data?.error || err.message);
    }
};

const handlePicture = (e) => {//fonction qui enverra l image dans la bdd au clic du bouton 
setPostPicture(URL.createObjectURL(e.target.files[0]));
setFile(e.target.files[0]);
}; 


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
                onChange={(e) => handlePicture(e)} 
                value={postPicture} 
                />
            </div>
            <div className='btnSend'>
                { postText || postPicture ? ( <button className='cancel' onClick={cancelPost}>Annuler</button>) : null} {/*si il y a une image et un text on permet d annuler la saisi via un bouton */}
            <button className='send' onClick={handlePost & handlePicture}>Envoyer</button>
            </div>
        </div>
    );


};
export default CreatPost ;