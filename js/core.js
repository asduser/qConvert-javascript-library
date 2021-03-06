var qConvert = (function(){

        return {

            allOverlap: allOverlap,
            capitalizeFirst: capitalizeFirst,
            isBigger: isBigger,
            checkArrayAvailability: checkArrayAvailability,
            cloneObj: cloneObj,
            cloneArray: cloneArray,
            cloneDate: cloneDate,
            isNotEmptyArray: isNotEmptyArray,
            isLess: isLess,
            isNegative: isNegative,
            isNumerable: isNumerable,
            isPositive: isPositive,
            findDuplicates: findDuplicates,
            findMin: findMin,
            findMax: findMax,
            getUnique: getUnique,
            merge: merge,
            mult: mult,
            pushIfNotExists: pushIfNotExists,
            remove: remove,
            reverse: reverse,
            runFuncFromVariable: runFuncFromVariable,
            subtract: subtract,
            sum: sum,
            sortArrayObjects: sortArrayObjects,
            toCamelCase: toCamelCase,
            toNumber: toNumber,
            toThousand: toThousand,
            toggleIntoArray: toggleIntoArray

        };


        /*
         ** MAIN METHODS
         */

        /** * Returns matches found *
         * @param {String | Number} value - value for comparing
         * @param {Array} collection - working elements array
         * @param {Number} searchType - scanning type
         * @return {Number | String | Array} - result
         */
        function allOverlap(value, collection, searchType){
            var result = [], internalSearch;
            if (isNotEmptyArray(collection)) {
                switch (searchType) {
                    case 1:
                    default:
                        internalSearch = function(val){
                            result.push(val);
                        };
                        break;
                    case 2:
                        internalSearch = function(val, index){
                            result.push({
                                "value": val,
                                "index": index
                            });
                        };
                        break;
                }
                collection.forEach(function(i, index){
                    if (i == value) {
                        internalSearch(i, index);
                    }
                });
            } else {
                result = null;
            }
            return result;
        }

        /**  * Capitalize first char for string *
         * @param {String} value - Entry string for scanning
         * @return {String} - converted string
         */
        function capitalizeFirst(value) {
            return value.replace(/\w\S*/g, function (str) {
                var coll, result;
                if (str.length > 1) {
                    coll = str.split("");
                    result = (function (arr) {
                        return arr.some(function (symbol) {
                            return symbol == symbol.toUpperCase();
                        });
                    })(coll);
                    if (Boolean(result) == false) {
                        return str.charAt(0).toUpperCase() + str.substr(1);
                    } else {
                        return str;
                    }
                }
            });
        }

        /**  * Fill array if not full *
         * @param {Array} coll - user collection
         * @param {String | Number} label - value to check
         * @param {Array} values - initial values collection
         * @return {String | Array} - copied object
         */
        function checkArrayAvailability(coll, label, values){
            if (checkIsFull(coll, values) != "Full") {
                values.forEach(function(i){
                    coll.indexOf(label) == -1 && coll.push(label);
                });
                return checkIsFull(coll, values);
            } else {
                return "Full";
            }
        }

        /**  * Clones assigned object *
         * @param {Object} obj - initial object to clone
         * @return {Object} - copied object
         */
        function cloneObj(obj) {
            if (isTrue(obj)) {
                if(obj == null || typeof(obj) != 'object')
                    return obj;
                var temp = new obj.constructor();
                for(var key in obj)
                    if (obj.hasOwnProperty(key)) temp[key] = cloneObj(obj[key]);
                return temp;
            } else {
                return null;
            }
        }

        /**  * Clones specified array *
         * @param {Array} obj - initial array to clone
         * @return {Array} - copied array
         */
        function cloneArray(obj){
            if (obj instanceof Array) {
                var storeParam = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    storeParam[i] = cloneArray(obj[i]);
                }
                return storeParam;
            } else {
                return null;
            }
        }

        /**  * Clones specified Date *
         * @param {Date} obj - initial date to clone
         * @return {Date} - copied date
         */
        function cloneDate(obj){
            if(obj instanceof Date){
                return new Date(obj.getTime());
            }
        }

        /** * Is number bigger then ... *
         * @param {Number} val - initial number
         * @param {Number} compareVal - number for comparing
         * @return {Boolean}
         */
        function isBigger(val, compareVal){
            return val > compareVal;
        }

        /** * Is number less then ... *
         * @param {Number} val - initial number
         * @param {Number} compareVal - number for comparing
         * @return {Boolean}
         */
        function isLess(val, compareVal){
            return val < compareVal;
        }

        /** * Is number negative ? *
         * @param {Number} val - number for comparing
         * @return {Boolean}
         */
        function isNegative(val){
            var res;
            if (isFalse(isNaN(val))) {
                res = val < 0;
            } else {
                res = null;
            }
            return res;
        }

        /** * Defines that collection truly contains numerable only and returns Boolean ? *
         * @param {Array} collection - collection to filter
         * @return {Boolean | Null} - returns null if error
         */
        function isNumerable(collection){
            if (isNotEmptyArray(collection)) {
                return collection.every(function(i){
                    return isFalse(isNaN(i));
                })
            } else {
                return null;
            }
        }

        /** * Is number positive ? *
         * @param {Number} val - number for comparing
         * @return {Boolean}
         */
        function isPositive(val){
            var res;
            if (isFalse(isNaN(val))) {
                res =  val > 0;
            } else {
                res =  null;
            }
            return res;
        }

        /** * Find duplicates in array *
         * @param {Array} collection - input elements list
         * @return {Array}
         */
        function findDuplicates(collection) {

            var newList = [],
                tempArray= collection.slice(0),
                matches,
                tempLen = tempArray.length,
                colLen = collection.length;

            for (var i = 0; i < colLen; i++) {
                matches = 0;
                for (var j = 0; j < tempLen; j++) {
                    if (collection[i] == tempArray[j]) {
                        matches++;
                        delete tempArray[j];
                    }
                }
                matches > 0 && newList.push({ Value: collection[i], Matches: matches });
            }
            return newList;
        }

        /** * Finds maximal significance *
         * @param {Array} arr - collection for scanning
         * @return {Boolean}
         */
        function findMax(arr){
            return findMaxMin(arr, "max");
        }

        /** * Finds minimal significance *
         * @param {Array} arr - collection for scanning
         * @return {Boolean}
         */
        function findMin(arr){
            return findMaxMin(arr, "min");
        }


        /** * Returns unique values from array *
         * @param {Array} collection - elements collection
         * @return {Array} - collection of found values
         */
        function getUnique(collection){
            if (isNotEmptyArray(collection)) {
                return collection.filter(function(i, pos, that){
                    return that.indexOf(i) === pos;
                })
            } else {
                return null;
            }
        }

        /** * Concat assigned object into main *
         * @return {Object | Null} - output result
         */
        function merge(){
            var obj, args, i, len, key;
            args = Array.prototype.slice.call(arguments);
            if (isNotEmptyArray(args)) {

                obj = {};
                i = 0;
                len = arguments.length;
                for (; i < len; i++) {
                    for (key in arguments[i]) {
                        if (arguments[i].hasOwnProperty(key)) {
                            obj[key] = arguments[i][key];
                        }
                    }
                }
                return obj;
            } else {
                return null;
            }
        }

        /** * Multiples the numbers *
         * @return {Number}
         */
        function mult(){
            return countByExpression("*", arguments);
        }

        /** * Insert assigned value into array if not exists *
         * @param {Array} coll - initial elements collection
         * @param {String | Number} el - variable to compare
         * @returns {Array}
         */
        function pushIfNotExists(coll, el){
            if (coll.indexOf(el) === -1) {
                coll.push(el);
            }
            return coll.sort();
        }

        /** * Delete assigned values from array *
         * @param {Array} coll - collection elements
         * @param {Number | String} el - element to search
         * @return {Number}
         */
        function remove(coll, el) {
            var position = coll.indexOf(el);
            if (position > -1) {
                coll.splice(position, 1);
            }
            return coll;
        }

        /** * Reverse existing string *
         * @param {String} value - entry string
         * @return {String}
         */
        function reverse(value) {
            var tempA = "",
                len = value.length - 1;
            while (len >= 0) {
                tempA += value[len];
                len -= 1;
            }
            return tempA;
        }

        /** * Run function from string if exists *
        * @param {String} variable
         */
        function runFuncFromVariable(variable){
            window[variable]();
        }

        /** * Subtracts the numbers *
         * @return {Number}
         */
        function subtract(){
            return countByExpression("-", arguments);
        }

        /** * Adds the numbers *
         * @return {Number}
         */
        function sum(){
            return countByExpression("+", arguments);
        }

        /** * Sort objects in array *
         * @return {Array}
         */
        function sortArrayObjects(collection, value){
            return collection.sort(function(a,b) {return (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0);} );
        }

        /** * Convert into Camel Case *
         * @param {String} str - input text to convert
         * @return {String}
         */
        function toCamelCase(str) {
            return str.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2) {
                if (p2) return p2.toUpperCase();
                return p1.toLowerCase();
            });
        }

        /** * Converts string into number *
         * @param {String} value - input string
         * @return {Number}
         */
        function toNumber(value) {
            var result = Number(value), newVal;
            if (Boolean(result) == true) {
                newVal = result;
            } else {
                newVal = null;
            }
            return newVal;
        }

        /** * Transform number into thousand format via filter *
         * @param {Number | String} value - entry data to convert
         * @return {String} - output parameter
         */
        function toThousand(value){
            var pointPos = value.toString().indexOf('.');
            return value.toString().replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
                return pointPos<0 || i<pointPos ? ($0+',') : $0;
            });
        }

        /** * Push or remove value into Array *
         * @param {Array} coll - collection to compare
         * @param {String | Number | Object} value - data for toggle
         * @param {String} param - if value type is "Object", param assumes property Name
         * @param {String} prop - object property Name
         * @return {Array} - filtered collection
         */
        function toggleIntoArray(coll, value, prop, param) {
            var type = typeof value,
                typeF = type.charAt(0).toUpperCase() + type.substring(1),
                method = {
                    Number: toggle,
                    String: toggle,
                    Object: toggle
                };

            method[typeF](value, type);

            function toggle(val, t){
                if (t == "object") {
                    if (coll.length == 0) {
                        coll.push(val);
                    } else {
                        coll.forEach(function (i, index) {
                            console.log(i);
                            i[prop] == param ? coll.splice(index, 1) : coll.push(val);
                        });
                    }
                } else {
                    coll.indexOf(val) == -1 ? coll.push(val) : coll.splice(coll.indexOf(val), 1);
                }
            }
        }



        /*
         ** ADDITIONAL METHODS *
         *--------------------
         *    Description
         *--------------------
         * This methods use to calculate main functions and separate overall logic into few small parts.
         * Each method is absolutely functional procedure, which can perform certain actions.
         */

        function checkIsFull(coll, initValues){
            return coll.length == initValues.length ? "Full" : coll;
        }

        function isTrue(arg){
            return Boolean(arg) == true;
        }
        function isFalse(arg){
            return Boolean(arg) == false;
        }
        function isNotEmptyArray(arr){
            return isTrue(arr) && arr.length > 0;
        }

        function internalMult(multAttr, val){
            return multAttr * Number(val);
        }
        function internalSum(multAttr, val){
            return multAttr + Number(val);
        }
        function internalSubrac(multAttr, val){
            return multAttr - Number(val);
        }
        function countByExpression(expType, collection){
            var result, internalExpression, args;
            if (isNotEmptyArray(collection)) {
                switch (expType) {
                    case "+":
                        result = 0;
                        internalExpression = internalSum;
                        break;
                    case "*":
                        result = 1;
                        internalExpression = internalMult;
                        break;
                    case "-":
                        result = 0;
                        internalExpression = internalSubrac;
                        break;
                }
                args = Array.prototype.slice.call(collection);
                args.forEach(function (item) {
                    isTrue(Array.isArray(item)) && item.length > 1 && (function () {
                        item.forEach(function (val) {
                            if (isFalse(isNaN(val))) {
                                result = internalExpression(result, val);
                            }
                        });
                    })();
                    isFalse(isNaN(item)) && (function () {
                        result = internalExpression(result, item);
                    })();
                });
            } else {
                result = null;
            }
            return result;
        }

        function internalMax(i, result){
            return i > result;
        }
        function internalMin(i, result){
            return i < result;
        }
        function findMaxMin(arr, valType){
            var result, internalExp;

            if (isNotEmptyArray(arr)) {
                result = arr[0];

                switch (valType) {
                    case "max":
                        internalExp = internalMax;
                        break;
                    case "min":
                        internalExp = internalMin;
                        break;
                }
                arr.forEach(function(i){
                    if (isTrue(Number(i))) {
                        if (isTrue(internalExp(i, result))) {
                            result = i;
                        }
                    }
                });
            } else {
                result = null;
            }
            return result;
        }

})();
