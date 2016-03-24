import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styles from './Page.less';

class Page extends Component {

  componentWillMount () {
    this.props.actions.fetchItemsFromApi();
    this.props.actions.fetchUsersFromApi();
  }

  render () {
    const status = this.props.items.get('status');
    const response = this.props.items.get('response');

    switch (status) {
      case 'done':
        if (response.get('data')) {
          const items = response.get('data').map(item => {
            return (<li key={item.get('name')}>
              {item.get('name')} - {item.get('description')}
            </li>);
          });

          return (
            <ul>
              {items}
            </ul>
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
  items: ImmutablePropTypes.map,
};

export default Page;
