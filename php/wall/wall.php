<div class="wall-container">
    <div class="wall-div">
        <h3>Овде нас можете питати било шта везано за тему, или питати за детерминацију врсте</h3>
        <?php if (isset($_SESSION['userID']) or isset($_SESSION['adminID'])) {
            echo '
            <div class="upload-div ">
                <div class="upload-first">
                    <div class="upload-sec1">
                        <div class="user-img">
                            <i class="fa-solid fa-a fa-3x userF"></i>
                        </div>
                        <i class="fa-solid fa-camera-retro fa-4x img-icon btn-add-img" title="Изабери слике"><input
                                type="file"  multiple="multiple" id="selectedFile" style="display: none;" /></i>
                    </div>
                    <div class="upload-sec2">
                        <textarea name="questionText" class="question-text" cols="40" rows="4"
                            placeholder="Што више информација, то смо ближи успешној детерминацији..."></textarea>
                    </div>
                </div>
                <div class="upload-show">
                    <div class="show-left">
                        <div class="img-box box1"></div>
                    </div>
                    <div class="show-right">
                        <div class="img-box box2"></div>
                        <div class="img-box box3"><div class="count-of-imgs-div"><p>+0</p></div></div>
                    </div>
                    <div class="btn-upload-box">
                        <i title="Пошаљи" class="fa-solid fa-upload fa-4x btn-upload"></i>
                    </div>
                </div>
                <i class="fa-solid fa-trash btnGiveUp fa-2x"></i>
            </div>';
        } ?>
        <div class="post-div" style="display: none;">

            <div class="info-post-div">
                <div class="user-img">
                    <i class="fa-solid fa-3x userF"></i>
                </div>
                <div class="info-post-name">
                    <div class="info-post-flname">
                        <div class="p-name">Jovan Petrovic</div>
                        <div class="p-post-member">Clan drustva</div>
                    </div>
                    <div class="info-post-time">12.12.2007 13:12</div>
                </div>
                <div class="info-post-det">
                    <i class="fa-solid fa-circle-question fa-4x"></i>
                </div>
            </div>
            <div class="text-post-div">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic omnis, delectus
                nulla quos, nostrum sit nam architecto harum excepturi maiores ex suscipit expedita? Fugiat, deserunt
                delectus. Et voluptatum vero veniam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio atque eaque animi, consequuntur ab consectetur iure modi laborum libero velit obcaecati!
                Nesciunt impedit quidem quam praesentium sint, placeat obcaecati perspiciatis!
            </div>
            <div class="post-img-div">
                <div class="img-left-div">
                    <div class="img-box img1"></div>
                </div>
                <div class="img-right-div">
                    <div class="img-box img2"></div>
                    <div class="img-box img3">
                        <div class="count-of-imgs-div">
                            <p>+0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="determination-div">
                <div class="det-icon-admin"></div>
                <div class="det-admin-name">
                    <div class="admin-name">Jovan Jovanovic</div>
                    <div class="admin-title">Determinator</div>
                </div>
                <i class="fa-solid fa-arrow-right-long fa-3x arror-to-sp"></i>
                <div class="det-species-name">Boletus luridiformis</div>

                <i class="fa-sharp fa-solid fa-circle-check fa-3x det-confirm"></i>
                <div class="num-det-confirm">x1</div>
            </div>
            <div class="post-comments-div">
                <i title="обриши" class="fa-solid fa-trash  btn-deletePost"></i>
                <div class="see-comments">
                    <i class="fa-solid fa-comments fa-3x btn-seeComments">
                        <div class="num-mess">0</div>
                    </i>
                </div>
                <?php
                if (isset($_SESSION['adminID'])) {
                    echo '
                        <div class="set-determination-div">
                            <i title="Додај детерминацију" class="fa-solid fa-tag fa-3x set-determination"></i>
                        </div>';
                }
                ?>

                <div class="post-comms-div" style="display: none;">
                    <i class="fa-solid fa-ellipsis-vertical btn-change-com fa-2x"></i>

                    <div class="com-creator-img">
                        <i class="fa-solid fa-3x fa-a com-creator-icon"></i>
                    </div>
                    <div class="com-creator-info">
                        <p class="com-fname"></p>
                        <p class="com-lname"></p>
                        <p class="com-title"></p>
                    </div>
                    <div class="com-for-st"></div>
                    <div class="com-creator-text">
                    </div>
                </div>
                <?php if (isset($_SESSION['userID']) or isset($_SESSION['adminID'])) {
                    echo '
                    <div class="com-input-text-div" style="display: none;">
                        <textarea cols="40" rows="4" placeholder="Напишите ваш коментар." class="input-text"></textarea>
                        <i class="fa-solid fa-share fa-3x btn-con-send"></i>
                    </div>';
                }
                ?>
            </div>
        </div>
    </div>
</div>