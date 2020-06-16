$(document).on("userLogged", function () {
    faqController.readAll(
        function (list) {
            list.forEach(function (val) {
                $("#faqCard > .card-body").append(faqController.createFaqQuestionCard(val));
            });
        },
        function (msg) {
            alert("Erro ao buscar items da FAQ: " + msg);
        });

    $("#faqPesquisaDiv button").click(function () {
        $("#faqCard > .card-body")
            .children()
            .hide()
            .toArray()
            .forEach(function (v) {
                let jv = $(v);
                if( jv.text().toLowerCase().includes(
                    $("#faqPesquisaDiv input").val()
                ))
                jv.show();
            });
    });
});