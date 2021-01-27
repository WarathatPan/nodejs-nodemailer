/**
 * 
 * @param input Input
 * @param requiredFields String array of required field
 * @return Result { isValid: boolean, invalidFields: String[] } 
 * @usage inputValidator(input, ['name', 'otherRequiredField'])
 */
function inputValidator(input, requiredFields) {
    if (!input || !requiredFields) {
        throw new Error(`input and requiredFields must be provided`)
    }

    const inputFields = Object.keys(input)

    const emptyFields = inputFields.filter(field => !input[field])
    const isAnyEmptyField = emptyFields.length > 0

    if (isAnyEmptyField) {
        return {
            isValid: false,
            invalidFields: emptyFields
        }
    }


    const missingFields = requiredFields.filter(field => !inputFields.includes(field))
    const isAnyMissingFields = missingFields.length > 0

    if (isAnyMissingFields) {
        return {
            isValid: false,
            invalidFields: missingFields
        }
    }

    return {
        isValid: true
    }
}

module.exports = inputValidator