import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdmins } from "../actions";

class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  render() {
    return (
      <div>
        <h3>Protected list of admins</h3>
        <ul>
          {this.props.admins.map((admin) => (
            <li key={admin.id}>{admin.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ admins }, ownProps) => {
  return { admins };
};

export default {
  loadData: ({ dispatch }) => dispatch(fetchAdmins()),
  component: connect(mapStateToProps, { fetchAdmins })(AdminsListPage),
};
