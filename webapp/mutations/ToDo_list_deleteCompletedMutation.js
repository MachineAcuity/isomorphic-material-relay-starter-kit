/* @flow weak */

import Relay from 'react-relay';

export default class ToDo_list_deleteCompletedMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Make ToDo_CompletedCount, edges, and ToDo_TotalCount optional
    ToDos: () => Relay.QL`
      fragment on ToDosConnection {
        edges {
          node {
            ToDo_Complete,
            id,
          },
        },
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_CompletedCount,
        id,
        ToDo_TotalCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{ToDo_list_deleteCompleted}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ToDo_list_deleteCompletedPayload {
        deletedToDoIds,
        Viewer {
          ToDo_CompletedCount,
          ToDo_TotalCount,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'ToDos',
      deletedIDFieldName: 'deletedToDoIds',
    }];
  }
  getVariables() {
    return {};
  }
  getOptimisticResponse() {
    var deletedToDoIds;
    var newTotalCount;
    if (this.props.ToDos && this.props.ToDos.edges) {
      deletedToDoIds = this.props.ToDos.edges
        .filter(edge => edge.node.ToDo_Complete)
        .map(edge => edge.node.id);
    }
    var {ToDo_CompletedCount, ToDo_TotalCount} = this.props.Viewer;
    if (ToDo_CompletedCount != null && ToDo_TotalCount != null) {
      newTotalCount = ToDo_TotalCount - ToDo_CompletedCount;
    }
    return {
      deletedToDoIds,
      Viewer: {
        ToDo_CompletedCount: 0,
        id: this.props.Viewer.id,
        ToDo_TotalCount: newTotalCount,
      },
    };
  }
}
