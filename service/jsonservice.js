const fs = require("fs");
const util = require("util");
const express = require('express');
const router = express.Router();


const readFile = util.promisify(fs.readFile)

class JsonService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSON file that contains the CSV data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Get CSV items
   */
  async getList() {
    const data = await this.getData(); 
    return data.map(csv => {
      return {
        id: csv.id,
        name: csv.name,
        parent_id: csv.parent_id,
        value: csv.value
      };
    });
  }

  /**
   * Fetches CSV data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}
module.exports = JsonService;

