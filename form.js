"use strict";
document.addEventListener("DOMContentLoaded", init);

let input_persons = 1;
let number_chargers = input_persons;
let chosen_delivery = "afhentning";
let chosen_delivery_pris = 0;
const form = document.querySelector("form");

// init funktion med eventlisteners
function init() {
  console.log("init");

  document
    .querySelector("#number_persons")
    .addEventListener("input", updatePersons);

  document
    .querySelector("#own_charger")
    .addEventListener("change", updateChargers);

  document
    .querySelector("#set_chargers")
    .addEventListener("input", updateChargersGroups);

  document
    .querySelector("#delivery_posthus")
    .addEventListener("change", updateDeliveryPosthus);

  document
    .querySelector("#delivery_afhentning")
    .addEventListener("change", updateDeliveryAfhentning);

  document.querySelector(".fortsaet").addEventListener("click", flow2);

  document.querySelector(".fortsaet2").addEventListener("click", flow3);

  document
    .querySelector("#payment_kort")
    .addEventListener("change", updatePayment);
  document
    .querySelector("#payment_mobilepay")
    .addEventListener("change", updatePayment);
  document
    .querySelector("#payment_paypal")
    .addEventListener("change", updatePayment);

  document.querySelector("form").addEventListener("submit", submit);

  setServices();
}

function updatePayment(e) {
  console.log("updatePayment");

  if (e.target.id === "payment_kort" && e.target.checked === true) {
    console.log("kort er valgt");
    document
      .querySelector(".billede_kort")
      .classList.add("chosen_paymentmethod");
    document
      .querySelector(".billede_mobilepay")
      .classList.remove("chosen_paymentmethod");
    document
      .querySelector(".billede_paypal")
      .classList.remove("chosen_paymentmethod");
  }
  if (e.target.id === "payment_mobilepay" && e.target.checked === true) {
    console.log("mobilepay er valgt");
    document
      .querySelector(".billede_kort")
      .classList.remove("chosen_paymentmethod");
    document
      .querySelector(".billede_mobilepay")
      .classList.add("chosen_paymentmethod");
    document
      .querySelector(".billede_paypal")
      .classList.remove("chosen_paymentmethod");
  }
  if (e.target.id === "payment_paypal" && e.target.checked === true) {
    console.log("paypal er valgt");
    document
      .querySelector(".billede_kort")
      .classList.remove("chosen_paymentmethod");
    document
      .querySelector(".billede_mobilepay")
      .classList.remove("chosen_paymentmethod");
    document
      .querySelector(".billede_paypal")
      .classList.add("chosen_paymentmethod");
  }
}

function flow2() {
  console.log("flow2");
  const isValidInput = number_persons.checkValidity();
  if (isValidInput === true) {
    console.log("it's true");
    document.querySelector(".form_grid1").style.position = "absolute";
    document.querySelector(".form_grid1").style.transform = "translate(-100vw)";
    document.querySelector(".form_grid2").style.position = "relative";
    document.querySelector(".form_grid2").style.transform = "translate(0)";
  } else {
    console.log("it's not valid");
  }
}

function flow3() {
  console.log("flow3");
  const isValidFirstname = firstname.checkValidity();
  const isValidLastname = lastname.checkValidity();
  const isValidAddress = address.checkValidity();
  const isValidZip = zip.checkValidity();
  const isValidCity = city.checkValidity();
  const isValidEmail = email.checkValidity();

  if (
    isValidFirstname === true &&
    isValidLastname === true &&
    isValidAddress === true &&
    isValidZip === true &&
    isValidCity === true &&
    isValidEmail === true
  ) {
    console.log("det hele stemmer");
    document.querySelector(".form_grid2").style.position = "absolute";
    document.querySelector(".form_grid2").style.transform = "translate(-100vw)";
    document.querySelector(".form_grid3").style.position = "relative";
    document.querySelector(".form_grid3").style.transform = "translate(0)";
  }
}

