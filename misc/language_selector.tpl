
<{if count($languages) == 1}> 
    <{*button type="button" class="btn btn-default dropdown-toggle">
    <span>
    <{$languages[$active_language_id].code}>&nbsp;
    </span>
    </button*}>
<{else}>
    <div class="input-group-btn js-l-control-group">
        <button type="button" class="btn btn-default dropdown-toggle js-l-control-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="js-l-active">
                <{$languages[$active_language_id].code|htmlspecialchars}>
            </span>
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
            <{foreach $languages as $language}>
                <li class="js-l-control<{if $language.language_id == $active_language_id}> active<{/if}>"<{if $remember_as_id}> data-remember="<{$remember_as_id|escape}>"<{/if}> code="<{$language.code|escape}>">
                    <a href="#<{$language.code|escape}>" title="<{$language.name|escape}>">
                        <{$language.code|htmlspecialchars}>
                    </a>
                </li>
            <{/foreach}>
        </ul>
    </div>
<{/if}>
