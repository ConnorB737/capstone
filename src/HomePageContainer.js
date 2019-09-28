import { HomePage } from "./HomePage";
import { connect } from "react-redux";
import {getGames, redirectToLogin} from "./actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getGames: (socket) => dispatch(getGames(socket)),
  redirectToLogin: () => dispatch(redirectToLogin()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage);

