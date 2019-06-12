
# Search Form

use <{search_form[ id=?][ class=?]}> tag

available fields:

- `q` - required, query string
- `type` - optional, string, `catalog_article` or `blog_article`
- `page` - optional, integer, page starting from 1

Example:

```html
<{search_form class="js-search-form"}><!-- for .js-search-form usage see Ajax usage below -->
    <input type="text" name="q" class="js-search-form-input" /><!-- for .js-search-form-input usage see Ajax usage below -->
    <input type="hidden" name="type" value="blog_article" />
<{/search_form}>
```


## Ajax usage

You can submit form via ajax, server will respond with `jsonp` data

Example:

```js
require(['jquery'], function ($) {
    $('.js-search-form-input').on('keyup', function (e) {
        if ($(this).val().trim().length > 2) {
            $.ajax({
                url: $('.js-search-form').attr('action'),
                method: $('.js-search-form').attr('method'),
                data: {
                    q: $(this).val(),
                    page: 1
                },
                dataType: 'jsonp',
                success: function (data) {
                    console.log('TODO: display search results', data.items, data.pagination);
                }
            });
        }
    });
});
```


[Post tags](index.md)
[Home](../index.md)
