export const cmpNAME = strcmp;
export const cmpPRIORITY = (val1, val2) => { const weight = { Medium: 0, Low: -1, High: 1 }; return weight[val1] - weight[val2]; }
export const cmpDEADLINE = strcmp; // TODO: fix data type in DB to timestamp
export const cmpPROGRESS = (val1, val2) => ((Number(val1) || 0) - (Number(val2) || 0)); // TODO: fix data type in DB to timestamp

function strcmp(str1, str2) {
  return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}
// export default (cmpNAME, cmpPRIORITY, cmpDEADLINE, cmpPROGRESS);