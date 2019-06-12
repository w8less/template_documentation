
# Comparison Form

use <{comparison_form[ id=?][ class=?][ return_url=?][ article=?][ add][ remove][ toggle]}> tag

id,class - string, optional, html attributes assigned to the form
return_url - string, optional, the url to return customer to
article - object, required, catalog article object
add - flag, optional, add article to favorites
remove - flag, optional, remove article from favorites
toggle - flag, optional, default, toggle article to/from favorites

Example:

<{if $article.in_comparison}>
    <a href="<{comparison_url}>">
        See comparison
    </a>
<{else}>
    <{comparison_form article=$article}>
        <button type="submit">
            Add to comparison
        </button>
    <{/comparison_form}>
<{/if}>


## See comparison page

use <{comparison_url}>

Example:

<a href="<{comparison_url}>">
    Compare articles
</a>


[Home](../index.md)
