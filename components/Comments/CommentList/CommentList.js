import styles from './CommentList.module.css';
import ElementalPagination from "../../ui/Pagination/ElementalPagination/ElementalPagination";

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
            <ElementalPagination items={commentsItems}/>
            {/*{commentsItems}*/}
        </ul>
    );
}

export default CommentList;
