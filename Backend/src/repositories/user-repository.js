import User from '../models/user.js';
import CrudRepository from './crud-repository.js';
class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async getByEmail(email){
        try {
            const result = await this.model.findOne({email: { $regex: `${email}`, $options: "i" }});
            return result;
        } catch (error) {
            console.log('User Repository Error');
            throw error;
        }
    }

    async getByEmailWithPassword(email){
        try {
            const result = await this.model.findOne({ email: { $regex: `${email}`, $options: "i" } }).select('+password').populate('companyId', 'name');
            return result;
        } catch (error) {
            console.log('User Repository Error');
            throw error;
        }
    };
};

export default UserRepository;