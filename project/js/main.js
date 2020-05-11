$(document).ready(function () {
    menuToggleScript();
});

const menu = "#menu";
const menuToggle = "#menu-toggle";
const menuProfile = "#menu-profile";
const menuNav = "#menu-nav";
const notificationsSummary = "#notifications-summary";


//#region #menu-toggle
function menuToggleScript() {
    $(menuToggle).click(function () {
        $(`${menu} > *:not(${menuToggle})`).toggle();
    });
}
//#endregion