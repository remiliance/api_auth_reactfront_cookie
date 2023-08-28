import React from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Delete_App extends React.Component {

  getCSRF2 = () => {
    return fetch("http://zoo.com:8000/auth_app/csrf/", {
      credentials: "include",
    })
    .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken");
      this.setState({csrf: csrfToken});
      console.log(csrfToken);
      return (csrfToken)
    })
    .catch((err) => {
      console.log(err);
    });
  }

   tiger_post = async () => {
   console.log(cookies.get("csrftoken"))
    fetch("http://zoo.com:8000/api/tiger/test_tiger_post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"X-CSRFToken": cookies.get("csrftoken"),
        "X-CSRFToken": await this.getCSRF2(),
      },
      credentials: "include",
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  render() {
    return (

      <div>Delete Zoo 🏡 {this.tiger_post()}</div>
    )
  }
  }

export default Delete_App;