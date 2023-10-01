<?php 
/*
Template Name: Правила
Template Post Type: page
*/

get_header();

?>

<main class="rulespage">
    <h1 class="title"><?php the_title();?></h1>

    <div class="rulespage-content">
        <?php the_content();?>
    </div>
</main>

<?php get_footer();?>