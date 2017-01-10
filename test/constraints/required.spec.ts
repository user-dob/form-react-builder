import { expect } from 'chai'
import { RequiredConstraint, IRequiredOptions, required } from '../../src/form/validator/constraints/required'

describe('constraints/required', () => {

    describe('RequiredConstraint', () => {

        it('test value=null', () => {
           let options: IRequiredOptions = {}
           let requiredConstraint: RequiredConstraint = new RequiredConstraint(options)
           let model = {
               value: null
           }

           const test = requiredConstraint.test(model.value, model)

           expect(test).to.be.equal(false)
        })

        it('test value=""', () => {
            let options: IRequiredOptions = {}
            let requiredConstraint: RequiredConstraint = new RequiredConstraint(options)
            let model = {
                value: ""
            }

            const test = requiredConstraint.test(model.value, model)

            expect(test).to.be.equal(false)
        })

        it('test value=0', () => {
            let options: IRequiredOptions = {}
            let requiredConstraint: RequiredConstraint = new RequiredConstraint(options)
            let model = {
                value: 0
            }

            const test = requiredConstraint.test(model.value, model)

            expect(test).to.be.equal(true)
        })

        it('message options', () => {
            const message = 'message'
            let options: IRequiredOptions = { message }
            let requiredConstraint: RequiredConstraint = new RequiredConstraint(options)
            let model = {
                value: null
            }

            requiredConstraint.test(model.value, model)

            expect(requiredConstraint.getInfo().message).to.be.equal(message)
        })

    })


})