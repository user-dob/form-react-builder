import {Validator} from '../Validator'
import {IConstraint, IConstraintInfo, IValidatorResult} from '../interfaces'

export class EmailConstraint implements IConstraint {

  private message: string = 'This value is not a valid email address.'

  test(value: any, model: Object): Promise<IValidatorResult> {
    if (/\S+@\S+\.\S+/.test(value)) {
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


export const email = () => {
  return (target: any, propertyKey: string) => {
    Validator.add(target, propertyKey, new EmailConstraint())
  }
}
