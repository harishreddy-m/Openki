Template.navbar.helpers ({
    kioskMode: function() {
        return Session.get('kiosk_mode');
    }
});

Template.navbar.rendered = function() {
    this.$('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  });

    this.$('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  });
    $(window).scroll(function (event) {
        if($(window).scrollTop() > 5){
            this.$('a.nav_link.active').addClass('over_content');
        }
        else if($(window).scrollTop() < 5){
            this.$('a.nav_link.active').removeClass('over_content');            
        }
    });
};
