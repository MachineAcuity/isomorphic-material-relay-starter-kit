import ToDo from '../model/ToDo'
import ObjectManager from '../../../../data/ObjectManager'

export default function ToDo_list_updateMarkAll( user_id, objectManager, ToDo_CompleteNew )
{
  return objectManager.getListBy( 'ToDo', 'ToDo_User_id', user_id.toString( ) )
  .then( ( arr ) => {
    const arr_filtered = arr.filter( a_ToDo => a_ToDo.ToDo_Complete != ToDo_CompleteNew );

    const arrPromiseToUpdate = arr_filtered.map( a_ToDo => objectManager.update( 'ToDo', {
      id: a_ToDo.id,
      ToDo_Complete: ToDo_CompleteNew
    } ) );

    const arr_local_ids_Changed_ToDos = arr_filtered.map( a_ToDo => a_ToDo.id );

    return Promise.all( arrPromiseToUpdate )
    .then( ( ) => ( arr_local_ids_Changed_ToDos ) );
  } )
  ;
}
