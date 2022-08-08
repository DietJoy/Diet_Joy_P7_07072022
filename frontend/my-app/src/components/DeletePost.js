
import React from 'react';
import { deletePost } from '../apiCalls';
import { RiDeleteBin6Fill } from '../assets/deleteIcone';

const DeletePost = (props) => {

    const {handlePosts, id} = props

    const handleDelete = async () => {
        if(window.confirm("Voulez-vous supprimer la publication ?")){
            try{
                await deletePost(id)
                await handlePosts()
            }
            catch(err){
                console.log(err)
            }
        }
    }

    return (
        <div onClick={handleDelete} className="icone">
          <RiDeleteBin6Fill />
        </div>
    );
};

export default DeletePost;