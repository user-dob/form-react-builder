import { Validator } from '../Validator'
import { IConstraint, IConstraintInfo, IValidatorResult } from '../interfaces'

export class EqualToConstraint implements IConstraint {

  message: string = 'This value should be equal to {{ compared_value }}.'

  private compared: string

  constructor(compared: string) {
    this.compared = compared
  }

  test(value: any, model: Object): Promise<IValidatorResult> {
    if(value === model[this.compared]) {
      return Validator.success()
    }

    return Validator.fail(this.getInfo())
  }

  getInfo(): IConstraintInfo {
    return {
      message: this.message
    }
  }

}


export const equalTo = (compared: string) => {
  return (target: any, propertyKey: string) => {
    Validator.add(target, propertyKey, new EqualToConstraint(compared))
  }
}
