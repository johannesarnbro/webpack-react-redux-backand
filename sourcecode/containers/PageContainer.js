import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _Page } from 'components/Page/Page';
import * as ItemActions from 'actions/itemActions';
import * as UserActions from 'actions/userActions';

function mapStateToProps (state) {
  return {
    users: state.get('users'),
    items: state.get('items'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign({}, ItemActions, UserActions);
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const Page = connect(mapStateToProps, mapDispatchToProps)(_Page);
