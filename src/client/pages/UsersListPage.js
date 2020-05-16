import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
import { Helmet } from "react-helmet";

class UsersListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <Helmet>
    <title>{`${this.props.users.length} Users loaded`}</title>
          <meta property="og:title" content="Users App" />
        </Helmet>
        Here's a big list of users:
        <ul>
          {this.props.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ users }, ownProps) => {
  return { users };
};

export default {
  loadData: ({ dispatch }) => dispatch(fetchUsers()),
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
};
