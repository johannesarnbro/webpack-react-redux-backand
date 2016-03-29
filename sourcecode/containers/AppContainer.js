import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from 'components/App/App';
import * as UserActions from 'actions/userActions';
import * as GameActions from 'actions/gameActions';

function mapStateToProps (state) {
  return {
    user: state.get('user'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    UserActions,
    GameActions
  );
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
