("use strict");

document.addEventListener("DOMContentLoaded", cargarTabla);

async function cargarTabla() {
  let mensaje = document.getElementById("sin-cervezas");
  let table = document.querySelector("#tabla-comparacion");
  let switchDiv = document.getElementById("stock-switch");
  table.innerHTML = "";
  mensaje.innerHTML = "";
  switchDiv.classList.remove("ocultar");
  let cervezas = [];

  try {
    let response = await fetch(
      "https://web-unicen.herokuapp.com/api/groups/58miguezvillabona/cervezas"
    );
    if (response.ok) {
      let data = await response.json();
      data.cervezas.forEach((el) => {
        cervezas.push(el);
      });
      if (cervezas.length > 0) {
        let crearThead = document.createElement("THEAD");
        let crearTR = document.createElement("TR");

        let titulosThead = ["Cerveza", "Color", "Alcohol", "IBU", "OG", "FG"];

        for (let i = 0; i < titulosThead.length; i++) {
          let nuevoTh = document.createElement("TH");
          nuevoTh.innerHTML = titulosThead[i];
          crearTR.appendChild(nuevoTh);
        }

        crearThead.appendChild(crearTR);

        table.appendChild(crearThead);

        let tableBody = table.createTBody();
        tableBody.id = "tabla-body";

        for (let i = 0; i < cervezas.length; i++) {
          let row = tableBody.insertRow();
          if (cervezas[i].thing.sinStock === false) {
            row.classList.add("en_stock");
          }
          for (key in cervezas[i].thing) {
            if (key !== "sinStock") {
              let cell = row.insertCell();
              if (key === "imageSrc") {
                cell.innerHTML = `<img src=${cervezas[i].thing[key]} alt=${cervezas[i].thing.name} />`;
              } else {
                cell.innerHTML = cervezas[i].thing[key];
              }
            }
          }
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

let limpiarForm = () => {
  let form = document.querySelector("#tabla-comparacion");
  let inputs = form.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
};

async function agregar_1_cerveza() {
  event.preventDefault();

  let nuevaCerveza = {
    name: document.getElementById("beer-name").value,
    imageSrc: document.querySelector('input[name="cervezaImg"]:checked').value,
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
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
}

function restar_1_cerveza() {
  cervezas.pop();
  cargarTabla();
}

function agregar_3_cervezas() {
  let bucle_number = document.getElementById("bucle-number").value;

  for (let i = 0; i < bucle_number; i++) {
    agregar_1_cerveza();
  }
  //limpiarForm();
}

function resetear_cervezas() {
  cervezas = [];
  cargarTabla();
}

function filtrar_cervezas() {
  let switchButton = document.getElementById("mostrar-stock");
  let cervezas_en_stock = document.querySelectorAll(".en_stock");
  if (switchButton.checked) {
    for (let i = 0; i < cervezas_en_stock.length; i++) {
      cervezas_en_stock[i].classList.add("en_stock", "mostrar");
    }
  } else {
    for (let i = 0; i < cervezas_en_stock.length; i++) {
      cervezas_en_stock[i].classList.remove("mostrar");
    }
  }
}

document.getElementById("sumar-button").addEventListener("click", agregar_1_cerveza);
document.getElementById("restar-button").addEventListener("click", restar_1_cerveza);
document.getElementById("sumar-bucle-button").addEventListener("click", agregar_3_cervezas);
document.getElementById("reset-button").addEventListener("click", resetear_cervezas);
document.getElementById("mostrar-stock").addEventListener("change", filtrar_cervezas);
