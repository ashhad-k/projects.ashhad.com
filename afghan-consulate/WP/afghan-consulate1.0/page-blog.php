<?php
/*
Template Name: Page Blog - 3 column
*/
get_header('global');
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
    <?php the_title(); ?>
  </h2>
</section>

<div class="s-gap-sm">
<!--/test-->
</div>

<section class="s-content">
    <div class="container">
        <div id="primary" class="content-area">
            <main id="main" class="site-main">
                <div class="row" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
                <?php
                // The Query
                $args = array(
                    'post_type' => 'post',
                    'posts_per_page' => -1, // Display all posts
                );
                $the_query = new WP_Query($args);

                // The Loop
                if ($the_query->have_posts()) :
                    while ($the_query->have_posts()) : $the_query->the_post(); ?>
                        <div>
                            <article id="post-<?php the_ID(); ?>" <?php post_class('mb-5'); ?>>
                                <?php if ( has_post_thumbnail() ) : ?>
                                    <div class="post-thumbnail">
                                        <a href="<?php the_permalink(); ?>">
                                            <?php the_post_thumbnail('full', ['class' => 'img-fluid rounded-4 mb-4', 'loading' => 'lazy']); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>

                                <header class="entry-header">
                                    <?php the_title('<h4 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h4>'); ?>
                                </header><!-- .entry-header -->

                                <div class="entry-summary">
                                    <?php the_excerpt(); ?>
                                </div><!-- .entry-summary -->
                            </article><!-- #post-## -->
                        </div>
                    <?php endwhile;
                    wp_reset_postdata();
                else : ?>
                    <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
                <?php endif; ?>
                </div><!-- .row -->
            </main><!-- #main -->
        </div><!-- #primary -->
    </div>
</section>
<div class="s-gap"></div>
<?php get_template_part('map-address'); ?>
<div class="s-gap"></div>
<?php get_template_part('faqs'); ?>
<div class="s-gap"></div>
<?php get_template_part('newsletter'); ?>
<?php get_footer(); ?>