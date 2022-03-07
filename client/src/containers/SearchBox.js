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
    this.state = { query: "" };
  }

  submit() {
    this.props.getTweets(this.state.query);
  }

  render() {
    return (
      <div style={styles}>
        <label>Search for stuff</label>
        <input
          id="search"
          type="search"
          placeholder="Search..."
          required
          value={this.state.query}
          onChange={(event) => this.setState({ query: event.target.value })}
        />
        <button
          type="button"
          onMouseOut={() => {
            this.setState({ hover: false });
          }}
          onMouseOver={() => {
            this.setState({ hover: true });
          }}
          onClick={this.submit()}
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
