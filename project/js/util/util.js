/// <summary>
/// Chack if an email is valid
/// </summary>
/// <param name="email">a email</param>
/// <returns>a boolean result</returns>
function validEmail(email) {
    return typeof email == 'string'? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) : false;
}