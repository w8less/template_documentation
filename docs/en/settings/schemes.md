
# Template schemes

## Format implemented in `settings.json`

```json
{
    "scheme": {
        "%scheme_key%": {
            "name": "Orange",
            "color": "#ff8c00",
            "image": "/assets/image/scheme/orange.jpg"
        },
        "%scheme_key%": {
            "name": "Blue",
            "color": "#6495ed",
            "image": "/assets/image/scheme/blue.jpg"
        },
        "%scheme_key%": {
            "name": "Red",
            "color": "#ff4500",
            "image": "/assets/image/scheme/red.png"
        }
    }
}
```


## Description

`%scheme_key%` - Replace with scheme key name, this key will be used in template itself

`%scheme_key%.name` - self descriptive name for the scheme option

`%scheme_key%.color` - optional, css color code for the button

`%scheme_key%.image` - optional, preview image


## Template usage

When template is called it contains `$template.scheme`, which is key you specified in `settings.json`

For example:
```html
<{if $template.scheme == 'orange'}>
    <link href="<{file 'assets/css/scheme/orange.css'}>" rel="stylesheet" type="text/css" />
    <{* or some other stuff you need *}>
<{elseif $template.scheme == 'blue'}>
    <link href="<{file 'assets/css/scheme/blue.css'}>" rel="stylesheet" type="text/css" />
<{else}>
    <{* red(default) *}>
    <link href="<{file 'assets/css/scheme/red.css'}>" rel="stylesheet" type="text/css" />
<{/if}>
```


[Settings](settings.md)
[Home](../index.md)
