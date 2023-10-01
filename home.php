<?php 
/*
Template Name: Главная страница
Template Post Type: page
*/

get_header();

?>

<main class="homepage">

    <section class="hero">
        <div class="hero-wrapper">
            <div class="hero-text">
                <h1 class="hero-title"><?php the_field('hero-title');?></h1>
                <p class="hero-desc"><?php the_field('hero-desc');?></p>
                <button class="button popup-open popup-order">
                    <span class="button-text"><?php the_field('hero-button');?></span>
                </button>
            </div>
            <div class="hero-slider-wrapper">
                <?php $catalog = get_field('catalog-file');
                if($catalog) { ?>
                    <a href="<?php echo $catalog;?>" class="catalog-download"></a>
                <?php } ?>
                <div class="hero-slider swiper">
                    <div class="swiper-wrapper">
                        <?php 
                            $imgs = get_field('hero-slider');
                            foreach($imgs as $img) { ?>
                                <div class="swiper-slide">
                                    <img src="<?php echo $img['img']['url'];?>" alt="<?php echo $img['img']['alt'];?>"> 
                                </div>
                            <?php }
                        ?>
                    </div>
                    <div class="hero-slider-buttons buttons-slider">
                        <button class="button-prev"></button>
                        <button class="button-next"></button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php 
    $advantages = get_field('advantages');
    $advatages_items = $advantages['advantage'];
    if($advatages_items) { ?>
        <section class="advantages section-white" id="advantages">
            <h2 class="title animation"><?php echo $advantages['title'];?></h2>

            <div class="advantages-wrapper">
                <?php foreach($advatages_items as $item) { ?>
                    <div class="advantage-item animation">
                        <img src="<?php echo $item['icon']['url'];?>" alt="<?php echo $item['icon']['url'];?>" class="advantage-img">
                        <div class="advantage-text"><?php echo $item['text'];?></div>
                    </div>
                <?php } ?>
            </div>

        </section>
    <?php } ?>

    <section class="products products-slider swiper" id="products">
        <h2 class="title animation">Продукция Fusionline</h2>
        <nav class="products-nav animation">
            <div class="products-categories">
                <button class="products-category active">Все</button>
                <?php 
                $cats = get_categories([
                    'child_of' => 2
                ]);
                usort($cats, fn($a, $b) => strcmp($a->term_id, $b->term_id));
                foreach($cats as $cat) { ?>
                    <button class="products-category" data-id=<?php echo $cat->term_id; ?>><?php echo $cat->name; ?></button>
                <?php } ?>
            </div>
            <div class="products-buttons buttons-slider">
                <button class="button-prev"></button>
                <button class="button-next"></button>
            </div>
        </nav>
        <div class="products-wrapper swiper-wrapper ">
            <div class="products-item products-item-null">
                <div class="products-item-top">
                    <div class="products-item-top-null"></div>
                </div>
                <div class="products-item-bottom">
                    <div class="products-item-title-null"></div>
                    <div class="products-item-price-null"></div>
                </div>
            </div>
        </div>
        <div class="products-button animation">
            <a target="_blank" href="http://radiator-fusion.com/catalog/" class="button" rel="nofollow">
                <span class="button-text">Посмотреть весь каталог</span>
            </a>
        </div>
    </section>

    <?php 
    $produce = get_field('produce');
    $produce_items = $produce['variables'];
    if($produce) { ?>
        <section class="produce section-white" id="sizes">
            <h2 class="title animation"><?php echo $produce['title'];?></h2>
            <p class="subtitle-desc animation"><?php echo $produce['desc'];?></p>
            <?php if($produce_items) { ?>
                <div class="produce-wrapper">
                    <?php foreach($produce_items as $item) { ?>
                    
                        <div class="produce-item animation">
                            <?php if($item['text']) { ?>
                                <div class="produce-item-top"><?php echo $item['text'];?></div>
                            <?php } ?>
                            <div class="produce-item-img">
                                <img src="<?php echo $item['img']['url'];?>" alt="<?php echo $item['img']['alt'];?>">
                            </div>
                            <div class="produce-item-height"><?php echo $item['height'];?></div>
                            <div class="produce-item-width"><?php echo $item['width'];?></div>
                        </div>

                    <?php } ?>
                </div>
            <?php } ?>
        </section>
    <?php }
    ?>

    <?php 
    $use = get_field('use');
    $materials = $use['materials'];
    if($use) { ?>

        <section class="use section-white" id="use">
            <h2 class="title animation"><?php echo $use['title'];?></h2>
            <?php if($materials) { ?>
                <div class="use-wrapper">
                    <?php foreach($materials as $material) { ?>
                        <div class="use-item">
                            <div class="use-text">
                                <div class="use-text-title">
                                    <div class="icon"><span></span><span></span></div>
                                    <?php echo $material['title'];?>
                                </div>
                                <div class="use-text-desc"><?php echo $material['desc'];?></div>
                            </div>
                            <img src="<?php echo $material['img']['url'];?>" alt="<?php echo $material['img']['alt'];?>" class="use-img">
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>
        </section>

    <?php } ?>

    <?php 
    $quiz = get_field('quiz');
    $quiz_questions = $quiz['item'];
    $index_question = 1;
    $index_answer = 1;
    if($quiz) { ?>

        <section class="quiz">
            <h2 class="title animation"><?php echo $quiz['title'];?></h2>

            <form class="quiz-form">
                <div class="quiz-slide swiper ">
                    <div class="swiper-wrapper">

                        <?php foreach($quiz_questions as $question) { 
                            $answers = $question['answers']; ?>
                            

                            <div class="quiz-item swiper-slide">
                                <div class="quiz-item-top">
                                    <div class="quiz-item-num"></div>
                                    <div class="quiz-item-title"><?php echo $question['question'];?></div>
                                </div>

                                <div class="quiz-item-content">

                                    <?php foreach($answers as $answer) { 
                                        $img = $answer['img']; 
                                        $class = 'quiz-item-checkbox'; 
                                        if($img) {
                                            $class = 'quiz-item-checkbox quiz-item-checkbox__img';
                                        }?>

                                        <label class="<?php echo $class;?>" for="quiz-<?php echo $index_answer;?>">
                                            <?php if($img) { ?>
                                                <img src="<?php echo $img['url'];?>" alt="<?php echo $img['alt'];?>">
                                            <?php } ?>
                                            <span class="text"><?php echo $answer['answer'];?></span>
                                            <input type="radio" value="<?php echo $answer['answer'];?>" id="quiz-<?php echo $index_answer;?>" name="<?php echo $question['question']; ?>">
                                        </label>
                                                
                                    <?php $index_answer++; } ?>
                                    
                                    <?php if($question['input']) { ?>

                                        <label class="<?php echo $class;?> quiz-item-checkbox__other" for="other-<?php echo $index_question;?>">
                                            <input type="text" class="input input-<?php echo $question['input-type'];?>" placeholder="Другое...">
                                            <input type="radio" value="" id="other-<?php echo $index_question;?>" name="<?php echo $question['question'];?>">
                                        </label>

                                    <?php } ?>
                                </div>
                            </div>

                        <?php $index_answer++; } ?>

                        <div class="quiz-item swiper-slide">
                            <div class="quiz-item-top">
                                <div class="quiz-item-num"></div>
                                <div class="quiz-item-title">Оставьте контактные данные и менеджеры свяжутся с вами в ближайшее время</div>
                            </div>
                            <div class="quiz-item-content">
                                <input type="hidden" value="<?php the_field('admin-email', 10);?>" name="admin_email">
                                <input type="text" class="input-text" name="Имя" placeholder="Ваше имя" required>
                                <input type="tel" class="input-text" name="Телефон" placeholder="Ваш телефон" required>
                                <div class="quiz-subtitle">Как с вами связаться?</div>
                                <label class="quiz-item-checkbox" for="contact-1">
                                    Напишите в Telegram
                                    <input type="radio" value="Telegram" id="contact-1" name="Способ связи">
                                </label>
                                <label class="quiz-item-checkbox" for="contact-2">
                                    Напишите в WhatsApp
                                    <input type="radio" value="WhatsApp" id="contact-2" name="Способ связи">
                                </label>
                                <label class="quiz-item-checkbox" for="contact-3">
                                    Позвоните по номеру
                                    <input type="radio" value="Позвонить" id="contact-3" name="Способ связи">
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="quiz-buttons">
                        <button class="quiz-button-prev button disabled">
                            <div class="button-text"><?php echo $quiz['button-prev'];?></div>
                        </button>
                        <button class="quiz-button-next button disabled">
                            <div class="button-text"><?php echo $quiz['button-next'];?></div>
                        </button>
                    </div>
                </div>
            </form>

        </section>

    <?php } ?>

    <?php 
    $about = get_field('about');
    $numbers = $about['numbers'];

    
    if($about) { ?>

        <section class="about section-white" id="about">
            <h2 class="title animation"><?php echo $about['title'];?></h2>

            <?php 
            
            if($about['video_id']) { ?>
                <div class="video-player animation" id="player">
                    <iframe
                        loading="lazy"
                        src="https://www.youtube.com/embed/<?php echo $about['video_id'];?>?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
                        allowfullscreen
                        allowtransparency
                        allow="autoplay"
                    ></iframe>
                </div>
            <?php }else if($about['video']) { ?>
                <video id="player" playsinline controls class="video-player animation">
                    <source src="<?php echo $about['video'];?>" type="video/mp4" />
                </video>
            <?php }

            ?>

            <?php if ($numbers) { ?>
                <div class="about-numbers">
                    <?php foreach($numbers as $number) { ?>
                        <div class="about-number animation">
                            <div class="about-number-arrow"></div>
                            <div class="about-number-content">
                                <div class="number"><?php echo $number['number'];?></div>
                                <div class="desc"><?php echo $number['desc'];?></div>
                            </div>
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>
        </section>

    <?php } ?>

    <?php 
    $gallery = get_field('gallery');
    $gallery_items = $gallery['gallery'];

    if($gallery_items) { ?>

        <section class="gallery gallery-slider swiper" id="gallery">

            <div class="gallery-top animation">
                <h2 class="title "><?php echo $gallery['title'];?></h2>

                <div class="gallery-buttons buttons-slider">
                    <button class="button-prev"></button>
                    <button class="button-next"></button>
                </div>

            </div>

            <div class="swiper-wrapper ">

                <?php foreach($gallery_items as $gallery_item) { ?>

                    <img loading="lazy" src="<?php echo $gallery_item['url'];?>" alt="<?php echo $gallery_item['alt'];?>" class="gallery-item swiper-slide animation">

                <?php } ?>

            </div>

        </section>

    <?php } ?>

    <?php 
    $warrantys = get_field('warranty');
    $warranty_items = $warrantys['item'];

    if($warranty_items) { ?>

        <section class="warranty" id="warranty">
            <h2 class="title animation"><?php echo $warrantys['title'];?></h2>

            <div class="warranty-advantage">
                <div class="warranty-img">
                    <div class="warranty-img-content"><img src="<?php echo $warrantys['img']['url'];?>" alt="<?php echo $warrantys['img']['url'];?>"></div>
                </div>
                <?php foreach($warranty_items as $warranty) { ?>
                    <div class="warranty-item">
                        <img src="<?php echo $warranty['icon']['url'];?>" alt="<?php echo $warranty['icon']['alt'];?>" class="icon">
                        <?php echo $warranty['text'];?>
                    </div>
                <?php } ?>
            </div>

            <?php 

            if($warrantys['block']) { ?>

                <div class="warranty-lead">
                    <div class="warranty-lead-content">
                        <div class="warranty-lead-title"><?php echo $warrantys['block']['title'];?></div>
                        <div class="warranty-lead-desc"><?php echo $warrantys['block']['desc'];?></div>
                        <button class="button popup-open popup-calculation">
                            <span class="button-text"><?php echo $warrantys['button'];?></span>
                        </button>
                    </div>
                </div>

            <?php } ?>
        </section>

    <?php } ?>

    <?php 
    $partners = get_field('partners');

    if($partners) { ?>

        <section class="partners section-white" id="partners">
            <h2 class="title animation"><?php echo $partners['title'];?></h2>
            <?php if($partners['clients']) { ?>
                <div class="partners-clients animation">
                    <div class="number"><?php echo $partners['clients']['number'];?></div>
                    <div class="desc"><?php echo $partners['clients']['text'];?></div>
                </div>
            <?php } ?>

            <?php if($partners['partners']) { ?>
                <div class="partners-slider swiper-slide animation">
                    <div class="swiper-wrapper">
                        <?php foreach($partners['partners'] as $partner) { ?>

                            <img loading="lazy" src="<?php echo $partner['url'];?>" alt="<?php echo $partner['url'];?>" class="partners-item swiper-slide">
                            
                        <?php } ?>
                    </div>
                </div>
            <?php } ?>
        </section>

    <?php } ?>

    <?php
    $faq = get_field('faq');
    $questions = $faq['questions'];
    $questions_lenght = round(count($questions) / 2);
    $index = 1;

    if($faq) { ?>

        <section class="faq" id="faq">
            <h2 class="title animation"><?php echo $faq['title'];?></h2>

            <div class="faq-wrapper">
                <?php foreach($questions as $question) { 
                    if($index == 1) { ?>
                        <div class="faq-column">
                    <?php } ?>
                        
                        <div class="faq-item animation">
                            <div class="faq-question">
                                <?php echo $question['question'];?>
                                <div class="icon"><span></span><span></span></div>
                            </div>
                            <div class="faq-answer"><?php echo $question['answer'];?></div>
                        </div>
                    
                    <?php if($index == $questions_lenght) { ?>
                        </div>
                        <div class="faq-column">
                    <?php } ?>
                <?php $index++; } ?>
                </div>
            </div>
        </section>

    <?php } ?>

    <section class="map" id="contacts">
        <img src="<?php bloginfo('template_url'); ?>/assets/img/map-bg.webp" alt="Карта" class="map-img">
        <div class="map-form form">
            <h3 class="title">Нужна помощь специалиста?</h3>
            <div class="subtitle">Оставьте ваш номер телефона, мы свяжемся с вами и ответим на все вопросы!</div>
            <form>
                <input type="hidden" value="<?php the_field('admin-email', 10);?>" name="admin_email">
                <div class="input-button">
                    <input class="input-text" type="tel" name="Телефон" placeholder="Ваш телефон" required>
                </div>
                <button class="button">
                    <span class="button-text">Получить консультацию</span>
                </button>
            </form>
            <div class="form-second">
                Нажимая на кнопку “Получить консультацию”, я соглашаюсь на обработку персональных данных и соглашаюсь с <a href="/privacy">политикой конфиденциальности</a>
            </div>
        </div>
    </section>


</main>

<?php get_footer();?>