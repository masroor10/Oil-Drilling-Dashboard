import merge from 'lodash/merge';
import { Theme } from '@mui/material/styles';
import { button } from './components/button';
import { textField } from './components/textfield';
import { avatar } from './components/avatar';
import { fab } from './components/fab';
import { dialog } from './components/dialog';
import { list } from './components/list';
import { chip } from './components/chip';
import { tooltip } from './components/tooltip';
import { badge } from './components/badge';
import { tabs } from './components/tabs';
import { menu } from './components/menu';
import { card } from './components/card';
import { backdrop } from './components/backdrop';
import { typography } from './components/typography';
import IconButton from './components/icon-button';
import { alert } from './components/alert';

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
  const components = merge(
    button(theme),
    textField(theme),
    avatar(theme),
    IconButton(theme),
    fab(theme),
    dialog(theme),
    list(theme),
    chip(theme),
    tooltip(theme),
    badge(theme),
    tabs(theme),
    menu(theme),
    card(theme),
    backdrop(theme),
    typography(theme),
    menu(theme),
    alert(theme)
  );

  return components;
}
