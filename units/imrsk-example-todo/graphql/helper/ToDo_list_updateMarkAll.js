import ToDo from '../model/ToDo'
import ObjectManager from '../../../../data/ObjectManager'

export default function ToDo_list_updateMarkAll( user_id, objectManager, ToDo_Complete )
{
  return objectManager.getListBy( 'ToDo', 'ToDo_User_id', user_id.toString( ) )
  .then( ( arr ) => {
    if( arr.length > 0 )
      return arr;
    else
    {
      const ToDo = new ToDo( {
        ToDo_User_id: user_id,
        ToDo_FirstTextInput: "",
        ToDo_RangedNumber: 0,
        ToDo_Excitement: 0,
        ToDo_FollowUpQuestion: "",
        ToDo_FavoriteMammal: 0,
        ToDo_FavoriteMammalOtherText: "",
        ToDo_LastText: "",
        ToDo_LikedSunset_Ocean: false,
        ToDo_LikedSunset_Lake: false,
        ToDo_LikedSunset_Mountains: false,
        ToDo_LikedSunset_Plains: false,
        ToDo_LikedSunset_Purple: false,
        ToDo_LikedSunset_Green: false,
        ToDo_LikedSunset_Other: false,
        ToDo_LikedSunset_OtherText: "",
      } );

      return objectManager.add( 'ToDo', ToDo )
      .then( ( local_id ) => {
        ToDo.id = local_id;
        return [ ToDo ];
      } )
    }
  } )
  ;
}
