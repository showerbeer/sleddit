import PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import PostItem from "./PostItem";
import ReplyBar from "./ReplyBar";

class PostList extends Component {
  render() {
    const { posts, subreddit, expandedPost, isRedditBlocked } = this.props;
    const activePostId = expandedPost ? expandedPost.post.id : "";
    return (
      <div className={`root${expandedPost ? " closed" : ""}`}>
        <div className="scroll-container">
          <Scrollbars
            universal
            autoHide
            style={{ height: "100%" }}
            renderThumbVertical={props => (
              <div {...props} className="thumb-vertical" />
            )}
            renderTrackVertical={props => (
              <div {...props} className="track-vertical" />
            )}
          >
            <ul className="post-list">
              {posts.map((post, index) => (
                <li key={post.id}>
                  <PostItem
                    subreddit={subreddit}
                    post={post}
                    index={index}
                    type="post"
                    active={post.id === activePostId}
                    isRedditBlocked={isRedditBlocked}
                  />
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
        <ReplyBar type="post" subreddit={subreddit} />
        <style jsx>{`
          .root {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
          }

          .root.closed {
            display: none;
          }

          .scroll-container {
            flex: 1;
          }

          .scroll-container :global(.thumb-vertical) {
            border-radius: 4px;
            width: 8px !important;
            background-color: #8b8b8d;
          }

          .scroll-container :global(.track-vertical) {
            border-radius: 4px;
            top: 4px;
            bottom: 4px;
            right: 4px;
            width: 8px !important;
            background-color: transparent;
          }

          .post-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          @media screen and (min-width: 1024px) {
            .root.closed {
              display: flex;
            }
          }
        `}</style>
      </div>
    );
  }
}

PostList.propTypes = {
  subreddit: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  expandedPost: PropTypes.shape({
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
  }),
  isRedditBlocked: PropTypes.bool.isRequired
};

export default PostList;
