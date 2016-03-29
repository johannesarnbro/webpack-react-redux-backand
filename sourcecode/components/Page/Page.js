import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styles from './DateSwitch.less';

class Page extends Component {

  componentWillMount () {
    this.props.actions.fetchTippersFromApi();
  }

  render () {
    const status = this.props.tippers.get('status');
    const response = this.props.tippers.getIn(['response', 'data']);

    switch (status) {
      case 'done':
        if (response.size) {
          const users = response.map(item => {
            return (<li key={item.get('id')}>
              {item.get('firstName')} {item.get('lastName')} :
              {item.get('score')} points
            </li>);
          });

          return (
            <div>
              <ul>
                {users}
              </ul>
            </div>
          );
        } else {
          return false;
        }
        break;
      case 'fetching':
        return <p>Fetching Items</p>;
        break;
      case 'error':
        return <p>No Items</p>
        break;
      default:
        return false;
    }
  }
}

Page.propTypes = {
  actions: PropTypes.object,
  tippers: ImmutablePropTypes.map,
};

export default Page;
