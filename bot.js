/* Copyright (C) 2020 Yusuf Usta.Licensed under the GPL-3.0 License;you may not use this file except in compliance with the License.WhatsAsena - Yusuf Usta*/ const fs = require("fs");const path = require("path");const events = require("./events");const chalk = require('chalk');const config = require('./config');const simpleGit = require('simple-git');const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');const {Message, StringSession, Image, Video} = require('./fidha/');const { DataTypes } = require('sequelize');const { getMessage } = require("./plugins/sql/greetings");const git = simpleGit();const axios = require('axios');const got = require('got'); const Language = require('./language');const Lang = Language.getString('updater'); // Sqlconst WhatsAsenaDB = config.DATABASE.define('WhatsAsena', { info: { type: DataTypes.STRING, allowNull: false }, value: { type: DataTypes.TEXT, allowNull: false }}); fs.readdirSync('./plugins/sql/').forEach(plugin => { if(path.extname(plugin).toLowerCase() == '.js') { require('./plugins/sql/' + plugin); }}); const plugindb = require('./plugins/sql/plugin'); // Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //String.prototype.format = function () { var i = 0, args = arguments; return this.replace(/{}/g, function () { return typeof args[i] != 'undefined' ? args[i++] : ''; });};if (!Date.now) { Date.now = function() { return new Date().getTime(); }} Array.prototype.remove = function() { var what, a = arguments, L = a.length, ax; while (L && this.length) { what = a[--L]; while ((ax = this.indexOf(what)) !== -1) { this.splice(ax, 1); } } return this;}; async function whatsAsena () { await config.DATABASE.sync(); var StrSes_Db = await WhatsAsenaDB.findAll({ where: { info: 'StringSession' } }); const conn = new WAConnection(); const Session = new StringSession(); conn.logger.level = config.DEBUG ? 'debug' : 'warn'; var nodb; if (StrSes_Db.length < 1) { nodb = true; conn.loadAuthInfo(Session.deCrypt(config.SESSION)); } else { conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value)); } conn.on ('credentials-updated', async () => { console.log( chalk.blueBright.italic('✅ Login information updated!')
