"use strict";

const URL =
  "https://web-unicen.herokuapp.com/api/groups/58miguezvillabona/cervezas";

let contenedor = document.querySelector("#contenedor");
let mensajeCarga = document.createElement("H1");
mensajeCarga.id = "mensaje-carga";
mensajeCarga.innerHTML = "Loading..";

//                                                                  PRIMER PARTIAL RENDER DE LA PAGINA

setTimeout(function () {
  homePage();
}, 0);

//                                                                  PARTIAL RENDER DE HOME

let homeLinks = document.getElementsByClassName("home-page");
for (let i = 0; i < homeLinks.length; i++) {
  homeLinks[i].addEventListener("click", homePage);
}

async function homePage(event) {
  //event.preventDefault();
  contenedor.appendChild(mensajeCarga);
  //console.log("se ejecuto")
  try {
    let response = await fetch("home.html");
    if (response.ok) {
      let contenido = await response.text();
      contenedor.innerHTML = contenido;
    } else {
      console.log(response.status);
      mensajeCarga.innerHTML = "Error " + response.status;
      contenedor.appendChild(mensajeCarga);
    }
  } catch (error) {
    console.log(error);
    mensajeCarga.innerHTML = error;
    contenedor.appendChild(mensajeCarga);
  }
}

//                                                                  PARTIAL RENDER DE PRECIOS

let preciosLinks = document.getElementsByClassName("precios-page");
for (let i = 0; i < preciosLinks.length; i++) {
  preciosLinks[i].addEventListener("click", preciosPage);
}

async function preciosPage(event) {
  event.preventDefault();
  contenedor.appendChild(mensajeCarga);
  try {
    let response = await fetch("precios.html");
    if (response.ok) {
      let contenido = await response.text();
      contenedor.innerHTML = contenido;
    } else {
      console.log(response.status);
      mensajeCarga.innerHTML = "Error " + response.status;
      contenedor.appendChild(mensajeCarga);
    }
  } catch (error) {
    console.log(error);
    mensajeCarga.innerHTML = error;
    contenedor.appendChild(mensajeCarga);
  }
}

//                                                                  PARTIAL RENDER DE PACKS

let packsLinks = document.getElementsByClassName("packs-page");
for (let i = 0; i < packsLinks.length; i++) {
  packsLinks[i].addEventListener("click", packsPage);
}

async function packsPage(event) {
  event.preventDefault();
  contenedor.appendChild(mensajeCarga);
  try {
    let response = await fetch("packs.html");
    if (response.ok) {
      let contenido = await response.text();
      contenedor.innerHTML = contenido;
    } else {
      console.log(response.status);
      mensajeCarga.innerHTML = "Error " + response.status;
      contenedor.appendChild(mensajeCarga);
    }
  } catch (error) {
    console.log(error);
    mensajeCarga.innerHTML = error;
    contenedor.appendChild(mensajeCarga);
  }
}

//                                                                  PARTIAL RENDER DE KIT

let kitLinks = document.getElementsByClassName("kit-page");
for (let i = 0; i < kitLinks.length; i++) {
  kitLinks[i].addEventListener("click", kitPage);
}

async function kitPage(event) {
  event.preventDefault();
  contenedor.appendChild(mensajeCarga);
  try {
    let response = await fetch("kit.html");
    if (response.ok) {
      let contenido = await response.text();
      contenedor.innerHTML = contenido;
    } else {
      console.log(response.status);
      mensajeCarga.innerHTML = "Error " + response.status;
      contenedor.appendChild(mensajeCarga);
    }
  } catch (error) {
    console.log(error);
    mensajeCarga.innerHTML = error;
    contenedor.appendChild(mensajeCarga);
  }
}

//                                                                  PARTIAL RENDER DE TABLA

let tablaLinks = document.getElementsByClassName("tabla-page");
for (let i = 0; i < tablaLinks.length; i++) {
  tablaLinks[i].addEventListener("click", tablaPage);
}

