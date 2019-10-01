import { HomePage } from "../components/HomePage";
import { connect } from "react-redux";
import {getGames} from "../actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getGames: (socket) => dispatch(getGames(socket)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage);

