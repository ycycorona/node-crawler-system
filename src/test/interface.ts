interface Person {
  readonly id: string
  name: string
  age: number
  gender?: number
  [propName: string]: any
}

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  return (<string>x).split('').reverse().join('');

}

const Person = 123
let tom: Person = {
  id: 'SDFED',
  name: 'grace',
  age: 28,
  gender: 0,
  hobby: [1,2,3]
}

interface ArrayList {
  [index: number]: number | string
}

const ArrayList: any[] = [1,'ycy']

class Animal {
  static className = 'Animal'
  public name;
  public constructor(name: string = 'undefined animal') {
    this.name = name;
  }
}


const dog: Animal = new Animal()

console.log(dog.name);


