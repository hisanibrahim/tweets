import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { connect } from "react-redux";
import { loadTweets } from "././redux-saga/actions";

class App extends React.Component {
  componentDidMount() {
    this.props.loadTweets({});
  }

  render() {
    if (this.props.loading) {
      return <div>Loading</div>;
    }

    if (this.props.error) {
      return <div style={{ color: "red" }}>ERROR: {this.props.error}</div>;
    }

    return (
      <>
        {/* {this.props.data.map((tweet) => (
          <TwitterTweetEmbed tweetId={tweet.data.id} />
        ))} */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  // data: state.reduxSaga.data,
  // loading: state.reduxSaga.loading,
  // error: state.reduxSaga.error,
});

const mapDispatchToProps = {
  loadTweets,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
