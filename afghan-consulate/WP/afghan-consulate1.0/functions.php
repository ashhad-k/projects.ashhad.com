<?php

function custom_theme_assets() {
    // Favicon
    echo '<link rel="icon" type="image/x-icon" href="' . get_template_directory_uri() . '/assets/favicon.ico" />';

    // Custom fonts
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    echo '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">';
    echo '<link rel="preload" href="' . get_template_directory_uri() . '/assets/fonts/MinionPro-Regular.woff2" as="font" type="font/woff2">';
    echo '<link rel="preload" href="' . get_template_directory_uri() . '/assets/fonts/MinionPro-Semibold.woff2" as="font" type="font/woff2">';

    // Enqueue styles
    wp_enqueue_style('bootstrap-icons', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css', array(), '1.8.1');
    //wp_enqueue_style('aos', 'https://unpkg.com/aos@2.3.1/dist/aos.css', array(), '2.3.1');
    wp_enqueue_style('main-styles', get_template_directory_uri() . '/css/styles.css');
    wp_enqueue_style('custom-styles', get_template_directory_uri() . '/css/custom1.css');
}
add_action('wp_enqueue_scripts', 'custom_theme_assets');

// Register nav menus
function register_my_menus() {
    register_nav_menus(
        array(
            'top-menu' => __( 'Top Menu' ),
            'top-rhs-menu'  => __( 'Top RHS Menu' ),
            'header-rhs-menu'  => __( 'Header RHS Menu' ),
            'footer-menu' => __( 'Footer Menu' ),
            'f1' => __( 'F1' ),
            'f2' => __( 'F2' ),
            'f3' => __( 'F3' ),
            'f4' => __( 'F4' )
        )
    );
}
add_action( 'init', 'register_my_menus' );

// Enable support for block patterns
add_theme_support( 'core-block-patterns' );

// Register block pattern
function afghan_consulate_custom_patterns() {
    register_block_pattern(
        'afghan-consulate1.0/hdr-rhs',
        array(
            'title'       => __( 'Header RHS', 'afghan-consulate1.0' ),
            'description' => _x( 'A right-hand side header pattern', 'Block pattern description', 'afghan-consulate1.0' ),
            'content'     => '<!-- wp:heading --><h2>' . __( 'Header Right Hand Side', 'afghan-consulate1.0' ) . '</h2><!-- /wp:heading -->',
        )
    );
}
add_action( 'init', 'afghan_consulate_custom_patterns' );


//// Breadcrumb
// Breadcrumb
function custom_breadcrumb() {
    if (!is_front_page()) {
        echo '<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">';
        echo '<ol class="breadcrumb">';
        echo '<li class="breadcrumb-item"><a href="' . home_url() . '"><i class="bi bi-house-door"></i></a></li>';
        
        if (is_page()) {
            $post_ancestors = get_post_ancestors(get_the_ID());
            $post_ancestors = array_reverse($post_ancestors);

            foreach ($post_ancestors as $ancestor) {
                echo '<li class="breadcrumb-item"><a href="' . get_permalink($ancestor) . '">' . get_the_title($ancestor) . '</a></li>';
            }

            echo '<li class="breadcrumb-item active" aria-current="page">' . get_the_title() . '</li>';
        } elseif (is_single()) {
            $categories = get_the_category();
            if ($categories) {
                $category = $categories[0]; // Use the first category
                echo '<li class="breadcrumb-item"><a href="' . get_category_link($category->term_id) . '">' . $category->name . '</a></li>';
            }

            echo '<li class="breadcrumb-item active" aria-current="page">' . get_the_title() . '</li>';
        }
        
        echo '</ol>';
        echo '</nav>';
    }
}


//// post title
function post_title_shortcode( $atts ) {
    $atts = shortcode_atts( array(
        'id' => get_the_ID(),
    ), $atts, 'post_title' );

    $post_title = get_the_title( $atts['id'] );
    return $post_title;
}
add_shortcode( 'post_title', 'post_title_shortcode' );


// add feature image<br>
function custom_theme_setup() {
    // Add theme support for post thumbnails
    add_theme_support( 'post-thumbnails' );

    // You can also specify default thumbnail sizes if needed
    set_post_thumbnail_size( 150, 150 ); // Default size for post thumbnails
}

// Hook into the 'after_setup_theme' action
add_action( 'after_setup_theme', 'custom_theme_setup' );

// title slug part1
function theme_slug_setup() {
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'theme_slug_setup');

// title slug - part 2
function custom_document_title_parts($title) {
    if (is_home() || is_front_page()) {
        // For the homepage, just use the site title
        $title['title'] = get_bloginfo('name');
    } else {
        // For all other pages, use "Page Title - Site Title"
        $title['title'] = single_post_title('', false) . ' - ' . get_bloginfo('name');
    }
    return $title;
}
add_filter('document_title_parts', 'custom_document_title_parts');


// apply a class to body
function add_slug_body_class($classes) {
    if (is_page()) {
        global $post;
        $classes[] = $post->post_name; // Adds the slug of the page
    }
    return $classes;
}
add_filter('body_class', 'add_slug_body_class');



// post list 
function post_list1() {
    // Custom function to modify excerpt length
    function custom_excerpt_length($length) {
        return 20; // Change this value to set the number of words for the excerpt
    }
    add_filter('excerpt_length', 'custom_excerpt_length');

    // Custom function to add a read more link to excerpts
    function new_excerpt_more($more) {
        return '...<div><a class="read-more" href="' . get_permalink(get_the_ID()) . '">' . __('Read More', 'your-text-domain') . '</a></div>';
    }
    add_filter('excerpt_more', 'new_excerpt_more');

    ?>
    <div class="row" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
        <?php
        // The Query
        $args = array(
            'post_type' => 'post',
            'posts_per_page' => 2, // Display all posts
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
                            <?php the_title('<h6 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h6>'); ?>
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
    <?php

    // Remove the filters to prevent affecting other parts of the site
    remove_filter('excerpt_length', 'custom_excerpt_length');
    remove_filter('excerpt_more', 'new_excerpt_more');
}
add_shortcode('post_list1', 'post_list1');




// post list 2 
function post_list2() {
    // Custom function to modify excerpt length
    function custom_excerpt_length($length) {
        return 10; // Change this value to set the number of words for the excerpt
    }
    add_filter('excerpt_length', 'custom_excerpt_length');

    // Custom function to add a read more link to excerpts
    function new_excerpt_more($more) {
        return '...<div><a class="read-more" href="' . get_permalink(get_the_ID()) . '">' . __('Read More', 'your-text-domain') . '</a></div>';
    }
    add_filter('excerpt_more', 'new_excerpt_more');

    ?>
    <div class="row" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
        <?php
        // The Query
        $args = array(
            'post_type' => 'post',
            'posts_per_page' => 4,
            'offset' => 2,
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
                            <?php the_title('<h6 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h6>'); ?>
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
    <?php

    // Remove the filters to prevent affecting other parts of the site
    remove_filter('excerpt_length', 'custom_excerpt_length');
    remove_filter('excerpt_more', 'new_excerpt_more');
}
add_shortcode('post_list2', 'post_list2');

