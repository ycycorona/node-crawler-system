import {isNullOrUndefined} from "util";

interface Alarm {
  alert(): any;
}

interface Light {
  lightOn(): any;
  lightOff(): any;
}

class Alarm {

}

class Car implements Alarm, Light {
  alert(): any {
    console.log('Car alert');
    return undefined
  }
  lightOn(): any {
    console.log('Car light on');
    return undefined
  }
  lightOff(): any {
    console.log('Car light off');
    return undefined
  }
}

const car = new Car()

car.alert()
