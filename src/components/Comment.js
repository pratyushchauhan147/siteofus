
import Moment from "react-moment";

function Comment({ comment }) {
    return (
        <div className="maincbox">
            <div className="flex flex-col space-y-2 w-full">
            <div className='user-info blur-back w-fit '>
            
                <img className='profilepiconpost ' src={comment?.userImg} alt="" />
                        <div className="user-info-area">
                        <h4 className='usertag' >@Anomynous</h4>
                        <p className='color-gray'>A-User</p>
                        <p><Moment fromNow>{comment?.timestamp?.toDate()}</Moment ></p>
                    
                        </div>
                </div>
               
                <div className='user-info blur-back ctbox'>
                    <p>
                        {comment?.comment}
                    </p>


                </div>
                </div>
            
        </div>
    );
}

export default Comment;
