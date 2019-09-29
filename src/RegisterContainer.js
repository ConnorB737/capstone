import { Register } from "./Register";
import { connect } from "react-redux";
import {register} from "./actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  register: (socket, email, password) => dispatch(register(socket, email, password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);

