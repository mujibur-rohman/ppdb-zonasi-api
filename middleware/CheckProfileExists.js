

export const checkProfileExists = async (req, res, next)=> {
    console.log(req.body.profileId);
    next()
}