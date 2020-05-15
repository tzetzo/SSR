import React, { Component } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import Header from "./components/Header";
import { fetchCurrentUser } from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div className="container">
        <Header auth={this.props.auth} />
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }, ownProps) => ({ auth });

export default {
  loadData: ({dispatch}) => dispatch(fetchCurrentUser()),
  component: connect(mapStateToProps, { fetchCurrentUser })(App),
};
