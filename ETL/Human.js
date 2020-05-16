const HumanName = require('./HumanName');
const Enum = require('enum');
const fs = require('fs');
var dateFormat = require('dateformat');

// The fundamental class of humane web technology
class Human {
  #data = new Object();
  constructor(item) {
    // Process the DOB
    this.#data.birthDate = dateFormat(item.DOB, "isoDate");
    
    // Process gender strings with regexes here
    var female_regex = /^f{1}e?m?a?l?e?/i;
    var male_regex = /^m{1}a?l?e?/i;
    if (item.Gender.match(female_regex)) { item.Gender = 'female'; }
    if (item.Gender.match(male_regex)) { item.Gender = 'male'; }

    // Assign a gender from the enumerated options
    var genderEnum = new Enum(['male', 'female', 'other', 'unknown']);
    if (genderEnum.isDefined(item.Gender.toLowerCase())) {
      this.#data.gender = item.Gender.toLowerCase();
    } else {
      this.#data.gender = 'unknown';
    }

    this.#data.name = [new HumanName(item)];
    
    return this.#data;
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

}

module.exports = Human;
