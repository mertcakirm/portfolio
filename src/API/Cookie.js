export const setCookie=(name, value, days)=>{
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

export const getCookie=(name)=>{
    let nameEQ = name + "=";
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookies[i].substring(nameEQ.length));
        }
    }
    return null;
}

export const deleteCookie=(name)=>{
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

