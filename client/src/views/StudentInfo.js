import React, { useEffect } from "react";

import { Button, Card, CardBody, CardFooter, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckLogin from "components/checkLogin/CheckLogin";

function StudentInfo(props) {
    const userInfo = useSelector((state) => state.userInfo);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="intro-section">
            <CheckLogin {...props} />
            <div
                className="slide-1"
                style={{
                    backgroundImage: 'url("/images/hero_1.jpg")',
                    height: "900px",
                }}
                data-stellar-background-ratio="0.5"
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12" style={{ marginTop: "-20px" }}>
                            <div className="row align-items-center">
                                <>
                                    {" "}
                                    <div className="col-lg-6 mb-4">
                                        <h1
                                            data-aos="fade-up"
                                            data-aos-delay={100}
                                        >
                                            Learn From The Expert
                                        </h1>
                                        <p
                                            className="mb-4"
                                            data-aos="fade-up"
                                            data-aos-delay={200}
                                        >
                                            Chào mừng bạn đến với OneSchool !
                                        </p>
                                        <p
                                            data-aos="fade-up"
                                            data-aos-delay={300}
                                        >
                                            <Link
                                                to="/courses"
                                                className="btn btn-primary py-3 px-5 btn-pill"
                                            >
                                                Toàn bộ Khoá Học
                                            </Link>
                                        </p>
                                        <p
                                            data-aos="fade-up"
                                            data-aos-delay={300}
                                        >
                                            <Link
                                                to="/student-studyng"
                                                className="btn btn-primary py-3 px-5 btn-pill"
                                            >
                                                Khoá Học đã đăng ký
                                            </Link>
                                        </p>
                                    </div>
                                    <div
                                        className="col-lg-5 ml-auto"
                                        data-aos="fade-up"
                                        data-aos-delay={500}
                                    >
                                        <Card className="card-user">
                                            <CardBody>
                                                <CardText />
                                                <div className="author">
                                                    <div className="block block-one" />
                                                    <div className="block block-two" />
                                                    <div className="block block-three" />
                                                    <div className="block block-four" />
                                                    <a
                                                        href="#pablo"
                                                        onClick={(e) =>
                                                            e.preventDefault()
                                                        }
                                                    >
                                                        <img
                                                            alt="..."
                                                            className="avatar"
                                                            src={require("assets/img/emilyz.jpg")}
                                                        />
                                                        <h5 className="title">
                                                            {userInfo.name
                                                                ? userInfo.name
                                                                : "Mike Andrew"}
                                                        </h5>
                                                    </a>
                                                    <p className="description">
                                                        Student
                                                    </p>
                                                </div>
                                                <div className="card-description text-center">
                                                    {!userInfo.name
                                                        ? `Vui lòng bổ sung đầy đủ
                                                    thông tin cá nhân....`
                                                        : userInfo.aboutme}
                                                    <i className="fas fa-hand-point-right"></i>
                                                    <Link to="/edit-info">
                                                        <i
                                                            title="Edit Here!"
                                                            className="fas fa-edit"
                                                            style={{
                                                                fontSize:
                                                                    "30px",
                                                                cursor:
                                                                    "pointer",
                                                                marginLeft:
                                                                    "7px",
                                                            }}
                                                        ></i>
                                                    </Link>
                                                </div>
                                            </CardBody>
                                            <CardFooter>
                                                <div
                                                    className="button-container"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Button
                                                        className="btn-icon btn-round user-info-btn"
                                                        color="facebook"
                                                    >
                                                        <i className="fab fa-facebook" />
                                                    </Button>
                                                    <Button
                                                        className="btn-icon btn-round user-info-btn"
                                                        color="twitter"
                                                    >
                                                        <i className="fab fa-twitter" />
                                                    </Button>
                                                    <Button
                                                        className="btn-icon btn-round user-info-btn"
                                                        color="google"
                                                    >
                                                        <i className="fab fa-google-plus" />
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentInfo;
