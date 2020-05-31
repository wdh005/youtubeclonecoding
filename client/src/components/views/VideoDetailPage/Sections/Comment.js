import React, {useState} from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';

function Comment(props) {
    const videoId = props.postId;
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            contents: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success) {

            }else {
                alert('커멘트 저장 실패')
            }
        })
    }

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />

            {/* Comment Lists */}



            {/* Root Comment Form */}

            <form style={{ display: 'flex'}} onSubmit={onSubmit} >
                <textarea 
                    style={{ width: '100%', borderRadius:'5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} > Submit</button>

                
            </form>
        </div>
    )
}

export default Comment
