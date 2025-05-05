import "./evaluate.css";
// import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getFullComment } from "../../../redux/actions";
import { useState, useEffect } from "react";
function Evaluate( { Listcomment } ) {

    console.log(' props 2',Listcomment);

    // const dispatch = useDispatch();
    //  useEffect(() => {
    //      console.log()
    //  }, [Listcomment])
    // const listcomment = useSelector(state => state.getFullComment.data);
   
    return (
        <>
            {Listcomment && Listcomment.length > 0 &&  Listcomment.map((comment, index) => {
                return (
                    <div key={index} className="Evaluate">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                                className="avatar_user image_user_avatar"
                                src={
                                    comment.Account != null
                                        ? comment.Account.avatar
                                        : 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg'
                                }
                                alt=""
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                            <span>{comment?.Account?.name}</span>
                            <span style={{ fontSize: '12px', color: '#777' }}>
            {`Thời gian: ${new Date(comment.createdAt).toLocaleString('vi-VN')}`}
        </span>
                        </div>
                
                        <span className="Evaluate_count">
  Đánh giá:
  {Array.from({ length: parseInt(comment.star) }, (_, i) => (
    <span key={i} style={{ color: '#ffc107', fontSize: '18px' }}>★</span>
  ))} ({comment.star})
</span>

                        <br />
                        <span className="Evaluate_content">
                            {`  Nội Dung : ${comment ? comment.content : ''}`}
                        </span>
                        <div className="Evaluate_img">
                            <img className="img_evalua" src={comment ? comment.comment_img : ''} alt="" />
                        </div>
                    </div>
                );
                
            })}
        </>
    );
}

export default Evaluate;