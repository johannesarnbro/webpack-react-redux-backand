import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from 'components/App/App';
import * as BongActions from 'actions/bongActions';
import * as GameActions from 'actions/gameActions';
import * as LocationActions from 'actions/locationActions';
import * as TeamActions from 'actions/teamActions';
import * as TipperActions from 'actions/tipperActions';
import * as UserActions from 'actions/userActions';

function mapStateToProps (state) {
  return {
    user: state.get('user'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    BongActions,
    GameActions,
    LocationActions,
    TeamActions,
    TipperActions,
    UserActions
  );
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
