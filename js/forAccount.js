export let username = $("#usrName");
export let email = $("#usrEmail");
export let phone = $("#usrPhone");
export let password = $("#usrPass");
export let LoginForm = $("#LoginForm");
export let RegisterForm = $("#RegisterForm");
export let loginBtn = $("#loginBtn");
export let regBtn = $("#regBtn");
export let indicator = $("#indicator");
export let userSessionObj = {};

// Validate Form
function validateUserForm() {
  return (
    validateUserName() &&
    validateUserEmail() &&
    validateUserNumber() &&
    validateUserPassword()
  );
}
function validateUserName() {
  if (checkIfEmpty(username)) return;
  if (checkIfOnlyLetterAndNumbers(username)) return;
  if (!meetLength(username, 10)) return;
  return true;
}
function validateUserEmail() {
  if (checkIfEmpty(email)) return;
  if (!complexFormat(email, 5)) return;
  return true;
}

function validateUserPassword() {
  if (checkIfEmpty(password)) return;
  if (!complexFormat(password, 2)) return;
  return true;
}
function validateUserNumber() {
  if (checkIfEmpty(phone)) return;
  if (meetNumbersOnly(phone)) return;
  return true;
}
function checkIfEmpty(field) {
  if (isEmpty($.trim(field.val()))) {
    setInvalid($(field), ` ${$(field).attr("name")} must not empty`);
    return true;
  } else {
    setValid(field);
    return false;
  }
}
function isEmpty(value) {
  if (value === "") return true;
  return false;
}

function setInvalid(field, message) {
  field.next().css("display", "block");
  field.next().html(message);
  field.next().css("color", "red");
  // field.next().css("background","red");
}

function setValid(field) {
  field.next().css("display", "none");
}
function checkIfOnlyLetterAndNumbers(field) {
  let Exp = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;

  if (!Exp.test(field.val())) {
    setInvalid(
      field,
      ` ${field.attr("name")} must  contain only numbers and characters`
    );
    return false;
  } else {
    setValid(field);
    return true;
  }
}

function meetLength(field, min) {
  if (field.val().length > 10) {
    setValid(field);
    return true;
  } else {
    setInvalid(
      field,
      ` ${field.attr("name")} must be greater than 10 letters `
    );
    return false;
  }
}

function meetNumbersOnly(field) {
  if (isNaN(field.val())) {
    setInvalid(field, ` ${field.attr("name")} must be numbers only`);
    return false;
  } else {
    setValid(field);
  }
}

function complexFormat(field, code) {
  let regEx;
  switch (code) {
    case 1:
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, "Must contain at least one letter");
    case 2:
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one letter and one number"
      );
    case 3:
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter and one number"
      );
    case 4:
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter, one number and one special character"
      );
    case 5:
      regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return matchWithRegEx(
        regEx,
        field,
        "Must be a valid format email address"
      );
    default:
      return false;
  }
}

function matchWithRegEx(regEx, field, message) {
  if (regEx.test(field.val())) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let r = regBtn.on("click", function () {
  RegisterForm.css("transform", "translateX(0px)");
  LoginForm.css("transform", "translateX(0px)");
  indicator.css("transform", "translateX(100px)");
});
export let rr = loginBtn.on("click", function () {
  RegisterForm.css("transform", "translateX(300px)");
  LoginForm.css("transform", "translateX(300px)");
  indicator.css("transform", "translateX(0px)");
});

//Registration Form Submit
export let rrr = RegisterForm.on("submit", function (e) {
  e.preventDefault();
  if (validateUserForm()) {
    let obj = {
      userName: username.val(),
      userEmail: email.val(),
      userPhone: phone.val(),
      userPassword: password.val(),
    };
    let users = JSON.parse(localStorage.getItem("user")) || [];
    const ifUSerExists = users.find(function (user) {
      if (user.userName === obj.userName || user.userEmail === obj.userEmail) {
        return true;
      }
    });
    if (ifUSerExists) {
      alert("User Name or User Email is already exist try to login");
      RegisterForm.css("transform", "translateX(300px)");
      LoginForm.css("transform", "translateX(300px)");
      indicator.css("transform", "translateX(0px)");
    } else {
      users.push(obj);
      localStorage.setItem("user", JSON.stringify(users));
      // localStorage.setItem("user", JSON.stringify(arr));
      RegisterForm.css("transform", "translateX(300px)");
      LoginForm.css("transform", "translateX(300px)");
      indicator.css("transform", "translateX(0px)");
    }
  }
});

export let loginSubmitBtn = $("#loginSubmit").on("click", function (e) {
  e.preventDefault();
  (username = $("#LoginForm input[type='text']")),
    (password = $("#LoginForm input[type='password']"));

  let loggedInUsers = JSON.parse(localStorage.getItem("user")) || [];
  const ifLoggedUSerExists = loggedInUsers.find(function (user) {
    if (username.val() === "" || password.val() === "") {
      alert("Enter Your user name and password");
    }

    if (
      username.val() === user.userName &&
      password.val() === user.userPassword
    ) {
      return true;
    }
  });
  if (ifLoggedUSerExists) {
    userSessionObj = {
      userName1: username.val(),
      userPassword1: password.val(),
    };
    sessionStorage.setItem("userData", JSON.stringify(userSessionObj));
    window.location.href = "./index.html";
  } else {
    alert("wrong username or password");
  }
});
