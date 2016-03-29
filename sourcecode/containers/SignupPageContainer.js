import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _SignupPage } from 'components/SignupPage/SignupPage';
import * as UserActions from 'actions/userActions';

function mapStateToProps (state) {
  return {
    user: state.get('user'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign({}, UserActions);
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const SignupPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SignupPage);
