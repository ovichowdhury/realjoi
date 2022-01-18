const { useValidation } = require('../index');
const { renderHook } = require('@testing-library/react-hooks');
const Joi = require('joi');

describe('useValidation test for js', () => {

    it('should be defined', () => {
        expect(useValidation).toBeDefined();
    });

    it('single validation', () => {

        const schema = Joi.string().min(3).required();

        const { result, rerender } = renderHook(({ state }) => useValidation(schema, state), {
            initialProps: {
                schema: schema,
                state: ''
            }
        });

        rerender({ schema, state: 'abcd' })
        // console.log(result.current.error);
        expect(result.current.ok).toEqual(true);
    })

})