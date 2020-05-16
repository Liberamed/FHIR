class HumanName {
  #data = new Object();
	
  constructor(item) {
    var capitalize = require('capitalize')
    var fcap = capitalize(item.FirstName);
    var mcap = capitalize(item.MiddleInitial);
    var lcap = capitalize(item.LastName);

    var middle_regex = /^\w+.*/i;
    this.#data.use = 'official';
    this.#data.family = lcap;
    this.#data.given = [fcap];
    this.#data.text = fcap;
    if (mcap.match(middle_regex)) {
      this.#data.given.push(mcap);
      this.#data.text += ` ${mcap}`;
    }
    this.#data.text += ` ${lcap}`;
	
    // Return the FHIR object for later stringification;
    return this.#data;
  }
}

module.exports = HumanName;
