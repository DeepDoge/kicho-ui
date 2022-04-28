# What is this?
...

# Install
## Add it as submodule
```bash
git submodule add https://github.com/DeepDoge/kicho-ui.git ./src/lib/kicho-ui
```
If you are using VSCode DevContainer you can also add this inside
devcontainer.json
```json
{
    Your other settings...

    "postCreateCommand": "npm install && git submodule init ; git submodule update ; git submodule foreach --recursive git checkout master",

    Your other settings...
}
```
## Manually
Just download the thing and throw it in your project.<br/>
Or use other solutions idk, I'm not adding this to npm.


# How to use?
...