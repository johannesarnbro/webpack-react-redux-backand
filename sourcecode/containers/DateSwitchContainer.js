import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _DateSwitch } from 'components/DateSwitch/DateSwitch';
import * as GameActions from 'actions/gameActions';
import * as LocationActions from 'actions/locationActions';
import * as TeamActions from 'actions/teamActions';
import * as TipperActions from 'actions/tipperActions';
import * as UserActions from 'actions/userActions';

function mapStateToProps (state) {
  return {
    games: state.get('games'),
    locations: state.get('locations'),
    teams: state.get('teams'),
    tippers: state.get('tippers'),
    user: state.get('user'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    GameActions,
    LocationActions,
    TeamActions,
    TipperActions,
    UserActions
  );
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const DateSwitch = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DateSwitch);
