let MON_SUPER_SITE = {};

let addLogoutButton = function () {
    $('.logout').load('templates/partials/_logout.html');
}

let addProfileButton = function () {
    $('.profile').append('<a class="nav-link" id="profile" href="#profile">Profile</a>');
}

let removeLoginButton = function () {
    $('.login').empty('<a class="nav-link btn btn-success" id="login" href="#login">Login</a>');
}

let addLoginButton = function () {
    $('.login').html(`
    <a class="nav-link btn btn-success" id="login" href="#login">Login</a>
    `);
}

let handleRequest = function () {

    let user = {};

    $('.logout').html('');
    $('.login').html('');
    $('.profile').html('');

    $.get('security.php', function (response) {
        response = JSON.parse(response);

        if (response.user) {
            MON_SUPER_SITE['security'] = response.user;
            addLogoutButton();
            addProfileButton();
            removeLoginButton();
        }
        if (!response.user) {
            addLoginButton();
        } 

        let baseUrl = window.location.origin;
        let page = "";

        if (window.location.hash !== "") {
            page = window.location.hash.split('#')[1];
            console.log(page);
        }

        // if (window.location.href === "") {
        //     page = 'homepage';
        // }

        if (!response.user && page !== 'login') {
            window.location.hash = '#homepage';
        }

        if (response.user && page == 'login') {
            window.location.hash = '#homepage';
        }

        $('#container').load('templates/' + page + '.html', function () {
            console.info('page ' + page + ' was loaded');
        });
    })
}

handleRequest();

$(window).on('hashchange', handleRequest);

$('body').on('SECURITY_LOGOUT', handleRequest);
