# arena-saver

![insitu.png](insitu.png)

arena-saver floats images ambiently in your environment

live at [arena-saver.netlify.app](https://arena-saver.netlify.app)

inspired by [arenaTAB by Foreign Objects](https://github.com/FOREIGN-OBJECTS/arenaTab).

## ideal use

arena-saver is a website meant to be a screensaver based off of an are.na channel.

use this as a full-page screensaver.

- Linux: use [webscreensaver](https://github.com/lmartinking/webscreensaver)
- macOS: use [webviewscreensaver](https://github.com/liquidx/webviewscreensaver).

## config

### channel

`channel` parameter sets the *meta channel* (default: [channels-for-ambient-screens](https://www.are.na/dan-taeyoung/channels-for-ambient-screens) )

(ex: https://arena-saver.netlify.app/?channel=mais-oui-images)

**NOTE:** currently, arena-saver won't display the channel's blocks. arena-saver looks inside each channel (inside the meta-channel) and looks at those blocks, instead. so if you give it a single channel only containing blocks, nothing will be displayed.

### interval

`interval` parameter sets the interval in milliseconds (default: 10000, or 10 seconds)

(ex: https://arena-saver.netlify.app/?interval=5000)



## Todos:

- [] load more than 100 blocks from a channel
- [] deal with text
- ???



## Dev/Setup


created with [nuxt](https://nuxtjs.org/).

```
bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
