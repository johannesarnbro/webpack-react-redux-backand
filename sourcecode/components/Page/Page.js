import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styles from './DateSwitch.less';

class Page extends Component {

  componentWillMount () {
    this.props.actions.fetchTippersFromApi();
  }

  render () {
    const status = this.props.tippers.get('status');
    const tippers = this.props.tippers.get('response');

    switch (status) {
      case 'done':
        if (tippers.size) {
          const orderedTippers = tippers.sortBy(item => {
            let score = item.get('score') || '';
            score = parseInt(score.split(',').reverse()[0]);
            return score;
          }).reverse();
          const users = orderedTippers.map(item => {
            if (item.get('firstName') === 'Rätt') return false;
            const score = item.get('score').split(',').reverse()[0];
            return (<li key={item.get('objectId')}>
              {item.get('firstName')} {item.get('lastName')} :
              {score} points
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
