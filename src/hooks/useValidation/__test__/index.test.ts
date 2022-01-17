import { useValidation } from '../index';
import { renderHook } from '@testing-library/react-hooks';
import Joi from 'joi';

describe('useValidation test', () => {

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

    it('single validation 2', () => {

        const schema = Joi.number().min(10).required();

        const { result, rerender } = renderHook(({ state }) => useValidation(schema, state), {
            initialProps: {
                schema: schema,
                state: 0
            }
        });

        rerender({ schema, state: 5 })
        // console.log(result.current.error);
        expect(result.current.ok).toEqual(false);
    });

    it('single validation as array', () => {

        const schema = Joi.array().items(Joi.number().required())

        const { result, rerender } = renderHook(({ state }) => useValidation(schema, state), {
            initialProps: {
                schema: schema,
                state: 0
            }
        });

        rerender({ schema, state: {} as any})

        expect(result.current.ok).toEqual(false);
    })
})