
$(document).ready(function () {

    //$(document).ajaxStart(function () {
    //    console.log("Triggered ajaxStart handler.");

    //});
        
    //$("#navigation.active").addClass(function(){}
    // skapa en if-sats där allarörelser försvinner för gott, jävla fan helvete.



    //$(document).ajaxComplete(function () {
    //    console.log("Triggered ajaxComplete handler.");
    //});



    // Setup initial page parameters.
    Page.setup({

        numberOfColumnsPerRow: 3,
        studentsUrl: "http://localhost:45959/api/students/",
        coursesUrl: "http://localhost:45959/api/courses/",
        
        defaultPlaceholder: $("#defaultPlaceholder"),
        courseDetailsPlaceholder: $("#courseDetailsPlaceholder"),
        courseDetailsStudentListPlaceholder: $("#courseDetailsStudentListPlaceholder"),
        courseDetailsStudentSelectList: $("#courseDetailsStudentSelectList"),
        courseListPlaceholder: $("#courseListPlaceholder"),
        studentListPlaceholder: $("#studentListPlaceholder"),
        studentDetailsPlaceholder: $("#studentDetailsPlaceholder"),

    });

    // Do some page bootstrapping.
    Page.init();

    // Display course details for clicked course.
    $("#defaultPlaceholder").on("click", ".list-item", function (event) {
        var id = $(event.target).data("itemId");
        console.log("[#defaultPlaceholder.click]: Course list clicked: " + id);

        Page.displayCourseDetails(id);
    });

    // Cancel the course details view.
    $("#courseDetailsCancelButton").on("click", function (event) {
        console.log("[#courseDetailsCancelButton.click]: Course details canceled.");

        // De-scelect the top menu button.
        Page.deselectMenu();
        Page.displayDefault();
    });

    // Save the course details.
    $("#courseDetailsForm").submit(function (event) {
        event.preventDefault();
        console.log("[courseDetailsForm.submit]: Submitted course details form.");

        var course = Utilities.formToJson(this);
        course.students = [];

        var student = null;
        $(".registered-student").each(function () {
            student = {
                id: $(this).data("id"),
                firstName: $(this).data("firstName"),
                lastName: $(this).data("lastName"),
                studentPersNummer: $(this).data("student-persnummer"),
            }
            course.students.push(student);
        });

        Page.saveCourseAndDisplayDefault(course);
    });

    // Remove a registered student.
    $("#courseDetailsStudentListPlaceholder").on("click", ".remove-registered-student", function (event) {
        var item = $(this).closest(".list-group-item")[0];

        // Append to the option list.
        var id = $(item).data("id");
        var firstName = $(item).data("firstName");
        var lastName = $(item).data("lastName");
        var student = { id: id, firstName: firstName, lastName: lastName }
        Page.appendStudentSelectOption(student);

        // Remove from the registered list.
        $(item).remove();
    });

    // Register a student.
    $("#registerSelectedStudentButton").on('click', function (event) {

        Page.registerSelectedStudent();

    });

    $('.navbar li, a').click(function (e) {
        $('.navbar li.active').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }

        e.preventDefault();
    });

    $(".navigation").on("click", function () {
        var panel = this.href.substr(this.href.indexOf("#") + 1);

        console.log(panel);

        Page.navigate(panel);
    });

    // Save the new course details from the course list view.
    $("#studentDetailsForm").submit(function (event) {
        event.preventDefault();
        console.log("[courseListAddCourseForm.submit]: Submitted the new course form.");

        var student = Utilities.formToJson(this);

        $(this)[0].reset();

        Page.saveStudentDetails(student);
    });

    $("#courseListAddCourseForm").submit(function (event) {
        event.preventDefault();
        console.log("[courseListAddCourseForm.submit]: Submitted the new course form.");

        var course = Utilities.formToJson(this);
        course.students = [];




        $(this)[0].reset();

        Page.saveCourseDetails(course);
    });

    $(document).on("courseSavedCustomEvent", function (event) {
        console.log("[courseSavedCustomEvent]: " + event.message.description);
        console.log("[courseSavedCustomEvent]: " + event.message.data);

        Page.displayCourseList();

    });

    $(document).on("studentSavedCustomEvent", function (event) {
        console.log("[studentSavedCustomEvent]: " + event.message.description);
        console.log("[studentSavedCustomEvent]: " + event.message.data);

        Page.displayStudentList();

    });
    $(document).on("studentSavedCustomEvent", function (event) {
        console.log("[studentSavedCustomEvent]: " + event.message.description);
        console.log("[studentSavedCustomEvent]: " + event.message.data);
        Page.displayStudentList();

    });

    //When click to pen display in form
    $("#studentListTable").on("click", ".glyphicon-pencil", function (event) {
        var id = $(event.target).data("editstudent");
        console.log("student clicked", id);
        Page.displayStudentEdit(id);

    });

    $("#studentListAddForm").submit(function (event) {
        event.preventDefault();
        console.log("[studentlist.submit]: Submitted student details form.");
        var student = Utilities.formToJson(this);
        $(this)[0].reset();

        $("input[name=id]").val(0);
        Page.saveStudentAndDisplayDefault(student);
    });

    
    $(document).on("studentSavedCustomEvent", function (event) {
        console.log("[studentSavedCustomEvent]: " + event.message.description);
        console.log("[studentSavedCustomEvent]: " + event.message.data);
        Page.displayStudentList();

    });

    // KOMMENTAR!!!!!
        //$("#courseDetailsForm").submit(function (event) {
        //    event.preventDefault();
        //    console.log("[courseDetailsForm.submit]: Submitted course details form.");

        //    var course = Utilities.formToJson(this);
        //    course.students = [];

        //    var student = null;
        //    $(".registered-student").each(function () {
        //        student = {
        //            id: $(this).data("id"),
        //            firstName: $(this).data("firstName"),
        //            lastName: $(this).data("lastName")
        //        }
        //        course.students.push(student);
        //    });

        //    Page.saveCourseAndDisplayDefault(course);
        //});
        //All data hämnar på $("#studentListAddStudentForm").submit(function (event) och de händer inget. 
        // 1.Samla in (studentListAddStudentForm)
        //// 2.Spara data
        //// 3. Efter att man har lagt till spara-funktion, så lägg till hem funktion.
        // var student = Utilities.formToJson(this);

        // Page.saveStudentDetails(student);

    });


