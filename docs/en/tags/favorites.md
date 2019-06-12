
# Favorites Form

accessible only for authorized customers, make sure to check

use <{favorites_form[ id=?][ class=?][ return_url=?][ article=?][ add][ remove][ toggle]}> tag

id,class - string, optional, html attributes assigned to the form
return_url - string, optional, the url to return customer to
article - object, required, catalog article object
add - flag, optional, add article to favorites
remove - flag, optional, remove article from favorites
toggle - flag, optional, default, toggle article to/from favorites

Example:

<{if $customer.is_guest}>
    <a href="<{account_sign_in_url}>">
        Sign In
    </a>
<{elseif $article.in_favorites}>
    <a href="<{favorites_url}>">
        See favorites
    </a>
<{else}>
    <{favorites_form $article}>
        <button type="submit">
            Add to favorites
        </button>
    <{/favorites_form}>
<{/if}>


## See all favorites

use <{favorites_url}>

Example:

<{if !$customer.is_guest}>
    <a href="<{favorites_url}>">
        See favorites
    </a>
<{/if}>


[Home](../index.md)
