function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return {firstName: firstName,
        familyName:familyName,
        title:title,
        payPerHour:payPerHour,
        timeInEvents: [],
        timeOutEvents: []}
}

function createEmployeeRecords(arrays){
    return arrays.map(createEmployeeRecord); 
}

function createTimeInEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(" "); 
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,  
        hour: parseInt(hour, 10)  
    });
    return employeeRecord; 
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(" ");  // Split date and hour from dateTime string
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",  // Event type is "TimeOut"
        date: date,       // Date from the dateTime string
        hour: parseInt(hour, 10)  // Hour, parsed as an integer
    });
    return employeeRecord;  // Return the updated employee record
}

function hoursWorkedOnDate(employeeRecord,date){
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    return (timeOutEvent.hour-timeInEvent.hour)/100
}

function wagesEarnedOnDate(employeeRecord,date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord,date)
    
    return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      const wagesForDay = wagesEarnedOnDate(employeeRecord, date);
      return totalWages + wagesForDay;
    }, 0);  
  }

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
      }, 0); 
}
