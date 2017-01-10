export interface IConstraintInfo {
  message: string
  payload?: any
}

export interface IConstraint {
  test(value: any, model: Object): boolean
  getInfo(): IConstraintInfo
}
