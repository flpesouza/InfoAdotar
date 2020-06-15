class DAL {

    /// <summary>
    /// Creates a new table
    /// </summary>
    /// <param name="table">the table name</param>
    static setTable(table, error) {
        if (typeof table == 'string')
            localStorage.setItem(table, "[]");
        else
            error("\"table\" não é do tipo string");
    }

    /// <summary>
    /// Creates a new ID for a new item
    /// </summary>
    /// <param name="tableData">the data from an table</param>
    /// <returns>the new ID</returns>
    static setId(tableData) {
        return Math.max(tableData.map(function (val) {
            return val.id;
        })) + 1;
    }

    /// <summary>
    /// Create an data object inside the selected table
    /// </summary>
    /// <param name="table">the selected table</param>
    /// <param name="data">an data object</param>
    static create(table, data, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof data == 'object') {

                let tableData = JSON.parse(localStorage.getItem(table));
                let resultData = data;

                resultData.id = this.setId(tableData);
                tableData.push(resultData);
                localStorage.setItem(table, JSON.stringify(tableData));

                success(resultData);
            }
            else error("\"table\" não é do tipo string ou \"data\" não é um objeto");
        }

    }

    /// <summary>
    /// update an data object from the selected table
    /// </summary>
    /// <param name="table">the selected table</param>
    /// <param name="data">an data object</param>
    static update(table, data, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof data == 'object' && data.id && typeof data.id == 'number') {
                let tableData = JSON.parse(localStorage.getItem(table));
                let index = tableData.findIndex(function (item) { return item.id == data.id });
                if (index) {
                    Object.keys(data).forEach(function (name) {
                        tableData[index][name] = data[name];
                    });
                    localStorage.setItem(table, JSON.stringify(tableData));
                    success(tableData[index]);
                } else error(`Item com id ${data.id} não foi encontrado em ${table}`);
            } else error("\"table\" não é do tipo string ou \"data\" não é um objeto ou não contem id");
        }
    }

    /// <summary>
    /// read a data object with the selected id from the selected table
    /// </summary>
    /// <param name="table">the selected table</param>
    /// <param name="id">the selected id</param>
    /// <returns>an data object</returns>
    static read(table, id, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof id == 'number') {
                let tableData = JSON.parse(localStorage.getItem(table));
                success(tableData.find(function (item) { return item.id == id }));
            } else error("\"table\" não é do tipo string ou \"id\" não é do tipo number");
        }
    }

    /// <summary>
    /// returns all data objects from the selected table
    /// </summary>
    /// <param name="table">the selected table</param>
    /// <returns>an data array</returns>
    static readAll(table, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string') {
                success(JSON.parse(localStorage.getItem(table)));
            } else error("\"table\" não é do tipo string");
        }
    }

    /// <summary>
    /// returns all data objects from the selected table that match the func condition
    /// </summary>
    /// <param name="table">the selected table</param>
    /// <param name="func">a boolean function</param>
    /// <returns>an data array</returns>
    static filter(table, func, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && typeof func == 'function') {
                let tableData = JSON.parse(localStorage.getItem(table));
                success(tableData.filter(func));
            } else error("\"table\" não é do tipo string ou \"func\" não é uma função");
        }
    }

    /// <summary>
    /// Removes a data object from the selected table
    /// </summary>
    /// <param name="table">the selected table</param>
    /// <param name="id">the data object id</param>
    static delete(table, id, success, error) {
        if (typeof success == 'function' && typeof error == 'function') {
            if (typeof table == 'string' && id == 'number') {
                let tableData = JSON.parse(localStorage.getItem(table));
                let index = tableData.findIndex(function (item) { return item.id == id });
                if (index) {
                    tableData.splice(index, 1)
                    localStorage.setItem(table, JSON.stringify(tableData));
                    success();
                } error(`Item com id ${id} não foi encontrado em ${table}`);
            } else error("\"table\" não é do tipo string ou \"id\" não é do tipo number");
        }
    }
}