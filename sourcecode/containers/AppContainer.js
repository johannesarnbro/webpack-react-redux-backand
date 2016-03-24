import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from 'components/App/App';

function mapStateToProps (state) {
  return {
    items: state.get('items'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {}
  );
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
