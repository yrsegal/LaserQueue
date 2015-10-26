# LaserQueue
A queue system for NuVu’s laser cutter and other CNC hardware. [NuVu Studio](https://cambridge.nuvustudio.com/discover) has a lasercutter, and *only* one of them. A lot of people want to use it, and managing it is a giant pain. This software aims to simplify that with a simple web-based software accessible locally. It is developed primarily by [@sdaitzman](https://github.com/sdaitzman) and [@yrsegal](https://github.com/yrsegal). You can use it to control access to a 3D printer, lasercutter, printer... whatever you want!

This file is an overview. Full API docs are in [api.md](./API.md) and config docs are in [config.md](./www/config.md). Info about plugins is in [plugins.md](./plugins/plugins.md).

## Getting the software
Download the latest stable version from [github.com/yrsegal/LaserQueue/releases](https://github.com/yrsegal/LaserQueue/releases) and decompress it.

## Running the software

Get the latest version by `git clone`ing the repo or downloading a zip. If there's a new update, the program will prompt you on run automatically.  

To start the server, run `start.sh` or `start.py` or `start.bat` if you're on Windows. You'll need Python 3.4.x or greater.

To change the admin login password, run the script with `--new-password`.

### Flags:
| Flag | Long flag | Description |
|------|-----------|-------------|
|`-h`|`--help`|Display a list of these flags and quit.|
|`-p PORT`|`--port PORT`|Set the port for the website to be hosted.|
|`-l`|`--local`|Start the backend from localhost.|
|`-v`|`--verbose`|Extra and more informative output from the backend.|
|`-q`|`--quiet`|Silence all printing.|
|`-b`|`--queue-backup`|Enable queue backups.|
|`-r`|`--regen-config`|Regenerate the config.|
|`-r [REGEN,]`|`--regen-config [REGEN,]`|Regenerate the positional arguments in the config.|
|`-S`|`--no-install`|Does not install dependencies.|
|`-V`|`--no-version-print`|Does not print the version.|
|`-U`|`--no-update`|Does not install or prompt for updates.|
|`-P`|`--no-plugins`|Does not load plugins.|
|`-H`|`--no-regen-host`|Do not automatically regenerate `config.host`.|
|None|`--new-password`|Allows you to reset the admin password from within the program.|
|None|`--backend`|Only runs the backend.|
|None|`--frontend`|Only runs the frontend.|
|None|`--init-only`|Runs neither the frontend nor the backend.|
|None|`--no-init`|Doesn't run the setup.|
|None|`--install-all`|Installs all dependencies without prompting.|
|None|`--install-update`|Installs updates without prompting.|

### Backend API
Want to access the backend? Send it signals? Control your list with a custom frontend? Make changes to the backend or frontend? See [API.md](API.md)!

## Dependencies

All dependencies should be met the first time you run the program. The program will detect your system and prompt to install them. However, you will definitely need Python at ≥ 3.4.x for WebSockets. If (for some reason) you would like to install these by hand, feel free:

###Required to start:  
- [Python 3.4.x](https://www.python.org/downloads/)
- pip (`#~ curl --silent --show-error --retry 5 https://bootstrap.pypa.io/get-pip.py | sudo python3`)

###Other dependencies (installed on runtime):  
- websockets (`#~ pip3 install websockets`)
- netifaces (`#~ pip3 install netifaces`)
- GitPython (`#~ pip3 install GitPython`)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/yrsegal/laserqueue/trend.png)](https://bitdeli.com/free “Bitdeli Badge”)
