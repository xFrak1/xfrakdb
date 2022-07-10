export default class Database {
    /**
     * @description The path of the file where the database will be saved
     */
    protected path: string;

    /**
     * @description The indentation of the JSON files
     */
    protected indent: number;

    /**
     * @description The content of the database
     */
    protected content: object;
    constructor({ path, indent }: { path: string, indent?: number });

    /**
     * @description Load the data from the database
     */
    protected load(): void;

    /**
     * @description Save the database data
     */
    protected save(): void;

    /**
     * @description Gets all the data set in the database
     * @returns The data set in the database
     */
    public all(): object;

    /**
     * @description Removes all data set in the database
     */
    public clear(): void;
 
    /**
     * @description Deletes a specific data in the database
     * @param {string} key The key of the data to delete
     */
    public delete(key: string): void;
 
    /**
     * @description Gets all entries from the database
     * @returns The entries of the database
     */
    public entries(): [string, any][];
 
    /**
     * @description Get the value of a specific data in the database
     * @param key The key of the data to get
     * @returns The value of the data
     */
    public get(key: string): any;
 
    /**
     * @description Check if the data exists in the database
     * @param key The key of the data to check
     * @returns True if the data exists, false otherwise
     */
    public has(key: string): boolean;
 
    /**
     * @description Get all the keys from the database
     * @returns The keys of the database
     */
    public keys(): string[];

    /**
     * @description Delete a specific data in the database
     * @param key The key of the data to delete
     * @param value The value of the data to delete
     */
    public pull(key: string, value: any | any[]): void;
 
    /**
     * @description Push data to the database
     * @param key The key of the data to push
     * @param value The value of the data to push
     */
    public push(key: string, value: any): void;
 
    /**
     * @description Set a specific data in the database
     * @param key The key of the data to set
     * @param value The value of the data to set
     */
    public set(key: string, value: any): void;

    /**
     * @description The size of the database
     * @returns The size of the database
     */
    public size(): number;
 
    /**
     * @description Get all the values from the database
     * @returns The values of the database
     */
    public values(): any[];
} 