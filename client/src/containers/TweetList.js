import React from "react";
import { connect } from "react-redux";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Tweet } from "react-twitter-widgets";

let TweetList = ({ tweets }) =>
  tweets
    ? tweets.map((tweet) => (
        <div key={tweet.id}>
          <Tweet tweetId={tweet.id} />
        </div>
      ))
    : null;

const mapStateToProps = (state) => ({
  tweets: state.tweets,
});

TweetList = connect(mapStateToProps, null)(TweetList);

export default TweetList;
