export async function usernameVerification(e) {
    // console.log(e.target.value);
    let username=e.target.value
    let error={}
    if (username.length<0) {
       return error.value='User Name must 4 char'
    }
    
}