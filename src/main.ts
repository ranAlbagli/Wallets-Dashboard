import { createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "./graphql/apolloClient";
import App from "./App.vue";
import { registerPlugins } from './plugins'

const app = createApp(App);

registerPlugins(app);
app.provide(DefaultApolloClient, apolloClient);

app.mount("#app");
