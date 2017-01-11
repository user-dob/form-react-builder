import { IConstraint, IValidatorResult } from './interfaces'
import { Violation } from './Violation'

export class ValidatorBuilder {

  private constraints: Array<IConstraint> = []

  private model: Object

  private value: any

  constructor(model: Object, value: any) {
    this.model = model
    this.value = value
  }

  addConstraint(constraint: IConstraint) {
    this.constraints.push(constraint)
  }

  getViolations(): Promise<Violation[]> {
    const { value, model } = this
    const violations: Array<Violation> = []
    const tests = this.constraints.map(constraint => constraint.test(value, model))

    return Promise.all(tests).then((results: Array<IValidatorResult>) => {
      for(let result of results) {
        result.addViolation(violations)
      }
      return violations
    })
  }

}
