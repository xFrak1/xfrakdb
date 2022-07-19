declare module "xfrakdb" {
    interface DatabaseOptions {
        /**
         * @description The path of the file where the database will be saved
         */
        path: string;

        /**
         * @description The indentation of the JSON files
         */
        indent?: number;
    }

    export default class Database {
        constructor(options: DatabaseOptions);
    
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
         * @param key The key of the data to delete
         */
        public delete(key: string): void;
     
        /**
         * @description Gets all entries from the database
         * @returns The entries of the database
         */
        public entries(): [string, any][];
    
        /**
         * @description Filter the data in the database
         * @param callback The callback function to filter the data
         */
        public filter(callback: ((value: any) => any)): any;
     
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
         * @description Check if the data exists in the key
         * @param key The data key you want to find if you include
         * @param value The data value you want to find if you include
         * @returns True if the data exists, false otherwise
         */
        public includes(key: string, value: any): boolean;
     
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
        public pull(key: string, value: any): void;
     
        /**
         * @description Push data to the database
         * @param key The key of the data to push
         * @param value The value of the data to push
         */
        public push(key: string, value: any | any[]): void;
    
        /**
         * @description Remove all duplications values from the key (Not working in internal arrays)
         * @param key The key of the data to remove duplications
         */
        public unique(key: string): void;
     
        /**
         * @description Set a specific data in the database
         * @param key The key of the data to set
         * @param value The value of the data to set
         */
        public set(key: string, value: any): void;
     
        /**
         * @description Get all the values from the database
         * @returns The values of the database
         */
        public values(): any[];
    }
}