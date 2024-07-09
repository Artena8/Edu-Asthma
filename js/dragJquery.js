$(document).ready(function(){
    const $draggableElems = $(".draggable");
    const $droppableElems = $(".droppable");
    const $ModalWhyForm = $("#why-form");
    const $CorrectionMessage = $("#correction");

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
                $(this)[0].innerHTML = "";
                $(this).css("backgroundColor", "white");
                $(this).attr("data-actual-item","");
            }
        });
        $("#reset-btn").css("display","none");
    }

    window.verifyResponse = function(){
        console.log("Questions");
    };
});