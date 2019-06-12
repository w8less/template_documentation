
<{foreach $data as $a}>
    <div class="col-lg-2 col-md-3 col-sm-4 attachment" attachment-file-id="<{$a.photo_id}>" data-href="<{$a.href}>">
        <div class="attachment-inner">
            <{foreach $languages as $language}>
                <input type="hidden" class="js-photo-description js-photo-description-<{$language.code}>" value="<{$a.description[$language.language_id]|escape}>" />
            <{/foreach}>

            <div class="attachment-block">
                <div class="attachment-control hover-show">
                    <div class="inner-wrp">
                        <div class="inner">
                            <span>
                                <img src="<{$a.photo_file_small}>" src-original="<{$a.photo_file}>" img-width="<{$a.photo_width}>" img-height="<{$a.photo_height}>" />
                            </span>
                        </div>
                    </div>

                    <a href="#remove" class="remove">
                        <span aria-hidden="true">&times;</span>
                    </a>

                    <div class="control-buttons">
                        <a href="#edit-photo-<{$a.photo_id}>" class="js-photo-text-button edit-photo-btn btn btn-sm btn-default hover-hide" title="Описание изображения">
                            <span class="material-icons ic_mode_edit"></span>
                        </a>

                        <a href="#sort-photo-<{$a.photo_id}>" class="js-sorting-handle order-photo-btn btn btn-sm btn-default hover-hide" title="Сортировать изображения">
                            <span class="material-icons ic_open_with"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
<{/foreach}>
