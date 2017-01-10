import { IConstraint } from './interfaces'
import { Violation } from './Violation'

export class ValidatorBuilder {

  private violations: Array<Violation> = new Array<Violation>()

  private model: Object

  private value: any

  constructor(model: Object, value: any) {
    this.model = model
    this.value = value
  }

  validate(constraint: IConstraint) {
    if(!constraint.test(this.value, this.model)) {
      let violation = new Violation(constraint.getInfo())
      this.violations.push(violation)
    }
  }

  getViolations(): Array<Violation> {
    return this.violations
  }

}