function updatePersons(e) {
  console.log("updatePersons");
  console.log(e.target.value);
  input_persons = parseInt(e.target.value);
  document.querySelector("#own_charger").checked = false;
  // forhindrer at der står NaN, når inputfeltet er tomt, ved at indsætte 1
  if (e.target.value == "") {
    console.log("dette");
    input_persons = 1;
  }
  if (input_persons === 0 || e.target.value < 0) {
    input_persons = 1;
    console.log("not enough");
    document.querySelector(".advarsel2").style.visibility = "visible";
    document.querySelector(".advarsel2").style.height = "auto";
    document.querySelector("#number_persons").style.outline = "1px solid red";
    document.querySelector("#number_persons").style.color =
      "rgba(51, 51, 51, 0.6)";
    document.querySelector("#number_persons").disabled = true;

    setTimeout(function() {
      console.log("tiden er gået");
      document.querySelector("#number_persons").disabled = false;
      document.querySelector("#number_persons").style.color = "#333333";
      document.querySelector("#number_persons").value = input_persons;
      document.querySelector("#number_persons").style.outline = "none";
      document.querySelector(".advarsel2").style.visibility = "hidden";
      document.querySelector(".advarsel2").style.height = "0";
    }, 4000);
  }
  if (e.target.value > 20) {
    input_persons = 20;
    console.log("too much persons");
    document.querySelector(".advarsel1").style.visibility = "visible";
    document.querySelector(".advarsel1").style.height = "auto";
    document.querySelector("#number_persons").style.outline = "1px solid red";
    document.querySelector("#number_persons").style.color =
      "rgba(51, 51, 51, 0.6)";
    document.querySelector("#number_persons").disabled = true;

    setTimeout(function() {
      console.log("tiden er gået");
      document.querySelector("#number_persons").disabled = false;
      document.querySelector("#number_persons").style.color = "#333333";
      document.querySelector("#number_persons").value = input_persons;
      document.querySelector("#number_persons").style.outline = "none";
      document.querySelector(".advarsel1").style.visibility = "hidden";
      document.querySelector(".advarsel1").style.height = "0";
    }, 4000);
  }
  number_chargers = input_persons;
  // indsæt her
  document.querySelector("#set_chargers").value = 0;
  setServices();
}

function updateChargers(e) {
  console.log("updateChargers");

  if (e.target.checked == true) {
    number_chargers = number_chargers - number_chargers;
  } else {
    number_chargers = input_persons;
  }

  setServices();
}

function updateChargersGroups(e) {
  console.log("updateChargersGroups");
  const input_chargers = parseInt(e.target.value);

  if (e.target.value == "" || e.target.value < 0) {
    number_chargers = input_persons;
  } else if (input_chargers > input_persons) {
    console.log("too much");
    number_chargers = input_persons;
    document.querySelector(".advarsel2").style.visibility = "visible";
    document.querySelector(".advarsel2").style.height = "auto";
    document.querySelector("#set_chargers").style.outline = "1px solid red";
    document.querySelector("#set_chargers").style.color =
      "rgba(51, 51, 51, 0.6)";
    document.querySelector("#set_chargers").disabled = true;

    setTimeout(function() {
      console.log("tiden er gået");
      document.querySelector("#set_chargers").disabled = false;
      document.querySelector("#set_chargers").style.color = "#333333";
      document.querySelector("#set_chargers").value = input_persons;
      document.querySelector("#set_chargers").style.outline = "none";
      document.querySelector(".advarsel2").style.visibility = "hidden";
      document.querySelector(".advarsel2").style.height = "0";
    }, 2500);
  } else {
    number_chargers = input_persons - input_chargers;
  }
  setServices();
}

function updateDeliveryPosthus(e) {
  console.log("updateDeliveryPosthus");

  chosen_delivery_pris = 50;
  if (e.target.checked == true) {
    chosen_delivery = "posthus";
    document
      .querySelector(".delivery_button2")
      .classList.add("chosen_delivery");
    document
      .querySelector(".delivery_button1")
      .classList.remove("chosen_delivery");
    document.querySelector(".delivery").style.visibility = "visible";
    document.querySelector(".delivery").style.height = "auto";
    document.querySelector(".delivery").style.display = "contents";
    document.querySelectorAll(".autofill").forEach(felt => {
      felt.value = null;
    });
    document.querySelector(".autofill_number").value = null;
  }
  setServices();
}

function updateDeliveryAfhentning(e) {
  console.log("updateDeliveryAfhentning");
  chosen_delivery_pris = 0;
  if (e.target.checked == true) {
    document
      .querySelector(".delivery_button2")
      .classList.remove("chosen_delivery");
    document
      .querySelector(".delivery_button1")
      .classList.add("chosen_delivery");
    chosen_delivery = "afhentning";
    document.querySelector(".delivery").style.visibility = "hidden";
    document.querySelector(".delivery").style.height = "0";
    document.querySelector(".delivery").style.display = "block";
    document.querySelectorAll(".autofill").forEach(felt => {
      felt.value = "null";
    });
    document.querySelector(".autofill_number").value = 1234;
  }
  setServices();
}

