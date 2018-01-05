$('.form').find('input, textarea').on('keyup blur focus', function(e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function(e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});

$('#signup-btn').on('click', function(e) {
    e.preventDefault();

    var firstname = $('#signup-first').val();
    var lastname = $('#signup-last').val();
    var email = $('#signup-email').val();
    var password = $('#signup-password').val();
    var confrim = $('#signup-confirm').val();
    console.log(firstname);
    console.log(confrim);

    var jqxhr = $.post("/api/v1/signup.json", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            confrim: confrim
        })
        .done(function() {
            alert("second success");
        })
        .fail(function() {
            alert("error");
        });
});

$('#login-btn').on('click', function(e) {
    e.preventDefault();

    var username = $('#login-email').val();
    var password = $('#login-password').val();

    var jqxhr = $.post("/api/v1/login.json", { username: username, password: password })
        .done(function() {
            alert("second success");
        })
        .fail(function() {
            alert("error");
        });

});