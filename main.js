const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showBtn = document.getElementById("show");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate_wealth");

let data = []; // array of objects - users - .

//will start with 3 users.
getRandomUser();
getRandomUser();
getRandomUser();

//Methods:
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api"); // free api.
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: `${Math.floor(Math.random() * 1000000)}`,
  };

  addData(newUser);
}

// add the created users to DOM..
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//update UI with the new users with 1- foreach().
//default paramater.
function updateDOM(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

  providedData.forEach((item) => {
    let i = formatMoney(item.money);
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${i}`;
    main.appendChild(element);
  });
}

// duplicate money with 2- map().
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }; // "...user": copy everything in this array and then append the new
  });
  updateDOM();
}

// sort user in Descending with 3- sort().
function sortUsers() {
  data.sort((a, b) => b.money - a.money); //b - a: Descending | a - b : Ascending.
  updateDOM();
}

// show only ones who has 1M or more Wealth with 4- filter().
function showMillionairesOnly() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// Calculate the total wealth with 5- reduce() which takes 2 params: 1st => accumulator, 2nd => item(the object).
// we begin with 0 as a start value.
function calculateWeath() {
  const wealth = data.reduce((acc, user) => (acc += +user.money), 0);
  // TODO: handle duplicating of the wealth Element
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

//Format number in shape of Money from "Stack Over FLow"..

function formatMoney(number) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(number);
}

//Event listeners:
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortUsers);
showBtn.addEventListener("click", showMillionairesOnly);
calculateWealthBtn.addEventListener("click", calculateWeath);
