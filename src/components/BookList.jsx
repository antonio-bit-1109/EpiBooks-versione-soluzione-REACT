import React, { useState } from "react";
import SingleBook from "./SingleBook";
import { Col, Container, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = (props) => {
    const { books } = props;

    const [searchQuery, setSearchQuery] = useState("");
    const [copyOfbook, setCopyOfBook] = useState([]);
    console.log("copyOfbook", copyOfbook);

    const [nothingCliked, setNothingClicked] = useState(true);

    const isClicked = () => {
        setNothingClicked((prevState) => !prevState);
    };

    const TaketheSingleBook = (value) => {
        setCopyOfBook(value);
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={4} className="text-center">
                    <Form.Group>
                        <Form.Control
                            type="search"
                            placeholder="Cerca un libro"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className="d-flex">
                <Row>
                    {books
                        .filter((book) => book.title.toLowerCase().includes(searchQuery))
                        .slice(0, 6)
                        .map((book) => (
                            <Col xs={12} md={7} xxl={7} key={book.asin}>
                                <SingleBook book={book} TaketheSingleBook={TaketheSingleBook} isClicked={isClicked} />
                            </Col>
                        ))}
                </Row>
                <Col className="order-last" xs={12} md={5} xxl={5}>
                    <div className="sticky-top mt-5">
                        <CommentArea asin={copyOfbook.asin} nothingCliked={nothingCliked} />
                    </div>
                </Col>
            </div>
        </Container>
    );
};

export default BookList;
