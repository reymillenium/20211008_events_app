import styles from './CommentList.module.css';

function CommentList(props) {
    const commentsItems = props.comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.text}</p>
                <div>
                    By <address>{comment.name}</address>
                </div>
            </li>
        );
    });

    return (
        <ul className={styles.comments}>
            {commentsItems}
        </ul>
    );
}

export default CommentList;
