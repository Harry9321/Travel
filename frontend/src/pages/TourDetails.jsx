import React, { useRef, useState } from "react"; 
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from 'react-router-dom'; 
 import tourData from '../assets/data/tours';
 import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking.jsx";
 import calculateAvgRating from './../utils/avgRating.js';
import Newsletter from "./../shared/Newsletter"

const TourDetails = () => {
    const { id } = useParams()
     const reviewMsgRef = useRef('');
     const[tourRating, setTourRating] = useState(null)
     const tour = tourData.find(tour => tour.id === id)
       const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour
      const { totalRating, avgRating } = calculateAvgRating(reviews);
     const  options = { day: 'numeric', month: 'long', year: 'numeric' };
    
     const submitHandler = e=>{
         e.preventDefault()
         const reviewText = reviewMsgRef.current.value;

         alert(`${reviewText},${tourRating}`);

      };

     return (
         <>
             <section>
                 <Container>
                     <Row>
                         <Col lg='8'>
                             <div className="tour_content">
                                 <img src={photo} alt="" />

                                <div className="tour_info">
                                     <h2>{title}</h2>

                                      <div className="d-flex align-items-center gap-5">

                                             <span className="tour_rating d-flex
                                              align-items-center gap-1">
                                             <i class="ri-star-s-fill"
                                                style={{color: "var(--secondary-color)"}}></i>
                                                    {calculateAvgRating === 0 ? null : avgRating}
                                                        {totalRating === 0 ? (
                                                            "Not rated"
                                                         ) : (
                                                <span>
                                                    ({reviews?.length})
                                                </span>
                                            )}
                                        </span>
                                       <span>
                                            <i class="ri-map-pin-user-fill"></i> {address}
                                        </span>
                                    </div>

                                      <div className="tour_extra-details">
                                        <span><i class="ri-map-pin-2-line"></i>{city}</span>
                                        <span><i class="ri-money-dollar-circle-line"></i>${price}/ per person </span>
                                        <span><i class="ri-map-pin-time-line"></i>{distance} k/m </span>
                                        <span><i class="ri-group-line"></i>{maxGroupSize} people</span>
                                    </div>
                                      <h5>Description</h5>
                                    <p>{desc}</p>
                                </div>
                                <div className="tour_reviews mt-4">
                                    <h4>Reviews ({reviews?.length} reviews)</h4>

                                    <Form onSubmit={submitHandler} >
                                        <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                                            <span onClick={() => setTourRating(1)}>1 <i class="ri-star-s-fill"></i></span>
                                            <span onClick={() => setTourRating(2)}>2 <i class="ri-star-s-fill"></i></span>
                                            <span onClick={() => setTourRating(3)}>3 <i class="ri-star-s-fill"></i></span>
                                             <span onClick={() => setTourRating(4)}>4 <i class="ri-star-s-fill"></i></span>
                                            <span onClick={() => setTourRating(5)}>5 <i class="ri-star-s-fill"></i></span>
                                        </div>
                                        
                                          <div className="review_input">
                                            <input type="text"
                                             ref= {reviewMsgRef} 
                                             placeholder="Share your thoughts" 
                                             
                                             />
                                            <button 
                                            className="btn primary__btn text-white"
                                             type="submit"
                                             >
                                                Submit
                                                </button>
                                        </div>
                                    </Form>

                                    <ListGroup className="user_reviews">
                                        {
                                            reviews?.map(review=>(
                                                <div className="review_item">
                                                    <img src={avatar} alt="" />

                                                    <div className="w-100">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h5>Harry</h5>
                                                                <p>{new Date('09-20-2023').toLocaleDateString
                                                                ('en-US',options)}</p>

                                                            </div>
                                                             <span className="d-flex align-items-center">
                                                                5<i class="ri-star-s-fill"></i>
                                                             </span>
                                                        </div>
                                                        <h6>Amazing tour</h6>
                                                    </div>
                                                    <br /><br /><br />
                                                    <div className="w-100">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h5>Harshal</h5>
                                                                <p>{new Date('09-20-2023').toLocaleDateString
                                                                ('en-US',options)}</p>

                                                            </div>
                                                             <span className="d-flex align-items-center">
                                                                5<i class="ri-star-s-fill"></i>
                                                             </span>
                                                        </div>
                                                        <h6>Amazing tour</h6>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </ListGroup>
                                    
                                </div> 
                            </div>
                        </Col>
                        <Col lg='4'>
                            <Booking tour={tour} avgRating={avgRating} />
                                </Col>
                    </Row>
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default TourDetails;

