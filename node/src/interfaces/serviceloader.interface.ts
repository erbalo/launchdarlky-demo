import { UserService } from '../services/user.service';

export interface ServiceLoader {
    userService: UserService;
}