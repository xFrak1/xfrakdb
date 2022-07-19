const { writeFileSync, readFileSync } = require("fs");

/**
 * @typedef {{ path: string, indent?: number }} DatabaseOptions
 */
module.exports = class Database {
    /**
     * @protected
     * @type {DatabaseOptions["path"]}
     * @description The path of the file where the database will be saved
     */
    path = this.path;

    /**
     * @protected
     * @type {DatabaseOptions["indent"]}
     * @description The indentation of the JSON files
     */ 
    indent = this.indent;

    /**
     * @param {DatabaseOptions} options
     */
    constructor(options) {
        if(!options.path || typeof options.path !== "string") {
            throw new TypeError("Path invalid, must be a json file");
        };

        
        if(options.indent && typeof options.indent !== "number") {
            throw new TypeError("Invalid indent, error in the constructor");
        };

        this.path = options.path;
        this.indent = options?.indent || 4;
        this.load();
    };

    /**
     * @protected
     * @description Load the data from the database
     */
    load() {
        /**
         * @protected
         * @type {object}
         * @description The data set in the database
         */
        this.content = JSON.parse(readFileSync(this.path).toString());
    };

    /**
     * @protected
     * @description Save the data to the database
     */
    save() {
        let jsondata;

        try {
            jsondata = JSON.stringify(this.content, null, this.indent);
        } catch(error) {
            throw error;
        };

        writeFileSync(this.path, jsondata, "utf-8");
    };

    /**
     * @description Gets all the data set in the database
     * @returns {object} The data set in the database
     */
    all() {
        this.load();
        return this.content;
    };

    /**
     * @description Removes all data set in the database
     */
    clear() {
        this.load();
        this.content = {};
        this.save();
    };

    /**
     * @description Deletes a specific data in the database
     * @param {string} key The key of the data to delete
     */
    delete(key) {
        this.load();
        delete this.content[key];
        this.save();
    };

    /**
     * @description Gets all entries from the database
     * @returns {[ string, value ][]} The entries of the database
     */
    entries() {
        this.load();
        return Object.entries(this.content);
    };

    /**
     * @description Filter the data in the database
     * @param {(value: any) => any} callback The callback function to filter the data
     * @returns {any} The filtered data
     */
    filter(callback) {
        this.load();
        return Object.values(this.content).filter(callback);
    };

    /**
     * @description Get the value of a specific data in the database
     * @param {string} key The key of the data to get
     * @returns {any} The value of the data
     */
    get(key) {
        this.load();
        return this.content[key];
    };

    /**
     * @description Check if the data exists in the database
     * @param {string} key The key of the data to check
     * @returns {boolean} True if the data exists, false otherwise
     */
    has(key) {
        this.load();
        return this.content.hasOwnProperty(key);
    };

    /**
     * @description Check if the data exists in the key
     * @param {string} key The data key you want to find if you include
     * @param {string} value The data value you want to find if you include
     * @returns {boolean} True if the data exists, false otherwise
     */
    includes(key, value) {
        this.load();
        return Object.values(this.content[key]).includes(value);
    };

    /**
     * @description Get all the keys from the database
     * @returns {string[]} The keys of the database
     */
    keys() {
        this.load();
        return Object.keys(this.content);
    };

    /**
     * @description Delete a specific data in the database (Not working in database arrays)
     * @param {string} key The key of the data to delete
     * @param {any} value The value of the data to delete
     */
    pull(key, value) {
        this.load();
        if(!Array.isArray(this.content[key])) this.content[key] = [];

        this.content[key] = this.content[key].filter(item => item !== value);
        this.save();
    };

    /**
     * @description Push data to the database
     * @param {string} key The key of the data to push
     * @param {any | any[]} value The value of the data to push
     */
    push(key, value) {
        this.load();
        if(!Array.isArray(this.content[key])) this.content[key] = [];

        this.content[key].push(value);
        this.save();
    };

    /**
     * @description Set a specific data in the database
     * @param {string} key The key of the data to set
     * @param {any | any[]} value The value of the data to set
     */
    set(key, value) {
        this.load();
        this.content[key] = value;
        this.save();
    };

    /**
     * @description Remove all duplications values from the key (Not working in database arrays)
     * @param {string} key The key of the data to remove duplications
     */
    unique(key) {
        this.load();
        if(!Array.isArray(this.content[key])) this.content[key] = [];

        this.content[key] = [...new Set(this.content[key])];
        this.save();
    };

    /**
     * @description Get all the values from the database
     * @returns {any[]} The values of the database
     */
    values() {
        this.load();
        return Object.values(this.content);
    };
};