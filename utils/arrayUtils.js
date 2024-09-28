const searchInArray = (searchQuery, array, objectKey = null) => {
  return array.filter((d) => {
    let data = objectKey ? d[objectKey] : d; //Incase If It's Array Of Objects.
    let dataWords = typeof data === "string" && data?.toLocaleLowerCase();
    let searchWords =
      typeof searchQuery === "string" &&
      searchQuery
        ?.split(" ")
        ?.map((b) => b && b?.toLocaleLowerCase())
        ?.filter((b) => b);

    let matchingWords = searchWords?.filter((word) =>
      dataWords?.includes(word)
    );

    return matchingWords.length;
  });
};
const searchInObject = (searchQuery, object, objectKey = null, key) => {
  let newArr = [];
  object.map((i) => {
    let data = i[objectKey][key];
    let dataWords = typeof data === "string" && data?.toLocaleLowerCase();
    let searchWords =
      typeof searchQuery === "string" &&
      searchQuery
        ?.split(" ")
        ?.map((b) => b && b?.toLocaleLowerCase())
        ?.filter((b) => b);
    let matchingWords = searchWords?.filter((word) =>
      dataWords?.includes(word)
    );
    if (matchingWords.length) {
      newArr.push(i);
    }
  });
  return newArr;
};
const neww = (searchQuery, object, objectKey = null, key) => {
  let newArr = [];
  object.map((i) => {
    let data = searchInArray(searchQuery, i.responsibleUser, key);
    if (data.length >= 1) {
      newArr.push(i);
    }
  });
  return newArr;
};
const concatArrays = (arr1, arr2) => {
  let arr = [];
  arr = arr1.concat(arr2);
  arr = [...new Set(arr)];
  return arr;
};

const sortByType = (array, key, type) => {
  const newKeys = key.split(".", "");

  if (type === "number") {
    return array.sort((a, b) => {
      if (newKeys.length > 1) {
        return a[newKeys[0]][newKeys[1]] - [newKeys[0]][newKeys[1]];
      } else {
        return a[key] - b[key];
      }
    });
  } else if (type === "string") {
    return array.sort((a, b) => {
      if (newKeys.length > 1) {
        return a[newKeys[0]][newKeys[1]] > b[newKeys[0]][newKeys[1]] ? 1 : -1;
      } else {
        return a[key] > b[key] ? 1 : -1;
      }
    });
  } else if (type === "date") {
    return array.sort((a, b) => {
      if (newKeys.length > 1) {
        return a[newKeys[0]][newKeys[1]] > b[newKeys[0]][newKeys[1]] ? 1 : -1;
      } else {
        return a[key] > b[key] ? 1 : -1;
      }
    });
  } else return array;
};

export { searchInArray, sortByType, searchInObject, concatArrays, neww };
