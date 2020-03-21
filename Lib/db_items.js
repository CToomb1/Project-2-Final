const consola = require('consola');
const connection = require('../config/connectionmysql');

const createEmp = empDataObj => {
    return new Promise((resolve, reject) => {
        let fname = empDataObj.first_name;
        let lname = empDataObj.last_name;
        let tname = empDataObj.title;
        connection.query('INSERT INTO employee (first_name, last_name, title) VALUES (?, ?, ?)', [fname, lname, tname], (err, empData) => {
            if (err) {
                consola.log(err);
                reject(err);
                return;
            }

            resolve(empData);
        });
    });
};

const createShift = ShiftDataObj => {
    let name = ShiftDataObj.name;
    let day = ShiftDataObj.date;
    let start_time = ShiftDataObj.start_time;
    let end_time = ShiftDataObj.end_time;
    let num_emp = ShiftDataObj.number_of_employees;
    let comments = ShiftDataObj.comments;
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO shift (name, day, start_time, end_time, num_needed, comments) VALUES (?, ?, ?, ?, ?, ?)', [name, day, start_time, end_time, num_emp, comments], (err, shiftData) => {
            if (err) {
                consola.error(err);
                reject(err);
                return;
            }
            return (shiftData);
        });
    });
};

const assignEmp = assignObj => {
    let empid = assignObj.emp_id;
    let shiftid = assignObj.shift_id;

    let sqlquery = "INSERT INTO assignment (shift_id, employee_id) VALUES (?, ?) ";
    connection.query(sqlquery, [shiftid, empid], function (err, result) {

    });
};

const viewShifts = (callBack) => {
    let sqlquery = "SELECT * FROM shift ";
    connection.query(sqlquery, function (err, results) {
        callBack(results);
    });
};

const viewEmp = (callBack) => {
    let sqlquery = "SELECT * FROM employee ";
    connection.query(sqlquery, function (err, results) {
        callBack(results);
    });
};

const viewAssignment = (callBack) => {
    let sqlquery = "SELECT a.id, e.first_name, e.last_name, s.name, s.day FROM assignment AS a INNER JOIN employee e ON a.employee_id = e.id INNER JOIN shift s ON a.shift_id = s.id";
    connection.query(sqlquery, function (err, results) {
        callBack(results);
    });
};

const updateEmp = (empObj, empId) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE employee SET ? WHERE id = ?', [empObj, empId], (err, empdata) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else if (empdata.affectedRows === 0) {
                return resolve({ message: "Couldn't find a emp with that id!", code: 404 });
            }

            resolve({ message: 'emp updated successfully!', code: 200 });
        });
    });
};

const updateShifts = (shiftObj, shiftId) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE shift SET ? WHERE id = ?', [shiftObj, shiftId], (err, shiftdata) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else if (shiftdata.affectedRows === 0) {
                return resolve({ message: "Couldn't find a shift with that id!", code: 404 });
            }

            resolve({ message: 'shift updated successfully!', code: 200 });
        });
    });
};

const deleteEmp = empId => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM employee WHERE id = ?', [empId], (err, empdata) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else if (empdata.affectedRows === 0) {
                return resolve({ message: "Couldn't find a emp with that id!", code: 404 });
            }

            resolve({ message: 'Employee deleted successfully!', code: 200 });
        });
    });
};

const deleteShift = shiftId => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM shift WHERE id = ?', [shiftId], (err, shiftdata) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else if (shiftdata.affectedRows === 0) {
                return resolve({ message: "Couldn't find a shift with that id!", code: 404 });
            }

            resolve({ message: 'Shift deleted successfully!', code: 200 });
        });
    });
};




// export functions
module.exports = {

    createEmp,
    createShift,
    viewShifts,
    viewEmp,
    updateShifts,
    updateEmp,
    deleteEmp,
    deleteShift,
    assignEmp,
    viewAssignment

};