
<div class="modal pu-attachmentSelector drop-area" tabindex="-1" role="dialog" url="<{$smarty.get.url}>" filename="<{$smarty.get.filename|escape}>" ratioW="<{$imageSettings.ratioW}>" ratioH="<{$imageSettings.ratioH}>" minW="<{$imageSettings.minW}>" minH="<{$imageSettings.minH}>">
    <input type="file" multiple="multiple" class="hide" id="upload-button<{$smarty.get.jsonAttachment}>-<{$smarty.get.callback}>" />

    <div class="modal-dialog modal-dialog-add-photo">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close">
                    <span aria-hidden="true"><i class="material-icons ic_highlight_off"></i></span>
                </button>
                <h4 class="modal-title">Загрузка и выбор фото</h4>
            </div>
            <div class="modal-body">
                <div class="modal-body-content">
                    <div class="js-attachment-msg js-attachment-msg-default hide alert alert-info">
                        Чтобы выбрать другое фото, кликните на другое фото
                    </div>
                    <div class="js-attachment-msg js-attachment-msg-not-selected hide alert alert-warning">
                        Выберите фото, кликнув по нему
                    </div>
                    <div class="js-attachment-msg js-attachment-msg-no-photo hide alert alert-danger">
                        У вас нет фото, загрузите сначала фото
                    </div>
                    <div class="attachment-area">
                        <div class="attachment-wrapper">
                            <div class="attachments row js-l-scope">
                                <{include file="misc/attachment_list.tpl"}>
                            </div>
                            <div class="attachment-upload">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="form-inline" style="padding-bottom: 15px;">
                    <div class="form-group">
                        <input type="text" class="form-control js-url-upload-field" placeholder="Загрузить файл по URL" />

                        <button type="button" class="btn btn-success hide js-url-upload-button">
                            Загрузить
                        </button>
                    </div>

                    <label for="upload-button<{$smarty.get.jsonAttachment}>-<{$smarty.get.callback}>" class="btn btn-success btn-large">
                        Выбрать файлы для загрузки
                    </label>
                </div>

                <button type="button" class="save btn btn-primary js-add-selected-photo">
                    OK 
                    <span class="js-show-only-multiple hide">(Выбрано фотографий: <span class="js-select-img-count"></span>)</span>
                </button>

                <button type="button" class="js-select-all-img js-show-only-multiple btn btn-info hide">
                    Выбрать все
                </button>

                <button type="button" class="js-unselect-all-img js-show-only-multiple btn btn-danger hide">
                    Снять выделение со всех
                </button>

                <button type="button" class="btn btn-warning" data-dismiss="modal">
                    Отмена
                </button>
            </div>
        </div>
    </div>
</div>
