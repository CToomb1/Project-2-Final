
$('#emp-submit').on('click', function (event) {
    event.preventDefault();

    // A function for getting all notes from the db
    const getEmp = function () {
        return $.ajax({
            url: "/api/emp",
            method: "GET"
        });
    };
    const getShifts = function () {
        return $.ajax({
            url: "/api/shifts",
            method: "GET"
        });
    };

    // A function for saving a note to the db
    const saveShift = function (shift) {
        return $.ajax({
            url: "/api/shifts",
            data: shift,
            method: "POST"
        });
    };
    const saveEmp = function (emp) {
        return $.ajax({
            url: "/api/emp",
            data: emp,
            method: "POST"
        });
    };

    // A function for deleting a note from the db
    const deleteShifts = function (id) {
        return $.ajax({
            url: "api/Shifts/" + id,
            method: "DELETE"
        });
    };
    var deleteEmp = function (id) {
        return $.ajax({
            url: "api/emp/" + id,
            method: "DELETE"
        });
    };

    // If there is an activeNote, display it, otherwise render empty inputs
    var renderActiveShifts = function () {
        $saveShifteBtn.hide();
        console.log
        if (activeShift.id) {
            $shiftDate.attr("readonly", true);
            $shitTime.attr("readonly", true);
            $shiftDate.val(activeNote.title);
            $shiftTime.val(activeNote.text);
        } else {
            $shiftDate.attr("readonly", false);
            $shitTime.attr("readonly", false);
            $shiftDate.val("");
            $shiftTime.val("");
        }
    };

    var renderActiveEmp = function () {
        $saveEmpBtn.hide();
        console.log
        if (activeEmp.id) {
            $empTitle.attr("readonly", true);
            $empName.attr("readonly", true);
            $empTitle.val(activeNote.title);
            $empName.val(activeNote.text);
        } else {
            $nempTitle.attr("readonly", false);
            $empName.attr("readonly", false);
            $empTitle.val("");
            $empName.val("");
        }
    };

    // Get the employee data from the inputs, save it to the db and update the view
    var handleEmpSave = function () {
        var newEmp = {
            title: $empTitle.val(),
            name: $empName.val()
        };

        saveEmp(newEmp).then(function (data) {
            getAndRenderEmp();
            renderActiveEmp();
        });
    };
    var handleShiftSave = function () {
        var newShift = {
            Date: $shiftDate.val(),
            Time: $shiftTime.val()
        };

        saveShift(newShift).then(function (data) {
            getAndRenderShifts();
            renderActiveShifts();
        });
    };


    // Delete the clicked note
    var handleEmpDelete = function (event) {
        // prevents the click listener for the list from being called when the button inside of it is clicked
        event.stopPropagation();

        const newEmp = {
            first_Name: $('#fname')
                .val()
                .trim(),
            last_Name: $('#lname')
                .val()
                .trim(),
            title: $('#tittle')
                .val()
                .trim(),

        };

        console.log(newEmp);

        $.post('/api/new', newEmp)

            .then(function () {
                const row = $('<div>');
                row.addClass('emp');

                row.append(`<p>${newEmp.first_Name}</p>`);
                row.append(`<p>${newEmp.last_Name}</p>`);
                row.append(`<p>${newEmp.tittle}</p>`);

                $('#emp-add').prepend(row);
            });

        $('#fname').val('');
        $('#lname').val('');
        $('#title').val('');
    });


$('#emp-submit').on('click', function (event) {
    event.preventDefault();

    // Make a newChirp object
    const newShift = {
        comment: $('#comment')
            .val()
            .trim(),
        time: $('#time')
            .val()
            .trim(),
        Date: $('#date')
            .val()
            .trim(),
    };

    console.log(newShift);

    $.post('/api/new', newShift)

        .then(function () {
            const row = $('<div>');
            row.addClass('shift');

            row.append(`<p>${newShift.time}</p>`);
            row.append(`<p>${newShift.date}</p>`);
            row.append(`<p>${newShift.comment}</p>`);


            $('#shift-add').prepend(row);
        });

    $('#comment').val('');
    $('#date').val('');
    $('#time').val('');
});

  // // When the page loads, grab all of our chirps
  // $.get('/api/all', function(data) {
  //   if (data.length !== 0) {
  //     for (let i = 0; i < data.length; i++) {
  //       const row = $('<div>');
  //       row.addClass('chirp');

  //       row.append(`<p>${data[i].author} chirped.. </p>`);
  //       row.append(`<p>${data[i].body}</p>`);
  //       row.append(`<p>At ${moment(data[i].created_at).format('h:mma on dddd')} </p>`);

  //       $('#chirp-area').prepend(row);
  //     }
  //   }
  // });