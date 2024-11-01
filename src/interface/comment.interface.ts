interface PopulatedComment {
  userId: string;
  comment: string;
  date: Date;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  profileImageURL?: string | null;
}
