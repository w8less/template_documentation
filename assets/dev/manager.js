
(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        require(['bootstrap', 'jquery-ui', 'languageSelector', 'autosaving', 'gmaps']);
        factory(exports, require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        define(['exports', 'jquery', 'bootstrap', 'jquery-ui', 'languageSelector', 'autosaving', 'gmaps'], factory);
    } else {
        factory((global.fileManager = {}), global.jQuery);
    }
}(this, (function (exports, $) {
    'use strict';
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);

            if (typeof Object.getOwnPropertySymbols === 'function') {
                ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }

            ownKeys.forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        }

        return target;
    }

    function _toType(obj) {
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function _isElement(obj) {
        return (obj[0] || obj).nodeType;
    }

    function _typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
            if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                var expectedTypes = configTypes[property];
                var value = config[property];
                var valueType = value && _isElement(value) ? 'element' : _toType(value);

                if (!new RegExp(expectedTypes).test(valueType)) {
                    throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
                }
            }
        }
    }

    var Manager = function ($) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'fileManager';
        var VERSION = '2.0.0';
        var DATA_KEY = 'bscms.fileManager';
        var EVENT_KEY = "." + DATA_KEY;
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var Default = {
            toggle: true,
            parent: ''
        };
        var DefaultType = {
            toggle: 'boolean',
            url: 'string',
            parent: '(string|element)'
        };
        var Event = {
            SHOW: "show" + EVENT_KEY,
            SHOWN: "shown" + EVENT_KEY,
            HIDE: "hide" + EVENT_KEY,
            HIDDEN: "hidden" + EVENT_KEY,
            _UPDATE: "_update" + EVENT_KEY
        };
        var ClassName = {
            SHOW: 'show',
            COLLAPSE: 'collapse',
            COLLAPSING: 'collapsing',
            COLLAPSED: 'collapsed'
        };
        var Dimension = {
            WIDTH: 'width',
            HEIGHT: 'height'
        };
        var Selector = {
            ACTIVES: '.show, .collapsing',
            DATA_TOGGLE: '[data-toggle="fileManager"]'
        };
        var Modal = {};

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */
        var Manager = function () {
            function Manager(element, config) {
                /**
                 * select/input HTML element to get/update value
                 */
                this._element = element;

                /**
                 * for manual usage instead of _element, value will be saved here
                 */
                this._value = [];

                /**
                 * for manual usage instead of _element, callback will be called when selection approved
                 */
                this._callback = false;

                /**
                 * is manager shown
                 */
                this._shown = false;

                /**
                 * Module config
                 */
                this._config = this._getConfig(config);
            }

            // Getters

            var _proto = Manager.prototype;

            // Public
            _proto.toggle = function toggle() {
                if (this._shown) {
                    this.hide();
                } else {
                    this.show();
                }
            };

            _proto.init = function init() {
                this._getModal();
            };

            _proto.show = function show() {
                var $modal = $(this._getModal());

                if (this._shown) {
                    return;
                }

                var startEvent = $.Event(Event.SHOW);
                $(this._element).trigger(startEvent);

                if (startEvent.isDefaultPrevented()) {
                    return;
                }

                if (this._config.multiple) {
                    $modal.find('.js-file-manager-files').selectable("enable");
                } else {
                    $modal.find('.js-file-manager-files').selectable("disable");
                }

                $modal.find('.js-file-manager-files .js-file-manager-file.ui-selected').removeClass('ui-selected');

                var ids = this._getValue();

                for (var i = 0; i < ids.length; i++) {
                    $modal.find('.js-file-manager-files .js-file-manager-file[data-file-id=' + ids[i] + ']').addClass('ui-selected');
                }

                this._showModal();

                $(this._element).trigger(Event.SHOWN);
            };

            _proto.hide = function hide() {
                if (!this._shown) {
                    return;
                }

                var startEvent = $.Event(Event.HIDE);
                $(this._element).trigger(startEvent);

                if (startEvent.isDefaultPrevented()) {
                    return;
                }

                this._hideModal();

                $(this._element).trigger(Event.HIDDEN);
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                this._config = null;
                this._parent = null;
                this._element = null;
                this._triggerArray = null;
            };


            /**
             * Show prepared modal
             * @returns null
             */
            _proto._showModal = function _showModal() {
                var $modal = $(this._getModal());

                $modal.modal('show');
            };

            /**
             * Hide modal
             * @returns null
             */
            _proto._hideModal = function _hideModal() {
                var $modal = $(this._getModal());

                $modal.modal('hide');
            };

            _proto._getModal = function _getModal() {
                if (!this._config.url) {
                    return;
                }

                if (!this._modal) {
                    this._modal = this._getModalValue('modal');

                    if (this._modal) {
                        this._bindElement();
                    } else {
                        this._modal = $(this._render('modal', {
                            header: "Менеджер файлов",
                        })).appendTo(document.body).get(0);

                        this._bindModal();
                        this._bindElement();
                        this._update();

                        this._setModalValue('modal', this._modal);
                    }
                }

                return this._modal;
            };

            /**
             * Sets global value for modal
             * @param string key
             * @param mixed value
             * @returns null
             */
            _proto._setModalValue = function _setModalValue(key, value) {
                if (!this._config.url) {
                    return;
                }

                if (!Modal.hasOwnProperty(this._config.url)) {
                    Modal[this._config.url] = {};
                }

                Modal[this._config.url][key] = value;
            };

            /**
             * Get global value for modal
             * @param string key
             * @returns mixed
             */
            _proto._getModalValue = function _getModalValue(key) {
                if (!this._config.url) {
                    return;
                }

                if (Modal.hasOwnProperty(this._config.url) && Modal[this._config.url].hasOwnProperty(key)) {
                    return Modal[this._config.url][key];
                }
            };

            _proto._bindModal = function _bindModal() {
                var _temporaryThis = this;
                var $modal = $(this._getModal());

                $modal.on('shown.bs.modal', function () {
                    var _this = _temporaryThis._getModalValue('instance');

                    _this._shown = true;
                    _this._updateSelectedText();
                });

                $modal.on('hidden.bs.modal', function () {
                    var _this = _temporaryThis._getModalValue('instance');

                    _this._shown = false;
                });

                $modal.find('.js-file-manager-upload-files').on('change', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    for (var i = 0; i < this.files.length; i++) {
                        _this._uploadFile(this.files[i]);
                    }

                    this.value = '';
                });

                $modal.find('.js-file-manager-files').selectable({
                    filter: ".js-file-manager-file",
                    cancel: ".js-sortable-handle",
                    distance: 5,
                    stop: function (event, ui) {
                        var _this = _temporaryThis._getModalValue('instance');

                        _this._updateSelectedText();
                    }
                });

                $modal.find('.js-file-manager-files').on('click', '.js-file-manager-file-handle', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    var $file = $(this).closest('.js-file-manager-file');

                    if (!_this._config.multiple && !$file.hasClass('ui-selected')) {
                        $file.siblings('.js-file-manager-file').removeClass('ui-selected');
                    }

                    $file.toggleClass('ui-selected');

                    _this._updateSelectedText();
                });

                $modal.find('.js-file-manager-files').on('dblclick', '.js-file-manager-file-handle', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    var $file = $(this).closest('.js-file-manager-file');

                    $file.siblings('.js-file-manager-file').removeClass('ui-selected');
                    $file.addClass('ui-selected');

                    _this._updateSelectedText();
                    _this._confirmSelection();
                    _this.hide();
                });

                $modal.find('.js-file-manager-files').on('click', '.js-file-manager-file-delete', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    var $file = $(this).closest('.js-file-manager-file');

                    _this._deleteFile($file.data('file-id'));
                });

                $modal.find('.js-file-manager-files').on('click', '.js-file-manager-file-update', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');
                    var files = _this._getModalValue('files');
                    var csrf = _this._getModalValue('csrf');
                    var id = parseInt($(this).closest('.js-file-manager-file').data('file-id'));
                    var languages = _this._getModalValue('languages');

                    if (files.hasOwnProperty(id)) {
                        var file = files[id];
                        file.header = "Редактирование данных файла";
                        file.action = _this._config.url + '&action=update';
                        file.csrfData = csrf.csrfParam + '=' + csrf.csrfToken;

                        var $updateModal = $(_this._render('fileUpdateModal', file));

                        var languageSelector = '';
                        var languageButtons = '';
                        var descriptionFields = '';
                        $.each(languages, function (index, value) {
                            value["description"] = file.description[value.language_id] ? file.description[value.language_id] : '';
                            value["csrfData"] = file.csrfData;
                            value["id"] = file.id;

                            descriptionFields += _this._render('fileUpdateModalDescription', value);
                            if (!languageSelector) {
                                descriptionFields = $(descriptionFields).removeClass('hide').get(0).outerHTML;

                                languageSelector += _this._render('fileUpdateModalLanguageMenu', value);
                            } else {
                                languageButtons += _this._render('fileUpdateModalLanguageBtn', value);
                            }
                        });

                        if (languageButtons) {
                            languageSelector = $(languageSelector);
                            languageSelector.find('.js-file-manager-file-update-language-menu').append(languageButtons);

                            descriptionFields += languageSelector.get(0).outerHTML;
                        }

                        $updateModal.find('.js-file-manager-file-update-description').append(descriptionFields);

                        $updateModal.appendTo(document.body);

                        _this._hideModal();
                        $updateModal.on('hidden.bs.modal', function () {
                            $updateModal.remove();
                            _this._showModal();
                            _this._update();
                        }).modal('show');

                        $updateModal.on('hide.bs.modal', function (e) {
                            if ($updateModal.find('.autosaving').length) {
                                e.preventDefault();
                            }
                        });

                        $updateModal.find('.js-file-manager-file-update-date-taken').datepicker({
                            dateFormat: "yy-mm-dd",
                            language: "ru",
                            autoclose: true,
                            todayHighlight: true
                        });

                        var myLatlng = new google.maps.LatLng(52.520591, 13.407111);
                        var latitude = $updateModal.find('.js-file-manager-file-update-latitude').val();
                        var longitude = $updateModal.find('.js-file-manager-file-update-longitude').val();
                        if (latitude && longitude) {
                            var myLatlng = new google.maps.LatLng(latitude, longitude);
                        }

                        var myOptions = {
                            zoom: 17,
                            center: myLatlng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        }

                        var map = new google.maps.Map($updateModal.find('.js-file-manager-file-update-map').get(0), myOptions);
                        var marker = new google.maps.Marker({
                            draggable: true,
                            position: myLatlng,
                            map: map,
                            title: "Shot location"
                        });

                        google.maps.event.addListener(marker, 'drag', function (event) {
                            $updateModal.find('.js-file-manager-file-update-latitude').val(this.getPosition().lat());
                            $updateModal.find('.js-file-manager-file-update-longitude').val(this.getPosition().lng());
                        });

                        google.maps.event.addListener(marker, 'dragend', function (event) {
                            $updateModal.find('.js-file-manager-file-update-latitude').val(this.getPosition().lat()).trigger('change');
                            $updateModal.find('.js-file-manager-file-update-longitude').val(this.getPosition().lng()).trigger('change');
                        });
                    }
                });

                $modal.on('focus click', '.js-file-manager-url-field', function (e) {
                    $modal.find('.js-file-manager-url-button').removeClass('hide');
                });

                $modal.on('blur', '.js-file-manager-url-field', function (e) {
                    if (!this.value) {
                        $modal.find('.js-file-manager-url-button').addClass('hide');
                    }
                });

                $modal.on('click', '.js-file-manager-url-button', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');
                    var $input = $modal.find('.js-file-manager-url-field');

                    if ($input.val()) {
                        _this._uploadFile($input.val());
                    }

                    $input.val('');
                });

                $modal.on('click', '.js-file-manager-all-button', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    _this._toggleAllSection();
                });

                var allSectionPage = 1;
                $modal.on('click', '.js-file-manager-all-prev-button', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    if (allSectionPage > 1) {
                        allSectionPage--;
                    }

                    _this._loadAllSectionPage(allSectionPage);
                });

                $modal.on('click', '.js-file-manager-all-next-button', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    allSectionPage++;

                    _this._loadAllSectionPage(allSectionPage);
                });

                $modal.find('.js-file-manager-all-files').on('click', '.js-file-manager-all-file', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    $(this).toggleClass('ui-selected');

                    _this._updateSelectedAllText();
                });

                $modal.on('click', '.js-file-manager-all-transfer-button', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    _this._transferFiles(allSectionPage);
                });

                $modal.find('.js-file-manager-files').sortable({
                    handle: ".js-sortable-handle",
                    cursor: "move",
                    itemSelector: ".js-file-manager-file",
                    update: function () {
                        var _this = _temporaryThis._getModalValue('instance');

                        _this._updateOrder();
                    }
                });

                $modal.on('click', '.js-file-manager-select', function (e) {
                    var _this = _temporaryThis._getModalValue('instance');

                    _this._confirmSelection();
                    _this.hide();
                });
            };

            _proto._rebindModal = function _rebindModal() {

            };

            _proto._bindElement = function _bindElement() {
                var _this = this;

                if (this._config.control) {
                    var $control = $(this._config.control);
                    var $modal = $(this._getModal());

                    $control.on('click', function (e) {
                        _this._setModalValue('instance', _this);
                        _this.show();
                    });

                    $modal.one(Event._UPDATE, function () {
                        _this._updateControl();
                    });

                    if (this._config.multiple) {
                        $control.sortable({
                            cursor: "move",
                            itemSelector: ".js-file-manager-control-file",
                            update: function () {
                                var ids = [];
                                $control.find('.js-file-manager-control-file').each(function () {
                                    ids.push($(this).data('file-id'));
                                });

                                _this._setValue(ids);
                            }
                        });
                    }
                }
            };

            _proto._updateSelectedText = function _updateSelectedText() {
                var $modal = $(this._getModal());
                var $selectButton = $modal.find('.js-file-manager-select');
                var countTotal = $modal.find('.js-file-manager-files .js-file-manager-file').length;
                var countSelected = $modal.find('.js-file-manager-files .js-file-manager-file.ui-selected').length;

                var message = '';
                if (!countTotal) {
                    message = this._render('messageDanger', {
                        message: "Нет файлов, для начала загрузите что-то",
                    });
                } else if (!countSelected) {
                    message = this._render('messageWarning', {
                        message: "Выберите файл, кликнув по нему",
                    });
                } else if (this._config.multiple) {
                    message = this._render('messageInfo', {
                        message: "Чтобы изменить выделение, кликните по файлу или выделите файлы, зажав кнопку мыши",
                    });
                } else {
                    message = this._render('messageInfo', {
                        message: "Чтобы изменить выделение, кликните по файлу",
                    });
                }

                $modal.find('.js-file-manager-body .js-file-manager-message').remove();
                $modal.find('.js-file-manager-body').prepend(message);

                if (!$selectButton.data('oldHtml')) {
                    $selectButton.data('oldHtml', $selectButton.html());
                }

                if (countSelected) {
                    $selectButton.html("Подтвердить выбор: " + countSelected + " файла/ов");
                } else {
                    $selectButton.html("Подтвердить изменения(Снять выбор)");
                }
            };

            _proto._updateSelectedAllText = function _updateSelectedAllText() {
                var $modal = $(this._getModal());
                var $selectButton = $modal.find('.js-file-manager-all-files-toggle .js-file-manager-all-transfer-button');
                var countSelected = $modal.find('.js-file-manager-all-files-toggle .js-file-manager-all-files .js-file-manager-all-file.ui-selected').length;

                if (countSelected) {
                    $selectButton.removeClass('hide');
                } else {
                    $selectButton.addClass('hide');
                }
            };

            /**
             * Translate selected files to control element, sets value to the input
             * @returns null
             */
            _proto._confirmSelection = function _confirmSelection() {
                var $modal = $(this._getModal());

                var ids = [];
                $modal.find('.js-file-manager-files .js-file-manager-file.ui-selected').each(function () {
                    ids.push($(this).data('file-id'));
                });

                this._setValue(ids);
                this._updateControl();
            };

            /**
             * Set selected value to the input or callback
             * @returns null
             */
            _proto._setValue = function _setValue(ids) {
                if (!this._config.multiple) {
                    ids = [ids[ids.length - 1]];
                }

                if (!this._element) {
                    // manual usage when no element assigned
                    this._value = ids;

                    if (typeof this._callback === "function") {
                        this._callback(this._value);
                    }
                } else if (this._element.nodeName.toLowerCase() === 'select') {
                    // set options values for select element
                    $(this._element).html('');

                    if (ids.length) {
                        for (var i = 0; i < ids.length; i++) {
                            $(this._element).append('<option value="' + ids[i] + '" selected="selected" />');
                        }
                    }

                    $(this._element).trigger('change');
                } else if (this._element.nodeName.toLowerCase() === 'input') {
                    // set value for input element
                    if (!ids.length) {
                        this._element.value = '';
                    } else {
                        this._element.value = ids.join(',');
                    }

                    $(this._element).trigger('change');
                }
            }

            _proto._getValue = function _getValue() {
                var ids = [];

                if (!this._element) {
                    return this._value;
                } else if (this._element.nodeName.toLowerCase() === 'select') {
                    $(this._element).find('option:selected').each(function () {
                        if (this.value > 0) {
                            ids.push(this.value);
                        }
                    });
                } else if (this._element.nodeName.toLowerCase() === 'input') {
                    var raw = this._element.value.split(',');

                    for (var i = 0; i < raw.length; i++) {
                        if (raw[i] > 0) {
                            ids.push(raw[i]);
                        }
                    }
                }

                return ids;
            }

            _proto._updateControl = function _updateControl() {
                var $modal = $(this._getModal());
                var ids = this._getValue();

                // update controls
                var $control = this._config.control ? $(this._config.control) : {};
                if ($control.length) {
                    var files = this._getModalValue('files');
                    $control.find('.js-file-manager-control-file').addClass('js-file-manager-control-file-processing');

                    for (var i = 0; i < ids.length; i++) {
                        var file = files[ids[i]];
                        var $existing = $control.find('.js-file-manager-control-file[data-file-id=' + ids[i] + ']');
                        if ($existing.length) {
                            $existing.removeClass('js-file-manager-control-file-processing');
                        } else if (file) {
                            $control.append(this._render('controlFile', files[ids[i]]));
                        }
                    }

                    $control.find('.js-file-manager-control-file-processing').remove();
                }
            }

            /**
             * AJAX Update modal with actual data
             * @returns null
             */
            _proto._update = function _update() {
                $.ajax({
                    url: this._config.url,
                    method: 'GET',
                    dataType: 'jsonp',
                    context: this,
                    success: function (data) {
                        var $modal = $(this._getModal());

                        this._updateFiles(data.files);
                        this._setModalValue('languages', data.languages);

                        if (!this._getModalValue('csrf')) {
                            this._setModalValue('csrf', {
                                csrfParam: data.csrfParam,
                                csrfToken: data.csrfToken
                            });
                        }

                        $modal.trigger($.Event(Event._UPDATE));
                    },
                    error: function (xhr, status, error) {
                        console.log('Failed to update list', status, error);
                        alert(status);
                    }
                });
            };

            _proto._loadAllSectionPage = function _loadAllSectionPage(page) {
                var $modal = $(this._getModal());

                if (!page || page < 1) {
                    page = 1;
                }

                $.ajax({
                    url: this._config.url + '&action=all',
                    data: {
                        page: page
                    },
                    method: 'GET',
                    dataType: 'jsonp',
                    context: this,
                    success: function (data) {
                        var $list = $modal.find('.js-file-manager-all-files');
                        $list.find('.js-file-manager-all-file').remove();

                        for (var i = 0; i < data.files.length; i++) {
                            $list.append(this._render('allFile', data.files[i]));
                        }

                        if (data.pagination.page > 1) {
                            $modal.find('.js-file-manager-all-files-toggle .js-file-manager-all-prev-button').removeClass('hide');
                        } else {
                            $modal.find('.js-file-manager-all-files-toggle .js-file-manager-all-prev-button').addClass('hide');
                        }

                        if (data.pagination.page < data.pagination.total) {
                            $modal.find('.js-file-manager-all-files-toggle .js-file-manager-all-next-button').removeClass('hide');
                        } else {
                            $modal.find('.js-file-manager-all-files-toggle .js-file-manager-all-next-button').addClass('hide');
                        }

                        this._updateSelectedAllText();
                    },
                    error: function (xhr, status, error) {
                        console.log('Failed to load all section list', status, error);
                        alert(status);
                    }
                });
            };

            _proto._transferFiles = function _transferFiles(page) {
                var $modal = $(this._getModal());
                var csrf = this._getModalValue('csrf');
                var $selected = $modal.find('.js-file-manager-all-files-toggle .js-file-manager-all-files .js-file-manager-all-file.ui-selected');
                var ids = [];

                $selected.each(function () {
                    var id = parseInt($(this).data('file-id'));
                    if (id) {
                        ids.push(id);
                    }
                });

                if (!ids.length) {
                    return;
                }

                var postData = {};
                postData[csrf.csrfParam] = csrf.csrfToken;
                postData.photo_id = ids;

                $.ajax({
                    url: this._config.url + '&action=transfer',
                    data: postData,
                    method: 'POST',
                    dataType: 'jsonp',
                    context: this,
                    success: function (data) {
                        this._updateFiles(data.files);

                        $modal.trigger($.Event(Event._UPDATE));

                        this._loadAllSectionPage(page);
                    },
                    error: function (xhr, status, error) {
                        console.log('Failed to transfer files', status, error);
                        alert(status);
                    }
                });
            }

            /**
             * Render files into modal
             * @param array files
             * @returns null
             */
            _proto._updateFiles = function _updateFiles(files) {
                var _this = this;
                var $modal = $(this._getModal());
                var $list = $modal.find('.js-file-manager-files');
                var _files = [];

                $.each(files, function (key, file) {
                    _files[file.id] = file;

                    if (!$modal.find('.js-file-manager-files .js-file-manager-file[data-file-id=' + file.id + ']').length) {
                        $(_this._render('file', file)).appendTo($list);
                    }
                });
                this._setModalValue('files', _files);

                this._rebindModal();
            };

            /**
             * Upload selected file to server
             * @param file file
             * @returns {undefined}
             */
            _proto._uploadFile = function _uploadFile(file) {
                var $modal = $(this._getModal());
                var csrf = this._getModalValue('csrf');
                var progress = false;
                var postData = new FormData();
                postData.append(csrf.csrfParam, csrf.csrfToken);

                if (typeof file === "string") {
                    postData.append('url', file);
                } else {
                    progress = this._createProgress(file.name);
                    postData.append('file', file);
                }

                $.ajax({
                    xhr: function () {
                        var xhrobj = $.ajaxSettings.xhr();

                        if (progress) {
                            xhrobj.upload.addEventListener('progress', function (event) {
                                var percent = 0;
                                var position = event.loaded || event.position;
                                var total = event.total;
                                if (event.lengthComputable) {
                                    percent = Math.ceil(position / total * 100);
                                }

                                progress.set(percent);
                            }, false);
                        }

                        return xhrobj;
                    },
                    url: this._config.url + '&action=upload',
                    method: 'POST',
                    contentType: false, //'multipart/form-data',
                    cache: false,
                    data: postData,
                    processData: false,
                    dataType: 'jsonp',
                    context: this,
                    success: function (data) {
                        if (progress) {
                            progress.done();
                        }

                        this._updateFiles(data.files);
                    },
                    error: function (xhr, status, error) {
                        if (progress) {
                            progress.done();
                        }

                        console.log('Failed to upload file', status, error);
                        alert(status);
                    }
                });
            };

            /**
             * Save order of files
             * @returns null
             */
            _proto._updateOrder = function _updateOrder() {
                var $modal = $(this._getModal());
                var csrf = this._getModalValue('csrf');
                var data = {};
                data[csrf.csrfParam] = csrf.csrfToken;
                data.order = [];

                $modal.find('.js-file-manager-files .js-file-manager-file').each(function () {
                    data.order.push($(this).data('file-id'));
                });

                $.ajax({
                    url: this._config.url + '&action=order',
                    method: 'POST',
                    data: data,
                    dataType: 'jsonp',
                    success: function (data) {
                        console.log('Update Order', data);
                    },
                    error: function (xhr, status, error) {
                        console.log('Failed to save order', status, error);
                    }
                });
            };

            _proto._deleteFile = function _deleteFile(id) {
                var $modal = $(this._getModal());
                var csrf = this._getModalValue('csrf');

                if (!id || !(id = parseInt(id))) {
                    return;
                }

                var data = {};
                data[csrf.csrfParam] = csrf.csrfToken;
                data.photo_id = id;

                $.ajax({
                    url: this._config.url + '&action=delete',
                    method: 'POST',
                    data: data,
                    dataType: 'jsonp',
                    context: this,
                    success: function (data) {
                        console.log('Delete File ', id, data);

                        $modal.find('.js-file-manager-files .js-file-manager-file[data-file-id=' + id + ']').remove();
                    },
                    error: function (xhr, status, error) {
                        console.log('Failed to save order', status, error);
                    }
                });
            };

            /**
             * @param string name progressbar name e.g. File Name
             * @returns object progress bar object with `set(percent)`, `done()` methods
             */
            _proto._createProgress = function _createProgress(name) {
                var _this = this;
                var $modal = $(this._getModal());
                if (!$modal.find('.js-file-manager-body .js-file-manager-progress-group').length) {
                    $modal.find('.js-file-manager-body').append(this._render("progressGroup"));
                }

                return new function () {
                    this._element = $(_this._render("progressBar", {name: name})).appendTo($modal.find('.js-file-manager-body .js-file-manager-progress-group')).get(0);

                    this.set = function (percent) {
                        $(this._element).find('.progress-bar').css('width', percent + '%');
                        $(this._element).find('.progress-bar').html(percent + '%');
                    };

                    this.done = function () {
                        $(this._element).remove();

                        if (!$modal.find('.js-file-manager-body .js-file-manager-progress-group .js-file-manager-progress').length) {
                            $modal.find('.js-file-manager-body .js-file-manager-progress-group').remove();
                        }
                    };
                };
            };

            _proto._toggleAllSection = function _toggleAllSection() {
                var $modal = $(this._getModal());

                if ($modal.find('.js-file-manager-all-files-toggle').hasClass('hide')) {
                    // show
                    $modal.find('.js-file-manager-all-files-toggle').removeClass('hide');
                    $modal.find('.js-file-manager-files-toggle').addClass('col-lg-6').removeClass('col-lg-12');
                    $modal.find('.js-file-manager-all-field').focus();

                    if (!$modal.find('.js-file-manager-all-files .js-file-manager-all-file').length) {
                        this._loadAllSectionPage();
                    }
                } else {
                    // hide
                    $modal.find('.js-file-manager-all-files-toggle').addClass('hide');
                    $modal.find('.js-file-manager-files-toggle').removeClass('col-lg-6').addClass('col-lg-12');
                }
            };

            /**
             * Render html
             * @param string templateName
             * @param array data
             * @returns string
             */
            _proto._render = function _render(templateName, data) {
                var output = Template[templateName];

                $.each(data, function (name, value) {
                    var regex = new RegExp('%%' + name + '%%', 'g');
                    output = output.replace(regex, value);
                });

                return output;
            };

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default, config);
                config.toggle = Boolean(config.toggle); // Coerce string values

                if (this._element) {
                    config.multiple = Boolean($(this._element).attr('multiple'));
                }

                _typeCheckConfig(NAME, config, DefaultType);

                return config;
            };

            // Static
            Manager._getTargetFromElement = function _getTargetFromElement(element) {
                var selector = Util.getSelectorFromElement(element);
                return selector ? document.querySelector(selector) : null;
            };

            Manager._jQueryInterface = function _jQueryInterface(config) {
                if (typeof this === 'object' && this.length) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data(DATA_KEY);

                        var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

                        if (!data && _config.toggle && /show|hide/.test(config)) {
                            _config.toggle = false;
                        }

                        if (!data) {
                            data = new Manager(this, _config);
                            $this.data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (typeof data[config] === 'undefined') {
                                throw new TypeError("No method named \"" + config + "\"");
                            }

                            data[config]();
                        }
                    });
                } else {
                    // Manual usage
                    console.log(config);
                }
            };

            _defineProperties(Manager, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }, {
                    key: "Default",
                    get: function get() {
                        return Default;
                    }
                }]);

            return Manager;
        }();

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */
        $.fn[NAME] = Manager._jQueryInterface;
        $[NAME] = Manager._jQueryInterface;
        $.fn[NAME].Constructor = Manager;

        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Manager._jQueryInterface;
        };

        /**
         * ------------------------------------------------------------------------
         * Templates
         * ------------------------------------------------------------------------
         */
        var Template = {
            modal: `
<div class="modal file-manager-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">%%header%%</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body js-file-manager-body">
            <div class="row">
                <div class="col-lg-12 js-file-manager-files-toggle">
                    <div class="js-file-manager-files row">
                    </div>
                </div>
                <div class="col-lg-6 file-manager-all-files js-file-manager-all-files-toggle hide">
                    <div class="js-file-manager-all-files row">
                    </div>

                    <div class="form-row">
                        <div class="col-auto">
                            <button type="button" class="btn btn-info js-file-manager-all-prev-button">&lt;&lt;</button>
                        </div>
                        <div class="col text-center">
                            <button type="button" class="btn btn-info js-file-manager-all-transfer-button">Добавить в коллекцию</button>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-info js-file-manager-all-next-button">&gt;&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-info js-file-manager-all-button">Все файлы</button>

            <input type="text" class="form-control js-file-manager-url-field" placeholder="Ссылка на файл в интернете" />
            <button type="button" class="btn btn-primary hide js-file-manager-url-button">Загрузить</button>

            <label class="btn btn-success" style="margin-bottom:0;">
                Выбрать файлы для загрузки
                <input type="file" multiple="multiple" class="hide js-file-manager-upload-files" />
            </label>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary js-file-manager-select">OK</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
        </div>
    </div>
  </div>
</div>
`,
            file: `
<div class="col-lg-2 col-md-3 col-sm-4 js-file-manager-file file-manager-file" data-file-id="%%id%%">
    <img src="%%image_thumbnail%%" class="img-fluid js-file-manager-file-handle" />

    <a href="#edit-photo-690127" class="js-file-manager-file-update" title="Описание изображения">
        Edit
    </a>

    <a href="#sort-photo-690127" class="js-sortable-handle" title="Сортировать изображения">
        Drag
    </a>

    <a href="#remove" class="remove js-file-manager-file-delete" title="Удалить" data-confirm="Удалить?">
        <span aria-hidden="true">×</span>
    </a>
</div>
`,
            controlFile: `
<div class="col-lg-2 col-md-3 col-sm-4 js-file-manager-control-file file-manager-control-file" data-file-id="%%id%%">
    <img src="%%image_thumbnail%%" class="img-fluid" />
</div>
`,
            messageInfo: `
<div class="alert alert-info js-file-manager-message">
    %%message%%
</div>
`,
            messageWarning: `
<div class="alert alert-warning js-file-manager-message">
    %%message%%
</div>
`,
            messageDanger: `
<div class="alert alert-danger js-file-manager-message">
    %%message%%
</div>
`,
            progressGroup: `
<div class="alert alert-warning js-file-manager-progress-group">
    <b>
        Идет загрузка файлов:
    </b>
</div>
`,
            progressBar: `
<div class="js-file-manager-progress">
    %%name%%
    <div class="progress">
        <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">0%</div>
        </div>
    </div>
</div>
`,
            allFile: `
<div class="col-lg-2 col-md-3 col-sm-4 js-file-manager-all-file file-manager-all-file" data-file-id="%%id%%">
    <img src="%%image_thumbnail%%" class="img-fluid" />
</div>
`,
            fileUpdateModal: `
<div class="modal file-manager-modal-file-update" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">%%header%%</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body js-file-manager-file-update-body">
                <form action="%%action%%" method="POST">
                    <div class="row">
                        <div class="col-lg-6">
                            <img src="%%image_thumbnail%%" class="img-fluid" />

                            Добавлено: %%date_added%%

                            <a href="%%absolute_url%%" target="_blank">
                                Открыть в новом окне
                            </a>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <span class="text-lable">
                                    Название файла:
                                    %%file_name%%
                                </span>
                            </div>

                            <div class="form-group">
                                <div class="input-group js-l-scope js-file-manager-file-update-description">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>
                                    Ссылка для перехода
                                </label>
                                <input type="text" placeholder="Ссылка при клике на фото в режиме &quot;слайдер&quot; и &quot;галерея&quot;" autosaving-name="photo[%%id%%][href]" data-post="%%csrfData%%" class="form-control" value="%%href%%" />
                            </div>

                            <div class="form-group">
                                <label>
                                    Ссылка на источник
                                </label>
                                <input type="text" placeholder="Укажите ссылку происхождения фото" autosaving-name="photo[%%id%%][source]" data-post="%%csrfData%%" class="form-control" value="%%source%%" />
                            </div>

                            <div class="form-group">
                                <label>
                                    Дата съемки
                                </label>
                                <input type="text" autosaving-name="photo[%%id%%][date_taken]" data-post="%%csrfData%%" class="form-control js-file-manager-file-update-date-taken" value="%%date_taken%%" />
                            </div>

                            <div class="form-group">
                                <label>
                                    Место съемки
                                </label>

                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="js-file-manager-file-update-map" style="width:100%;height:350px;"></div>
                                    </div>
                                    <input type="hidden" class="js-file-manager-file-update-latitude" placeholder="Широта" autosaving-name="photo[%%id%%][latitude]" data-post="%%csrfData%%" value="%%latitude%%" />
                                    <input type="hidden" class="js-file-manager-file-update-longitude" placeholder="Долгота" autosaving-name="photo[%%id%%][longitude]" data-post="%%csrfData%%" value="%%longitude%%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    </div>
</div>
`,
            fileUpdateModalDescription: `
<textarea rows="4" placeholder="Описание фотографии" autosaving-name="photo[%%id%%][description][%%language_id%%]" data-post="%%csrfData%%" code="%%code%%" class="form-control js-l-selectee hide">%%description%%</textarea>
`,
            fileUpdateModalLanguageMenu: `
<div class="input-group-btn js-l-control-group">
    <button type="button" class="btn btn-default dropdown-toggle js-l-control-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="js-l-active">
            %%code%%
        </span>
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu js-file-manager-file-update-language-menu">
        <li class="js-l-control active" code="%%code%%">
            <a href="#%%code%%" title="%%name%%">
                %%code%%
            </a>
        </li>
    </ul>
</div>
`,
            fileUpdateModalLanguageBtn: `
<li class="js-l-control" code="%%code%%">
    <a href="#%%code%%" title="%%name%%">
        %%code%%
    </a>
</li>
`
        };

        /**
         * ------------------------------------------------------------------------
         * Init all fields on document ready
         * ------------------------------------------------------------------------
         */
        $(function ($) {
            $(Selector.DATA_TOGGLE)[NAME]('init');
        });

        return Manager;
    }($);
})));
