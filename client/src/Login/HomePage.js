import React from "react";
import AppMenu from "../common/AppMenu";

import { connect } from "react-redux";

class HomePage extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <AppMenu></AppMenu>
        <h3>Welcome {user.loggedInUser.fullName}!</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
export default connect(mapStateToProps)(HomePage);
