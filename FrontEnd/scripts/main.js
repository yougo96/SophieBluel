const apiUrl = "http://localhost:5678/api/"

let userId = sessionStorage.getItem("userId")
let token = sessionStorage.getItem("token")

function checkInputForm(method, formDataObject) {
    console.log("checkInputForm", method, formDataObject)
  switch (method) {
    case "get":
        return true
    case "login":
        for (var i of formDataObject.entries()) {
            console.log(i)
            if (i[1] == "") {
                return false
            }
        }
        return true
    case "post":
        if (userId && token) {
            for (var i of formDataObject.entries()) {
                console.log(i)
                if (i[1] == "") {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    case "delete":
        if (userId && token) {
            return true
        } else {
            return false
          }
    case "put":
        if (userId && token) {
            return true
        } else {
            return false
        }      
    default:
      console.log(`method not valid`, method)
  }
}

function checkValidityForm(event) {
  if (event.currentTarget.reportValidity() === true) {
    console.log("form valid")
    event.currentTarget
      .querySelector('[type="submit"]')
      .setAttribute("role", "")
  } else {
    console.log("form not valid");
    event.currentTarget
      .querySelector('[type="submit"]')
      .setAttribute("role", "alert")
  }
}

document.querySelectorAll("form").forEach(
    (i) => i.addEventListener("change", checkValidityForm)
)
