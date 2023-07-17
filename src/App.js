import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      csrf: "",
      username: "",
      password: "",
      error: "",
      isAuthenticated: false,
    };
  }

  componentDidMount = () => {
    this.getSession();
  }

  getCSRF = () => {
    fetch("http://zoo.com:8000/auth_app/csrf/", {
      credentials: "include",
    })
    .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken");
      this.setState({csrf: csrfToken});
      console.log(csrfToken);
    })
    .catch((err) => {
      console.log(err);
    });
  }

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

  getSession = () => {
    fetch("http://zoo.com:8000/auth_app/session/", {
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.isAuthenticated) {
        this.setState({isAuthenticated: true});
      } else {
        this.setState({isAuthenticated: false});
        this.getCSRF();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  whoami = () => {
    fetch("http://zoo.com:8000/auth_app/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("You are logged in as: " + data.username);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleUserNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  login = (event) => {
    event.preventDefault();
    fetch("http://zoo.com:8000/auth_app/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrf,
      },
      credentials: "include",
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: true, username: "", password: "", error: ""});
    })
    .catch((err) => {
      console.log(err);
      this.setState({error: "Wrong username or password."});
    });
  }

  logout = () => {
    fetch("http://zoo.com:8000/auth_app/logout", {
      credentials: "include",
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: false});
      this.getCSRF();
    })
    .catch((err) => {
      console.log(err);
    });
  };

   tiger = () => {
    fetch("http://zoo.com:8000/api/tiger/test_tiger", {
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

   tiger_post = async () => {
    fetch("http://zoo.com:8000/api/tiger/test_tiger_post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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


  lion = () => {
    fetch("http://zoo.com:9000/api/lion/test_lion", {
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

  lion_post = async () => {
    fetch("http://zoo.com:9000/api/lion/test_lion_post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    if (!this.state.isAuthenticated) {
      return (
        <div className="container mt-3">
          <h1>React Cookie Auth</h1>
          <br />
          <button className="btn btn-primary mr-3" onClick={this.tiger}>GET_Tiger_8000</button>
          <button className="btn btn-primary mr-3" style = {{backgroundColor:'green'}} onClick={this.tiger_post}>POST_Tiger_8000</button>
          <button className="btn btn-primary mr-3" onClick={this.lion}>GET_Lion_9000</button>
          <button className="btn btn-primary mr-3" style = {{backgroundColor:'green'}} onClick={this.lion_post}>POST_Lion_9000</button>
          <h2>Login</h2>
          <form onSubmit={this.login}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
              <div>
                {this.state.error &&
                  <small className="text-danger">
                    {this.state.error}
                  </small>
                }
              </div>
            </div>
            <button type="submit" style = {{backgroundColor:'#ff5c5c'}} className="btn btn-primary">Login_8000</button>
          </form>
        </div>
      );
    }
    return (
      <div className="container mt-3">
        <h1>React Cookie Auth</h1>
        <p>You are logged in!</p>
        <button className="btn btn-primary mr-2" style = {{backgroundColor:'#ff5c5c'}} onClick={this.whoami}>WhoAmI_8000</button>
        <button className="btn btn-primary mr-3" style = {{backgroundColor:'#ff5c5c'}} onClick={this.logout}>Log out_8000</button>
        <button className="btn btn-primary mr-3"  onClick={this.tiger}>GET_Tiger_8000</button>
          <button className="btn btn-primary mr-3" style = {{backgroundColor:'green'}} onClick={this.tiger_post}>POST_Tiger_8000</button>
        <button className="btn btn-primary mr-3" onClick={this.lion}>GET_Lion_9000</button>
        <button className="btn btn-primary mr-3" style = {{backgroundColor:'green'}} onClick={this.lion_post}>POST_Lion_9000</button>
      </div>
    )
  }
}

export default App;