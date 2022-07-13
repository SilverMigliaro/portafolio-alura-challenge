const contacto = document.getElementById("contacto__form");
const inputs = document.querySelectorAll("#contacto__form input,textarea");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  asunto: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
  mensaje: /^[a-zA-ZÀ-ÿ\s]{1,300}$/,
};

const campos = {
  nombre: false,
  email: false,
  asunto: false,
  mensaje: false,
};

const mensajesDeError = {
  nombre:
    "El nombre debe tener un máximo de 50 caracteres y no debe contener simbolos especiales",
  email: "El correo no es valido",
  asunto:
    "El campo asunto debe tener un máximo de 50 caracteres y no debe contener simbolos especiales",
  mensaje:
    "El campo mensaje debe tener un máximo de 300 caracteresy no debe contener simbolos especiales",
};

function mostrarMensajeDeError(input, campo) {
  let mensaje = "";
  if (input.value.length === 0) {
    mensaje = `El campo ${campo} no puede estar vacio`;
  } else {
    mensaje = mensajesDeError[campo];
  }
  return mensaje;
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "asunto":
      validarCampo(expresiones.asunto, e.target, "asunto");
      break;
    case "mensaje":
      validarCampo(expresiones.mensaje, e.target, "mensaje");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`contacto__${campo}`)
      .classList.remove("contacto__container-incorrecto");
    document
      .getElementById(`contacto__${campo}`)
      .classList.add("contacto__container-correcto");
    document
      .querySelector(`#contacto__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#contacto__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#contacto__${campo} .contacto__input-error`)
      .classList.remove("contacto__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`contacto__${campo}`)
      .classList.add("contacto__container-incorrecto");
    document
      .getElementById(`contacto__${campo}`)
      .classList.remove("contacto__container-correcto");
    document
      .querySelector(`#contacto__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#contacto__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#contacto__${campo} .contacto__input-error`)
      .classList.add("contacto__input-error-activo");
    document.querySelector(
      `#contacto__${campo} .contacto__input-error`
    ).innerHTML = mostrarMensajeDeError(input, campo);
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

contacto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (campos.nombre && campos.email && campos.asunto && campos.mensaje) {
    contacto.reset();

    document
      .getElementById("contacto__mensaje-error")
      .classList.remove("contacto__mensaje-error-activo");
    document
      .getElementById("contacto__mensaje-exito")
      .classList.add("contacto__mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("contacto__mensaje-exito")
        .classList.remove("contacto__mensaje-exito-activo");
    }, 5000);

    document
      .querySelectorAll(".contacto__container-correcto")
      .forEach((icono) => {
        icono.classList.remove("contacto__container-correcto");
      });
  } else {
    document
      .getElementById("contacto__mensaje-error")
      .classList.add("contacto__mensaje-error-activo");
  }
});
