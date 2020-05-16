
class Identifier {
  #data = new Object();
	
  constructor(item) {
    this.#data.use = 'official';
    this.#data.value = JSON.stringify(item.AthenaID);
    this.#data.assigner = new Object();
    this.#data.assigner.display = item.ID_assigner;
    // Return the FHIR object for later stringification;
    return this.#data;
  }
}
module.exports = Identifier;
