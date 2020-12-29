import React, { useState } from 'react'

const AddCurrencyForm = props => {
	const initialFormState = { name: '',  base: '', rate: '', time: '' }
	const [ currency, setCurrency ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setCurrency({ ...currency, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!currency.name || !currency.base) return

				props.addCurrency(currency)
				setCurrency(initialFormState)
			}}
		>
			<label>currency</label>
			<input type="text" name="name" value={currency.name} onChange={handleInputChange} />
			<label>Base</label>
			<input type="text" name="base" value={currency.base} onChange={handleInputChange} />
			<button>Add new currency</button>
			
		</form>
	)
}

export default AddCurrencyForm