$("#y-val").on("input", function () {
    let val = parseInt(this.value);
    if (checkY(val)) {
        this.style.background = "rgba(0, 200, 0, 0.7)";
    } else {
        if (isNaN(val)) {
            this.style.background = "rgba(154,148,148,0.43)";
        } else {
            this.style.background = "rgba(200, 0, 0, 0.7)";
        }
    }
});

$("#r-val").on("input", function () {
    let val = parseInt(this.value);
    if (checkR(val)) {
        this.style.background = "rgba(0, 200, 0, 0.7)";
    } else {
        if (isNaN(val)) {
            this.style.background = "rgba(154,148,148,0.43)";
        } else {
            this.style.background = "rgba(200, 0, 0, 0.7)";
        }
    }
});

$("#submit").click(function () {
    console.log("click");
    const X = parseInt($(".x-radio:checked").val());
    const Y = parseInt($("#y-val").val());
    const R = parseInt($("#r-val").val());

    ajax: {
        if (isNaN(Y) || !checkY(Y)) break ajax;
        if (isNaN(R) || !checkR(R)) break ajax;
        console.log("go");
        $.ajax({
                url: './php/find.php',
                method: 'post',
                dataType: 'json',
                data: {
                    x: X,
                    y: Y,
                    r: R,
                    timezone: new Date().getTimezoneOffset()
                },
                success: function (record) {
                    console.log("ok");
                    addtable(record);
                    console.log(record.cords);
                }
        });
    }
});

function checkY(n) {
    return (n >= -3 && n <= 3);
}
function checkR(n) {
    return (n >= 1 && n <= 4);
}

function addtable(record){
    let table = $("#res-tb tbody");
    table.append(`
                                  <tr class="res">
                                  <td>${record.cords}</td>
                                  <td>${record.time}</td>
                                  <td>${record.exec}</td>
                                  <td>${record.result}</td>
                                </tr>  
                    `);
}