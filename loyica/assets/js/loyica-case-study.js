// Filters 
$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('3000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('5000');
            $('.filter').filter('.'+value).show('5000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});

// Filters button
document.addEventListener("DOMContentLoaded", function() {
    // Select all filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');

    // Add click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            this.classList.add('active');
        });
    });
});



