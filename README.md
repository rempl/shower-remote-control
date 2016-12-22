[![NPM version](https://img.shields.io/npm/v/shower-remote-control.svg)](https://www.npmjs.com/package/shower-remote-control)

# shower-remote-control

[Shower](https://github.com/shower/shower) plugin for remote control of presentation. Built on [Rempl](https://github.com/rempl/rempl).

See [remote control in action](https://youtu.be/So_81loUFx0)

## Install

```
npm install shower-remote-control
```

## How to use

- Include plugin script to your presentation right after `shower-core/shower.min.js` script

```html
<script src="node_modules/shower-core/shower.min.js"></script>
<script src="node_modules/shower-remote-control/index.js"></script>
```

- Start `rempl` server using [`rempl-cli`](https://github.com/rempl/rempl-cli)
- Open presentation in browser
- Open `rempl` server web interface (by default `localhost:8177`) or use one of [available hosts](https://github.com/rempl/rempl#host) to open remote control interface

To specify the `rempl` server location (when server is running on non-default host or/and port) use `<meta name="rempl:server" value="1.2.3.4:5678">` tag.

## License

MIT
