<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<?php wp_head(); ?>
</head>
<!-- <body class="d-flex flex-column h-100 a2"> -->
<body <?php body_class(); ?>>
<!-- Navigation-->
<nav class="navbar navbar-expand-lg py-3 navbar-fixed-top ">
  <div class="container"> <a class="navbar-brand" href="/"><img src="<?php echo get_template_directory_uri(); ?>/assets/afghan-consulate.svg" alt="Afghan Consulate"/></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
   <div class="collapse navbar-collapse" id="navbarSupportedContent"> 
      
      <!--      ul li removed-->
      
      <?php
      wp_nav_menu( array(
        'theme_location' => 'top-menu',
        'menu_class' => 'top-menu navbar-nav lhs'
      ) );

      ?>
      <div class="d-grid  d-md-block gap-1  rhs">
        <?php
        //wp_nav_menu( array(
        //  'theme_location' => 'top-rhs-menu',
       //   'menu_class' => 'rhs2'
       // ) );

        ?>
		  <?php get_template_part('/patterns/top-right-items'); ?>
      </div>
    </div>
  </div>
</nav>
