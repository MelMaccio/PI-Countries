export default function validate(input){
    let errors = {}

    if(!input.name){
        errors.name = "A name is required"
    }
    if(input.name.length < 3 || input.name.length > 30){
        errors.name = "Length must be between 3 and 30 characters"
    }
    if(!/^[a-zA-Z ]*$/.test(input.name)){
        errors.name = "Letters only"
    }
    if(input.season !== 'summer' && input.season !== 'autumn' && input.season !== 'winter' && input.season !== 'spring' && input.season === ''){
        errors.season = "Select a season for this activity"
    }
    if(!input.countryIds[0]){
        errors.countryIds = "Select at least one country"
    }
    return errors;
}