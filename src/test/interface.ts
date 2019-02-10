
export type Person = {
  readonly id: string
  name: string
  age: number
  gender?: number
  [key: string]: any
}

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  return (<string>x).split('').reverse().join('');

}

let tom: Person = {
  id: 'SDFED',
  name: 'grace',
  age: 28,
  gender: 0,
  hobby: [1,2,3]
}

let ycy: {
  name: string
  age: number
}

interface ArrayList {
  [index: number]: number | string
}

const ArrayList: any[] = [1,'ycy']

class Animal {
  static className = 'Animal'
  public name: any;
  public constructor(name: string = 'undefined animal') {
    this.name = name;
  }
}


const dog: Animal = new Animal()

ycy = {name:'12', age:12}

export default ycy


