import { IUser } from '../../user/user.dto';

export interface IJWT extends Omit<IUser, "password"> {
    // You can also add other JWT-specific fields if needed
    id: string;
}