
# Authorization

## How to sign in or change account

Use tag `<{account_sign_in_url}>`

```html
<a href="<{account_sign_in_url}>">
    <{if $customer.is_guest}>
        Sign In
    <{else}>
        Change Account
    <{/if}>
</a>
```


## How to sign out

Use tag `<{account_sign_out_url}>`

```html
<{if !$customer.is_guest}>
    <a href="<{account_sign_out_url}>">
        link text, e.g. 'Sign Out'
    </a>
<{/if}>
```


[Home](../index.md)
