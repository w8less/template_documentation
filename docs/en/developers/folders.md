
# Using ftp structure to develop templates

In case you are authorized front-end developer, you will be provided with ftp access to your test environment.

namely :
- host
- login
- password

- also you must tell us your ip address (you can find it here https://whoer.net/ru). Without ip access , you can`t connect to ftp.

connection to ftp:
1) you must download the application FileZilla or other (for example, WinScp it has a synchronization mode with a local folder)
2) enter the host, login, password
3) connect

Create separate folders for different templates.

Template should contain [settings.json](../settings/settings.md) file, to be properly displayed.
Or you can simply clone this or another template and upload into a folder.


## Folder selection

You should be authorized on the website as developer: log into admin panel of the site http://admin.totalcan.com/,
and click any link that redirects to the website e.g. right next to the site name.
Then you can access your templates in ftp folders, for now by this address: `/ajax/developer_templates/`

remark: 
if you don`t click any link that redirects to the website  
or 
if you inactive some time.
You'll catch error "Forbidden (#403)"

`$user.developer_templates` - variable provide address to access list of options, can be used as regular link to page or ajax json/jsonp request

```html
<!-- ensure the user is developer, not a guest or customer: -->
<{if $user.is_developer}>
    ... your html/js code etc ...
    for example:
    <a href="<{$user.developer_templates}>" target="_blank">
        Change template folder
    </a>
<{/if}>
```


## AJAX implementation

In case you are requesting url with ajax, server will provide data:

```json
{
    "options": {
        "dafault": {
            "id": "",
            "base": "developer folder",
            "folder": "your custom folder",
            "post_url": "relative url",
            "is_active": "bool, if this option active now"
        },
        "key": "option",
        "key": "option",
        "key": "option",
        "key": "option"
    },
    "post": {
        "key": "data",
        "key": "data",
        "key": "data"
    }
}
```


`options.default` - default site template, set in panel

`options.key` - list of folders you created on ftp/s you have access to

`options.key.base` - base directory you have ftp access to, in case you have multiple ftps

`options.key.folder` - directory name you created

`options.key.post_url` - relative url you should POST request to, in case to change template to

`options.key.is_active` - bool, is this option active now

`options.post` - data you should provide to POST request


[Home](../index.md)
