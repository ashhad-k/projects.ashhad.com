<?php
get_header('global');
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
<div class="s-gap-sm"></div>
<section class="s-content">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
                <?php
                if ( have_posts() ) :
                    while ( have_posts() ) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                            <header class="entry-header">
                                <?php the_title('<h4 class="entry-title">', '</h4>'); ?>
                            </header><!-- .entry-header -->

                            <?php if ( has_post_thumbnail() ) : ?>
                                <div class="post-thumbnail">
                                    <?php the_post_thumbnail('full', ['class' => 'img-fluid']); ?>
                                </div>
                            <?php endif; ?>

                            <div class="entry-content">
                                <?php the_content(); ?>
                            </div><!-- .entry-content -->

                            <footer class="entry-footer">
                                <?php
                                // Display categories, tags, etc.
                                ?>
                            </footer><!-- .entry-footer -->
                        </article><!-- #post-## -->
                    <?php endwhile;
                endif;
                ?>
            </div><!-- .col -->
        </div><!-- .row -->
    </div><!-- .container -->
</section><!-- .s-content -->

<div class="s-gap"></div>
<?php get_template_part('newsletter'); ?>
<?php get_footer(); ?>
