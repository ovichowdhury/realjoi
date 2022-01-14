import { useFormValidation, useFormValidationAsync } from '../index';
import { renderHook } from '@testing-library/react-hooks';
import Joi from 'joi';

describe('useFormValidation test', () => {

    it('should be defined', () => {
        expect(useFormValidation).toBeDefined();
    });

    it('simple form validation', () => {

        const schema = Joi.object({
            username: Joi.string().min(3),
            password: Joi.string().min(3)
        })

        const { result, rerender } = renderHook(({ state }) => useFormValidation(schema, state), {
            initialProps: {
                schema: schema,
                state: {
                    username: '',
                    password: ''
                }
            }
        });

        rerender({ schema, state: { username: 'abcd', password: 'abcd' } })
        // console.log(result.current.errors);
        expect(result.current.ok).toEqual(true);
    })
})


describe('useFormValidationAsync test', () => {

    it('should be defined', () => {
        expect(useFormValidation).toBeDefined();
    });

    it('simple form validation', async () => {

        const schema = Joi.object({
            name: Joi.string().min(3),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        })

        const { result, rerender, waitForNextUpdate } = renderHook(({ state }) => useFormValidationAsync(schema, state), {
            initialProps: {
                schema: schema,
                state: {
                    name: '',
                    email: ''
                }
            }
        });

        rerender({ schema, state: { name: 'abcd', email: 'abcd@gmail.com' } })

        await waitForNextUpdate();

        console.log(result.current.errors);
        expect(result.current.ok).toEqual(true);
    })
})