import React from "react";
import { connect } from "react-redux";
import { getTweets } from "../actions";
import "./SearchBox.css";

const styles = {
  position: "relative",
  width: "30rem",
  background: "#1da1f2",
  borderRadius: "0.7rem",
};

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  submit(event) {
    this.props.getTweets();
  }

  render() {
    return (
      <div style={styles}>
        <label for="search">Search for stuff</label>
        <input
          id="search"
          type="search"
          placeholder="Search..."
          autofocus
          required
        />
        <button
          type="button"
          onMouseOut={() => {
            this.setState({ hover: false });
          }}
          onMouseOver={() => {
            this.setState({ hover: true });
          }}
          onClick={this.props.getTweets}
        >
          Go
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getTweets: getTweets,
};

SearchBox = connect(null, mapDispatchToProps)(SearchBox);

export default SearchBox;