async function tablaPage(event) {
  event.preventDefault();
  contenedor.appendChild(mensajeCarga);
  try {
    let response = await fetch("tabla.html");
    if (response.ok) {
      let contenido = await response.text();
      contenedor.innerHTML = contenido;

      let cervezas = [];
      let cervezasFiltradas = [];

      // contenido.addEventListener("onload", cargarTabla);
      cargarTabla();
      // setInterval(() => {
      //   cargarTabla();
      // }, 10000);

      async function cargarTabla() {
        let mensaje = document.getElementById("sin-cervezas");
        let table = document.querySelector("#tabla-comparacion");
        let filtroStockActivo = document.getElementById("en-stock-filtro")
          .checked;
        let filtroAlcoholActivo = document.getElementById("bajo-alcohol-filtro")
          .checked;
        console.log(filtroAlcoholActivo);
        console.log(filtroStockActivo);
        table.innerHTML = "";
        mensaje.innerHTML = "";

        try {
          let response = await fetch(
            "https://web-unicen.herokuapp.com/api/groups/58miguezvillabona/cervezas"
          );
          if (response.ok) {
            let data = await response.json();
            cervezas = data.cervezas;

            if (cervezas.length > 0) {
              let crearThead = document.createElement("THEAD");
              let crearTR = document.createElement("TR");

              let titulosThead = [
                "Cerveza",
                "Color",
                "% Alcohol",
                "IBU",
                "OG",
                "FG",
                "EDITAR/BORRAR",
              ];

              for (let i = 0; i < titulosThead.length; i++) {
                let nuevoTh = document.createElement("TH");
                nuevoTh.innerHTML = titulosThead[i];
                crearTR.appendChild(nuevoTh);
              }

              crearThead.appendChild(crearTR);

              table.appendChild(crearThead);

              let tableBody = table.createTBody();
              tableBody.id = "tabla-body";

              cervezasFiltradas = [...cervezas];

              if (filtroStockActivo) {
                cervezasFiltradas = cervezasFiltradas.filter(
                  (cerveza) => cerveza.thing.sinStock === false
                );
              }

              if (filtroAlcoholActivo) {
                cervezasFiltradas = cervezasFiltradas.filter(
                  (cerveza) => cerveza.thing.alcohol < 5
                );
              }

              for (let i = 0; i < cervezasFiltradas.length; i++) {
                let row = tableBody.insertRow();
                for (let key in cervezasFiltradas[i].thing) {
                  if (key !== "sinStock") {
                    let cell = row.insertCell();
                    if (key === "imageSrc") {
                      cell.innerHTML = `<img src=${cervezasFiltradas[i].thing[key]} alt=${cervezasFiltradas[i].thing.name} />`;
                    } else {
                      let inputEl = document.createElement("INPUT");
                      inputEl.classList.add("input-tabla-cervezas");
                      inputEl.value = cervezasFiltradas[i].thing[key];
                      cell.appendChild(inputEl);
                    }
                  }
                }
                let cell = row.insertCell();
                let divEl = document.createElement("DIV");
                divEl.classList.add("beer-buttons-div");
                let editButton = document.createElement("BUTTON");
                editButton.classList.add("table-button");
                editButton.innerHTML = "Editar";
                editButton.addEventListener("click", () =>
                  editar_cerveza(cervezasFiltradas[i]._id, i)
                );
                let deleteButton = document.createElement("BUTTON");
                deleteButton.classList.add("table-button");
                deleteButton.innerHTML = "Borrar";
                deleteButton.addEventListener("click", () =>
                  borrar_cerveza(cervezasFiltradas[i]._id)
                );
                divEl.appendChild(editButton);
                divEl.appendChild(deleteButton);
                cell.appendChild(divEl);
              }
            } else {
              mensaje.innerHTML = "No hay cervezas cargadas";
              switchDiv.classList.add("ocultar");
            }
          } else {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }

      /*async function agregar_1_cerveza(event) {
        event.preventDefault();

        let nuevaCerveza = {
          name: document.getElementById("beer-name").value,
          imageSrc: document.querySelector('input[name="cervezaImg"]:checked')
            .value,
          alcohol: document.getElementById("beer-alcohol").value,
          ibu: document.getElementById("beer-IBU").value,
          og: document.getElementById("beer-OG").value,
          fg: document.getElementById("beer-FG").value,
          sinStock: document.getElementById("sin-stock").checked,
        };
        let data = {
          thing: nuevaCerveza,
        };
        try {
          let response = await fetch(
            "https://web-unicen.herokuapp.com/api/groups/58miguezvillabona/cervezas",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );
          if (response.ok) {
            cargarTabla();
          }
        } catch (error) {
          console.log(error);
        }
      }

      async function restar_1_cerveza() {
        let response = await fetch(
          `https://web-unicen.herokuapp.com/api/groups/58miguezvillabona/cervezas/${
            cervezas[cervezas.length - 1]._id
          }`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: "",
          }
        );
        if (response.ok) {
          cargarTabla();
        }
      }

      async function agregar_3_cervezas(event) {
        let bucle_number = document.getElementById("bucle-number").value;

        for (let i = 0; i < bucle_number; i++) {
          await agregar_1_cerveza(event);
        }
      }

      async function resetear_cervezas() {
        for (let i = 0; i < cervezas.length; i++) {
          await fetch(
            `https://web-unicen.herokuapp.com/api/groups/58miguezvillabona/cervezas/${cervezas[i]._id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: "",
            }
          );
        }
        cargarTabla();
      }

      async function editar_cerveza(id, index) {
        let tableBody = document.querySelector("tbody");
        let filaEditada = tableBody.querySelectorAll("tr")[index];
        let inputsFilaEditada = filaEditada.querySelectorAll("input");
        console.log(inputsFilaEditada[0].value);
        let cervezaEditada = {
          name: inputsFilaEditada[0].value,
          imageSrc: cervezasFiltradas[index].thing.imageSrc,
          alcohol: inputsFilaEditada[1].value,
          ibu: inputsFilaEditada[2].value,
          og: inputsFilaEditada[3].value,
          fg: inputsFilaEditada[4].value,
          sinStock: cervezasFiltradas[index].thing.sinStock,
        };
        let response = await fetch(
          `https://web-unicen.herokuapp.com/api/groups/58miguezvillabona/cervezas/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ thing: cervezaEditada }),
          }
        );
        if (response.ok) {
          cargarTabla();
        }
      }

      async function borrar_cerveza(id) {
        let response = await fetch(
          `https://web-unicen.herokuapp.com/api/groups/58miguezvillabona/cervezas/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          cargarTabla();
        }
      }

      document
        .getElementById("sumar-button")
        .addEventListener("click", agregar_1_cerveza);
      document
        .getElementById("restar-button")
        .addEventListener("click", restar_1_cerveza);
      document
        .getElementById("sumar-bucle-button")
        .addEventListener("click", agregar_3_cervezas);
      document
        .getElementById("reset-button")
        .addEventListener("click", resetear_cervezas);*/
      document
        .getElementById("en-stock-filtro")
        .addEventListener("click", cargarTabla);
      document
        .getElementById("bajo-alcohol-filtro")
        .addEventListener("click", cargarTabla);
    } else {
      console.log(response.status);
      mensajeCarga.innerHTML = "Error " + response.status;
      contenedor.appendChild(mensajeCarga);
    }
  } catch (error) {
    console.log(error);
    mensajeCarga.innerHTML = error;
    contenedor.appendChild(mensajeCarga);
  }
}

//                                                                  PARTIAL RENDER DE CONTACTO

let contactLinks = document.getElementsByClassName("contact-page");
for (let i = 0; i < contactLinks.length; i++) {
  contactLinks[i].addEventListener("click", contactPage);
}

async function contactPage(event) {
  event.preventDefault();
  contenedor.appendChild(mensajeCarga);
  try {
    let response = await fetch("contact.html");
    if (response.ok) {
      let contenido = await response.text();
      contenedor.innerHTML = contenido;
      setTimeout(function () {
        generateCaptcha();
      }, 0);
      contenedor
        .querySelector("#submit-button")
        .addEventListener("click", validateCaptcha);
      function generateCaptcha() {
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let letters = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "ñ",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "Ñ",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        let captchaValue = `${letters[Math.floor(Math.random(0, 1) * 28)]} ${
          numbers[Math.floor(Math.random(0, 1) * 10)]
        } ${letters[Math.floor(Math.random(0, 1) * 28)]} ${
          numbers[Math.floor(Math.random(0, 1) * 10)]
        } ${letters[Math.floor(Math.random(0, 1) * 28)]}`;
        contenedor.querySelector("#captcha-box").innerHTML = captchaValue;
      }

      function validateCaptcha(event) {
        event.preventDefault();
        let captcha = contenedor
          .querySelector("#captcha-box")
          .innerHTML.replace(/ /g, "");
        let captchaAnswer = contenedor.querySelector("#captcha-answer").value;
        let errorMessage = contenedor.querySelector("#error-message");
        if (captcha === captchaAnswer) {
          errorMessage.classList.remove("show");
          contenedor.querySelector("#contact-form").reset();
          generateCaptcha();
        } else errorMessage.classList.add("show");
      }
    } else {
      console.log(response.status);
      mensajeCarga.innerHTML = "Error " + response.status;
      contenedor.appendChild(mensajeCarga);
    }
  } catch (error) {
    console.log(error);
    mensajeCarga.innerHTML = error;
    contenedor.appendChild(mensajeCarga);
  }
}
