
<div>
    <{foreach $events as $event}>
        <div>
            <p>
                <b>
                    <{$event.date.date|as_date:'long'}>

                    <!-- 
                    you can use other date formats or combine them:
                    <{$event.date.date|as_date:'short'}>
                    <{$event.date.date|as_date:'medium'}>
                    <{$event.date.date|as_date:'long'}>
                    <{$event.date.date|as_date:'full'}>
                    <{$event.date.date|as_date:'Y'}>
                    <{$event.date.date|as_date:'iso'}>
                    -->
                </b>
            </p>

            <a href="<{$event.relative_url}>" title="<{$event.name|escape}>">
                <{$event.short_name|htmlspecialchars}>
            </a>

            <{if $event.cover}>
                <a href="<{$event.relative_url}>" title="<{$event.name|escape}>">
                    <img src="<{$event.cover.photo_file_small}>" style="width: 100%;" />
                </a>
            <{/if}>

            <{$event.intro}>
        </div>
    <{/foreach}>
</div>
