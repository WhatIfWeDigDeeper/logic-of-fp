export interface Car {
  getName: () => string;
  getPrice: () => number;
}

export class ModelX implements Car {
  constructor() {}
  public getName() {
    return 'ModelX';
  }
  public getPrice() {
    return 91000;
  }
}

export class Model3 implements Car {
  public getName() {
    return 'Model3';
  }
  public getPrice() {
    return 38000;
  }
}

export abstract class Factory {
  public abstract createCar(): Car;
}

export class ModelXFactory extends Factory {
  public createCar(): Car {
    return new ModelX();
  }
}

export class Model3Factory extends Factory {
  public createCar(): Car {
    return new Model3();
  }
}
