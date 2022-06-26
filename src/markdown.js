import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import enUS from "@kangc/v-md-editor/lib/lang/en-US";
import Prism from "prismjs";
import "prismjs/components/prism-json";

VMdEditor.use(vuepressTheme, {
  Prism,
});

VMdEditor.lang.use("en-US", enUS);

export default VMdEditor;
