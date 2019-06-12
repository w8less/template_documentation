
# System module templates

## Format implemented in `settings.json`

```json
{
    "file": {
        "%module_name%": {
            "file": "/some_path_to_default_file.tpl",
            "options": {
                "%option_key%": {
                    "name": "Self descriptive name",
                    "file": "/some_path_to_file.tpl",
                    "image": "/some_path_to_image_file.jpg"
                },
                "%option_key%": {},
                "%option_key%": {},
                "%option_key%": {}
            }
        },
        "%module_name%": {},
        "%module_name%": {},
        "%module_name%": {}
    }
}
```


## Description

`%module_name%` - Module name, one of the existing:

- page_photogallery
- page_text
- page_articles
- page_albums
- page_brands
- blog_article


Module attribute `file` is a default template for the module. Optional, the default values are:

```json
{
    "page_photogallery": {
        "file": "/photo_album.tpl"
    },
    "page_text": {
        "file": "/text.tpl"
    },
    "page_articles": {
        "file": "/articles.tpl"
    },
    "page_albums": {
        "file": "/photo_albums.tpl"
    },
    "page_brands": {
        "file": "/brands.tpl"
    },
    "blog_article": {
        "file": "/article.tpl"
    }
}
```


Module attribute `options` is a way to implement different views of the same system module. Use it, if needed, it's optional


`%option_key%` - unique key for the view option, if set as `default` - it will be default view file, which will replace `%module_name%.file` attribute


`%option_key%.name` - self descriptive name for the view option, optional


`%option_key%.file` - file path, required


`%option_key%.image` - file path to preview image, optional


[Settings](settings.md)
[Home](../index.md)
