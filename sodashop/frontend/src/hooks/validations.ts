export const validationEmail = (email: string) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
        return true;
    }
    
    return false;
}

export const validationPhone = (phone: string) => {
    let re = /[+][7]\d{10}/g;

    if (re.test(phone) && phone.length == 12) {
        return true;
    }
    
    return false;
}

