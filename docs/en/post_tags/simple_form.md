
# Simple Form usage

```html
<simple_form id="?" class="?" return_url="?" form_id="?" cc="?">

... custom html & any fields, files ...

</simple_form>
```

Tag attributes:
`id, class` - optional, html attributes, will be applied to <form> element
`return_url` - optional, where to redirect user after submit, can be `#fragment`
`form_id` - optional, recommended, form identity, you can specify purpose of the form
`cc` - optional, comma-separated list of recipients emails


## Structured data

You can specify optional field names which will be kept structured

```html
<{callback_form}>
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="subject" />
    <textarea name="message"></textarea>
<{/callback_form}>
```

`name` - user name
`email` - user email, user will be notified about his submission
`subject` - subject to submission
`message` - user message


## Success notification

```html
<simple_form_success form_id="?">

... Any html code, will be displayed on successful submission of form with same `form_id` ...

</simple_form_success>
```
 

## Error notification

```html
<simple_form_error form_id="?">

... Any html code, will be displayed on error in form with same `form_id` ...

</simple_form_error>
```


[Post tags](index.md)
[Home](../index.md)
