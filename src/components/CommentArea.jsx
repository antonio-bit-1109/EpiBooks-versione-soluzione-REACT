import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { Alert } from "react-bootstrap";

const CommentArea = (props) => {
    const { asin, nothingCliked } = props;
    console.log("ASIN IN COMMENT AREA ", asin);

    const [comments, setComments] = useState([]);
    console.log(comments);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchData = async (value) => {
        try {
            let response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${value}`, {
                method: "GET",
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

    useEffect(() => {
        if (asin) {
            fetchData(asin);
        } else {
            return;
        }
    }, [asin]);

    return (
        <div className="text-center mt-5">
            {/*  {isLoading && <Loading />} */}
            {isError && <Error />}
            {nothingCliked && <Alert variant="warning"> Nessun commento caricato. Clicca un libro.</Alert>}
            {<AddComment asin={asin} />}
            {!nothingCliked && <CommentList commentsToShow={comments} />}
        </div>
    );
};

export default CommentArea;
