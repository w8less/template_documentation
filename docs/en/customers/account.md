
# Customer Account

## How to get into account page

Use tag <{account_url}>

<{if !$customer.is_guest}>
    <a href="<{account_url}>">
        <{if $customer.image}>
            <img src="<{$customer.image}>" />
        <{/if}>

        <{$customer.display_name|htmlspecialchars}>
    </a>
<{/if}>


[Home](../index.md)
