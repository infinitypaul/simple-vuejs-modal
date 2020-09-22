var script = {
  name: 'SimpleVueJsModal',

  data() {
    return {
      visible: false,
      params: {}
    };
  },

  props: {
    name: {
      required: true,
      type: String
    }
  },

  beforeMount() {
    this.$modal.$event.$on('show', this.showModal);
    this.$modal.$event.$on('hide', this.closeModal);
  },

  mounted() {
    document.addEventListener('keydown', ev => {
      if (this.visible && ev.keyCode === 27) {
        this.setHidden();
      }
    });
  },

  methods: {
    setVisible() {
      this.visible = true;
    },

    setHidden() {
      this.visible = false;
    },

    closeModal(modal) {
      if (this.name !== modal) {
        return;
      }

      this.setHidden();
      this.$emit('before-close');
    },

    showModal(modal, params) {
      if (this.name !== modal) {
        return;
      }

      this.params = params;

      if (!this.$listeners['before-open']) {
        this.setVisible();
        return;
      }

      this.$emit('before-open', () => {
        this.setVisible();
      });
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "name": "modal"
    }
  }, [_vm.visible ? _c('div', [_c('div', {
    staticClass: "app-modal",
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.$modal.hide(_vm.name);
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "app-modal-inner"
  }, [_vm._t("header", null, {
    "params": _vm.params
  }), _vm._v(" "), _vm._t("body", null, {
    "params": _vm.params
  }), _vm._v(" "), _vm._t("footer", null, {
    "params": _vm.params
  })], 2)]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-314db746_0", {
    source: ".app-modal[data-v-314db746]{background-color:#141420;position:fixed;width:100%;height:100%;left:0;top:0;z-index:9999}.app-modal-inner[data-v-314db746]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:30px;width:90%;max-width:500px;background-color:#fff;z-index:9999}.modal-enter-active[data-v-314db746],.modal-leave-active[data-v-314db746]{transition:all .2s}.modal-enter[data-v-314db746],.modal-leave-active[data-v-314db746]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-314db746";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueModal(Vue) {
  if (install.installed) return;
  install.installed = true;
  this.event = new Vue();
  Vue.prototype.$modal = {
    show(modal, params = {}) {
      plugin.event.$emit('show', modal, params);
    },

    hide(modal) {
      plugin.event.$emit('hide', modal);
    },

    $event: this.event
  };
  Vue.component('SimpleVueJsModal', __vue_component__);
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
//export const RollupDemoDirective = component;

export default __vue_component__;
