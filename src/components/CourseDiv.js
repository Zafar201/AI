import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { listCourse } from '../actions/courseActions';
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'

export default function CourseDiv() {

    const courseList = useSelector((state) => state.courseList);
    const { loading, error, courses } = courseList;

    function truncate(str,n) {
        return str?.length>n?str.substr(0,n-1)+ "...." :str
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listCourse())
        // filterItem()

    }, [dispatch])

    const [cat, setCat] = useState(1)

    const activeBtn = (e) => {

        var elems = document.querySelector(".course-cat-active");
        if (elems !== null) {
            elems.classList.remove("course-cat-active");
        }
        e.target.parentNode.classList.add("course-cat-active")
    }

    return (
        <section className="sec2">
            <div className="container">
                <Row>
                    <Col md={3}><h2 className="sec2-h2">Our Bootcamp and Training Courses</h2></Col>
                    <Col md={9} className="all-course-cat">
                        <div className="course-cat  course-cat-active" onClick={(e) => { setCat(1); activeBtn(e) }} ><h5>Data Science & ML</h5></div>
                        <div className="course-cat" onClick={(e) => { setCat(2); activeBtn(e) }} ><h5>Deep Learning</h5></div>
                        <div className="course-cat" onClick={(e) => { setCat(3); activeBtn(e) }}><h5>Artificial Intelligence</h5></div>
                    </Col>
                </Row>

                <Row>
                    {loading ? <LoadingBox></LoadingBox> :
                        error ? <MessageBox>{error}</MessageBox>
                            :
                            (
                                <>{
                                    courses.results.data.filter(elm => elm.category_id === cat).map(elem => {
                                        const { id, name, sub_name, course_image, course_type, course_code, author_image, author_name, author_position } = elem;
                                        return (

                                            <Col md="3" key={id} className="all-course-card">
                                                <Link to='/bootcamp'> <div className="course-card" style={{ backgroundImage: "url(" + course_image + ")" }}>
                                                    <div className="free-course">{course_type}</div>
                                                    <div className="course-detail">
                                                        <h5>{name} :</h5><span>{truncate(sub_name,30)}</span>
                                                        <div className="user-credit">
                                                            <img src="../assets/img/course-user.svg" alt="course users" /><span className="uc-no">25</span>
                                                            <img src="../assets/img/course-credit.svg" alt="course credits" /><span className="uc-no">{course_code}</span>
                                                        </div>
                                                        <Row className="prof-details">
                                                            <Col className="col-pd-0 mw-mc">
                                                                <img src={author_image} className="prof-pic" alt="prof-pic" />
                                                            </Col>
                                                            <Col className="col-pd-0">
                                                                <Row>
                                                                    <Col md="12" className="col-pd-0 prof-name">{author_name}</Col>
                                                                    <Col className="col-pd-0 prof-dsgn">{author_position}</Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                                </Link>
                                            </Col>

                                        )
                                    })
                                }</>
                            )}
                </Row>
                <Row>
                    <Col md={12} className="all-course-cat ">
                        <LinkContainer to="/fullcourse"><div className="course-cat view-all"><h5>View All Courses &nbsp;<FontAwesome
                            className="long-arrow-fw"
                            name="arrow-right"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        /></h5></div></LinkContainer>
                    </Col>
                </Row>
            </div>
        </section>

        //     <section className="sec2">
        //     <div className="container">
        //         <Row>
        //             <Col md={3}><h2 className="sec2-h2">Our Bootcamp and Training Courses</h2></Col>
        //             <Col md={9} className="all-course-cat">
        //                 <div className="course-cat  course-cat-active" onClick={(e) => { filterItem(1); activeBtn(e) }} ><h5>Data Science & ML</h5></div>
        //                 <div className="course-cat" onClick={(e) => { filterItem(2); activeBtn(e) }} ><h5>Deep Learning</h5></div>
        //                 <div className="course-cat" onClick={(e) => { filterItem(3); activeBtn(e) }}><h5>Artificial Intelligence</h5></div>
        //             </Col>
        //         </Row>
        //         <Row>




        //                                 <Col md="3"  className="all-course-card">
        //                                     <div className="course-card" style={{ backgroundImage: "url(" + "../assets/img/course2.jpg" + ")" }}>
        //                                         <div className="free-course">free</div>
        //                                         <div className="course-detail">
        //                                             <h5> Information Visualization : </h5><span>Using Python:</span>

        //                                             <div className="user-credit">
        //                                                 <img src="../assets/img/course-user.svg" alt="course users" /><span className="uc-no">25</span>
        //                                                 <img src="../assets/img/course-credit.svg" alt="course credits" /><span className="uc-no">150</span>
        //                                             </div>
        //                                             <Row className="prof-details">
        //                                                 <Col className="col-pd-0 mw-mc">
        //                                                     <img src="../assets/img/Rectangle-WS.png" className="prof-pic" alt="prof-pic" />
        //                                                 </Col>
        //                                                 <Col className="col-pd-0">
        //                                                     <Row>
        //                                                         <Col md="12" className="col-pd-0 prof-name">Rahul Rai</Col>
        //                                                         <Col className="col-pd-0 prof-dsgn">CEO,AIBrilliance</Col>
        //                                                     </Row>
        //                                                 </Col>
        //                                             </Row>
        //                                         </div>
        //                                     </div>
        //                                 </Col>

        //                                 <Col md="3"  className="all-course-card">
        //                                     <div className="course-card" style={{ backgroundImage: "url(" + "../assets/img/course2.jpg" + ")" }}>
        //                                         <div className="free-course">free</div>
        //                                         <div className="course-detail">
        //                                             <h5> Data Science : </h5><span>Using Python:</span>

        //                                             <div className="user-credit">
        //                                                 <img src="../assets/img/course-user.svg" alt="course users" /><span className="uc-no">25</span>
        //                                                 <img src="../assets/img/course-credit.svg" alt="course credits" /><span className="uc-no">150</span>
        //                                             </div>
        //                                             <Row className="prof-details">
        //                                                 <Col className="col-pd-0 mw-mc">
        //                                                     <img src="../assets/img/Rectangle-WS.png" className="prof-pic" alt="prof-pic" />
        //                                                 </Col>
        //                                                 <Col className="col-pd-0">
        //                                                     <Row>
        //                                                         <Col md="12" className="col-pd-0 prof-name">Rahul Rai</Col>
        //                                                         <Col className="col-pd-0 prof-dsgn">CEO,AIBrilliance</Col>
        //                                                     </Row>
        //                                                 </Col>
        //                                             </Row>
        //                                         </div>
        //                                     </div>
        //                                 </Col>

        //                                 <Col md="3"  className="all-course-card">
        //                                     <div className="course-card" style={{ backgroundImage: "url(" + "../assets/img/course2.jpg" + ")" }}>
        //                                         <div className="free-course">Paid</div>
        //                                         <div className="course-detail">
        //                                             <h5> AI & ML : </h5><span>Using Python:</span>

        //                                             <div className="user-credit">
        //                                                 <img src="../assets/img/course-user.svg" alt="course users" /><span className="uc-no">25</span>
        //                                                 <img src="../assets/img/course-credit.svg" alt="course credits" /><span className="uc-no">150</span>
        //                                             </div>
        //                                             <Row className="prof-details">
        //                                                 <Col className="col-pd-0 mw-mc">
        //                                                     <img src="../assets/img/Rectangle-WS.png" className="prof-pic" alt="prof-pic" />
        //                                                 </Col>
        //                                                 <Col className="col-pd-0">
        //                                                     <Row>
        //                                                         <Col md="12" className="col-pd-0 prof-name">Rahul Rai</Col>
        //                                                         <Col className="col-pd-0 prof-dsgn">CEO,AIBrilliance</Col>
        //                                                     </Row>
        //                                                 </Col>
        //                                             </Row>
        //                                         </div>
        //                                     </div>
        //                                 </Col>

        //                                 <Col md="3"  className="all-course-card">
        //                                     <div className="course-card" style={{ backgroundImage: "url(" + "../assets/img/course2.jpg" + ")" }}>
        //                                         <div className="free-course">free</div>
        //                                         <div className="course-detail">
        //                                             <h5> AI & ML : </h5><span>Using Python:</span>

        //                                             <div className="user-credit">
        //                                                 <img src="../assets/img/course-user.svg" alt="course users" /><span className="uc-no">25</span>
        //                                                 <img src="../assets/img/course-credit.svg" alt="course credits" /><span className="uc-no">150</span>
        //                                             </div>
        //                                             <Row className="prof-details">
        //                                                 <Col className="col-pd-0 mw-mc">
        //                                                     <img src="../assets/img/Rectangle-WS.png" className="prof-pic" alt="prof-pic" />
        //                                                 </Col>
        //                                                 <Col className="col-pd-0">
        //                                                     <Row>
        //                                                         <Col md="12" className="col-pd-0 prof-name">Rahul Rai</Col>
        //                                                         <Col className="col-pd-0 prof-dsgn">CEO,AIBrilliance</Col>
        //                                                     </Row>
        //                                                 </Col>
        //                                             </Row>
        //                                         </div>
        //                                     </div>
        //                                 </Col>





        //         </Row>
        //         <Row>
        //             <Col md={12} className="all-course-cat ">
        //                 <LinkContainer to="/fullcourse"><div className="course-cat view-all"><h5>View All Courses &nbsp;<FontAwesome
        //                     className="long-arrow-fw"
        //                     name="arrow-right"
        //                     style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        //                 /></h5></div></LinkContainer>
        //             </Col>
        //         </Row>
        //     </div>
        // </section>
    )
}
