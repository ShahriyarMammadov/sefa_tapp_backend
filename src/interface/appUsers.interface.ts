interface AppUsers {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword?: string;
  ipAddress: string;
  profileImageURL?: string;
  isActive: boolean;
  comments: Comment[];
}
