;(function() {
    $('#main').load(`pages/intelligentHardware/1.html`);
    $('#menu').click((e) => {
        $(e.target).parent().find('.active').removeClass('active');
        $(e.target).addClass('active');
        const id = $(e.target).data('id');
        $('#main').load(`pages/intelligentHardware/${id}.html`);
    });
})()