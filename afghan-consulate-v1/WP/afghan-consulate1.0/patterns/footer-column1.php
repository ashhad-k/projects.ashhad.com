<?php
$reusable_block_id = 243; // Replace with your reusable block ID
$reusable_block = get_post($reusable_block_id);
if ($reusable_block) {
    echo do_blocks($reusable_block->post_content);
}
?>
<?php get_search_form(); ?>