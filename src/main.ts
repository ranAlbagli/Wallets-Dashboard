
import { registerPlugins } from '@/plugins'
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "./graphql/apolloClient";
import App from "./App.vue";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient); // ✅ Provide Apollo client
  },
  render: () => h(App),
});
registerPlugins(app)
app.mount("#app");
