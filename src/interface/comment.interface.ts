interface PopulatedComment extends Comment {
  userFullName: string;
  userEmail: string;
  userPhoneNumber: string;
  userProfileImageURL: string | null;
}
