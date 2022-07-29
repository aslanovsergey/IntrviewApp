interface IUser {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  role: string;
  createdOn: Date;
  updatedOn: Date;
  isActive: boolean;
}

export default IUser;
