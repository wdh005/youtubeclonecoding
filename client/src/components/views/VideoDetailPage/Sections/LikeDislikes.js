import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    let variable = {

    }

    if(props.video) {
        variable = { videoId: props.videoId, userId: props.userId}
    }else {
        variable = { commentId: props.commentId, userId: props.userId}
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
        .then(response=> {
            if(response.data.success) {
                //좋아요 수
                setLikes(response.data.likes.length)

                // 좋아요 여부 (이미 눌렀는지 아닌지)
                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })

            }else {
                alert('Likes 정보를 가져오지 못했습니다.')
            }
        })


        Axios.post('/api/like/getDislikes', variable)
        .then(response=> {
            if(response.data.success) {
                //싫어요 수
                setDislikes(response.data.dislikes.length)

                // 싫어요 여부 (이미 눌렀는지 아닌지)
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setDisLikeAction('disliked')
                    }
                })

            }else {
                alert('Dislikes 정보를 가져오지 못했습니다.')
            }
        })
    }, [])

    const onLike = () => {

        if(LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
            .then(response => {
                if(response.data.success) {
                    setLikes(Likes + 1)
                    setLikeAction('liked')

                    if(DisLikeAction !== null) {
                        setDisLikeAction(null)
                        setDislikes(Dislikes -1)
                    }

                }else {
                    alert('Like 실패')
                }
            })
        }else {
            Axios.post('/api/like/unLike', variable)
            .then(response => {
                if(response.data.success) {
                    setLikes(Likes - 1)
                    setLikeAction(null)

                }else {
                    alert('Like 취소 실패')
                }
            })
        }
    }

    const onDislike = () => {
        
        if(DisLikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
            .then(response => {
                if(response.data.success) {
                    setDislikes(Dislikes - 1)
                    setDisLikeAction(null)

                }else {
                    alert('dislike  취소 실패')
                }
            })
        }else {
            Axios.post('/api/like/upDislike', variable)
            .then(response => {
                if(response.data.success) {
                    setDislikes(Dislikes + 1)
                    setDisLikeAction('disliked')

                    if(LikeAction !== null) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }

                }else {
                    alert('Like 취소 실패')
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked'? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DisLikeAction === 'disliked'? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>&nbsp;&nbsp;

            
        </div>
    )
}

export default LikeDislikes
