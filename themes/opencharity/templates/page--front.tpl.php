<?php

/**
 * @file
 * Bartik's theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template normally located in the
 * modules/system directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 * - $hide_site_name: TRUE if the site name has been toggled off on the theme
 *   settings page. If hidden, the "element-invisible" class is added to make
 *   the site name visually hidden, but still accessible.
 * - $hide_site_slogan: TRUE if the site slogan has been toggled off on the
 *   theme settings page. If hidden, the "element-invisible" class is added to
 *   make the site slogan visually hidden, but still accessible.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['header']: Items for the header region.
 * - $page['featured']: Items for the featured region.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['triptych_first']: Items for the first triptych.
 * - $page['triptych_middle']: Items for the middle triptych.
 * - $page['triptych_last']: Items for the last triptych.
 * - $page['footer_firstcolumn']: Items for the first footer column.
 * - $page['footer_secondcolumn']: Items for the second footer column.
 * - $page['footer_thirdcolumn']: Items for the third footer column.
 * - $page['footer_fourthcolumn']: Items for the fourth footer column.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 * @see html.tpl.php
 */
?>
<div id="page-wrapper"><div id="page">

  <div id="header" class="header-container">
    <div class="section clearfix wrapper wrapper--header">

    <?php if ($logo): ?>
      <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo">
        <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="logo" />
      </a>
    <?php endif; ?>

    <?php print render($page['header']); ?>
    <?php
    $images_path =  drupal_get_path('theme', 'opencharity')."/images";
    ?>
 
    <?php  if ($main_menu) : ?>
      <div class="menu-mobile">
        <label for="menu-mobile__check" class="menu-mobile__control">
          <img src="<?php echo $images_path ?>/if_menu.svg" class="menu-mobile__control__img">
        </label>
        <input type="checkbox" id="menu-mobile__check">
        <div class="menu-mobile__list">
          <?php
          foreach ($main_menu as $key => $menu) {
           print '<a href="' . $menu['href'] . '" class="text text--small menu-mobile__list__item">' . $menu['title']. '</a>';
          }
          ?>
        </div>
      </div>
      <div class="menu-wide">
        <?
        foreach ($main_menu as $key => $menu) {
          $class_name = ($menu['title'] == 'JOIN US') ? 'button' : 'menu-wide__item';
          print '<a href="' . $menu['href'] . '" class="text '. $class_name. '">' . $menu['title']. '</a>';
        }
        ?>
      </div>
    <?php endif; ?>

  </div></div> <!-- /.section, /#header -->

  <section class="banner" style="background-image: url('<?php echo $images_path ?>/backimg.png')">
    <div class="wrapper">
      <h1 class="text banner__title">SHARING IDEAS FOR CHARITIES</h1>
      <p class="text banner__content">Many charities' goals are similar, as is the functionality we require, but little shared working takes place</p>
      <p class="text text--small banner__content banner__content--small">By working together, driving shared areas of interest and influencing open source developments we can bring efficiencies, improve the digital experience for our users, and have great impact</p>
      <p class="text banner__content">Together we can make a bigger diference</p>
    </div>
  </section>
  <section class="next-event">
    <div class="wrapper">
      <?php 
        print render($page['featured']['views_next_event-block']);
        // print '<pre>' . print_r($page['featured']) . '</pre>';
      ?>
      <a class="text button button--grey" href="">REGISTER</a>
    </div>
  </section>
  <section class="involved">
    <h2 class="text text--heading centered">GET INVOLVED</h2>
    <div class="wrapper">
      <div class="row">
        <div class="col col--third centered involved__col">
          <div class="involved__image">
            <img src="<?php echo $images_path ?>/meetup.png" alt="Meetup">    
          </div>      
          <p class="text text--big involved__label">WE DO MEETINGS</p>
          <p class="text">We organize our meetings through the OpenCharity MeetUp group</p>
          <a class="text button button--wider involved__button">MEETUP GROUP</a>
        </div>
        <div class="col col--third centered involved__col">
          <div class="involved__image">
            <img src="<?php echo $images_path ?>/slack.png" alt="Slack">
          </div>
          <p class="text text--big involved__label">WE COMMUNICATE</p>
          <p class="text">OpenCharity have a slack group for daily communication</p>
          <a class="text button button--wider involved__button">SLACK GROUP</a>
        </div>
        <div class="col col--third centered involved__col">
          <div class="involved__image">
            <img src="<?php echo $images_path ?>/google-groups.png" alt="Google groups">
          </div>
          <p class="text text--big involved__label">WE COLLABORATE</p>
          <p class="text">We have a Wiki group set up to share tools and documents</p>
          <a class="text button button--wider involved__button">WIKI GROUP</a>
        </div>
      </div>
    </div>
  </section>

  <section class="descrip">
    <h2 class="text text--heading centered">OUR MISSION</h2>
    <p class="text text--small centered descript__note">Charities and Partners collaborating and sharing open solutions and ideas to create value in the digital space</p>
    <p class="text centered descript__note">If you are a charity or a supplier, we are ready to welcome you</p>
    <div class="wrapper">
      <div class="row">
        <div class="col col--third centered descrip__col">
          <div class="descrip__col__image">
            <img src="<?php echo $images_path ?>/lamp.png" alt="lamp">
          </div>
          <p class="text text--bigger descrip__col__label">We help charities</p>
          <p class="text text--small">share knowledge and working practice to make the best technoogy choices.</p>
        </div>
        <div class="col col--third centered descrip__col">
          <div class="descrip__col__image">
            <img src="<?php echo $images_path ?>/people.png" alt="people">
          </div>
          <p class="text text--bigger descrip__col__label">We bring together</p>
          <p class="text text--small">charities and suppliers to the charity sector to share best practices.</p>
        </div>
        <div class="col col--third centered descrip__col">
          <div class="descrip__col__image">
            <img src="<?php echo $images_path ?>/like.png" alt="like">
          </div>
          <p class="text text--bigger descrip__col__label">We encourage</p>
          <p class="text text--small">collaboration and innovation for the good of the charity sector.</p>
        </div>
      </div>

    </div>
    <div class="wrapper">
        <hr class="descrip__hr">
    </div>
    <h2 class="text text--heading centered">OUR MEMBERS</h2>
    <div class="wrapper centered">
      <div class="row-grow" id="members-row"></div>
    </div>
    <div class="wrapper centered">
      <div class="row-shrink descrip__control" id="members-control">
      </div>
    </div>
  </section>
  <section class="blog">
    <div class="blog__bgr">
      <div class="blog__bgr__up"></div>
      <div class="blog__bgr__low"></div>
    </div>
    <div class="blog__content">
      <div class="wrapper">
        <h2 class="text text--heading centered blog__content__heading">BLOG</h2>
        <div class="row" id="blog-row">
        </div>        
        <button class="blog__slide blog__slide--left" id="blog-previous">
          <img src="<?php echo $images_path ?>/left.png" alt="previous" title="previous">
        </button>
        <button class="blog__slide blog__slide--right" id="blog-next">
          <img src="<?php echo $images_path ?>/right.png" alt="next" title="next">
        </button>
       </div>
   </div>
  </section>
  
  <div id="footer-wrapper" class="foot">
    <div class="section wrapper">
      <div class="foot__follow">
        <a href="facebook" class="foot__follow__link">
          <img src="<?php echo $images_path ?>/facebook-logo.png" alt="follow us on Facebook">
        </a>
        <a href="twitter" class="foot__follow__link">
          <img src="<?php echo $images_path ?>/twitter-logo.png" alt="follow us on Twitter">
        </a>
        <a href="gplus" class="foot__follow__link">
          <img src="<?php echo $images_path ?>/google_plus_logo.png" alt="follow us on Google+">
        </a>
      </div>
      <hr class="foot__hr">
      <p class="text foot__text">
        This site was built as a collaboration between 
        <a href="https://manifesto.co.uk/">Manifesto Digital</a> and 
        <a href="https://www.compucorp.co.uk/">Compucorp</a>
      </p>
    </div>
  </div> <!-- /.section, /#footer-wrapper -->

</div></div> <!-- /#page, /#page-wrapper -->
