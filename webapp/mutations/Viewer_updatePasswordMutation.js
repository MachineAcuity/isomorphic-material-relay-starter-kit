/* @flow weak */

import Relay from 'react-relay';

export default class Viewer_updatePasswordMutation extends Relay.Mutation
{
  static fragments = {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation( ) {
    return Relay.QL`mutation{Viewer_updatePassword}`;
  }
  getFatQuery( ) {
    return Relay.QL`
      fragment on Viewer_updatePasswordPayload {
        Viewer {
          id
        }
      }
    `;
  }
  getConfigs( ) {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        Viewer: this.props.Viewer.id,
      },
    }];
  }
  getVariables( ) {
    return {
      id:                 this.props.Viewer.id,
      User_Password:      this.props.User_Password,
    };
  }
  getOptimisticResponse( ) {
    return {
      Viewer: {
        id:                this.props.Viewer.id,
      },
    };
  }
}
