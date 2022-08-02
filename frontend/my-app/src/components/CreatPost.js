import React, { useState } from 'react';
import axios from 'axios';
import { getPost } from '../apiCalls';

const CreatPost = (props) => {

const { setPosts } = props

const [postPicture, setPostPicture]= useState(""); // affichage de l image dans le front
const [postText, setPostText]= useState("");
const [file, setFile] = useState(""); // à utliser pour l envoi de l image dans la bdd ??
const [error, setError] = useState("");


const handlePost = async (event)=> {
    event.preventDefault()
   
try{
    if ( postText || postPicture){ 
        const data = new FormData();
        data.append('text', postText);
        data.append("image", file);

        const res = await axios.post ('http://localhost:3000/api/post', data , {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data"
              }
        });
        // setPosts(res.post)
        // const newPost = res.data

        // setPosts(previousPosts => {
        //     console.log({previousPosts})
        //     previousPosts.unshift(newPost)
        //     console.log({previousPosts})
        //     return previousPosts
        // })

        const posts = await getPost()
        setPosts(posts)
    };
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
        <form onSubmit={handlePost}>
        <div className='CreatPostContainer'>
        {postPicture
                ? <img src={postPicture} alt="image de la publication" /> 
                : null} {/* si le post contient une image on l'affiche sinon on montre rien */}
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
                <i className="fa-solid fa-image"></i>
                <input type="file" 
                id="file-upload" 
                name="imageUrl" 
                accept='.jpg, .jpeg, .png '
                onChange={(e) => handlePicture(e)} 
                // value={postPicture} 
                />
    
            </div>

            <div className='btnSend'>
                { postText || postPicture ? ( <button className='cancel' onClick={cancelPost}>Annuler</button>) : null} {/*si il y a une image et un text on permet d annuler la saisi via un bouton */}
            <button className='send' type="submit">Envoyer</button>
            </div>
            <small>{error}</small>{' '}
        {/* message d erreur qui s affiche si il y en a une */}
        </div>
        </form>
    );


};
export default CreatPost ;