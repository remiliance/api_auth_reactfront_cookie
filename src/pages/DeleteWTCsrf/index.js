import React from "react";
import { useState, useEffect } from 'react'


function Delete_App() {
    useEffect(() => {

    async function callApi() {
     const response = await fetch("http://zoo.com:8000/api/tigernoscrf/test_tiger_post_nocsrf/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"X-CSRFToken": cookies.get("csrftoken"),
        //"X-CSRFToken": await this.getCSRF2(),
      },
      credentials: "include",
    })
    const data = await response.json()
    console.log(data)
    }
    callApi()
    }, [])
  return <div>Delete Zoo 🏡</div>
    }
export default Delete_App