


export const appConfiguration = {
    dateOptions: getDateSettings(),
    dateOptionsMinToday: getDateSettingsWitnMinDate(),
    timeOptions: getTimeSettings(),
    patternValidations: getPatternValidations()
};

//  TODO => get configurations settings from the logged user,
//          then set configurations based on language, etc.

function getDateSettings() {
    //  retrieve configurations...
    return {
        'monthsFull': [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        'monthsShort': [
            'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ],
        'weekdaysFull': ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        'weekdaysShort': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],

        'clear': 'Limpar', // Clear button text
        'close': 'Ok',     // Ok button text
        'today': 'Hoje',   // Today button text
        'closeOnClear': false,
        'closeOnSelect': true,
        'format': 'dd/mm/yyyy',  // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
        'formatSubmit': 'yyyy-mm-dd', // Return value format (used to set/get value)
        // 'onClose': () => alert('Close has been invoked.'),
        // 'onOpen': () => alert('Open has been invoked.'),
        'selectMonths': true,  // Creates a dropdown to control month
        'selectYears': 10,      // Creates a dropdown of 10 years to control year
    }
}

function getDateSettingsWitnMinDate() {
    //  retrieve configurations...
    return {
        'monthsFull': [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        'monthsShort': [
            'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ],
        'weekdaysFull': ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        'weekdaysShort': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],

        'clear': 'Limpar', // Clear button text
        'close': 'Ok',     // Ok button text
        'today': 'Hoje',   // Today button text
        'closeOnClear': false,
        'closeOnSelect': true,
        'format': 'dd/mm/yyyy',  // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
        'formatSubmit': 'yyyy-mm-dd', // Return value format (used to set/get value)
        // 'onClose': () => alert('Close has been invoked.'),
        // 'onOpen': () => alert('Open has been invoked.'),
        'selectMonths': true,  // Creates a dropdown to control month
        'selectYears': 10,      // Creates a dropdown of 10 years to control year
        'min': new Date() //Minimal date to select
    }
}

function getTimeSettings() {
    //  retrieve configurations...
    return {
        'default': 'now', // Set default time: 'now', '1:30AM', '16:30'
        'fromnow': 0,       // set default time to * milliseconds from now (using with default = 'now')
        'twelvehour': false, // Use AM/PM or 24-hour format
        'donetext': 'OK', // text for done-button
        'cleartext': 'Limpar', // text for clear-button
        'canceltext': 'Cancelar', // Text for cancel-button
        'autoclose': false, // automatic close timepicker
        'ampmclickable': true, // make AM PM clickable
        // 'aftershow': () => alert('AfterShow has been invoked.'), // function for after opening timepicker
    }
}


function getPatternValidations() {
    return {
        'email': "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
    }
}

