<{extends 'layout/layout.tpl'}><{block name="template-name"}>    /article.tpl<{/block}><{block name=title}>    <{$article.title|htmlspecialchars}><{/block}><{block name="module"}>    <h1>        <{$article.name|htmlspecialchars}>    </h1>    <div>        <{t "Просмотров: {views}" views=$article.views_count}>    </div>    <{if $article.tags}>        <p>            Теги:            <{foreach $article.tags as $tag}>                <a href="<{$tag.relative_url}>">                    <{$tag.name|htmlspecialchars}>                </a>            <{/foreach}>        </p>    <{/if}>    <{$article.text}>    <{get_blog_articles 'related_tag_articles' related_tag=$article unique}>    По теме<br />    <{foreach $related_tag_articles as $related_tag_article}>        <{$related_tag_article.name|htmlspecialchars}><br />    <{/foreach}>    <{get_blog_articles 'related_page_articles' related_page=$article unique}>    Еще в разделе<br />    <{foreach $related_page_articles as $related_page_article}>        <{$related_page_article.name|htmlspecialchars}><br />    <{/foreach}>    <{get_blog_articles 'related_last_articles' related_last=$article unique}>    Последнее на сайте<br />    <{foreach $related_last_articles as $related_last_article}>        <{$related_last_article.name|htmlspecialchars}><br />    <{/foreach}>    <{get_discussion "discussion" "pagination" element=$article page_query}>    <{if $discussion.is_active}>        <{if $discussion.is_guest_review || !$customer.is_guest}>            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#discussion-form" id="discussion-anchor">                Написать отзыв            </button>        <{else}>            <a href="<{account_sign_in_url '#discussion-anchor'}>" class="btn btn-primary" id="discussion-anchor">                Авторизоваться чтобы написать отзыв            </a>        <{/if}>        <{foreach $discussion.thread as $post}>            <div class="js-discussion-post" id="discussion-post-<{$post.id}>">                <p>                    <b class="js-discussion-post-author">                        <{if $post.image}>                            <img src="<{$post.image}>" width="50" class="img-thumbnail" />                        <{/if}>                        <{if $post.author}>                            <{$post.author|htmlspecialchars}>                        <{else}>                            Аноним                        <{/if}>                        <{if $post.is_authorized}>                            <b title="Авторизован">                                A                            </b>                        <{/if}>                    </b>                    <{if $discussion.is_guest_review || !$customer.is_guest}>                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#discussion-form" data-post-id="<{$post.id}>">                            Ответить на отзыв                        </button>                    <{else}>                        <a href="<{account_sign_in_url '#discussion-anchor'}>" class="btn btn-primary">                            Авторизоваться чтобы ответить на отзыв                        </a>                    <{/if}>                </p>                <div class="js-discussion-post-comment">                    <p>                        <{$post.comment|htmlspecialchars|nl2br}>                    </p>                    <{if $post.pros}>                        <p>                            <b>Плюсы:</b><br />                            <{$post.pros|htmlspecialchars|nl2br}>                        </p>                    <{/if}>                    <{if $post.cons}>                        <p>                            <b>Минусы:</b><br />                            <{$post.cons|htmlspecialchars|nl2br}>                        </p>                    <{/if}>                </div>                <{if $discussion.is_votes}>                    <div class="votes js-votes" data-element-id="<{$post.id}>" data-element-type="discussion_post" data-action="view">                    </div>                <{/if}>            </div>            <{foreach $post.answers as $answer}>                <div id="discussion-post-<{$answer.id}>">                    <p>                        <b>                            <{if $answer.image}>                                <img src="<{$answer.image}>" width="50" class="img-thumbnail" />                            <{/if}>                            <{if $answer.author}>                                <{$answer.author|htmlspecialchars}>                            <{else}>                                Аноним                            <{/if}>                            <{if $answer.is_authorized}>                                <b title="Авторизован">                                    A                                </b>                            <{/if}>                        </b>                    </p>                    <p>                        <{$answer.comment|htmlspecialchars|nl2br}>                    </p>                </div>                <{if $discussion.is_votes}>                    <div class="votes js-votes" data-element-id="<{$answer.id}>" data-element-type="discussion_post" data-action="view">                    </div>                <{/if}>            <{/foreach}>        <{/foreach}>        <{include 'misc/pagination.tpl' pagination_fragment='#discussion-anchor'}>        <{discussion_form_success $discussion}>        <script>            require(['jquery'], function ($) {                $('#discussion-form-success').modal('show');                $('#discussion-form-success').on('click', function () {                    $(this).modal('hide');                });            });        </script>        <div class="modal" role="dialog" id="discussion-form-success">            <div class="modal-dialog modal-sm" role="document">                <div class="modal-content">                    <div class="alert alert-warning">                        <h4 class="alert-heading">Ваш отзыв добавлен</h4>                        <p>Спасибо!</p>                    </div>                </div>            </div>        </div>        <{/discussion_form_success}>        <{discussion_form_error $discussion 'reason'}>        <script>            require(['jquery'], function ($) {                $('#discussion-form-error').modal('show');                $('#discussion-form-error').on('click', function () {                    $(this).modal('hide');                });            });        </script>        <div class="modal" role="dialog" id="discussion-form-error">            <div class="modal-dialog modal-sm" role="document">                <div class="modal-content">                    <div class="alert alert-warning">                        <h4 class="alert-heading">Ваш отзыв не добавлен</h4>                        <p>Повторите попытку позже.</p>                        <{if $reason}>                            <p>                                Причина:<br />                                <{$reason|nl2br}>                            </p>                        <{/if}>                    </div>                </div>            </div>        </div>        <{/discussion_form_error}>        <script>            require(['jquery'], function ($) {                $('#discussion-form').on('show.bs.modal', function (e) {                    var postId = parseInt($(e.relatedTarget).data('post-id'));                    // could be NaN                    postId = postId > 1 ? postId : 0;                    $('#discussion-form-post-id').val(postId);                    if (postId) {                        $(this).find('.js-discussion-new').addClass('d-none');                        $(this).find('.js-discussion-respond').removeClass('d-none');                        $(this).find('.js-discussion-respond-comment').html($(e.relatedTarget).closest('.js-discussion-post').find('.js-discussion-post-comment').html());                        $(this).find('.js-discussion-respond-to').html($(e.relatedTarget).closest('.js-discussion-post').find('.js-discussion-post-author').html().trim());                    } else {                        $(this).find('.js-discussion-new').removeClass('d-none');                        $(this).find('.js-discussion-respond').addClass('d-none');                    }                });            });        </script>        <div class="modal" role="dialog" id="discussion-form">            <div class="modal-dialog" role="document">                <div class="modal-content">                    <{discussion_form $discussion return_url="#discussion-anchor"}>                    <input type="hidden" name="answer_to_discussion_post_id" id="discussion-form-post-id" value="0" />                    <div class="modal-header">                        <h5 class="modal-title js-discussion-new">Написать отзыв</h5>                        <h5 class="modal-title js-discussion-respond">Ответить на отзыв</h5>                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">                            <span aria-hidden="true">&times;</span>                        </button>                    </div>                    <div class="modal-body">                        <div class="js-discussion-respond">                            Ответить на отзыв                            <b class="js-discussion-respond-to"></b>:                            <blockquote class="js-discussion-respond-comment">                            </blockquote>                        </div>                        <div class="form-group">                            <textarea class="form-control" name="comment" rows="10" aria-required="true" placeholder="Текст отзыва"></textarea>                        </div>                        <{if $discussion.is_pros}>                            <div class="form-group js-discussion-new">                                <label for="discussion-pros-field">Плюсы</label>                                <textarea class="form-control" name="pros" id="discussion-pros-field" rows="5" aria-required="true" placeholder="Опишите плюсы"></textarea>                            </div>                        <{/if}>                        <{if $discussion.is_cons}>                            <div class="form-group js-discussion-new">                                <label for="discussion-cons-field">Минусы</label>                                <textarea class="form-control" name="cons" id="discussion-cons-field" rows="5" aria-required="true" placeholder="Опишите минусы"></textarea>                            </div>                        <{/if}>                        <{if $customer.is_guest}>                            <div class="form-group">                                <label for="discussion-author-field">Ваше Имя</label>                                <input type="text" class="form-control" name="author" id="discussion-author-field" placeholder="Имя" />                            </div>                        <{/if}>                        <div class="form-group js-discussion-new">                            <label for="discussion-rating-field">Оценка</label>                            <select class="form-control" name="rating" id="discussion-rating-field">                                <option value="1">                                    Унылое говно                                </option>                                <option value="2">                                    Очень плохо                                </option>                                <option value="3">                                    Плохо                                </option>                                <option value="4">                                    Печально                                </option>                                <option value="5" selected="selected">                                    Сойдет                                </option>                            </select>                        </div>                    </div>                    <div class="modal-footer">                        <button type="submit" class="btn btn-primary">Отправить</button>                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>                    </div>                    <{/discussion_form}>                </div>            </div>        </div>    <{/if}><{/block}>