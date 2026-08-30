<!-- wp:query {"query":{"perPage":10,"pages":0,"offset":"0","postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":true},"align":"wide","layout":{"type":"default"}} -->
<div class="wp-block-query alignwide">
    <!-- wp:query-no-results -->
    <!-- wp:paragraph {"placeholder":"No results found"} -->
    <p><?php _e('No results found', 'afghan-consulate1.0'); ?></p>
    <!-- /wp:query-no-results -->

    <!-- wp:group {"style":{"spacing":{"padding":{"top":"50px","bottom":"50px","left":"0","right":"0"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"default"}} -->
    <div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:50px;padding-right:0;padding-bottom:50px;padding-left:0">

        <!-- wp:post-template {"align":"full","style":{"spacing":{"blockGap":"30px"}},"layout":{"type":"grid","columnCount":3}} -->

        <!-- wp:post-featured-image {"isLink":true,"aspectRatio":"3/4","style":{"spacing":{"margin":{"bottom":"0"},"padding":{"bottom":"20px"}}}} /-->

        <!-- wp:group {"style":{"spacing":{"blockGap":"10px","margin":{"top":"20px"},"padding":{"top":"0"}}},"layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap"}} -->
        <div class="wp-block-group" style="margin-top:20px;padding-top:0">
            <!-- wp:post-title {"isLink":true,"fontSize":"large"} /-->

            <!-- wp:group {"style":{"spacing":{"blockGap":"10px"}},"layout":{"type":"flex","orientation":"horizontal"}} -->
            <div class="wp-block-group" style="display: flex; gap: 10px;">
                <!-- wp:post-author {"showAvatar":false} /-->
                <!-- wp:post-date /-->
            </div>
            <!-- /wp:group -->

            <!-- wp:post-excerpt {"textColor":"contrast-2","fontSize":"small"} /-->

            <!-- wp:spacer {"height":"0px"} -->
            <div style="height:0px" aria-hidden="true" class="wp-block-spacer"></div>
            <!-- /wp:spacer -->
        </div>
        <!-- /wp:group -->

        <!-- /wp:post-template -->

        <!-- wp:spacer {"height":"40px","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
        <div style="margin-top:0;margin-bottom:0;height:40px" aria-hidden="true" class="wp-block-spacer"></div>
        <!-- /wp:spacer -->

        <!-- wp:query-pagination {"paginationArrow":"arrow","layout":{"type":"flex","justifyContent":"space-between"}} -->
        <!-- wp:query-pagination-previous /-->
        <!-- wp:query-pagination-next /-->
        <!-- /wp:query-pagination -->

    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:query -->
