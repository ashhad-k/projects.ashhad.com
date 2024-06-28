<?php
get_header( 'global' );
the_post();
?>
<div class="s-gap-md"></div>
<section class="s-breadcrumb">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <?php custom_breadcrumb(); ?>
      </div>
    </div>
  </div>
</section>
<section class="s-hero3 bg--contact cc1">
  <h2>
    <?php the_title() ?>
  </h2>
</section>

<div class="s-gap-sm">
<!--/test-->
   
</div>

<section class="s-content">
    <div class="container">
  <?php the_content(); ?>
	<?php echo do_shortcode('[gtranslate]'); ?>
        </div>
</section>
<div class="s-gap"></div>
<?php get_template_part('map-address'); ?>
<div class="s-gap"></div>
<?php get_template_part('faqs'); ?>
<div class="s-gap"></div>
<?php get_template_part('newsletter'); ?>
<?php get_footer(); ?>
