export const cmpNAME = strcmp;
export const cmpPRIORITY = (val1, val2) => { const weight = { Medium: 0, Low: -1, High: 1 }; return weight[val1] - weight[val2]; }
export const cmpDEADLINE = datestrcmp; // TODO: fix data type in DB to timestamp
export const cmpPROGRESS = (val1, val2) => ((Number(val1) || 0) - (Number(val2) || 0)); // TODO: fix data type in DB to timestamp
export const strMatch = (_str, keyword) => { 
  const str = "" + _str;
  return str.toLowerCase().includes(keyword.toLowerCase()); 
}

function strcmp(str1, str2) {
  return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}
function datestrcmp(dmy1, dmy2) { // const dateFormat = 'DD/MM/YYYY';
  const dmyToNumeric = (dmy) => {
    if (!dmy || dmy.length === 0) {
      return 0;
    }
    var parts = dmy.split("/");
    try {
      var dt = new Date(parseInt(parts[2], 10),
                        parseInt(parts[1], 10) - 1,
                        parseInt(parts[0], 10));
      console.log(dt);
      return dt.getTime();
    }
    catch (err) {
      return 0;
    }
  }
  const num1 = dmyToNumeric(dmy1);
  const num2 = dmyToNumeric(dmy2);
  return ( ( num1 == num2 ) ? 0 : ( ( num1 > num2 ) ? 1 : -1 ) );
}
// export default (cmpNAME, cmpPRIORITY, cmpDEADLINE, cmpPROGRESS);