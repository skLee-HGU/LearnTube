import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";
import Modal from "react-modal";
import axios from "axios";
import { Button } from "react-bootstrap";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import UpdateContent from "../../../components/Modal/UpdateContent";
import CreateContent from "../../../components/Modal/CreateContent";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";
import CreateNotice from "../../../components/Modal/CreateNotice";
import UpdateNotice from "../../../components/Modal/UpdateNotice";
import DeleteNotice from "../../../components/Modal/DeleteNotice";
import ReadNotice from "../../../components/Modal/ReadNotice";

const CurriculumPart = (props) => {
  const data = { ...props };
  const noticeData = { ...props.noticeData };
  const setNoticeData = { ...props.setNoticeData };
  console.log("noticeData", noticeData[0]);
  console.log("setNoticeData", setNoticeData);
  let userId = 1;

  const title = useState();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(!isOpen);

  const [noticeIdx, setNoticeIdx] = useState(0);

  const clickModalHandler = (params) => {
    setNoticeIdx(params);
  };
  const createLecture = async (e) => {
    let body = {
      classId: e,
    };
    const response = await axios
      .post("http://localhost:8080/api/lecture", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res));
    alert("생성 완료");
    window.location.reload();
  };

  const deleteLecture = async (e) => {
    let body = {
      lectureId: e,
    };
    if (window.confirm("정말 삭제하시겠습니까?") == true) {
      const response = await axios
        .post(
          "http://localhost:8080/api/lecture/delete",
          JSON.stringify(body),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));
      alert("삭제되었습니다.");
      window.location.reload();
    } else {
      return false;
    }
  };

  const deleteContent = async (e) => {
    let body = {
      contentId: e,
    };
    if (window.confirm("정말 삭제하시겠습니까?") == true) {
      const response = await axios
        .post(
          "http://localhost:8080/api/content/delete",
          JSON.stringify(body),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res));

      alert("삭제되었습니다.");
      window.location.reload();
    } else {
      return false;
    }
  };
  return (
    <>
      {noticeData ? (
        <div className="content">
          <Accordion className="accordion-box" preExpanded={"a"}>
            <AccordionItem className="accordion-item" uuid="a">
              <AccordionItemHeading>
                <AccordionItemButton>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      공지
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginRight: "25px",
                      }}
                    >
                      {props.classRoomData.instructor.userId === userId ? (
                        <span>
                          <CreateNotice
                            instructorId={props.classRoomData.instructor.userId}
                            classId={props.classRoomData.classId}
                            noticeData={noticeData}
                            setNoticeData={setNoticeData}
                          />
                        </span>
                      ) : null}
                    </div>
                  </button>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="card-body acc-content current">
                {noticeData ? (
                  <>
                    {Object.values(noticeData).map((notices, i) => (
                      <div className="content">
                        {" "}
                        <div className="clearfix">
                          <div>
                            <ReadNotice
                              notices={data.classRoomData.notices}
                              instructorId={
                                data.classRoomData.instructor.userId
                              }
                              noticeIdx={i}
                            />
                          </div>

                          {/* ////////// */}
                          <div className="pull-right">
                            <div className="minutes">
                              {props.classRoomData.instructor.userId ===
                              userId ? (
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  <span>
                                    <UpdateNotice
                                      notices={data.classRoomData.notices}
                                      instructorId={
                                        data.classRoomData.instructor.userId
                                      }
                                      i={i}
                                    />
                                  </span>
                                  <span>
                                    <DeleteNotice
                                      notices={data.classRoomData.notices}
                                      instructorId={
                                        data.classRoomData.instructor.userId
                                      }
                                      i={i}
                                    />
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="pull-right">
                            {notices.modDate ? (
                              <div
                                className="minutes"
                                style={{
                                  paddingTop: "10px",
                                  paddingRight: "15px",
                                }}
                              >
                                최종 수정시간:
                                {notices.modDate.split("T")[0] +
                                  " " +
                                  notices.modDate.split("T")[1].split(":")[0] +
                                  ":" +
                                  notices.modDate.split("T")[1].split(":")[1]}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
              </AccordionItemPanel>
            </AccordionItem>
            {/* 강의 */}
            {props.classRoomData.instructor.userId === userId ? (
              <div style={{ marginTop: "20px", marginBottom: "90px" }}>
                <div className="pull-right">
                  <Button
                    color="#495057"
                    onClick={() => {
                      createLecture(data.classRoomData.classId);
                    }}
                  >
                    섹션 추가하기
                  </Button>
                </div>
              </div>
            ) : null}
            {Array.isArray(data.classRoomData.lectures)
              ? data.classRoomData.lectures.map((lectures, i) => (
                  <AccordionItem className="accordion-item" uuid="c">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",

                              marginRight: "25px",
                            }}
                          >
                            {data.classRoomData.lectures[i].lectureNum}강
                          </div>
                          {props.classRoomData.instructor.userId === userId ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginRight: "25px",
                              }}
                            >
                              <span>
                                <CreateContent
                                  lectureId={
                                    props.classRoomData.lectures[i].lectureId
                                  }
                                />
                              </span>
                              <span
                                onClick={() => {
                                  deleteLecture(
                                    data.classRoomData.lectures[i].lectureId
                                  );
                                }}
                              >
                                <i
                                  className="fa fa-trash"
                                  style={{
                                    padding: "5px",
                                    zIndex: "0",
                                  }}
                                ></i>
                              </span>
                            </div>
                          ) : null}
                        </button>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="card-body acc-content">
                      {Array.isArray(data.classRoomData.lectures)
                        ? data.classRoomData.lectures[i].contents.map(
                            (contents, j) => (
                              <div className="content">
                                <div className="clearfix">
                                  <ModalVideo
                                    channel="youtube"
                                    isOpen={isOpen}
                                    videoId="YLN1Argi7ik"
                                    onClose={() => {
                                      openModal();
                                    }}
                                  />
                                  <div className="pull-left">
                                    <Link
                                      className="popup-videos play-icon"
                                      onClick={() => {
                                        openModal();
                                      }}
                                    >
                                      <i className="fa fa-play"></i>
                                      {
                                        data.classRoomData.lectures[i].contents[
                                          j
                                        ].contentName
                                      }
                                    </Link>
                                  </div>
                                  <div className="pull-right">
                                    <div
                                      className="minutes"
                                      style={{
                                        paddingTop: "10px",
                                      }}
                                    >
                                      마감일:
                                      {data.classRoomData.lectures[i].contents[
                                        j
                                      ].closeDate.split("T")[0] +
                                        " " +
                                        data.classRoomData.lectures[i].contents[
                                          j
                                        ].closeDate
                                          .split("T")[1]
                                          .split(":")[0] +
                                        ":" +
                                        data.classRoomData.lectures[i].contents[
                                          j
                                        ].closeDate
                                          .split("T")[1]
                                          .split(":")[1]}
                                      {props.classRoomData.instructor.userId ===
                                      userId ? (
                                        <>
                                          <div className="pull-right">
                                            <span
                                              onClick={() => {
                                                deleteContent(
                                                  props.classRoomData.lectures[
                                                    i
                                                  ].contents[j].contentId
                                                );
                                              }}
                                            >
                                              <i
                                                className="fa fa-trash"
                                                style={{
                                                  padding: "5px",
                                                  zIndex: "0",
                                                }}
                                              ></i>
                                            </span>
                                          </div>
                                          <div className="pull-right">
                                            <UpdateContent
                                              content={
                                                props.classRoomData.lectures[i]
                                                  .contents[j]
                                              }
                                            />
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        : null}
                    </AccordionItemPanel>
                  </AccordionItem>
                ))
              : null}
          </Accordion>
        </div>
      ) : null}
    </>
  );
};

export default CurriculumPart;
