import { Component } from 'rgui-ui-base';
import template from './index.rgl';
import { dom } from 'regularjs';

/**
 * @class Gotop
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
const Gotop = Component.extend({
    name: 'gotop',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.defaults({
            position: 'bottomright',
            scrollParent: document.body,
            hideBeforeScroll: true,
        });
        this.supr();

        if (this.data.hideBeforeScroll)
            this.data.visible = false;

        this._onScroll = this._onScroll.bind(this);
    },
    /**
     * @protected
     * @override
     */
    init() {
        this.supr();
        dom.on(this.data.scrollParent, 'scroll', this._onScroll);
    },
    /**
     * @protected
     * @override
     */
    destroy() {
        dom.off(this.data.scrollParent, 'scroll', this._onScroll);
        this.supr();
    },
    /**
     * @method gotop() 回到顶部
     * @public
     * @return {void}
     */
    gotop() {
        if (this.data.disabled)
            return;

        this.data.scrollParent = 0;
    },
    _onScroll() {
        if (this.data.scrollParent.scrollTop)
            this.data.visible = true;
    },
});

export default Gotop;
