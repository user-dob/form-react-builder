import { IValidatorResult, IConstraintInfo } from './interfaces'
import { Violation } from './Violation'

export class ValidatorResultSuccess implements IValidatorResult {
  addViolation(violations: Array<Violation>) {
  }
}

export class ValidatorResultFail implements IValidatorResult {

  private info: IConstraintInfo

  constructor(info: IConstraintInfo) {
    this.info = info
  }

  addViolation(violations: Array<Violation>) {
    violations.push(new Violation(this.info))
  }
}