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
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.getTweets(this.state.query);
  }

  render() {
    return (
      <>
        <div className="topnav">
          <a className="active" href="#home">
            <i className="fa fa-twitter"></i>
          </a>
          <div className="search-container">
            <div>
              <input
                type="text"
                placeholder="Search.."
                name="search"
                value={this.state.query}
                onChange={(e) => this.setState({ query: e.target.value })}
              />
              <button type="button" onClick={this.submit}>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="main"></div>
      </>
    );
  }
}

const mapDispatchToProps = {
  getTweets: getTweets,
};

SearchBox = connect(null, mapDispatchToProps)(SearchBox);

export default SearchBox;
