import { Dashboard } from "./Dashboard";
import { connect } from "react-redux";
import {getGames, logout, redirectTo} from "./actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getGames: (socket) => dispatch(getGames(socket)),
  redirectToLogin: () => dispatch(redirectTo("/login")),
  logout: () => dispatch(logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);

