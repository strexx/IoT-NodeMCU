# Tutorial: How to create a televsion distance parental control interface with NodeMCU

If you want to check up on your kiddos watching television while you're not at home, this is a solution that might come in handy.
Kids don't realize sitting close to the television is bad for your eyes. Therefore I've created an interface to show you how close your
kid is to the television between a period of time. Everytime your kid comes too close to the televison it will be monitored and send to
the dashboard. This is a guide showing you how to use this and what tools you need to start parenting and caring over your child even better.

### Requirements

#### Hardware
-----------------

- 1 NodeMCU (with WiFi)
- 1 green led light
- 1 red led light
- 2 resistors for the leds
- 1 breadboard (big or small)
- 8 circuit wires
- [HC-SR04 ultra distance sensor](http://www.hackerstore.nl/Afbeeldingen/95klein.jpg)
- USB to Micro-USB B cable (to connect NodeMCU to computer) 

##### HC-SR04 sensor
![HC-SR04](http://www.hackerstore.nl/Afbeeldingen/95klein.jpg)


##### Arduino setup

![Arduino setup](readme/Arduino-setup.png)


##### Arduino setup
![Arduino setup](readme/Arduino-structure.png)

| Sensor/Output  | Port         | 
| ------------- |:-------------:| 
| Echo pin      | D0            | 
| Trigger pin   | D1            | 
| Green led     | D2            | 
| Red led       | D3            |
| BUILTIN_LED   | BUILTIN_LED   |

#### Software for Arduino
-----------------

**Programs**
- Arduino (downloaded from: https://www.arduino.cc/en/Main/Software)

**Libraries**
- [ArduinoJson](https://github.com/bblanchon/ArduinoJson)
- [ESP8266WiFi](https://github.com/ekstrand/ESP8266wifi)


#### Software for webserver

- Nodejs
- Gulp
- NPM

### Step 1: Installing Arduino

- Open up **arduino.ino** with your Arduino app
- Add WiFi SSID and password information

```
// WiFi
const char* ssid     = "";  // Wifi SSID
const char* password = "";  // WiFi Password
```

- Change the path of your host

```
// Hosts
const char* host     = ""; // Your domain EG: iot.nodemcu.com
String path          = "/api/status/output"; // This is the path where the Arduino will GET data
const int httpPort   = 80; // HTTP Port
```

- Upload the arduino code to your NodeMCU

You should be seeing this at the bottom of your Arduino app:

![Uploading Arduino code](readme/uploading-arduino.png)

Now your NodeMCU will connect to your WiFi and will **GET** and **POST** data to your server every 30 seconds.

### Step 2: Installing server

#### Setup

- Clone this GIT repo

- Open up terminal and open this project

```
cd /path-to-file
```

- In this folder install node modules

```
npm install
```

- Install Gulp

```
npm install --global gulp-cli
```

- Open new tab **MAC:** (CMD + T) **Windows:** (CTRL + T)
- Start Gulp

```
gulp watch
```

- Switch back to other tab
- Start the application

```
npm start
```

If you open your browser and go to **http://localhost:3010/** you should see the interface:

![Interface](readme/interface.png)

Now we got everything we need except for a webserver. You need to install this on a server if you want access from outside.

### API

All data send to the server is stored in JSON files. The API delivers 3 kinds of data:

- History
- Led status
- Last measured distance

#### History

**/api/data** Returns JSON with information of all measured distances from television.

```
[
  { 
    "time": "2016-04-21 00:21:29", 
    "input": { "distance": 50 }, 
    "output": { "led": "red" } 
  },
  ...
]

```

#### Led

**/api/status/output** Returns JSON with current LED status.

```
{ 
  "led": "red"
}
```

**/api/status/input** Returns JSON with latest distance measured.

#### Distance

```
{ 
  "distance": 50
}
```
