
<div>
    <{foreach $albums as $album}>
        <div>
            <{if $tag_attributes.photo && $album.cover.photo_file_small || $tag_attributes.large_photo && $album.cover.photo_file}>
                <div>
                    <a href="<{$album.relative_url}>">
                        <{if $tag_attributes.large_photo && $album.cover.photo_file}>
                            <img src="<{$album.cover.photo_file}>" title="<{$album.name|escape}>" alt="<{$album.name|escape}>" />
                        <{else}>
                            <img src="<{$album.cover.photo_file_small}>" title="<{$album.name|escape}>" alt="<{$album.name|escape}>" />
                        <{/if}>
                    </a>
                </div>
            <{/if}>

            <{if $tag_attributes.title}>
                <div>
                    <{$album.name|htmlspecialchars}>
                </div>
            <{/if}>

            <{if $tag_attributes.desc && $album.intro}>
                <div>
                    <{$album.intro}>
                </div>
            <{/if}>

            <{if $tag_attributes.desc_full && $album.text}>
                <div>
                    <{$album.text}>
                </div>
            <{/if}>

            <{if $tag_attributes.desc_extra && $album.extra}>
                <div>
                    <{$album.extra}>
                </div>
            <{/if}>

            <{if $tag_attributes.photo_count && $album.photos|count}>
                <div>
                    <{t "В альбоме {photos,plural,=0{нет фотографий} one{# фотография} few{# фотографии} many{# фотографий} other{# фотографии}}" photos=$album.photos|count}>
                </div>
            <{/if}>

            <{if $tag_attributes.date_added}>
                <div>
                    <{$album.publish_date}>
                </div>
            <{/if}>

            <{if $tag_attributes.date_updated}>
                <div>
                    <{$album.edited_date}>
                </div>
            <{/if}>

            <{if $tag_attributes.gallery}>
                <div>
                    <{foreach $album.photos as $photo}>
                        <div>
                            <{if $tag_attributes.gallery_preview}>
                                <a href="<{$photo.photo_file}>">
                                    <img src="<{$photo.photo_file_small}>" />
                                </a>
                            <{elseif $tag_attributes.gallery_fullsize}>
                                <img src="<{$photo.photo_file}>" />
                            <{else}>
                                <img src="<{$photo.photo_file_small}>" />
                            <{/if}>

                            <{if $tag_attributes.photo-desc}>
                                <div>
                                    <{$photo.photo_description}>
                                </div>
                            <{/if}>
                        </div>
                    <{/foreach}>
                </div>
            <{/if}>
        </div>
    <{/foreach}>
</div>
