import { IConstraint } from './interfaces'
import { Violation } from './Violation'
import { ValidatorBuilder } from './ValidatorBuilder'

export const VALIDATOR_METADATA_KEY = Symbol('VALIDATOR_METADATA_KEY')

export class Validator {

  static add(target: any, propertyKey: string, constraint: IConstraint) {
    let constraints = Reflect.getMetadata(VALIDATOR_METADATA_KEY, target, propertyKey) || Array<IConstraint>()
    constraints.push(constraint)
    Reflect.defineMetadata(VALIDATOR_METADATA_KEY, constraints, target, propertyKey)
  }

  static getValidator(model: Object, propertyKey: string) {
    var target = Object.getPrototypeOf(model)
    const constraints = Reflect.getMetadata(VALIDATOR_METADATA_KEY, target, propertyKey) || Array<IConstraint>()

    return (value: any): Array<Violation> => {
      let validatorBuilder = new ValidatorBuilder(model, value)

       for(let constraint of constraints) {
        validatorBuilder.validate(constraint)
      }

      return validatorBuilder.getViolations()
    }
  }

}