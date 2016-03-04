/* @flow weak */

import EntityManagerBase from './lib/EntityManagerBase';

import Ensayo from './model/Ensayo';

export default class EntityManager extends EntityManagerBase
{
  constructor( Viewer_User_id )
  {
    super( Viewer_User_id );

    this.registerEntity( 'Ensayo', Ensayo );
  }
}
