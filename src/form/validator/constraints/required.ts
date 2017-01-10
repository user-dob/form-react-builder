import { Validator } from '../Validator'
import { IConstraint, IConstraintInfo } from '../interfaces'

export interface IRequiredOptions {
  message?: string
}

export class RequiredConstraint implements IConstraint {

  private message: string = 'This value should not be blank.'

  constructor(options: IRequiredOptions) {
    if(options.message) {
      this.message = options.message
    }
  }

  test(value: any, model: Object): boolean {
    if(value === null || value === '') {
      return false
    }

    return true
  }

  getInfo(): IConstraintInfo {
    return {
      message: this.message
    }
  }

}

export const required = (options: IRequiredOptions = {}) => {
  return (target: any, propertyKey: string) => {
    Validator.add(target, propertyKey, new RequiredConstraint(options))
  }
}
