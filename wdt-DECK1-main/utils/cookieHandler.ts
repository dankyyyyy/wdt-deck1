export function setCookie(name: string, value: any, days: number = 7): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${JSON.stringify(value)};${expires};path=/`;
  }
  
  export function getCookie(name: string): any | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
  
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length));
    }
  
    return null;
  }
  