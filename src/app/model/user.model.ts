export interface User {
  userId: string;
  isAccepted: boolean;
}

export interface UserInfo {
  user?: User,
  firstName: string,
  lastName: string,
  city: string,
  dob: string,
  description: string,
}