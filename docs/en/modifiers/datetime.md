
# Date/Time formatting. as_date, as_time, as_datetime, date_format

NOTE: Please don't use `date_format` modifier. It has bad support for internationalization. See other modifiers below.


## Date formatting

If you have a date-representation, datetime-representation value such as number time value e.g. `1445876138` or
iso formatted value like `2018-08-22`, `2018-10-29 22:18:03`.

Or you just want to display date without time.

Use `as_date` modifier

```html
<{$value|as_date:'short'}>
<{$value|as_date:'medium'}>
<{$value|as_date:'long'}>
<{$value|as_date:'full'}>
<{$value|as_date:'yyyy'}>
<{$value|as_date:'iso'}><!-- ISO 8601 format, for meta/js compatibility cases -->
<{$value|as_date:'d MMMM'}>
```

for more formats see:
http://userguide.icu-project.org/formatparse/datetime


## Time formatting

If you have a datetime-representation value such as number time value e.g. `1445876138` or
iso formatted value like `22:18:03`, `2018-10-29 22:18:03` including time.

Or you just want to display time without date.

Use `as_time` modifier

```html
<{$value|as_time:'short'}>
<{$value|as_time:'medium'}>
<{$value|as_time:'long'}>
<{$value|as_time:'full'}>
<{$value|as_time:'iso'}><!-- ISO 8601 format, for meta/js compatibility cases -->
```

for more formats see:
http://userguide.icu-project.org/formatparse/datetime


## Datetime formatting

If you have a datetime-representation value such as number time value e.g. `1445876138` or
iso formatted value like `2018-10-29 22:18:03` including date and time.

And you want to display date and time.

Use `as_datetime` modifier

```html
<{$value|as_datetime:'short'}>
<{$value|as_datetime:'medium'}>
<{$value|as_datetime:'long'}>
<{$value|as_datetime:'full'}>
<{$value|as_datetime:'iso'}><!-- ISO 8601 format, for meta/js compatibility cases -->
```

for more formats see:
http://userguide.icu-project.org/formatparse/datetime


[Modifiers](index.md).
[Home](../index.md).
