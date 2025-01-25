import { useState, useEffect } from "react"

const Pollo = ({ sendDataToParent, sendOnPageLoad, responseFromParent, updateResponse }) => {
    const [inputValue, setInputValue] = useState("")
    const [mealSelectValue, setMealSelectValue] = useState("")
    const [typeSelectValue, setTypeSelectValue] = useState("")

    useEffect(() => {
        const theFunction = {
            async send(theBody) {
                const response = await fetch('/deletetask', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(theBody)
                })
                if (response.ok) {
                    const result = await response.json()
                    console.log(result.report)
                    return result
                } else {
                    console.error(response)
                    console.log(theBody)
                    return "Something went wrong"
                }
            }
        }
        sendOnPageLoad(theFunction)
    }, [])

    const handleChange = event => {
        setInputValue(event.target.value)
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleAddBody()
        }
    }

    const handleMealSelectChange = event => {
        setMealSelectValue(event.target.value)
    }

    const handleTypeSelectChange = event => {
        setTypeSelectValue(event.target.value)
    }

    const handleAddBody = () => {
        if (inputValue && mealSelectValue && typeSelectValue) {
            setInputValue('')
            sendDataToParent({
                    code: inputValue,
                    meal: mealSelectValue,
                    type: typeSelectValue
                }
            )
        }
    }

    return (
        <>
            <input value={inputValue} onKeyDown={handleKeyDown} onChange={handleChange} className="form-control form-control-lg mb-3" type="number" inputMode="numeric" pattern="\d*" placeholder="Enter code" />
            <select value={mealSelectValue} onChange={handleMealSelectChange} className="form-select form-select-lg mb-3" aria-label="Example select with button addon">
                <option value="Chicken Platter">Chicken Platter</option>
                <option value="TropiChop">TropiChop</option>
                <option value="Whole Chicken Family Meal">Whole Chicken Family Meal</option>
                <option value="Wrap/Sandwich">Wrap/Sandwich</option>
                <option value="Salad">Salad</option>
                <option value="Mojo Pork Platter">Mojo Pork Platter</option>
                <option value="Master Trio Platter">Master Trio Platter</option>
            </select>
            <select value={typeSelectValue} onChange={handleTypeSelectChange} className="form-select form-select-lg" aria-label="Example select with button addon">
                <option value="Dine-In">Dine-In</option>
                <option value="To-go">To-go</option>
            </select>
        </>
    )
}

export default Pollo
