/** Date formatter  */
 export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('');
  }

  
  /** Time formatter */
  export function formatTime(date) {
    var t =  new Date(date),
      hours = '' + t.getHours(),
      minutes = '' + t.getMinutes();
  
    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;
  
    return [hours, minutes, '00'].join(':');
  }

