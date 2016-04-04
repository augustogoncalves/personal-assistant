# Raspberry Pi 3 Personal Assistant

Basic voice activated app created for [Raspberry Pi 3](https://www.raspberrypi.org) with [NodeJS](https://nodejs.org) + [Electron](http://electron.atom.io/). Uses [Annyang](https://www.talater.com/annyang/) and [Responsive Voice](http://responsivevoice.org/) JavaScript libraries.

# See it in action

Check [this forum post with video](http://adndevblog.typepad.com/cloud_and_mobile/2016/04/raspberry-pi-3-nodejs-electron.html).

# Setup

1. [Download Raspbian Jessie](https://www.raspberrypi.org/downloads/raspbian/)

2. [Prepare the SD Card](https://www.raspberrypi.org/documentation/installation/installing-images/README.md)

3. Boot!

4. Use a monitor & keyboard & mouse to connect to the wifi 

5. [Expand SD Card - Otherwise will be only 3.4 GB of space](https://www.raspberrypi.org/documentation/configuration/raspi-config.md)
```
  sudo raspi-config
  sudo reboot
  df -h
````

6. [Update & Upgrade](https://www.raspberrypi.org/documentation/raspbian/updating.md)
```
  sudo apt-get update
  sudo apt-get dist-upgrade
````

7. [Install NodeJS](https://blog.wia.io/installing-node-js-on-a-raspberry-pi-3)
```
  wget https://nodejs.org/dist/v4.3.2/node-v4.3.2-linux-armv6l.tar.gz 
  tar -xvf node-v4.3.2-linux-armv6l.tar.gz 
  cd node-v4.3.2-linux-armv6l
  sudo cp -R * /usr/local/
````

8. [Install audio settings](http://elinux.org/RPi_Text_to_Speech_(Speech_Synthesis))
```
  sudo aptitude install pulseaudio
  sudo nano /etc/modules   
Add line: 
  snd_bcm2835
CTRL + O (save)  CTRL + X (exit)
  sudo apt-get install mplayer
  sudo amixer -c 0 cset numid=3 1
````

9. Copy the ‘personal-assistant’ code (easier with a flash-drive). 

10. Install packages (basically just electron package, aprox. 60MB)
```
npm install
````

11. Setup the personal-assistant as autostart
```
Create a new file
  sudo nano /home/pi/personal-assistant.sh
  
Add the following to this file (the folder should be the same as step 9)
  !#/bin/bash
  cd /home/pi/Documents/personal-assistant && npm start
CTRL + O (save)  CTRL + X (exit)

Set system as owner
  sudo chown pi:pi /home/pi /personal-assistant.sh
  sudo chmod +x /home/pi/personal-assistant.sh

add this .sh (script) to startup
  sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart.sh

add the following line:
  /home/pi/personal-assistant.sh &
```
