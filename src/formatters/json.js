const createJsonFile = (arr) => {
  const result = JSON.stringify(arr, null, ' '.repeat(2));
  // console.log(result)
  return result;
};

export default createJsonFile;
