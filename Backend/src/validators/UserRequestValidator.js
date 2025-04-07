export const validateUserRegistration = (body) => {
    const requiredFields = ['name', 'email', 'phoneNumber', 'address', 'password', 'role'];
    for (let field of requiredFields) {
        if (!body[field]) {
            return `Field '${field}' is required.`;
        }
    }

    if (body.role === 'Job Seeker') {
        if (!body.firstNiche || !body.secondNiche || !body.thirdNiche) {
            return 'Please provide your preferred job niches.';
        }
    }

    return null;
};


// const {
//     name, 
//     email,
//     phoneNumber, 
//     address, 
//     password, 
//     role, 
//     firstNiche, 
//     secondNiche, 
//     thirdNiche, 
//     coverLetter} = req.body;
// if(!name || !email || !phoneNumber || !address || !role || !password){
//     return next(new ErrorHandler('All Fields are required.', 400));
// }
// if(role === 'Job Seeker' && (!firstNiche || !secondNiche || !thirdNiche)){
//     return next(new ErrorHandler('Please provide your prefered job niches.', 400));
// }
