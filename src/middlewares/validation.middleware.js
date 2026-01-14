import Joi from 'joi';

const dataMethod = ['body', 'params', 'query', 'headers'];

export const validation = (Schema) => {
    return (req, res, next) => {
        const validationArr = [];

        dataMethod.forEach(key => {
            if (Schema[key]) {
                const validationResult = Schema[key].validate(req[key], { abortEarly: false });
                if (validationResult?.error) {
                    validationArr.push(validationResult.error.details);
                }
            }
        });

        if (validationArr.length) {
            const errors = validationArr.flat().map(detail => detail.message);
            throw new Error('Validation error: ' + errors.join(', '), { cause: 400 });
        }

        next();
    };
};
