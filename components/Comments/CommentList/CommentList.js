import {useEffect, useState} from "react";
import styles from './CommentList.module.css';

function CommentList(props) {
    const [commentsState, setCommentsState] = useState([]);

    const commentsItems = commentsState.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.text}</p>
                <div>
                    By <address>{comment.name}</address>
                </div>
            </li>
        );
    });

    useEffect(() => {
        props.getCommentsPerEventHandler(props.eventId).then(response => {
            console.log('comments = ', response);
            setCommentsState(response.comments);
        });


    }, [props])

    return (
        <ul className={styles.comments}>
            {/* Render list of comments - fetched from API */}
            {/*<li>*/}
            {/*    <p>My comment is amazing!</p>*/}
            {/*    <div>*/}
            {/*        By <address>Maximilian</address>*/}
            {/*    </div>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*    <p>My comment is amazing!</p>*/}
            {/*    <div>*/}
            {/*        By <address>Maximilian</address>*/}
            {/*    </div>*/}
            {/*</li>*/}
            {commentsItems}
        </ul>
    );
}

export default CommentList;
