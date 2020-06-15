

//#region Tables Keys

const userTable = "TbUser";

//#endregion

const userSessionKey = "UserSession";

//#region Controllers

var userController;

//#endregion

$(document).ready(function () {

    //#region Setting Controllers

    userController = new UserController(userTable, userSessionKey);

    //#endregion

    //Add dev test values
    localStorage.setItem(userTable, JSON.stringify([
        new User("Felipe", "felipeltertuliano@gmail.com", "123456", 1)
    ]));

    //Verify if the current page is not the login page
    if (!window.location.pathname.endsWith("index.html")) {

        if (userController.isLoggedIn()) {
            userLoggedEnvironment();
        } else {
            window.location.href = "index.html";
        }
    }
    else userController.logout();
});

function userLoggedEnvironment() {
    const loggedUser = userController.getLoggedUser()

    $("#pageHeader > .menu-toggle").click(function () {
        $('#menu').animate({ width: 'toggle' });
    });

    $("#profileName").text(loggedUser.nome);
}