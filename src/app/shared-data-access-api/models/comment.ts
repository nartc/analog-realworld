/* tslint:disable */
/* eslint-disable */
import { Profile } from '../models/profile';
export interface Comment {
  author: Profile;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}
