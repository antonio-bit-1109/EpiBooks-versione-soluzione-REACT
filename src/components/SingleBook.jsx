import { useState } from "react";
import { Card } from "react-bootstrap";

const SingleBook = (props) => {
    const { book, TaketheSingleBook, isClicked } = props;

    const [selected, setSelected] = useState(false);

    return (
        <>
            <Card
                onClick={() => {
                    setSelected(!selected);
                    TaketheSingleBook(book);
                    isClicked();
                }}
                style={{ border: selected ? "3px solid red" : "none" }}
            >
                <Card.Img
                    variant="top"
                    src={book.img}
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                    className="mt-4"
                />
                <Card.Body>
                    <Card.Title className="text-center" style={{ color: "black" }}>
                        {book.title}
                    </Card.Title>
                </Card.Body>
            </Card>
        </>
    );
};

export default SingleBook;
