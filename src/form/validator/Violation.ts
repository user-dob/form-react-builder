import { IConstraintInfo } from './interfaces'

export class Violation {

  private _info: IConstraintInfo

  constructor(info: IConstraintInfo) {
    this._info = info
  }

  get info(): IConstraintInfo {
    return this._info
  }

}

