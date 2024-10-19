// This is the base URL for the API. localhsot is only used for development purposes.
// const apiUrl = "http://localhost:5678"
let apiUrl = new URL(location.origin)
apiUrl.port = '5678';
apiUrl += 'api/'

let userId = sessionStorage.getItem("userId")
let token = sessionStorage.getItem("token")

/**
 * Checks the validity of the input form based on the given method and form data object.
 *
 * @param {string} method [method=get] - The method used for form submission.
 * @param {object} formDataObject - The form data object containing the input values.
 * @return {boolean} Returns true if the form is valid, false otherwise.
 */
function checkInputForm(method, formDataObject) {
    console.log("checkInputForm", method, formDataObject)
  switch (method) {
    case "get":
        return true
    case "login":
        for (var i of formDataObject.entries()) {
            if (i[1] == "") {
                return false
            }
        }
        return true
    case "post":
        if (userId && token) {
            for (var i of formDataObject.entries()) {
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
      console.log(`method argument not valid`, method)
      return false
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
