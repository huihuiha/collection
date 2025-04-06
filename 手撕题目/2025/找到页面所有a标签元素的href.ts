function findAllA() {
  const aList = document.querySelectorAll("a");
  const hrefList: string[] = [];

  for (let i = 0; i < aList.length; i++) {
    hrefList.push(aList[i].href);
  }

  return hrefList;
}

function findAllA2() {
  return Array.from(document.getElementsByTagName("a")).map(
    (item) => item.href
  );
}

const aList = findAllA();
console.log(aList);
