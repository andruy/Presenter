import { useState, useEffect, useRef } from "react"

const Folder = ({ sendDataToParent, sendOnPageLoad, responseFromParent, updateResponse, idSuffix }) => {

    useEffect(() => {
        const theFunction = {
            async send(data) {
                const response = await fetch('/newDirectory', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (response.ok) {
                    const result = await response.json()
                    console.log(result.report)
                    return result
                } else {
                    console.error(response)
                    console.log(data)
                    return "Something went wrong"
                }
            }
        }
        sendOnPageLoad(theFunction)
    }, [])
}

export default Folder
