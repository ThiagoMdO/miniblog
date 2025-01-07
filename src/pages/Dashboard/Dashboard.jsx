import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

// hooks
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
    const {user} = useAuthValue();
    const uid = user.uid;
    const { documents: posts, error, loading} = useFetchDocuments("posts",null, uid);

    const { deleteDocument } = useDeleteDocument("posts", uid);

    
    return ( 
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>
            <p>Bem vindo ao seus posts, <b>{user.displayName}</b></p>
            <p>Gerencie os seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts</p>
                    <Link to="../post/create" className="btn">Crie seu primeiro post</Link>
                </div> 
            ) : (
                <>
                    <div className={styles.post_header}>
                        <span>Título</span>
                        <span>Ações</span>
                    </div>
                    {posts && posts.map((post) => (
                        <div className={styles.post_row} key={post.id}>
                            <p>{post.title}</p>
                            <div>
                                <Link to={`../posts/${post.id}`} className='btn-outline'>Ver</Link>
                                <Link to={`../posts/edit/${post.id}`} className='btn-outline' >Editar</Link>
                                <button onClick={() => deleteDocument(post.id)} className='btn-outline btn-danger'>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Dashboard;