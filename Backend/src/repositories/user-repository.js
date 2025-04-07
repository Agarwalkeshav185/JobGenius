import User from '../models/user.js';
import CrudRepository from './crud-repository.js';
class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async getByEmail(email){
        try {
            const result = await this.model.findOne({email});
            return result;
        } catch (error) {
            console.log('User Repository Error');
            throw error;
        }
    }
};

export default UserRepository;