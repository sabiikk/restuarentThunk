import React from "react";
import { Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Collapse from 'react-bootstrap/Collapse';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function RestView() {
  //use param() hook is used to get parameter passed in URL
  const{id}=useParams()
   console.log("parameter");
   console.log(id);
   
   
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  
  const allRestaurant=useSelector((state)=>state.resturantSlice.allRestaurant.restaurants);
  const selectedResturant = allRestaurant.find(item=>item.id==id)
  console.log(selectedResturant);
  
  return (
    <>
      <Row>
        <Col md={1}></Col>
        <Col md={3}>
          <img
            src={selectedResturant.photograph}
            alt=""
            width="100%"
            height="100%"
            className="rounded"
          />
        </Col>
        <Col md={7} className="px-5">
          <hr />
          <h5 className="text-center">
            Restaurant <span className="text-warning">Details</span>{" "}
          </h5>
          <hr />
          <ListGroup>
            <ListGroup.Item>
              <h5 className="text-center p-2">{selectedResturant?.name}</h5>
            </ListGroup.Item>
            <ListGroup.Item>Neighbourhood:{selectedResturant?.neighborhood}</ListGroup.Item>
            <ListGroup.Item>Address:{selectedResturant.address}</ListGroup.Item>
            <ListGroup.Item>Cuisine Type:{selectedResturant.cuisine_type}</ListGroup.Item>
            <ListGroup.Item className="text-center p-3 mb-2">
              <button className="btn btn-warning" onClick={handleShow}>
                Opearating Hours
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Opearating Hours</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ListGroup>
      <ListGroup.Item>Monday:{selectedResturant.operating_hours.Monday}</ListGroup.Item>
      <ListGroup.Item>Tuesday:{selectedResturant.operating_hours.Tuesday}</ListGroup.Item>
      <ListGroup.Item>Wednesday:{selectedResturant.operating_hours.Wednesday}</ListGroup.Item>
      <ListGroup.Item>Thursday:{selectedResturant.operating_hours.Thursday}</ListGroup.Item>
      <ListGroup.Item>Friday:{selectedResturant.operating_hours.Friday}</ListGroup.Item>
      <ListGroup.Item>Saturday:{selectedResturant.operating_hours.Saturday}</ListGroup.Item>
      <ListGroup.Item>Sunday:{selectedResturant.operating_hours.Sunday}</ListGroup.Item>
    </ListGroup>


                </Modal.Body>
               
              </Modal>
              <button className="btn btn-warning ms-3" onClick={() => setOpen(!open)}  >
                Click Here to see Reviews
              </button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
     
      <Row>
        <Col md={4}></Col>
        <Col md={7}>
        <Collapse in={open}>
          <div>
          <hr />
          {selectedResturant.reviews.length>0?
          selectedResturant.reviews.map((item)=>(
            <div className="mt-2">
              <h6>Name and Data:{item.name}-{item.date}</h6>
              <p>Rating:{item.rating}</p>
              <p>{item.comments}</p>
            </div>

          )):
          (
          <p>nothing to display</p>
          )}




         
            
          </div>
      </Collapse>
        
        </Col>
      </Row>




    </>
  );
}

export default RestView;
