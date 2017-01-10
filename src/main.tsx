import 'babel-polyfill'
import * as React from 'react'
import {render} from 'react-dom'

import {FormBuilder} from './form'
import {required, email} from './form/validator/constraints'
import {TextField, NumberField, EmailField} from './form/fields'

class User {

  @required()
  @TextField()
  name: string = 'Дон Жоао Резорт'

  @required()
  @email()
  @EmailField()
  email: string = null

  @NumberField()
  age: number = null
}


const App = ({form: FormBuilder}) => {

  const isValid = () => {
    form.isValid().then(result => {
      if (result) {
        console.log(form.values)
      }
    })
  }

  return (
    <div className="container">
      <form.Form>
        <form.Fields />
        <button type="button" onClick={isValid} className="btn btn-success">Submit</button>
      </form.Form>
    </div>
  )
}

let form: FormBuilder = new FormBuilder(new User())

render(
  <App form={form}/>,
  document.getElementById('root')
)