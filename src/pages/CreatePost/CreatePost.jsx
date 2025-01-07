import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';

import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(null);

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

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

    

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navgate("/");

    
  }
  
  function isEmpty(value) {
      return value.trim() === "";
  }

  return (
    <div className={styles.create_post}>
        <h2>Criar Post</h2>
        <p>Compartilhe o que você quiser com seus amigos!</p>
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

          {!response.loading && <button className='btn'>Enviar</button>}
          {response.loading && <button className='btn' disabled>Aguarde...</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {response.sucess && <p className='sucess'>{response.sucess}</p>}
          {formError && <p className='error'>{formError}</p>}
        </form>
    </div>
  )
}

export default CreatePost