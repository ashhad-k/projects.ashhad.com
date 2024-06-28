<?php

get_header();
?>

  <main id="main" class="site-main">       
	  
	  <section class="blog">
		  <div class="container">
            <div class="row isotope_cont"> 
				 <div class="col-md-8">
              <?php
                while (have_posts()) : the_post();

                    ?>
                   
                        <div class="blogBox style2">
                         <div class="blogImage">
                                <div class="zoom">
                                    <?php if (has_post_thumbnail($post->ID)) { ?>
                                        <?php  ?>
                                      <?php $url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'blog-thumb-home'); ?>
                        <img src="<?php echo $url[0]; ?>"  alt="<?php the_title();?>">
                                    <?php } else { ?>
                                        <img src="http://placehold.it/250" width="250" height="300" alt="">
                                    <?php } ?>
                                    <div class="blogDate">
                                        <i><?php the_time('M'); ?></i>
                                        <hr>
                                        <span><?php the_time('j'); ?></span>
                                        <hr>
                                        <i><?php the_time('Y'); ?></i>
                                    </div><!-- ( BLOG DATE END ) -->
                                </div><!-- ( HOVER STYLE END ) -->
                            </div><!-- ( BLOG IMAGE END ) -->
                            <div class="blogDesc">
							<h4 class="blog-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                                <?php echo the_excerpt(); ?>
							</div><!-- ( BLOG DESCRIPTION END ) -->
                                <a href="<?php the_permalink(); ?>" class="more2">Read More...</a>
								 <p class="blogInfo"><i class="fa-solid fa-clock"></i><?php echo get_the_date(); ?></p>
                         
                        </div><!-- ( BLOG BOX END ) -->
						<hr>
                  
                <?php endwhile; ?>
				  </div>		
					<div class="col-md-4">
						<div class="blogSideBar">
						<?php dynamic_sidebar( "sidebar-1" ); ?>
					</div>
					 <div class="pagination-sec">
                        <?php /*custom added*/
                              //  wpbeginner_numeric_posts_nav();
                          ?>
                        </div>
				
           </div><!-- .row -->
				</div><!-- .row -->
			  </div><!-- .row -->
			  </section><!-- .row -->
    </main><!-- #main -->
<?php get_footer(); ?>
<!-- footer -->

