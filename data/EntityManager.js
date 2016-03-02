/* @flow weak */

import EntityManagerBase from './lib/EntityManagerBase';

import Ensayo from './model/Ensayo';

export class EntityManager extends EntityManagerBase
{
  constructor( )
  {
    super( );

    this.registerEntity( 'Ensayo', Ensayo );
  }
}