function setServices() {
  console.log("setServices");
  console.log(input_persons);
  // skriver antal personer ind og udregner prisen
  document.querySelector("#amount_service").innerHTML = input_persons;
  document.querySelector(".price_services").innerHTML =
    input_persons * 179 + " DKK";
  // sørger for at der meldes fejl, hvis man forsøger at medbringe flere opaldere end man køber tjenester
  document.querySelector("#set_chargers").max = input_persons;
  // hvis der er mere end en person skifter boksen
  if (input_persons > 1) {
    document.querySelector(".multiple_persons").style.display = "contents";
    document.querySelector(".multiple_persons").style.visibility = "visible";
    document.querySelector(".multiple_persons").style.height = "auto";
    document.querySelector(".single_person").style.display = "block";
    document.querySelector(".single_person").style.visibility = "hidden";
    document.querySelector(".single_person").style.height = "0";
  }
  if (input_persons === 0 || input_persons === 1) {
    document.querySelector(".multiple_persons").style.display = "block";
    document.querySelector(".multiple_persons").style.visibility = "hidden";
    document.querySelector(".multiple_persons").style.height = "0";
    document.querySelector(".single_person").style.display = "contents";
    document.querySelector(".single_person").style.visibility = "visible";
  }
  setChargers();
}

function setChargers() {
  console.log("setChargers");

  // indsætter som udgangspunkt samme antal depositum som antal service, samt udregner prisen
  document.querySelector("#amount_chargers").innerHTML = number_chargers;
  document.querySelector(".price_chargers").innerHTML =
    number_chargers * 200 + " DKK";

  showOrder();
}

function showOrder() {
  console.log("showOrder");
  // indsætter antal services + pris
  document.querySelectorAll(".order_services").forEach(felt => {
    felt.innerHTML = document.querySelector(".total_services").innerHTML;
  });
  document.querySelectorAll(".order_services_price").forEach(felt => {
    felt.innerHTML = input_persons * 250 + " DKK";
  });

  document.querySelectorAll(".earlybird_price").forEach(felt => {
    felt.innerHTML = input_persons * 179 + " DKK";
  });

  // indsætter antal opladere + pris
  document.querySelectorAll(".order_chargers").forEach(felt => {
    felt.innerHTML = document.querySelector(".total_chargers").innerHTML;
  });

  document.querySelectorAll(".order_chargers_price").forEach(felt => {
    felt.innerHTML = document.querySelector(".price_chargers").innerHTML;
  });

  // indsætter den valgte levering + pris
  if (chosen_delivery == "afhentning") {
    document.querySelectorAll(".order_delivery").forEach(felt => {
      felt.innerHTML = document.querySelector(".afhentning_tekst").innerHTML;
    });
    document.querySelectorAll(".order_delivery_price").forEach(felt => {
      felt.innerHTML = document.querySelector(".afhentning_pris").innerHTML;
    });
  }
  if (chosen_delivery == "posthus") {
    document.querySelectorAll(".order_delivery").forEach(felt => {
      felt.innerHTML = document.querySelector(".posthus_tekst").innerHTML;
    });
    document.querySelectorAll(".order_delivery_price").forEach(felt => {
      felt.innerHTML = document.querySelector(".posthus_pris").innerHTML;
    });
  }

  document.querySelectorAll(".ialt_pris").forEach(felt => {
    felt.innerHTML =
      input_persons * 179 +
      number_chargers * 200 +
      chosen_delivery_pris +
      " DKK";
  });
}

function submit(e) {
  console.log("submit");

  document.querySelector(".form_grid3").style.position = "absolute";
  document.querySelector(".form_grid3").style.transform = "translate(-100vw)";
  document.querySelector(".ekstern_betaling").style.position = "relative";
  document.querySelector(".ekstern_betaling").style.transform = "translate(0)";

  e.preventDefault();
  const payload = {
    persons: form.elements.persons.value,
    charger_single: form.elements.charger_single.checked,
    charger_number: form.elements.charger_number.value,
    delivery_afhentning: form.elements.delivery_afhentning.checked,
    delivery_posthus: form.elements.delivery_posthus.checked,
    firstname: form.elements.firstname.value,
    lastname: form.elements.lastname.value,
    address: form.elements.address.value,
    zip: form.elements.zip.value,
    city: form.elements.city.value,
    email: form.elements.email.value,
    payment_kort: form.elements.payment_kort.checked,
    payment_mobilepay: form.elements.payment_mobilepay.checked,
    payment_paypal: form.elements.payment_paypal.checked,
    newsletter: form.elements.newsletter.checked,
    terms: form.elements.terms.checked
  };
  post(payload);
  setTimeout(bookingDone, 2000);
}

function post(newCustomer) {
  console.log("post");

  const postData = JSON.stringify(newCustomer);
  fetch("https://friends-a7f9.restdb.io/rest/volt", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7ceca0cac6621685acbada",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      form.reset();
    });
}
function bookingDone() {
  console.log("bookingDone");
  document.querySelector(".ekstern_betaling").style.position = "absolute";
  document.querySelector(".ekstern_betaling").style.transform =
    "translate(-100vw)";
  document.querySelector(".form_grid4").style.position = "relative";
  document.querySelector(".form_grid4").style.transform = "translate(0)";
}
