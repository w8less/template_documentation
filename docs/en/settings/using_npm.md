
# Incuding npm modules

You are allowed to use npm modules in `/assets` folder of your template

You should set the npm update/install method in template `settings.json`:

```json
{
    "npm": "install"
}
```

Available options:

- `install` - recommended, modules will be installed once as git updates from package-lock.json
- `update` - modules will be updated regularly with `npm update` from package.json
- If not set, npm will not be run


## Important!

Very recommended include `package.json` and `package-lock.json` files to git, and regularly update them

Also exclude in `.gitignore` folders `node_modules` and `etc` as set below

```
# npm temporary files
etc

# npm modules will be installed by server
node_modules
```


## NPM Setup

- Install [Nodejs](https://nodejs.org/en/download/)
- Create account on [www.npmjs.com](https://www.npmjs.com/)
- Log into npmjs account: type into command prompt `npm login` and follow instructions
- Check `npm whoami`


[Settings](settings.md)
[Home](../index.md)
