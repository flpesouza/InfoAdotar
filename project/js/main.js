

//#region Tables Keys

const userTable = "TbUser";
const faqTable = "TbFaq";

//#endregion

const userSessionKey = "UserSession";

//#region PublicVariables

var loggedUser;

//#region Controllers

var userController;
var faqController;

//#endregion

//#endregion

$(document).ready(function () {

    //#region Setting Controllers

    userController = new UserController(userTable, userSessionKey);

    //#endregion

    //Verify if the current page is not the login page
    if (!window.location.pathname.endsWith("index.html")) {

        if (userController.isLoggedIn()) {
            userLoggedEnvironment();
        } else {
            window.location.href = "index.html";
        }
    }
    else {
        userController.logout();
        setDevDataBase();
    }
});

function userLoggedEnvironment() {

    //#region Setting Controllers

    faqController = new FaqController(faqTable);

    //#endregion

    loggedUser = userController.getLoggedUser();

    $("#pageHeader > .menu-toggle").click(function () {
        $('#menu').animate({ width: 'toggle' });
    });

    $("#profileName").text(loggedUser.nome.split(" ")[0]);

    $(document).trigger("userLogged");
}

function setDevDataBase() {

    //#region Setting Controllers

    faqController = new FaqController(faqTable);

    //#endregion

    let countError = 0;

    $.getJSON("../js/devDataBase.json", function (data) {

        //Criando Usuários
        let createUsers = function () {
            data.TbUser.forEach(function (val) {
                userController.create(val, function () { }, function () { countError++; })
            });
        }

        userController.readAll(
            function (list) {
                if (list.length == 0) {
                    createUsers();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });


        //Criando Itens da FAQ
        let createFaq = function () {
            data.TbFaq.forEach(function (val) {
                faqController.create(val, function () { }, function () { countError++; })
            });
        }

        faqController.readAll(
            function (list) {
                if (list.length == 0) {
                    createFaq();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });
    }).done(function () {
        if (countError > 0) {
            alert("Ocorreram " + countError + " erro(s) na criação do banco de dados de teste");
        }
    });
}