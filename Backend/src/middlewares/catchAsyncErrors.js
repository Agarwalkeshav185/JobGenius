const catchAsynErrors = (funct)=>{
    return (req, res, next)=>{
        Promise.resolve(funct(req, res, next)).catch(next);
    };
};

export {
    catchAsynErrors,
};