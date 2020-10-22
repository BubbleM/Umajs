import { Inject, BaseService } from '../../../core/src/mod.ts';
import User from '../model/User.ts';

export default class extends BaseService {

    @Inject(User) // or @Inject('User')
    user: User;

    getDefaultUserAge() {
        return this.user.getAge();
    }
}