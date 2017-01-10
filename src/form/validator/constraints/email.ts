import {Validator} from '../Validator'
import {IConstraint, IConstraintInfo} from '../interfaces'

export class EmailConstraint implements IConstraint {

  message: string = 'This value is not a valid email address.'

  test(value: any, model: Object): boolean {
    if (/\S+@\S+\.\S+/.test(value)) {
      return true
    }

    return false
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
