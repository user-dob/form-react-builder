import { Violation } from './Violation'

export interface IConstraintInfo {
  message: string
  payload?: any
}

export interface IConstraint {
  test(value: any, model: Object): Promise<IValidatorResult>
  getInfo(): IConstraintInfo
}

export interface IValidatorResult {
  addViolation(violations: Array<Violation>)
}
