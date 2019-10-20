import { Help } from "../components/Help";
import { connect } from "react-redux";
// import {login} from "./actions";


const mapStateToProps = state => ({
    ...state,
});

// const mapDispatchToProps = dispatch => ({
//     login: (socket, email, password) => dispatch(login(socket, email, password)),
// });

export default connect(
    mapStateToProps,
    // mapDispatchToProps,
)(Help);

