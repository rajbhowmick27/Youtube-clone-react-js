import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./_watchScreen.scss";

import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { BiUpArrow, BiDownArrow } from "react-icons/bi";

import {Helmet} from 'react-helmet'

const WatchScreen = ({ mediumScreen}) => {
  const { id } = useParams();

  const [openComments, setOpenComments] = useState(false);

  const dispatch = useDispatch();


  // console.log("mediumScreen -> ",mediumScreen,'\n');

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  const { video, loading } = useSelector((state) => state.selectedVideo);

  // console.log("Video", video);

  return (
    <Row>

      <Helmet>
        <title>{video?.snippet?.title}</title>
      </Helmet>


      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>

        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h3>Loading...</h3>
        )}

        <div className="watchScreen__comments">
          <p>{video?.statistics?.commentCount} <strong>Comments</strong></p>

          <div
            className="watchScreen__comments__icons"
            onClick={() => setOpenComments((value) => !value)}
            title={openComments ? "Hide Comments":"Show Comments"}
          >
            <BiUpArrow />
            <BiDownArrow />
          </div>
        </div>
          


        {(!mediumScreen) && <Comments openComments={openComments} videoId={id} />}
        {(openComments) && <Comments openComments={openComments} videoId={id} />}
        
    
      </Col>
      <Col lg={4}>
        {!relatedVideosLoading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
