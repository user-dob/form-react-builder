import { IConstraint, IConstraintInfo, IValidatorResult } from './interfaces'
import { Violation } from './Violation'
import { ValidatorResultSuccess, ValidatorResultFail } from './ValidatorResult'
import { ValidatorBuilder } from './ValidatorBuilder'

export const VALIDATOR_METADATA_KEY = Symbol('VALIDATOR_METADATA_KEY')

export class Validator {

  static fail(info: IConstraintInfo): Promise<IValidatorResult> {
    return Promise.resolve(new ValidatorResultFail(info))
  }

  static success(): Promise<IValidatorResult> {
    return Promise.resolve(new ValidatorResultSuccess())
  }

  static add(target: any, propertyKey: string, constraint: IConstraint) {
    let constraints = Reflect.getMetadata(VALIDATOR_METADATA_KEY, target, propertyKey) || Array<IConstraint>()
    constraints.push(constraint)
    Reflect.defineMetadata(VALIDATOR_METADATA_KEY, constraints, target, propertyKey)
  }

  static getValidator(model: Object, propertyKey: string) {
    var target = Object.getPrototypeOf(model)
    const constraints = Reflect.getMetadata(VALIDATOR_METADATA_KEY, target, propertyKey) || Array<IConstraint>()

    return (value: any): Promise<Violation[]> => {
      let validatorBuilder = new ValidatorBuilder(model, value)

       for(let constraint of constraints) {
        validatorBuilder.addConstraint(constraint)
      }

      return validatorBuilder.getViolations()
    }
  }

}