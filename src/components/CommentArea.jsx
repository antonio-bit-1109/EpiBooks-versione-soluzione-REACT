import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = ({ asin }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2JhMDBkOGEyMDAwMThhNDhhNDAiLCJpYXQiOjE3MDQ3MjIzMTIsImV4cCI6MTcwNTkzMTkxMn0.o6QM1stCifQGBTxb7WO5estJemL28Q_NjVcVHCLduO0",
                    },
                });

                if (response.ok) {
                    let commentsData = await response.json();
                    setComments(commentsData);
                    setIsLoading(false);
                    setIsError(false);
                } else {
                    setIsLoading(false);
                    setIsError(true);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setIsError(true);
            }
        };

        fetchData();
    }, [asin]);

    return (
        <div className="text-center">
            {isLoading && <Loading />}
            {isError && <Error />}
            <AddComment asin={asin} />
            <CommentList commentsToShow={comments} />
        </div>
    );
};

export default CommentArea;
