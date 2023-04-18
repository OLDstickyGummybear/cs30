class Dog {
  constructor(name, age) { // a function; everything in a class is going to be a function
    this.name = name;
    this.age = age;
  }
  
  bark() { // an 'attribute'
    console.log(`"Woof!" Says ${this.name}, who is ${this.age} years old.`);
  }
}

let myDog = new Dog("Bobsled Dog", 3);

function setup() {
  createCanvas(400, 400);
  myDog.bark();
}