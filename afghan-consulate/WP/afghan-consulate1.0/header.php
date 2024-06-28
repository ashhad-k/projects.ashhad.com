<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<title>Afghan Consulate</title>
<!-- Favicon-->
<link rel="icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/assets/favicon.ico" />

<!-- Custom font-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="preload" href="<?php echo get_template_directory_uri(); ?>/assets/fonts/MinionPro-Regular.woff2" as="font" type="font/woff2">
<link rel="preload" href="<?php echo get_template_directory_uri(); ?>/assets/fonts/MinionPro-Semibold.woff2" as="font" type="font/woff2">

<!-- Bootstrap icons-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

<!-- Core theme CSS (includes Bootstrap)-->
<link href="<?php echo get_template_directory_uri(); ?>/css/styles.css" rel="stylesheet" />
<link href="<?php echo get_template_directory_uri(); ?>/css/custom.css" rel="stylesheet" />
</head>
<!-- <body class="d-flex flex-column h-100"> -->
<body <?php body_class(); ?>>

<!-- Navigation-->
<nav class="navbar navbar-expand-lg py-3 navbar-fixed-top " id="nav0"> 
  <!--     <div class="text-center"><img src="<?php echo get_template_directory_uri(); ?>/assets/afghan-consulate-lg.png" width="386" height="72" alt=""/></div>-->
  <div class="container"> <a class="navbar-brand" href="index.html"><img src="<?php echo get_template_directory_uri(); ?>/assets/afghan-consulate.svg" alt="Afghan Consulate"/></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 small me-3 lhs">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Consulate </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="about-us.html">About Us</a></li>
            <li><a class="dropdown-item" href="consulate-officer.html">Consulate Officer</a></li>
            <li><a class="dropdown-item" href="previous-consulate-officer.html">List of previous consul general</a></li>
            <li><a class="dropdown-item" href="public-holidays.html">Public Holidays</a></li>
            <li><a class="dropdown-item" href="holidays-timings.html">Timings &amp; Holidays</a></li>
            <li><a class="dropdown-item" href="right-to-information.html">Right To Information</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Our Services </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="apply-for-a-passport.html">Applying for passport</a></li>
            <li><a class="dropdown-item" href="apply-for-a-visa.html">Applying for Visa</a></li>
            <li><a class="dropdown-item" href="apply-for-a-birth-certificate.html">Applying for Birth Certificate</a></li>
            <li><a class="dropdown-item" href="apply-for-a-marriage-certificate.html">Applying for Marriage Certificate</a></li>
            <li><a class="dropdown-item" href="apply-for-a-power-of-attorney.html">Applying for Power of Attorney</a></li>
            <li><a class="dropdown-item" href="apply-for-a-inheritance.html">Applying for Inheritance (Hasr-e-Warasat)</a></li>
            <li><a class="dropdown-item" href="apply-for-a-foreign-afghans.html">Applying for For Foreign Afghans</a></li>
            <li><a class="dropdown-item" href="apply-for-a-validation-attestation.html">Applying for For Validation/Attestation of Afghan Documents</a></li>
            <li><a class="dropdown-item" href="apply-for-a-police-clearance.html">Applying for For Afghan Police Clearance</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Info Hub </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="Afghanistan-UAE.html">Afghanistan-UAE</a></li>
            <li><a class="dropdown-item" href="afghanistan.html">Afghanistan</a></li>
            <li><a class="dropdown-item" href="HE-consul-general-biography.html">HE Consul General Biography</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Media </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="gallery.html">Gallery</a></li>
            <li><a class="dropdown-item" href="news.html">News</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="download-forms.html">Download Forms</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      </ul>
      <div class="d-grid  d-md-block gap-1  rhs"> <a data-bs-toggle="modal" data-bs-target="#docModal"  class="btn btn-outline-light rounded-pill b0"> <i class="bi bi-file-check"></i> Document Verification</a> 
        
        <!-- Modal -->
        <div class="modal modal-lg fade" id="docModal" tabindex="-1" aria-labelledby="docModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="docModalLabel">Document verification</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="data">
                  <input type="text" class="form-control" placeholder="Enter Document No" aria-label="Enter Document No">
                  <button type="button" class="btn btn-primary">Verify</button>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown b1">
          <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"> <i class="bi bi-search text-white"></i> </button>
          <form class="dropdown-menu dropdown-menu-end p-4">
            <div class="mb-3">
              <input type="input" class="form-control" id="search" placeholder="Search...">
            </div>
            <button type="submit" class="btn btn-primary">Search</button>
          </form>
        </div>
        <a href="user-login.html" class="btn btn-light rounded-circle b2"> <i class="bi bi-person"></i> </a> </div>
    </div>
  </div>
</nav>
<!-- Header-->
