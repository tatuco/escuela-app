import {BaseService} from "../core/BaseService";
import {User} from "../entity/User";


class UserService extends BaseService {

    constructor() {
        super();
        this.entity = User;
    }

    async assignedRole(userId, roleId) {
        const user = await User.update({ id: userId }, { role: roleId });
        console.log(user);
        return user;
    }


}

export default UserService;
