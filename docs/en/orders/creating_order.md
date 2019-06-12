
# Creating new order

## Redirect user to specialized order page

<a href="<{order_url}>">
    link text, e.g. 'order'
</a>


## How to submit order

Use tags
<{order_form[ id=?][ class=?]}>

<{/order_form}>

id, class - html element attributes will be added to <form>

Also provide form with some data e.g.

If customer not authorized:
customer[name]
customer[last_name]
customer[email]

And other info:
phone_id or phone
delivery_id
payment_id
comment

address_id or
address[country]
address[city]
address[zip]
address[street]
address[number]
address[apartment]
address[address]

Example:
<{order_form}>
    <{if $customer.is_guest}>
        <input type="text" name="customer[name]" />
        <input type="text" name="customer[last_name]" />
        <input type="email" name="customer[email]" />
    <{/if}>

    <{if $basket.phones|count}>
        <select name="phone_id">
            <option value="0">
                Other number
            </option>
            <{foreach $basket.phones as $phone}>
                <option value="<{$phone.id}>">
                    <{$phone.number|htmlspecialchars}>
                </option>
            <{/foreach}>
        </select>
    <{/if}>

    <input type="text" name="phone" />

    <{if $basket.delivery|count > 1}>
        <select name="delivery_id">
            <{foreach $basket.delivery as $delivery}>
                <option value="<{$delivery.id}>">
                    <{$delivery.name|htmlspecialchars}>
                </option>
            <{/foreach}>
        </select>
    <{/if}>

    <{if $basket.payment|count > 1}>
        <select name="payment_id">
            <{foreach $basket.payment as $payment}>
                <option value="<{$payment.id}>">
                    <{$payment.name|htmlspecialchars}>
                </option>
            <{/foreach}>
        </select>
    <{/if}>

    <{if $basket.address|count}>
        <select name="address_id">
            <option value="0">
                Other address
            </option>
            <{foreach $basket.address as $address}>
                <option value="<{$address.id}>">
                    <{$address.text|htmlspecialchars}>
                </option>
            <{/foreach}>
        </select>
    <{/if}>

    <input type="text" name="address[country]" />
    <input type="text" name="address[city]" />
    <input type="text" name="address[zip]" />
    <input type="text" name="address[street]" />
    <input type="text" name="address[number]" />
    <input type="text" name="address[apartment]" />
    <textarea name="address[address]"></textarea>

    <textarea name="comment"></textarea>

    <button type="submit">
        Submit
    </button>
<{/order_form}>


[Home](../index.md)
