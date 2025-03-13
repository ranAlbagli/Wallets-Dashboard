/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Composables
import { createVuetify } from 'vuetify'

import HashIcon from "../assets/icons/hash.vue";
import AssetIcon from "../assets/icons/asset.vue";
import ShapeIcon from "../assets/icons/shape.vue";
import NetworkIcon from "../assets/icons/network.vue";
import CoinIcon from "../assets/icons/coin.vue";
import ChevronRightIcon from "../assets/icons/chevron-right.vue";
import ChevronDownIcon from "../assets/icons/chevron-down.vue";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  defaults: {
    VApp: {
      style: {
        fontFamily: "Lato, sans-serif",
      },
    },
  },
  icons: {
    defaultSet: "mdi", // Keep Material Design Icons as default
    aliases: {
      hash: HashIcon,
      asset: AssetIcon,
      shape: ShapeIcon,
      network: NetworkIcon,
      coin: CoinIcon,
      'chevron-right': ChevronRightIcon,
      'chevron-down': ChevronDownIcon,
    },
  },
})
