<!-- Footer-->
<footer>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
           <?php get_template_part('/patterns/footer-column1'); ?>
        
      </div>
      <div class="col-md-2 offset-lg-1">
            <?php get_template_part('/patterns/footer-column2'); ?>
       
      </div>
      <div class="col-md-3">
            <?php get_template_part('/patterns/footer-column3'); ?>
      
      </div>
      <div class="col-md-3 four">
            <?php get_template_part('/patterns/footer-column4'); ?>
        
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 copyright"> 
           <?php get_template_part('/patterns/footer-copyright-block'); ?> 
        
        
        </div>
    </div>
  </div>
</footer>

<!-- JS --> 
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.min.js"></script> 
<script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script> 
<script src="<?php echo get_template_directory_uri(); ?>/js/scripts.js"></script>
</body>
</html>