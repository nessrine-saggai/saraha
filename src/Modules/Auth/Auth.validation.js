import joi from "joi";

export const signupSchema = 
{
   body: joi.object({
        userName: joi.string().alphanum().min(3).max(20).required().messages({
            'any.requred': 'userName is required',
            'string.empty':'userName is required',
        }),
        email: joi.string().email({maxDomainSegments:3,tlds:{allow:['com','net']}}).required(),
        password: joi.string().required(),
        cPassword: joi.string().valid(joi.ref('password')).required(),
   }).required(),
    query: joi.object({
        test:joi.boolean().required(),
    }).required()
} 

export const loginSchema = {
    body:joi.object({
        email: joi.string().email({}).required(),
        password: joi.string().required(),
    }).required()
}