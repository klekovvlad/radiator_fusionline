<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="shortcut icon" href="/favicon.png" type="image/png">
    <?php wp_head();?>
</head>
<body>

<?php 
$work_times = get_field('work-times', 10);
$adress = get_field('adress', 10);
$social_webs = get_field('social-web', 10)
?>
    
<header class="header">
    <div class="header-wrapper">
        <div class="logo">
            <?php the_custom_logo();?>
            <div class="logo-text">
                Дизайнерские радиаторы <br>
                и полотенцесушители
            </div>
        </div>
        <div class="header-worktimes">
            <?php if($work_times) { ?>
                <div class="header-times"><?php echo $work_times;?></div>
            <?php } ?>
            <?php if($adress) { ?>
                <div class="header-adresses">
                    <?php $index = 1;
                    foreach ($adress as $item) {
                        if($index <= 2) { ?>
                            <a target="_blank" href="<?php echo $item['coord'];?>"><?php echo $item['item'];?></a>
                            <a href="tel:<?php echo $item['phone'];?>" class="phone"><?php echo $item['phone'];?></a>
                        <?php }
                    } ?>
                </div>
            <?php } ?>
            <?php if($social_webs) {
                $index = 1; ?>
                <div class="social">
                    <?php foreach($social_webs as $social_web) { 
                        if($index <= 3) { ?>
                            <a href="<?php $social_web['url'];?>" rel="nofollow">
                                <img src="<?php echo $social_web['icon']['url'];?>" alt="<?php echo $social_web['icon']['alt'];?>">
                            </a>
                    <?php }
                    $index++; } ?> 
                </div>
            <?php } ?>
        </div>
        <button class="button popup-open popup-callback"><span class="button-text"><?php the_field('button-header',10);?></span></button>
        <button class="header-nav-button">
            <span></span><span></span><span></span>
        </button>
    </div>    

    <div class="header-nav">
        <?php wp_nav_menu(
            [
                'theme_location' => 'header-nav',
                'menu' => 'header-nav',
                'container' => 'nav',
                'menu_class' => 'nav',
            ]
        ); ?>

        <div class="header-mobile">
            <?php if($adress) { ?>
                <div class="header-adresses">
                    <a target="_blank" href="<?php echo $adress[0]['coord'];?>" class="adress"> <?php echo $adress[0]['item'] ?></a>
                    <a target="_blank" href="<?php echo $adress[1]['coord'];?>" class="adress"><?php echo $adress[1]['item'] ?></a>
                    <?php if($work_times) { ?>
                        <div class="header-times"><?php echo $work_times;?></div>
                    <?php } ?>
                    <a href="tel:<?php echo $adress[0]['phone'];?>" class="phone"><?php echo $adress[0]['phone'];?></a>
                    <a href="tel:<?php echo $adress[1]['phone'];?>" class="phone"><?php echo $adress[1]['phone'];?></a>
                </div>
            <?php } ?>
            <button class="button popup-open popup-callback"><span class="button-text"><?php the_field('button-header',10);?></span></button>
        </div>
    </div>
</header>