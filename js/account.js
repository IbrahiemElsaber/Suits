let username = $("#usrName");
let email = $("#usrEmail");
let phone = $("#usrPhone");
let password = $("#usrPass");
let LoginForm = $("#LoginForm");
let RegisterForm = $("#RegisterForm");
let loginBtn = $("#loginBtn");
let regBtn = $("#regBtn");
let indicator = $("#indicator");
let userSessionObj = {};
let userSessionArr = [];

// Validate Form
function validateUserForm() {
  // return true;
  return (
    validateUserName(),
    validateUserEmail(),
    validateUserNumber(),
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
  // let Exp = /^(?=.{10})[a-z\d]*_?[a-z\d]+$/i;

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

regBtn.on("click", function () {
  RegisterForm.css("transform", "translateX(0px)");
  LoginForm.css("transform", "translateX(0px)");
  indicator.css("transform", "translateX(100px)");
});
loginBtn.on("click", function () {
  RegisterForm.css("transform", "translateX(300px)");
  LoginForm.css("transform", "translateX(300px)");
  indicator.css("transform", "translateX(0px)");
});

//Registration Form Submit
RegisterForm.on("submit", function (e) {
  e.preventDefault();
  if (validateUserForm()) {
    let obj = {
      userName: username.val(),
      userEmail: email.val(),
      userPhone: phone.val(),
      userPassword: password.val(),
    };

    if (localStorage.getItem("user")) {
      let arr = JSON.parse(localStorage.getItem("user"));
      for (let i = 0; i < arr.length; i++) {
        if (username.val() === arr[i].userName) {
          alert("User name is already exist try to login");
          username.val("");
          email.val("");
          phone.val("");
          password.val("");
          RegisterForm.css("transform", "translateX(300px)");
          LoginForm.css("transform", "translateX(300px)");
          indicator.css("transform", "translateX(0px)");
          break;
        } else if (email.val() === arr[i].userEmail) {
          alert("email is already exist try to login");
          username.val("");
          email.val("");
          phone.val("");
          password.val("");
          RegisterForm.css("transform", "translateX(300px)");
          LoginForm.css("transform", "translateX(300px)");
          indicator.css("transform", "translateX(0px)");
          break;
        } else  {
          arr.push(obj);
          localStorage.setItem("user", JSON.stringify(arr));
          // userSessionObj = {
          //   userName: username.val(),
          //   userPassword: password.val(),
          //   userEmail: email.val(),
          //   userPhone: phone.val(),
          // };
          // userSessionArr.push(userSessionObj);
          // sessionStorage.setItem("username", JSON.stringify(userSessionArr));
          RegisterForm.css("transform", "translateX(300px)");
          LoginForm.css("transform", "translateX(300px)");
          indicator.css("transform", "translateX(0px)");
          break;
        }
      }
    }
     else {
      e.preventDefault();
      let arr = [];
      arr.push(obj);
      localStorage.setItem("user", JSON.stringify(arr)); 
    //   userSessionObj = {
    //     userName: username.val(),
    //     userPassword: password.val(),
    //     userEmail: email.val(),
    //     userPhone: phone.val(),
    //   };
      
      // sessionStorage.setItem("userData", JSON.stringify(userSessionObj));
      RegisterForm.css("transform", "translateX(300px)");
      LoginForm.css("transform", "translateX(300px)");
      indicator.css("transform", "translateX(0px)");
      
    }
  }
});

//Login Submit

$("#loginSubmit").on("click", function (e) {
  let arr = JSON.parse(localStorage.getItem("user")),
    username = $("#LoginForm input[type='text']"),
    password = $("#LoginForm input[type='password']");
  for (let i = 0; i < arr.length; i++) {
    if (
      username.val() === arr[i].userName &&
      password.val() === arr[i].userPassword
    ) {
      userSessionObj = {
        userName1: username.val(),
        userPassword1: password.val(),
        userEmail1: email.val(),
        userPhone1: phone.val(),
      };
      userSessionArr.push(userSessionObj);
      sessionStorage.setItem("userData", JSON.stringify(userSessionArr));
      let arr2 = JSON.parse(sessionStorage.getItem('userData'));
      console.log(arr2[0].userName1)

      e.preventDefault();
      location.href = "./index.html";
      // history.go(-1);

      // break;
    } else if (username.val() !== arr[i].userName) {
      alert("The user with this username is not exist");
      e.preventDefault();

      // break;
    } else if (password.val() != arr[i].userPassword) {
      alert("Password isn't correct !");
      e.preventDefault();

      // break;
    }
  }
});
