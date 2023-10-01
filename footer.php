<footer class="footer">
    <div class="footer-wrapper">
        <div class="footer-col">

            <div class="logo">
                <?php the_custom_logo();?>
                <div class="logo-text">
                    Дизайнерские радиаторы <br>
                    и полотенцесушители
                </div>
            </div>

        </div>

        <div class="footer-col">
            <?php wp_nav_menu(
                [
                    'theme_location' => 'header-nav',
                    'menu' => 'header-nav',
                    'container' => 'nav',
                    'menu_class' => 'nav',
                ]
            ); ?>
        </div>

        <div class="footer-col">

            <?php $adress = get_field('adress', 10); 
            $work_times = get_field('work-times', 10);
            $email = get_field('email', 10);
            
            foreach($adress as $item) { ?>

                <a class="footer-adress" target="_blank" href="<?php echo $item['coord'];?>"><?php echo $item['item'];?></a>
                <a href="tel:<?php echo $item['phone'];?>" class="footer-phone"><?php echo $item['phone'];?></a>

            <?php } ?>
            <a href="mailto:<?php echo $email;?>" class="mail"><?php echo $email;?></a>
            <div class="footer-work"><?php echo $work_times;?></div>
        </div>

        <div class="footer-col">
            <button class="button popup-open popup-order">
                <span class="button-text "><?php the_field('button-footer',10);?></span>
            </button>

            <div class="social">
                <?php 
                $social_webs = get_field('social-web', 10);
                foreach($social_webs as $social_web) {  ?>
                    <a href="<?php $social_web['url'];?>" rel="nofollow">
                        <img src="<?php echo $social_web['icon']['url'];?>" alt="<?php echo $social_web['icon']['alt'];?>">
                    </a>
                <?php } ?> 
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <a href="/privacy">Политика конфиденциальности</a>
        <!-- <a href="#">Пользовательское соглашение</a> -->
    </div>
</footer>

<div class="popup popup-product">
    <div class="popup-body">
        <div class="close">
            <span></span><span></span>
        </div>

        <div class="popup-product-top">
            <div class="popup-product-wrapper">
                <div class="popup-thumb">
                    <div class="swiper-wrapper popup-thumb-wrapper"></div>
                </div>
            </div>
            <div class="popup-product-wrapper">
                <div class="popup-gallery">
                    <div class="swiper-wrapper popup-gallery-wrapper"></div>
                </div>
            </div>
            <div class="popup-product-info">
                <h3 class="title popup-product-title"></h3>
                <ul class="popup-product-chars"></ul>
                <button class="button popup-open popup-order">
                    <span class="button-text">Сделать заказ</span>
                </button>
            </div>
        </div>

        <div class="popup-product-interier swiper">
            <div class="popup-interier-top">
                <h2 class="title popup-interier-title"></h2>
                <div class="interier-buttons buttons-slider">
                    <button class="button-prev"></button>
                    <button class="button-next"></button>
                </div>
            </div>
            <div class="swiper-wrapper popup-interier-wrapper">
                
            </div>
        </div>
    </div>
</div>

<div class="popup popup-form form">

    <div class="popup-body">
        <div class="close">
            <span></span><span></span>
        </div>
        <h3 class="title">Сделайте заказ</h3>
        <p class="subtitle">Оставьте ваш номер телефона, мы свяжемся с вами для подтверждения</p>
        <form>
            <input type="hidden" value="<?php the_field('admin-email', 10);?>" name="admin_email">
            <div class="input-button">
                <input class="input-text" type="tel" name="Телефон" placeholder="Ваш телефон">
            </div>
            <button class="button">
                <span class="button-text">Получить консультацию</span>
            </button>
        </form>
        <div class="form-second">
            Нажимая на кнопку “Получить консультацию”, я соглашаюсь на обработку персональных данных и соглашаюсь с <a href="/privacy">политикой конфиденциальности</a>
        </div>
    </div>
</div>

<div class="mobile-social">
    <?php 
    $index = 0;
    foreach($social_webs as $social_web) {  
        if($index <= 2) { ?>
            <div class="mobile-social-item">
                <a href="<?php $social_web['url'];?>" rel="nofollow">
                    <img src="<?php echo $social_web['icon']['url'];?>" alt="<?php echo $social_web['icon']['alt'];?>">
                </a>
                <?php echo $social_web['icon']['alt'];?>
            </div>
    <?php } $index++; } ?> 
    <button class="mobile-social-item popup-open popup-callback">
        <div class="mobile-social-callback-icon"></div>
        Заказать звонок
    </button>
</div>

    
    <?php wp_footer();?>

    </body>
</html>