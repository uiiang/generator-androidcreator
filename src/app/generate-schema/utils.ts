var DATE_REGEXP = /\d{4}-\d{2}-\d{2}/

exports.isNumber = function (value: any) {
	return (typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]')
}

exports.isDate = function (date:string) {
  return ((new Date(date).toString() !== 'Invalid Date'
  //  && !isNaN(Date(date))
  ))
}

exports.isTimestamp = function (timestamp:string) {
  return timestamp.length > 18 && !isNaN((new Date(timestamp)).getTime())
}

exports.isDateString = function (dateStr:string) {
  return dateStr.match(DATE_REGEXP)
}

exports.arrayLastItem = function (arr:[]) {
  return arr[arr.length - 1]
}
