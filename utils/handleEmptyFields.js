const handleEmptyFields = (object) => {
  var error = true;
  Object.entries(object).forEach((item) => {
    if (item[1] === "") {
      
      error = false;
    }
  });

  return error;
};

export { handleEmptyFields };
