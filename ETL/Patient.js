const Enum = require('enum');
const fs = require('fs');
const Human = require('./Human'); 
const Identifier = require('./Identifier'); 

class Patient {
  #data;
  constructor(item) {
    this.#data = new Human(item);
    this.#data.resourceType = 'Patient';
    this.#data.identifier = [new Identifier(item)];
  }

  get birthDate() {
    return this.#data.birthDate
  }

  get gender() {
    return this.#data.gender
  }
 
  get name() {
    return this.#data.name[0].text
  }

  to_JSON() {
    return JSON.stringify(this.#data, null, 2);
  }

  write_json() {
    fs.writeFile(`./pts/${this.#data.identifier[0].value}.json`, JSON.stringify(this.#data, null, 2), function (err) {
      if (err) {
        return console.err("An error occured while writing JSON Object to File.", err);
      }
    })
  }

}

module.exports = Patient;
