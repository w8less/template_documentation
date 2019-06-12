
# Global variables are initialized in all(pages, tags) templates

## `$site` - global website settings

`$site.name` - `string` company name which the site represents

`$site.date_founded` - `integer` the year the company founded on

`$site.home_url` - `string` url to home page

`$site.url_part` - `string` language part for urls



### `$site.logo` - information about logo settings

`$site.logo.type` - `string` either "image" or "text" value, represents type of the logo

`$site.logo.text` - `string` text logotype value to display on page

`$site.logo.text_font` - `string` font name value of logotype to display on page

`$site.logo.text_size` - `integer` font size in `px` value

`$site.logo.text_color` - `string` selected css color to display e.g. `#e645e6`

`$site.logo.image` - `string` image url to display as logotype



### `$site.languages` - languages available on site
### `$site.active_language` - currently active language

`$site.languages['id'].language_id`

`$site.active_language.language_id` - language ID in system

`$site.languages['id'].name`

`$site.active_language.name` - language name to display to user

`$site.languages['id'].page_url`

`$site.active_language.page_url` - url to current page on the language



### `$site.currencies` - languages available on site
### `$site.active_currency` - currently active language



## `$customer` - global current customer data

`$customer.is_guest` - `bool`, true if customer is signed in

`$customer.display_name` - `string`, customer name

`$customer.image` - `string`, customer avatar location


## `$is_web_admin` - `bool` whether user came from admin panel, and should see management tools


[Home](index.md).
