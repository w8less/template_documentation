
# How to create Breadcrumbs section

use tag <{get_breadcrumbs "variable_name" element=?}>, to get breadcrumbs
items of object `element` into `variable_name` value

Example:

<{get_breadcrumbs "breadcrumbs" element=$module}>
<{* This query uses main element on the page to create path, general case *}>
<{if $module && $breadcrumbs|count}>
    <nav>
        <ol class="breadcrumb">
            <{foreach $breadcrumbs as $item}>
                <li class="breadcrumb-item">
                    <a href="<{$item.relative_url}>">
                        <{$item.short_name|htmlspecialchars}>
                    </a>
                </li>
            <{/foreach}>
            <li class="breadcrumb-item active" aria-current="page">
                <{$module.short_name|htmlspecialchars}>
            </li>
        </ol>
    </nav>
<{/if}>


[Home](../index.md)
