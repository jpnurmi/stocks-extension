/* jshint esnext:true */
/*
 *
 *  GNOME Shell Extension for the great Taskwarrior application
 *  - Displays pending Tasks.
 *  - adding / modifieing tasks.
 *
 * Copyright (C) 2020
 *     Florijan Hamzic <fh @ infinicode.de>
 *
 * This file is part of gnome-shell-extension-stocks.
 *
 * gnome-shell-extension-stocks is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * gnome-shell-extension-stocks is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gnome-shell-extension-stocks.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

const { Clutter, GObject, St } = imports.gi

const ExtensionUtils = imports.misc.extensionUtils
const Me = ExtensionUtils.getCurrentExtension()

const { MenuStockTicker } = Me.imports.components.stocks.menuStockTicker
const { ScreenWrapper } = Me.imports.components.screenWrapper.screenWrapper

const { EventHandler } = Me.imports.helpers.eventHandler
const { SettingsHandler } = Me.imports.helpers.settings

const Gettext = imports.gettext.domain('stocks@infinicode.de')
const _ = Gettext.gettext

const Main = imports.ui.main
const PanelMenu = imports.ui.panelMenu

var button

function init (extensionMeta) {
}

function enable () {
  let button = new PanelMenu.Button()
  let label = new St.Label()
  label.get_clutter_text().set_markup(' <span color="red">fg</span> <span background="red">bg</span> <b>bold</b>')
  button.add_actor(label)
  Main.panel.addToStatusArea('stocksMenu', button)
}

function disable () {
  if (stocksMenu) {
    stocksMenu.destroy()
  }

  stocksMenu = null
}
