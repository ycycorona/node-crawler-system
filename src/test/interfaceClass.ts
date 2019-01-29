interface Alarm {
  alert();
}

interface Light {
  lightOn();
  lightOff();
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert');
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}

const car = new Car()

car.alert()
