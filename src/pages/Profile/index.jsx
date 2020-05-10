import React from "react";
import "./profile.css";
import Button from "@material-ui/core/Button";
import MainHeader from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import PostDetails from "../../components/PostDetails";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRequest } from "../../utils/backEndFetch";

export default function Profile({ isLoggedIn, setCurrentPostInfo }) {
  return (
    <Router>
      <QueryParams
        isLoggedIn={isLoggedIn}
        setCurrentPostInfo={setCurrentPostInfo}
      />
    </Router>
  );
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParams({ isLoggedIn, setCurrentPostInfo }) {
  const [indicator, setIndicator] = React.useState(true);
  const [profileInfo, setProfileInfo] = React.useState({});
  let query = useQuery();

  const getProfile = () => {
    getRequest("/profile").then((response) => {
      setProfileInfo(response.data);
      setIndicator(false);
    });
  };

  React.useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <MainHeader />

      {indicator ? (
        <div className="indicator">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <div>
          <div className="headerContainer">
            <div>
              <Button
                className="follow"
                variant="contained"
                href="/followers?name=followers"
              >
                {profileInfo.followers}
                <br />
                followers
              </Button>
            </div>
            <a>
              <img
                className="profileimg"
                src={profileInfo.user_info.profile_image}
                alt="profileimg"
              ></img>
              <h3>
                {profileInfo.user_info.first_name +
                  " " +
                  profileInfo.user_info.last_name}
              </h3>
            </a>
            <div>
              <Button
                className="follow"
                variant="contained"
                href="/followers?name=following"
              >
                {profileInfo.following}
                <br />
                following
              </Button>
            </div>
          </div>

          <ul className="tabs">
            <Link className="text" to="/profile?name=userPosts">
              MyPost
            </Link>

            <Link className="text" to="/profile?name=userFavorites">
              Favorite
            </Link>
          </ul>

          <Child
            name={query.get("name")}
            setCurrentPostInfo={setCurrentPostInfo}
            profileInfo={profileInfo}
          />
        </div>
      )}
      <MainFooter isLoggedIn={isLoggedIn} />
    </div>
  );
}

function Child({ name, setCurrentPostInfo, profileInfo }) {
  const [indicator, setIndicator] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  const getPosts = (path) => {
    getRequest(`/${path}`).then((response) => {
      console.log(response);
      setPosts(response.data);
      setIndicator(false);
    });
  };

  React.useEffect(() => {
    getPosts(name === null ? "userPosts" : name);
  }, [name]);

  // const viewPostData = () => {
  //   setCurrentPostInfo({
  //     postData,
  //     userData: profileInfo.user_info,
  //     isFavorite: null,
  //     isLiked: null,
  //     isFollowed: null,
  //   });
  // };
  return (
    <div className="postContainer">
      {indicator ? (
        <div className="indicator">
          <CircularProgress disableShrink />
        </div>
      ) : name == "userFavorites" ? (
        posts ? (
          posts.map((post, i) => (
            <div className="cardPost">
              {/* <Link to="ViewPost" onClick={() => viewPostData(post.post_info)}> */}
                <PostDetails
                  viewPostData={() =>
                    setCurrentPostInfo({
                      postData:post.post_info,
                      userData: profileInfo.user_info,
                      isFavorite: null,
                      isLiked: null,
                      isFollowed: null,
                    })
                  }
                  postData={post.post_info}
                  noIcon
                  noDesc
                />
              {/* </Link> */}
            </div>
          ))
        ) : (
          <h3>there is no favorite posts</h3>
        )
      ) : posts ? (
        posts.map((post, i) => (
          <div className="cardPost">
            {/* <Link to="ViewPost" onClick={() => viewPostData(post.post_info)}> */}
            <PostDetails
                  viewPostData={() =>
                    setCurrentPostInfo({
                      postData:post.post_info,
                      userData: profileInfo.user_info,
                      isFavorite: null,
                      isLiked: null,
                      isFollowed: null,
                    })
                  }
                  postData={post.post_info}
                  noIcon
                  noDesc
                />            {/* </Link> */}
          </div>
        ))
      ) : (
        <h3>there is no posts</h3>
      )}
    </div>
  );
}
