$(document).ready(function(){
    let jsonobject;

    $.ajax({
        url: "./data/data.csv",
        async: false,
        success: function (csvd) {
            jsonobject = $.csv.toObjects(csvd);
        },
        dataType: "text"
    });

    console.log(jsonobject);

    function search(situation, name){
        let result = null;
        $.each(jsonobject, function(i, v) {
            if (v.item == name) {
                console.log(v.item);
                result = JSON.parse(JSON.stringify(v));
            }
        });
        return result;
    }

    const $draggableElems = $(".draggable");
    const $droppableElems = $(".droppable");
    const $ModalWhyForm = $("#why-form");
    const $CorrectionMessage = $("#correction");
    let lastDroppableElem;
    let quizz;

    $draggableElems.on("dragstart", function(event) {
        event.originalEvent.dataTransfer.setData("text", event.target.id);
        console.log(event.originalEvent.dataTransfer.getData("text"));
    });

    $droppableElems.on("dragenter", function(event) {
        $(this).addClass("droppable-hover");
    });

    $droppableElems.on("dragover", function(event) {
        event.preventDefault();
    });

    $droppableElems.on("dragleave", function(event) {
        $(this).removeClass("droppable-hover");
    });

    $droppableElems.on("drop", function(event) {
        event.preventDefault();

        console.log(event.originalEvent.dataTransfer.getData("text"));
        const draggableElemData = event.originalEvent.dataTransfer.getData("text");
        const $droppableElem = $(this);
        const $draggableElem = $("#" + draggableElemData);
    
        $droppableElem.css("backgroundColor", $draggableElem.css("backgroundColor"));
        $droppableElem.addClass("dropped");
        $droppableElem.attr("data-actual-item",draggableElemData);
        $droppableElem[0].innerHTML = $draggableElem[0].innerHTML;
        $draggableElem[0].innerHTML = "";

        $draggableElem.addClass("dragged");

        $ModalWhyForm[0].showModal();
        quizz = search('exo1',draggableElemData);
        if (quizz != null) {
            $("#question-text")[0].innerHTML = "Pourquoi avoir choisi " + quizz.item;
            $("#reponse1")[0].value = quizz.reponse1;
            $("#reponse2")[0].value = quizz.reponse2;
            $("#reponse3")[0].value = quizz.reponse3;
        }
        console.log($droppableElem.attr("data-draggable-id"));
        lastDroppableElem = $droppableElem;
    });

    window.verifyCards = function(){
        console.log("Submit");
        let text = "";
        let ret = true;
        $droppableElems.each(function() {
            if ($(this).attr('data-actual-item') == "") {
                alert("Veuillez remplir toutes les cases avant de valider");
                ret = false;
                return false;
            } else if ($(this).attr('data-actual-item') == $(this).attr('data-draggable-id')) {
                console.log("BON");
                text += " " + '<span class="bon">' + $(this).attr('data-actual-item') + '</span>' + ', ';
            } else {
                console.log("MAUVAIS");
                text += " " + '<span class="mauvais">' + $(this).attr('data-actual-item') + '</span> '+ ', ';
            }
        });
        if(ret) {
            $CorrectionMessage.html(text);
            $("#reset-btn").css("display","block");
        }
    };

    window.reset = function() {
        $droppableElems.each(function() {
            //console.log($(this).attr('data-actual-item'),$(this).attr('data-draggable-id'));
            if ($(this).attr('data-actual-item') != $(this).attr('data-draggable-id')) {
                let id = "";
                id = "#" + $(this).attr('data-actual-item') + "";
                $(".draggable-item").removeAttr('style');
                $(id).removeClass('dragged');
                $(this).removeClass("dropped");
                $(id)[0].innerHTML = $(this)[0].innerHTML;
                $(this)[0].innerHTML = "";
                $(this).css("backgroundColor", "white");
                $(this).attr("data-actual-item","");
            }
        });
        $("#reset-btn").css("display","none");
    }

    function reset(droppable){
        let stringID = '[data-draggable-id="' + droppable + '"]';
        let idDroppable = document.querySelectorAll(stringID);
        console.log(idDroppable[0].getAttribute('data-actual-item'));

        let idDraggable = "#" + idDroppable[0].getAttribute('data-actual-item') + "";
        $(".draggable-item").removeAttr('style');
        $(idDraggable).removeClass('dragged');
        idDroppable[0].classList.remove("dropped");
        $(idDraggable)[0].innerHTML = idDroppable[0].innerHTML;
        idDroppable[0].innerHTML = "";
        idDroppable[0].setAttribute("style", "background-color:white!important;");
        idDroppable[0].setAttribute("data-actual-item","");
    }


    window.verifyResponse = function(reponseNumber){
        console.log(quizz.numeroreponse,reponseNumber);
        if (parseInt(quizz.numeroreponse) == parseInt(reponseNumber)){
            $("#explications").css('color','green');
        } else {
            $("#explications").css('color','red');
        }
        switch(reponseNumber) {
            case 1 : $("#explications")[0].innerHTML = quizz.pourquoireponse1; break;
            case 2 : $("#explications")[0].innerHTML = quizz.pourquoireponse2; break;
            case 3 : $("#explications")[0].innerHTML = quizz.pourquoireponse3; break;
        }
        $("#accept-btn").css("display","block");
    };

    window.closeModal = function(){
        $ModalWhyForm[0].close();
        $("#accept-btn").css("display","none");
        $("#explications")[0].innerHTML = "";
    };

    window.returnModal = function(){
        $ModalWhyForm[0].close();
        reset(lastDroppableElem.attr("data-draggable-id"));
    };
});
