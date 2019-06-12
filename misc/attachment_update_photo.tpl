
<div class="modal modal-update-photo js-update-photo" attachment-file-id="<{$photo.photo_id}>" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="material-icons ic_highlight_off"></i></span>
                </button>
                <h4 class="modal-title">
                    Редактирование фото
                </h4>
            </div>
            <div class="modal-body text-left">
                <form action="<{$smarty.get.url}>&act=update" method="POST">
                    <div class="row">
                        <div class="col-sm-5">
                            <div class="edit-photo-block" style="background-image: url(<{$photo.photo_file_small}>);">
                                <div class="photo-info">
                                    <span class="photo-date-added">
                                        <i class="material-icons ic_add"></i>
                                        <{$photo.photo_date_added}>
                                    </span>
                                    <{*span class="photo-date-edit">
                                    <i class="material-icons ic_mode_edit"></i>
                                    08.04.2016
                                    </span*}>
                                    <a href="<{$photo.absoluteUrl}>" target="_blank" class="photo-date-insert-link" data-copy-text="URL скопирован">
                                        <i class="material-icons ic_insert_link"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-7">
                            <div class="form-group">
                                <span class="text-lable">
                                    <{t text='file-name-photo-edit-module'}>
                                    :
                                    <span class="file-name" data-file-name="<{$photo.photo_file_small}>"></span>
                                </span>
                            </div>
                            <div class="form-group">
                                <div class="input-group js-l-scope">
                                    <{foreach $languages as $language}>
                                        <textarea rows="4" placeholder="Описание фотографии" autosaving-name="photos[<{$photo.photo_id}>][description][<{$language.language_id}>]" code="<{$language.code}>" class="form-control attachment-photo-description js-attachment-photo-description js-l-selectee<{if $language.language_id != $active_language_id}> hide<{else}> js-original-language-textarea<{/if}>"><{$photo.description[$language.language_id]|htmlspecialchars}></textarea>
                                    <{/foreach}>

                                    <{include '../misc/language_selector.tpl'}>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group input-group-icon">
                                    <i class="material-icons ic_open_in_new"></i>
                                    <input type="text" placeholder='Ссылка при клике на фото в режиме "слайдер" и "галерея"' autosaving-name="photos[<{$photo.photo_id}>][href]" class="form-control attachment-photo-href js-attachment-photo-href" value="<{$photo.href|escape}>" />
                                </div>
                            </div>
                            <div class="form-group" style="padding-top: 3px;">
                                <div class="row">
                                    <div class="col-sm-7 js-toggle-photo-loc-date-wrp">
                                        <div class="photo-localtion">
                                            <span class="js-toggle-photo-loc-date-btn">
                                                <{if $photo.latitude && $photo.longitude}>
                                                    <i class="material-icons ic_edit_location"></i>
                                                    Изменить координаты
                                                <{else}>
                                                    <i class="material-icons ic_add_location"></i>
                                                    Указать координаты
                                                <{/if}>
                                            </span>
                                        </div>
                                        <div class="photo-localtion-value js-toggle-photo-loc-date-value row">
                                            <div class="col-sm-12" style="padding-right: 8px;">
                                                <div id="photo-update-location" style="width:350px; height:350px;"></div>
                                            </div>

                                            <div class="col-sm-5" style="padding-right: 8px;">
                                                <input type="text" class="form-control js-photo-update-latitude" placeholder="Широта" autosaving-name="photos[<{$photo.photo_id}>][latitude]" value="<{$photo.latitude}>" />
                                            </div>
                                            <div class="col-sm-5" style="padding-left: 7px;">
                                                <input type="text" class="form-control js-photo-update-longitude" placeholder="Долгота" autosaving-name="photos[<{$photo.photo_id}>][longitude]" value="<{$photo.longitude}>" />
                                            </div>
                                            <{*div class="col-sm-2" style="padding: 0;">
                                            <a href="" class="btn btn-success" style="padding: 3px 11px;">
                                            ok
                                            </a>
                                            </div*}>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-sm-offset-1 js-toggle-photo-loc-date-wrp">
                                        <div class="photo-date-created text-right">
                                            <span class="js-toggle-photo-loc-date-btn">
                                                <i class="material-icons ic_camera_alt"></i>
                                                <{if $photo.time_taken}>
                                                    <{$photo.time_taken|date_format:"%Y-%m-%d"}>
                                                <{else}>
                                                    Дата сьемки
                                                <{/if}>
                                            </span>
                                        </div>
                                        <div class="photo-date-created-value js-toggle-photo-loc-date-value row">
                                            <div class="col-sm-12">
                                                <input type="text" class="form-control js-time-taken" placeholder="Дата сьемки" autosaving-name="photos[<{$photo.photo_id}>][time_taken]" value="<{$photo.time_taken|date_format:"%Y-%m-%d"}>" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="Укажите ссылку происхождения фото" autosaving-url="<{$smarty.get.url}>&act=update" autosaving-name="photos[<{$photo.photo_id}>][source]" autosaving-method="POST" class="form-control attachment-photo-source js-attachment-photo-source" value="<{$photo.source|escape}>" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">
                    Назад
                </button>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        jQuery(function ($) {
            var map = false;
            $('.js-toggle-photo-loc-date-value').one('open', function () {
                if (google && map === false) {

        <{if $photo.latitude && $photo.longitude}>
                    var myLatlng = new google.maps.LatLng(<{$photo.latitude}>, <{$photo.longitude}>);
        <{else}>
                    var myLatlng = new google.maps.LatLng(52.520591, 13.407111);
        <{/if}>
                    var myOptions = {
                        zoom: 17,
                        center: myLatlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }

                    map = new google.maps.Map(document.getElementById("photo-update-location"), myOptions);
                    var marker = new google.maps.Marker({
                        draggable: true,
                        position: myLatlng,
                        map: map,
                        title: "Your location"
                    });

                    google.maps.event.addListener(marker, 'drag', function (event) {
                        $('.js-photo-update-latitude').val(this.getPosition().lat());
                        $('.js-photo-update-longitude').val(this.getPosition().lng());
                    });

                    google.maps.event.addListener(marker, 'dragend', function (event) {
                        $('.js-photo-update-latitude').val(this.getPosition().lat()).trigger('change');
                        $('.js-photo-update-longitude').val(this.getPosition().lng()).trigger('change');
                    });

                }
            });

            var fileName = $('.file-name').attr('data-file-name').split('/');
            fileName = fileName[fileName.length - 1].split('-_');
            fileName = fileName[0];
            $('.file-name').text(fileName);
        });
    </script>
</div>
