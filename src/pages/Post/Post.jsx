import { useFetchDocument } from '../../hooks/useFetchDocument';
import styles from './Post.module.css';

// hooks
import { useParams } from 'react-router-dom';


const Post = () => {
    const { id } = useParams();
    const { document:post, error, loading} = useFetchDocument("posts", id);


    return (
        <div className={styles.post_conttainer}>
            {loading && <p>Carregando post...</p>}
            <h1>Post</h1>
            {post && (
                <div key={id}>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.image} />
                    <p>{post.body}</p>
                    <h3>Este post trata sobre</h3>
                    {post.tags.map((tag) => (
                        <div className={styles.tags}>
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Post;