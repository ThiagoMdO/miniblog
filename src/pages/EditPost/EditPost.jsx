
import styles from './EditPost.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';

import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';


const EditPost = () => {

  const { id } = useParams();
  const { document: post} = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tags.join(", ");

      setTags(textTags);
    
    };
  }, [post])

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navgate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");

    if (isEmpty(title) ||
        isEmpty(image) ||
        isEmpty(body)  ||
        isEmpty(tags)) {
          setFormError("Por favor, preencha todos os campos");
          return;
    }
    
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
      return;
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check all values

    

    // console.log({
    //   title,
    //   image,
    //   body,
    //   tags: tagsArray,
    //   uid: user.uid,
    //   createdBy: user.displayName,
    // });

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
    };

    updateDocument(
      id,
      data
    );

    // redirect to home page
    navgate(`/dashboard`);

    
  }
  
  function isEmpty(value) {
      return value.trim() === "";
  }

  return (
    <div className={styles.edit_post}>
      {user && post && user.uid !== post.uid && (
        <div>
          <p>O post não pertence a você para ser editado</p>
        </div>
      )}
      {!post && (
        <div>
          <p>Post não existe</p>
        </div>
      )}
        {post && user.uid == post.uid && (
          <>
            <h2>Editando Post: {post.title}</h2>
            <p> {post.createdBy} Mude sua publicação</p>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título:</span>
                <input 
                  type="text"
                  name='title'
                  required
                  placeholder='Título do post'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>

              <label>
                <span>URL da imagem:</span>
                <input 
                  type="text" 
                  name=""
                  required
                  placeholder='Url da imagem do post'
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
              </label>
              <p className={styles.preview_title}>Preview da imagem atual</p>
              <img 
                className={styles.image_preview}
                src={post.image} 
                alt={post.title} 
              />

              <label>
                <span>Escreva seu texto:</span>
                <textarea 
                  name="body"
                  required
                  placeholder='Digite seus pensamentos...'
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                  >
                </textarea>
              </label>

              <label>
                <span>Tags</span>
                <input 
                  type="text" 
                  name="tags"
                  required
                  placeholder='Insira das tags separadas por vírgula'
                  onChange={(e) => setTags(e.target.value)}
                  value={tags}
                />
              </label>

              {!response.loading && <button className='btn'>Editar</button>}
              {response.loading && <button className='btn' disabled>Aguarde...</button>}
              {response.error && <p className='error'>{response.error}</p>}
              {response.sucess && <p className='sucess'>{response.sucess}</p>}
              {formError && <p className='error'>{formError}</p>}
            </form>
          </>
        )}
    </div>
  )
}

export default EditPost;