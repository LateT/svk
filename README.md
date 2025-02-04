
# SvK

Compare S-kauppa's product prices to K-kauppa's

## Run Locally

Clone the project

```bash
  git clone https://github.com/LateT/svk.git
```

Go to the project directory

```bash
  cd svk
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


**Run browser with CORS disabled!**

Reporsitory comes with browserNoCors.bat script to launch browser with cors disabled, works for chromium based browsers, you'll need to change the file path to your browsers executable and port of the project(default 3000).

The script:

```bash
  start "" "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" --user-data-dir="C://Chrome dev session" --disable-web-security "http://localhost:3000"
```
## Features

- Search S- stores by postalcode
- Search K- stores by name
- Search products by name and compare prices

