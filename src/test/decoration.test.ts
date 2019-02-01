// class decoration
/*@sealed
class Greeter {
  @log
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return "Hello, " + this.greeting
  }
}

function sealed(constructor: Function) {
  console.log(constructor)
}

function log(target: any, name: any) {
  console.log('log')
}


const g = new Greeter('er')
console.log(g.greeting)*/
/*import * as _ from 'lodash'
const person = {
  name: {
    full: 'ycy'
  }
}
const res = _.get(person, 'nameObj.full.tets.key', 'er')

console.log(res)*/
type mapType = {
  [propName: string]: string | mapType
}

const map: mapType = {
  name: 'ycy',
  attrObj: {
    sex: '12'
  }
}

export default {}



