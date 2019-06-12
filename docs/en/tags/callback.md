
# Callback Form

use <{callback_form[ id=?][ class=?]}> tag

available fields:
name - optional
phone - optional
text - optional

Example:

<{callback_form}>
    <input type="text" name="name" />
    <input type="text" name="phone" />
    <textarea name="text"></textarea>
<{/callback_form}>

Important!
<{callback_form}>
provides empty `token` field, which should be filled with Google Recaptcha
value(public key specified in <{$site.grecaptcha_key}>)

For dynamic recaptcha usage see: /assets/js/script.js


[Post tags](index.md)
[Home](../index.md)
