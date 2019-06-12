
# How to add items into wishlists

use tag
```html
<{catalog_wishlist_form id="?" class="?" return_url="?" article="?" add|remove|toggle(default)}>

... custom html and service fields ...
<input type="hidden" name="catalog_wishlist_id" value="?"><!-- id of wishlist to add|remove to -->
<input type="hidden" name="catalog_wishlist_name" value="?"><!-- name of wishlist to add|remove to -->
<!-- if specified both >

</catalog_wishlist_form>
```

Example:

```html
<{catalog_wishlist_form $article add}>
    <button type="submit" class="btn btn-primary">
        Add to list
    </button>
</catalog_wishlist_form>

<{catalog_wishlist_form $article remove}>
    <button type="submit" class="btn btn-primary">
        Remove from list
    </button>
</catalog_wishlist_form>
```

# How to display wishlists options

use tag <{get_catalog_wishlists "`variable_name`"}>

Example:

```html
add this only at the beginning of page once, to improve speed
<{get_catalog_wishlists "wishlists"}>

<{foreach $wishlists as $wishlist}>
    <label>
        <input type="radio" name="catalog_wishlist_id" value="<{$wishlist.id|escape}>" />
        <{$wishlist.name|htmlspecialchars}>
    </label><br />
<{/foreach}>
<label>
    <input type="radio" name="catalog_wishlist_id" value="0" />
    <input type="text" name="catalog_wishlist_name" />
</label><br />
<button type="submit" class="btn btn-primary">
    Добавить
</button>
```


[Creating catalog](../index.md)
