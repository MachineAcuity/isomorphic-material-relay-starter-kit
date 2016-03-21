// Class used by GraphQL Server
export default class User
{
  constructor( fields )
  {
    this.id = fields.id;
    this.User_AccountName = fields.User_AccountName;
    this.User_AccountPassword = fields.User_AccountPassword;
    this.User_DisplayName = fields.User_DisplayName;
    this.User_ProfilePhoto = fields.User_ProfilePhoto;
    this.User_Email = fields.User_Email;
    this.User_Locale = fields.User_Locale;
    this.User_AuthToken = fields.User_AuthToken;
  }
}
