export interface BookInterface {
  _id?: string;
  title?: string;
  catagory?: 'Thriller' | 'Horror ' | 'Romantic' | 'Sci-fi ' | 'Non-fiction ';
  author?: string;
  imageLink?: string;
  language?: string;
  year?: number;
  review?: string;
  userDisplayName?: string;
}
