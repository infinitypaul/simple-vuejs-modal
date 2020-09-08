'use strict';Object.defineProperty(exports,'__esModule',{value:true});var script = {
  name: 'VueModal',
  data: function data() {
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
  beforeMount: function beforeMount() {
    this.$modal.$event.$on('show', this.showModal);
    this.$modal.$event.$on('hide', this.closeModal);
  },
  mounted: function mounted() {
    var _this = this;

    document.addEventListener('keydown', function (ev) {
      if (_this.visible && ev.keyCode === 27) {
        _this.setHidden();
      }
    });
  },
  methods: {
    setVisible: function setVisible() {
      this.visible = true;
    },
    setHidden: function setHidden() {
      this.visible = false;
    },
    closeModal: function closeModal(modal) {
      if (this.name !== modal) {
        return;
      }

      this.setHidden();
      this.$emit('before-close');
    },
    showModal: function showModal(modal, params) {
      var _this2 = this;

      if (this.name !== modal) {
        return;
      }

      this.params = params;

      if (!this.$listeners['before-open']) {
        this.setVisible();
        return;
      }

      this.$emit('before-open', function () {
        _this2.setVisible();
      });
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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
      "click": function click($event) {
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

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-61d5af97_0", {
    source: ".app-modal[data-v-61d5af97]{background-color:#141420;position:fixed;width:100%;height:100%;left:0;top:0;z-index:9999}.app-modal-inner[data-v-61d5af97]{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:30px;width:90%;max-width:500px;background-color:#fff;z-index:9999}.modal-enter-active[data-v-61d5af97],.modal-leave-active[data-v-61d5af97]{transition:all .2s}.modal-enter[data-v-61d5af97],.modal-leave-active[data-v-61d5af97]{opacity:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-61d5af97";
/* module identifier */

var __vue_module_identifier__ = "data-v-61d5af97";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueModal(Vue) {
  if (install.installed) return;
  install.installed = true;
  this.event = new Vue();
  Vue.prototype.$modal = {
    show: function show(modal) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      plugin.event.$emit('show', modal, params);
    },
    hide: function hide(modal) {
      plugin.event.$emit('hide', modal);
    },
    $event: this.event
  };
  Vue.component('VueModal', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
//export const RollupDemoDirective = component;
exports.default=__vue_component__;