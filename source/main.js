const fs = require("fs");

/**
 * @typedef {{ path: string, indent: number }} dboptions
 */
module.exports = class Database {
    /**
     * @protected
     * @type {dboptions["path"]}
     * The path of the file where the database will be saved
     */
    path = this.path;

    /**
     * @protected
     * @type {dboptions["indent"]}
     * The indentation of the JSON files
     */
    indent = this.indent;

    /**
     * @param {dboptions} options
     */
    constructor(options) {
        this.path = options.path;
        this.indent = options.indent || 4;
        this.load();

        if(!options.path || typeof(options.path) !== "string") {
            throw new TypeError("Path invalid, must be a json file");
        };

        if(typeof(options.indent) !== "number") {
            throw new TypeError("Invalid indent, error in the constructor");
        };
    };

    /**
     * @protected
     * @description Load the data from the database
     */
    load() {
        /**
         * @protected
         */
        this.content = JSON.parse(fs.readFileSync(this.path).toString());
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

        fs.writeFileSync(this.path, jsondata, "utf-8");
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
     * @returns {[string, value][]} The entries of the database
     */
    entries() {
        this.load();
        return Object.entries(this.content);
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
     * @description Get all the keys from the database
     * @returns {string[]} The keys of the database
     */
    keys() {
        this.load();
        return Object.keys(this.content);
    };

    /**
     * @description Delete a specific data in the database
     * @param {string} key The key of the data to delete
     * @param {any | any[]} value The value of the data to delete
     */
    pull(key, value) {
        this.load();

        try {
            if(Array.isArray(value)) {
                this.content[key] = this.content[key].filter((v) => !value.includes(v));
            } else {
                this.content[key] = this.content[key].filter((v) => v !== value);
            };
        } catch(error) {
            throw new TypeError(error.message);
        };
        
        this.save();
    };

    /**
     * @description Push data to the database
     * @param {string} key The key of the data to push
     * @param {any | any[]} value The value of the data to push
     */
    push(key, value) {
        this.load();

        try {
            if(Array.isArray(value)) {
                this.content[key] = this.content[key].concat(value);
            } else {
                this.content[key].push(value);
            };
        } catch(error) {
            throw new TypeError(error.message);
        }
        
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
     * @description The size of the database
     * @returns {number} The size of the database
     */
    size() {
        this.load();
        return Object.keys(this.content).length;
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