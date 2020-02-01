const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!doctype html><html><head></head><body><div id="appLogin"></div></body></html>`);
global.localStorage = require('localStorage');
global.window = window;
global.document = global.window.document;
global.navigator = { userAgent: 'node.js' };